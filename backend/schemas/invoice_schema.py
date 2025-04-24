"""
Esquemas para serializar/deserializar los modelos Invoice e InvoiceItem.
"""

from marshmallow import Schema, fields, validate

class InvoiceItemSchema(Schema):
    """Esquema para el modelo InvoiceItem."""
    
    id = fields.Int(dump_only=True)
    invoice_id = fields.Int(required=True)
    product_id = fields.Int(required=True)
    quantity = fields.Int(required=True, validate=validate.Range(min=1))
    price = fields.Float(required=True, validate=validate.Range(min=0))
    subtotal = fields.Float(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    
    # Campos para relaciones
    product = fields.Nested('ProductSchema', exclude=('supplier',), dump_only=True)

class InvoiceSchema(Schema):
    """Esquema para el modelo Invoice."""
    
    id = fields.Int(dump_only=True)
    invoice_number = fields.Str(validate=validate.Length(max=20))
    date = fields.DateTime()
    customer_id = fields.Int(required=True)
    total = fields.Float(dump_only=True)
    status = fields.Str(validate=validate.OneOf(['pending', 'paid', 'overdue', 'cancelled']))
    due_date = fields.DateTime()
    payment_date = fields.DateTime(allow_none=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    
    # Campos para relaciones
    customer = fields.Nested('CustomerSchema', exclude=('invoices',), dump_only=True)
    items = fields.Nested(InvoiceItemSchema, many=True, dump_only=True)
    
    # Campos para entrada de items en la creación de facturas
    items_data = fields.List(fields.Dict(), load_only=True)

# Instancias del esquema para uso común
invoice_item_schema = InvoiceItemSchema()
invoice_items_schema = InvoiceItemSchema(many=True)
invoice_schema = InvoiceSchema()
invoices_schema = InvoiceSchema(many=True) 