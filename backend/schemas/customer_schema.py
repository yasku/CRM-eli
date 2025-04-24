"""
Esquema para serializar/deserializar el modelo Customer.
"""

from marshmallow import Schema, fields, validate

class CustomerSchema(Schema):
    """Esquema para el modelo Customer."""
    
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True)
    phone = fields.Str(validate=validate.Length(max=20))
    address = fields.Str()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

# Instancias del esquema para uso común
customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True) 