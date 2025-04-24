"""
API para gestionar clientes.
"""

from flask import request
from flask_restx import Namespace, Resource, fields
from sqlalchemy.exc import SQLAlchemyError
from models import Customer
from schemas.customer_schema import customer_schema, customers_schema
from utils.errors import NotFoundError, ValidationError, DatabaseError

# Crear namespace
ns = Namespace('customers', description='Operaciones con clientes')

# Modelos para documentación Swagger
customer_model = ns.model('Customer', {
    'id': fields.Integer(readonly=True, description='ID único del cliente'),
    'name': fields.String(required=True, description='Nombre del cliente'),
    'email': fields.String(required=True, description='Email del cliente'),
    'phone': fields.String(description='Teléfono del cliente'),
    'address': fields.String(description='Dirección del cliente'),
    'created_at': fields.DateTime(readonly=True, description='Fecha de creación'),
    'updated_at': fields.DateTime(readonly=True, description='Fecha de última actualización')
})

customer_input_model = ns.model('CustomerInput', {
    'name': fields.String(required=True, description='Nombre del cliente'),
    'email': fields.String(required=True, description='Email del cliente'),
    'phone': fields.String(description='Teléfono del cliente'),
    'address': fields.String(description='Dirección del cliente')
})

# Rutas del API
@ns.route('/')
class CustomerList(Resource):
    """Endpoints para listar y crear clientes."""
    
    @ns.doc('list_customers')
    @ns.response(200, 'Éxito')
    def get(self):
        """Listar todos los clientes."""
        try:
            customers = Customer.get_all()
            result = customers_schema.dump(customers)
            return {'success': True, 'data': result}, 200
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('create_customer')
    @ns.expect(customer_input_model)
    @ns.response(201, 'Cliente creado')
    @ns.response(400, 'Error de validación')
    def post(self):
        """Crear un nuevo cliente."""
        try:
            # Validar datos de entrada
            data = request.json
            errors = customer_schema.validate(data)
            if errors:
                raise ValidationError(str(errors))
            
            # Crear cliente
            customer = Customer(**data)
            customer.save()
            
            return {'success': True, 'data': customer_schema.dump(customer)}, 201
        except ValidationError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/<int:id>')
@ns.response(404, 'Cliente no encontrado')
@ns.param('id', 'ID del cliente')
class CustomerResource(Resource):
    """Endpoints para obtener, actualizar y eliminar un cliente específico."""
    
    @ns.doc('get_customer')
    @ns.response(200, 'Éxito')
    def get(self, id):
        """Obtener un cliente por su ID."""
        try:
            customer = Customer.get_by_id(id)
            if not customer:
                raise NotFoundError(f"Cliente con ID {id} no encontrado")
            
            return {'success': True, 'data': customer_schema.dump(customer)}, 200
        except NotFoundError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('update_customer')
    @ns.expect(customer_input_model)
    @ns.response(200, 'Cliente actualizado')
    def put(self, id):
        """Actualizar un cliente."""
        try:
            # Obtener cliente
            customer = Customer.get_by_id(id)
            if not customer:
                raise NotFoundError(f"Cliente con ID {id} no encontrado")
            
            # Validar datos de entrada
            data = request.json
            errors = customer_schema.validate(data)
            if errors:
                raise ValidationError(str(errors))
            
            # Actualizar cliente
            customer.update(**data)
            
            return {'success': True, 'data': customer_schema.dump(customer)}, 200
        except (NotFoundError, ValidationError) as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('delete_customer')
    @ns.response(200, 'Cliente eliminado')
    def delete(self, id):
        """Eliminar un cliente."""
        try:
            customer = Customer.get_by_id(id)
            if not customer:
                raise NotFoundError(f"Cliente con ID {id} no encontrado")
            
            customer.delete()
            
            return {'success': True, 'message': f"Cliente con ID {id} eliminado"}, 200
        except NotFoundError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/<int:id>/invoices')
@ns.response(404, 'Cliente no encontrado')
@ns.param('id', 'ID del cliente')
class CustomerInvoices(Resource):
    """Endpoint para listar facturas de un cliente."""
    
    @ns.doc('list_customer_invoices')
    @ns.response(200, 'Éxito')
    def get(self, id):
        """Listar todas las facturas de un cliente."""
        try:
            # Verificar si existe el cliente
            customer = Customer.get_by_id(id)
            if not customer:
                raise NotFoundError(f"Cliente con ID {id} no encontrado")
            
            # Obtener facturas
            from schemas.invoice_schema import invoices_schema
            invoices = customer.invoices
            result = invoices_schema.dump(invoices)
            
            return {'success': True, 'data': result}, 200
        except NotFoundError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e)) 