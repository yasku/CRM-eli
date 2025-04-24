"""
Esquema para serializar/deserializar el modelo Product.
"""

from marshmallow import Schema, fields, validate

class ProductSchema(Schema):
    """Esquema para el modelo Product."""
    
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    description = fields.Str()
    price = fields.Float(required=True, validate=validate.Range(min=0))
    stock = fields.Int(validate=validate.Range(min=0))
    category = fields.Str(validate=validate.Length(max=50))
    status = fields.Str(validate=validate.Length(max=20))
    supplier_id = fields.Int(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    
    # Campos para relaciones
    supplier = fields.Nested('SupplierSchema', exclude=('products',), dump_only=True)

# Instancias del esquema para uso común
product_schema = ProductSchema()
products_schema = ProductSchema(many=True) 