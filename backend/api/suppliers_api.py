"""
API para gestionar proveedores.
"""

from flask import request
from flask_restx import Namespace, Resource, fields
from sqlalchemy.exc import SQLAlchemyError
from models import Supplier
from schemas.supplier_schema import supplier_schema, suppliers_schema
from utils.errors import NotFoundError, ValidationError, DatabaseError

# Crear namespace
ns = Namespace('suppliers', description='Operaciones con proveedores')

# Modelos para documentación Swagger
supplier_model = ns.model('Supplier', {
    'id': fields.Integer(readonly=True, description='ID único del proveedor'),
    'name': fields.String(required=True, description='Nombre del proveedor'),
    'email': fields.String(required=True, description='Email del proveedor'),
    'phone': fields.String(description='Teléfono del proveedor'),
    'address': fields.String(description='Dirección del proveedor'),
    'relationship_status': fields.String(description='Estado de la relación comercial'),
    'account_manager': fields.String(description='Gestor de cuenta'),
    'notes': fields.String(description='Notas adicionales'),
    'created_at': fields.DateTime(readonly=True, description='Fecha de creación'),
    'updated_at': fields.DateTime(readonly=True, description='Fecha de última actualización')
})

supplier_input_model = ns.model('SupplierInput', {
    'name': fields.String(required=True, description='Nombre del proveedor'),
    'email': fields.String(required=True, description='Email del proveedor'),
    'phone': fields.String(description='Teléfono del proveedor'),
    'address': fields.String(description='Dirección del proveedor'),
    'relationship_status': fields.String(description='Estado de la relación comercial'),
    'account_manager': fields.String(description='Gestor de cuenta'),
    'notes': fields.String(description='Notas adicionales')
})

# Rutas del API
@ns.route('/')
class SupplierList(Resource):
    """Endpoints para listar y crear proveedores."""
    
    @ns.doc('list_suppliers')
    @ns.response(200, 'Éxito')
    def get(self):
        """Listar todos los proveedores."""
        try:
            suppliers = Supplier.get_all()
            result = suppliers_schema.dump(suppliers)
            return {'success': True, 'data': result}, 200
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('create_supplier')
    @ns.expect(supplier_input_model)
    @ns.response(201, 'Proveedor creado')
    @ns.response(400, 'Error de validación')
    def post(self):
        """Crear un nuevo proveedor."""
        try:
            # Validar datos de entrada
            data = request.json
            errors = supplier_schema.validate(data)
            if errors:
                raise ValidationError(str(errors))
            
            # Crear proveedor
            supplier = Supplier(**data)
            supplier.save()
            
            return {'success': True, 'data': supplier_schema.dump(supplier)}, 201
        except ValidationError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))

@ns.route('/<int:id>')
@ns.response(404, 'Proveedor no encontrado')
@ns.param('id', 'ID del proveedor')
class SupplierResource(Resource):
    """Endpoints para obtener, actualizar y eliminar un proveedor específico."""
    
    @ns.doc('get_supplier')
    @ns.response(200, 'Éxito')
    def get(self, id):
        """Obtener un proveedor por su ID."""
        try:
            supplier = Supplier.get_by_id(id)
            if not supplier:
                raise NotFoundError(f"Proveedor con ID {id} no encontrado")
            
            return {'success': True, 'data': supplier_schema.dump(supplier)}, 200
        except NotFoundError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('update_supplier')
    @ns.expect(supplier_input_model)
    @ns.response(200, 'Proveedor actualizado')
    def put(self, id):
        """Actualizar un proveedor."""
        try:
            # Obtener proveedor
            supplier = Supplier.get_by_id(id)
            if not supplier:
                raise NotFoundError(f"Proveedor con ID {id} no encontrado")
            
            # Validar datos de entrada
            data = request.json
            errors = supplier_schema.validate(data)
            if errors:
                raise ValidationError(str(errors))
            
            # Actualizar proveedor
            supplier.update(**data)
            
            return {'success': True, 'data': supplier_schema.dump(supplier)}, 200
        except (NotFoundError, ValidationError) as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e))
    
    @ns.doc('delete_supplier')
    @ns.response(200, 'Proveedor eliminado')
    def delete(self, id):
        """Eliminar un proveedor."""
        try:
            supplier = Supplier.get_by_id(id)
            if not supplier:
                raise NotFoundError(f"Proveedor con ID {id} no encontrado")
            
            supplier.delete()
            
            return {'success': True, 'message': f"Proveedor con ID {id} eliminado"}, 200
        except NotFoundError as e:
            raise e
        except Exception as e:
            raise DatabaseError(str(e)) 