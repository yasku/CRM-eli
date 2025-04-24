"""
Esquema para serializar/deserializar el modelo Supplier.
"""

from marshmallow import Schema, fields, validate

class SupplierSchema(Schema):
    """Esquema para el modelo Supplier."""
    
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True)
    phone = fields.Str(validate=validate.Length(max=20))
    address = fields.Str()
    relationship_status = fields.Str(validate=validate.Length(max=50))
    account_manager = fields.Str(validate=validate.Length(max=100))
    notes = fields.Str()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

# Instancias del esquema para uso común
supplier_schema = SupplierSchema()
suppliers_schema = SupplierSchema(many=True) 