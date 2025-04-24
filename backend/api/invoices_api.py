"""
API para gestionar facturas.
"""

from flask import request
from flask_restx import Namespace, Resource, fields
from sqlalchemy.exc import SQLAlchemyError
from models import Invoice, InvoiceItem, Customer, Product
from schemas.invoice_schema import (
    invoice_schema, invoices_schema,
    invoice_item_schema, invoice_items_schema
)
from utils.errors import NotFoundError, ValidationError, DatabaseError

# Crear namespace
ns = Namespace('invoices', description='Operaciones con facturas')

# Modelos para documentación Swagger
invoice_item_model = ns.model('InvoiceItem', {
    'id': fields.Integer(readonly=True, description='ID único del item'),
    'invoice_id': fields.Integer(required=True, description='ID de la factura'),
    'product_id': fields.Integer(required=True, description='ID del producto'),
    'quantity': fields.Integer(required=True, description='Cantidad'),
    'price': fields.Float(required=True, description='Precio unitario'),
    'subtotal': fields.Float(readonly=True, description='Subtotal'),
    'created_at': fields.DateTime(readonly=True, description='Fecha de creación'),
    'updated_at': fields.DateTime(readonly=True, description='Fecha de última actualización')
})

invoice_model = ns.model('Invoice', {
    'id': fields.Integer(readonly=True, description='ID único de la factura'),
    'invoice_number': fields.String(readonly=True, description='Número de factura'),
    'date': fields.DateTime(description='Fecha de emisión'),
    'customer_id': fields.Integer(required=True, description='ID del cliente'),
    'total': fields.Float(readonly=True, description='Total de la factura'),
    'status': fields.String(description='Estado de la factura'),
    'due_date': fields.DateTime(description='Fecha de vencimiento'),
    'payment_date': fields.DateTime(description='Fecha de pago'),
    'created_at': fields.DateTime(readonly=True, description='Fecha de creación'),
    'updated_at': fields.DateTime(readonly=True, description='Fecha de última actualización'),
    'items': fields.List(fields.Nested(invoice_item_model), description='Items de la factura')
})

invoice_input_model = ns.model('InvoiceInput', {
    'customer_id': fields.Integer(required=True, description='ID del cliente'),
    'date': fields.DateTime(description='Fecha de emisión'),
    'status': fields.String(description='Estado de la factura'),
    'due_date': fields.DateTime(description='Fecha de vencimiento'),
    'payment_date': fields.DateTime(description='Fecha de pago'),
    'items_data': fields.List(fields.Nested(ns.model('InvoiceItemInput', {
        'product_id': fields.Integer(required=True, description='ID del producto'),
        'quantity': fields.Integer(required=True, description='Cantidad'),
        'price': fields.Float(description='Precio unitario (opcional, se usa el precio del producto si no se especifica)')
    })), description='Items de la factura')
})

invoice_item_input_model = ns.model('InvoiceItemInput', {
    'product_id': fields.Integer(required=True, description='ID del producto'),
    'quantity': fields.Integer(required=True, description='Cantidad'),
    'price': fields.Float(description='Precio unitario (opcional, se usa el precio del producto si no se especifica)')
})

# Rutas del API
@ns.route('/')
class InvoiceList(Resource):
    """Endpoints para listar y crear facturas."""
    
    @ns.doc('list_invoices')
    @ns.response(200, 'Éxito')
    def get(self):
        """Listar todas las facturas."""
        try:
            invoices = Invoice.get_all()
            result = invoices_schema.dump(invoices)
            return {'success': True, 'data': result}, 200
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('create_invoice')
    @ns.expect(invoice_input_model)
    @ns.response(201, 'Factura creada')
    @ns.response(400, 'Error de validación')
    def post(self):
        """Crear una nueva factura."""
        try:
            # Validar datos de entrada
            data = request.json
            errors = invoice_schema.validate(data)
            if errors:
                raise ValidationError(str(errors))
            
            # Verificar si existe el cliente
            customer = Customer.get_by_id(data['customer_id'])
            if not customer:
                raise ValidationError(f"Cliente con ID {data['customer_id']} no encontrado")
            
            # Crear una copia de los datos de items antes de eliminarlos del dict principal
            items_data = data.pop('items_data', [])
            
            # Crear factura
            invoice = Invoice(**data)
            invoice.save()
            
            # Crear items de la factura
            for item_data in items_data:
                product = Product.get_by_id(item_data['product_id'])
                if not product:
                    raise ValidationError(f"Producto con ID {item_data['product_id']} no encontrado")
                
                # Usar el precio del producto si no se especifica
                if 'price' not in item_data:
                    item_data['price'] = product.price
                
                # Crear item
                item = InvoiceItem(invoice_id=invoice.id, **item_data)
                item.save()
                
                # Actualizar stock del producto
                new_stock = product.stock - item_data['quantity']
                if new_stock < 0:
                    raise ValidationError(f"Stock insuficiente para el producto {product.name}")
                product.update(stock=new_stock)
            
            # Calcular el total de la factura
            invoice.calculate_total()
            
            return {'success': True, 'data': invoice_schema.dump(invoice)}, 201
        except ValidationError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/<int:id>')
@ns.response(404, 'Factura no encontrada')
@ns.param('id', 'ID de la factura')
class InvoiceResource(Resource):
    """Endpoints para obtener, actualizar y eliminar una factura específica."""
    
    @ns.doc('get_invoice')
    @ns.response(200, 'Éxito')
    def get(self, id):
        """Obtener una factura por su ID."""
        try:
            invoice = Invoice.get_by_id(id)
            if not invoice:
                raise NotFoundError(f"Factura con ID {id} no encontrada")
            
            return {'success': True, 'data': invoice_schema.dump(invoice)}, 200
        except NotFoundError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('update_invoice')
    @ns.expect(invoice_input_model)
    @ns.response(200, 'Factura actualizada')
    def put(self, id):
        """Actualizar una factura."""
        try:
            # Obtener factura
            invoice = Invoice.get_by_id(id)
            if not invoice:
                raise NotFoundError(f"Factura con ID {id} no encontrada")
            
            # Validar datos de entrada
            data = request.json
            errors = invoice_schema.validate(data)
            if errors:
                raise ValidationError(str(errors))
            
            # Verificar si existe el cliente si se está actualizando
            if 'customer_id' in data:
                customer = Customer.get_by_id(data['customer_id'])
                if not customer:
                    raise ValidationError(f"Cliente con ID {data['customer_id']} no encontrado")
            
            # Copiar y eliminar items_data si existe
            items_data = data.pop('items_data', None)
            
            # Actualizar factura
            invoice.update(**data)
            
            # Si se proporcionan nuevos items, eliminar los anteriores y crear nuevos
            if items_data is not None:
                # Eliminar items actuales
                for item in invoice.items:
                    item.delete()
                
                # Crear nuevos items
                for item_data in items_data:
                    product = Product.get_by_id(item_data['product_id'])
                    if not product:
                        raise ValidationError(f"Producto con ID {item_data['product_id']} no encontrado")
                    
                    # Usar el precio del producto si no se especifica
                    if 'price' not in item_data:
                        item_data['price'] = product.price
                    
                    # Crear item
                    item = InvoiceItem(invoice_id=invoice.id, **item_data)
                    item.save()
                
                # Recalcular el total
                invoice.calculate_total()
            
            return {'success': True, 'data': invoice_schema.dump(invoice)}, 200
        except (NotFoundError, ValidationError) as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('delete_invoice')
    @ns.response(200, 'Factura eliminada')
    def delete(self, id):
        """Eliminar una factura."""
        try:
            invoice = Invoice.get_by_id(id)
            if not invoice:
                raise NotFoundError(f"Factura con ID {id} no encontrada")
            
            invoice.delete()
            
            return {'success': True, 'message': f"Factura con ID {id} eliminada"}, 200
        except NotFoundError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/<int:id>/items')
@ns.response(404, 'Factura no encontrada')
@ns.param('id', 'ID de la factura')
class InvoiceItemList(Resource):
    """Endpoints para listar y añadir items a una factura."""
    
    @ns.doc('list_invoice_items')
    @ns.response(200, 'Éxito')
    def get(self, id):
        """Listar todos los items de una factura."""
        try:
            invoice = Invoice.get_by_id(id)
            if not invoice:
                raise NotFoundError(f"Factura con ID {id} no encontrada")
            
            items = invoice.items
            result = invoice_items_schema.dump(items)
            return {'success': True, 'data': result}, 200
        except NotFoundError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('add_invoice_item')
    @ns.expect(invoice_item_input_model)
    @ns.response(201, 'Item añadido')
    @ns.response(400, 'Error de validación')
    def post(self, id):
        """Añadir un nuevo item a una factura."""
        try:
            # Obtener factura
            invoice = Invoice.get_by_id(id)
            if not invoice:
                raise NotFoundError(f"Factura con ID {id} no encontrada")
            
            # Validar datos de entrada
            data = request.json
            data['invoice_id'] = id
            errors = invoice_item_schema.validate(data)
            if errors:
                raise ValidationError(str(errors))
            
            # Verificar si existe el producto
            product = Product.get_by_id(data['product_id'])
            if not product:
                raise ValidationError(f"Producto con ID {data['product_id']} no encontrado")
            
            # Usar el precio del producto si no se especifica
            if 'price' not in data:
                data['price'] = product.price
            
            # Verificar stock
            if product.stock < data['quantity']:
                raise ValidationError(f"Stock insuficiente para el producto {product.name}")
            
            # Actualizar stock
            product.update(stock=product.stock - data['quantity'])
            
            # Crear item
            item = InvoiceItem(**data)
            item.save()
            
            # Recalcular el total de la factura
            invoice.calculate_total()
            
            return {'success': True, 'data': invoice_item_schema.dump(item)}, 201
        except (NotFoundError, ValidationError) as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e)) 