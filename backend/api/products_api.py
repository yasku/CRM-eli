"""
API para gestionar productos.
"""

from flask import request
from flask_restx import Namespace, Resource, fields
from sqlalchemy.exc import SQLAlchemyError
from models import Product, Supplier
from schemas.product_schema import product_schema, products_schema
from utils.errors import NotFoundError, ValidationError, DatabaseError

# Crear namespace
ns = Namespace('products', description='Operaciones con productos')

# Modelos para documentación Swagger
product_model = ns.model('Product', {
    'id': fields.Integer(readonly=True, description='ID único del producto'),
    'name': fields.String(required=True, description='Nombre del producto'),
    'description': fields.String(description='Descripción del producto'),
    'price': fields.Float(required=True, description='Precio del producto'),
    'stock': fields.Integer(description='Stock disponible'),
    'category': fields.String(description='Categoría del producto'),
    'status': fields.String(description='Estado del producto'),
    'supplier_id': fields.Integer(required=True, description='ID del proveedor'),
    'created_at': fields.DateTime(readonly=True, description='Fecha de creación'),
    'updated_at': fields.DateTime(readonly=True, description='Fecha de última actualización')
})

product_input_model = ns.model('ProductInput', {
    'name': fields.String(required=True, description='Nombre del producto'),
    'description': fields.String(description='Descripción del producto'),
    'price': fields.Float(required=True, description='Precio del producto'),
    'stock': fields.Integer(description='Stock disponible'),
    'category': fields.String(description='Categoría del producto'),
    'status': fields.String(description='Estado del producto'),
    'supplier_id': fields.Integer(required=True, description='ID del proveedor')
})

# Rutas del API
@ns.route('/')
class ProductList(Resource):
    """Endpoints para listar y crear productos."""
    
    @ns.doc('list_products')
    @ns.response(200, 'Éxito')
    def get(self):
        """Listar todos los productos."""
        try:
            products = Product.get_all()
            result = products_schema.dump(products)
            return {'success': True, 'data': result}, 200
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('create_product')
    @ns.expect(product_input_model)
    @ns.response(201, 'Producto creado')
    @ns.response(400, 'Error de validación')
    def post(self):
        """Crear un nuevo producto."""
        try:
            # Validar datos de entrada
            data = request.json
            errors = product_schema.validate(data)
            if errors:
                raise ValidationError(str(errors))
            
            # Verificar si existe el proveedor
            supplier = Supplier.get_by_id(data['supplier_id'])
            if not supplier:
                raise ValidationError(f"Proveedor con ID {data['supplier_id']} no encontrado")
            
            # Crear producto
            product = Product(**data)
            product.save()
            
            return {'success': True, 'data': product_schema.dump(product)}, 201
        except ValidationError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/<int:id>')
@ns.response(404, 'Producto no encontrado')
@ns.param('id', 'ID del producto')
class ProductResource(Resource):
    """Endpoints para obtener, actualizar y eliminar un producto específico."""
    
    @ns.doc('get_product')
    @ns.response(200, 'Éxito')
    def get(self, id):
        """Obtener un producto por su ID."""
        try:
            product = Product.get_by_id(id)
            if not product:
                raise NotFoundError(f"Producto con ID {id} no encontrado")
            
            return {'success': True, 'data': product_schema.dump(product)}, 200
        except NotFoundError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('update_product')
    @ns.expect(product_input_model)
    @ns.response(200, 'Producto actualizado')
    def put(self, id):
        """Actualizar un producto."""
        try:
            # Obtener producto
            product = Product.get_by_id(id)
            if not product:
                raise NotFoundError(f"Producto con ID {id} no encontrado")
            
            # Validar datos de entrada
            data = request.json
            errors = product_schema.validate(data)
            if errors:
                raise ValidationError(str(errors))
            
            # Verificar si existe el proveedor
            if 'supplier_id' in data:
                supplier = Supplier.get_by_id(data['supplier_id'])
                if not supplier:
                    raise ValidationError(f"Proveedor con ID {data['supplier_id']} no encontrado")
            
            # Actualizar producto
            product.update(**data)
            
            return {'success': True, 'data': product_schema.dump(product)}, 200
        except (NotFoundError, ValidationError) as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('delete_product')
    @ns.response(200, 'Producto eliminado')
    def delete(self, id):
        """Eliminar un producto."""
        try:
            product = Product.get_by_id(id)
            if not product:
                raise NotFoundError(f"Producto con ID {id} no encontrado")
            
            product.delete()
            
            return {'success': True, 'message': f"Producto con ID {id} eliminado"}, 200
        except NotFoundError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/low-stock')
class LowStockProductList(Resource):
    """Endpoint para listar productos con stock bajo."""
    
    @ns.doc('list_low_stock_products')
    @ns.response(200, 'Éxito')
    def get(self):
        """Listar productos con stock bajo (menos de 10 unidades)."""
        try:
            # Filtrar productos con stock menor a 10
            products = Product.query.filter(Product.stock < 10).all()
            result = products_schema.dump(products)
            return {'success': True, 'data': result}, 200
        except Exception as e:
            raise DatabaseError(str(e)) 