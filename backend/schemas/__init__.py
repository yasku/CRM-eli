"""
Inicialización del paquete schemas.
"""

# Esquemas de Customer
from schemas.customer_schema import CustomerSchema, customer_schema, customers_schema

# Esquemas de Supplier
from schemas.supplier_schema import SupplierSchema, supplier_schema, suppliers_schema

# Esquemas de Product
from schemas.product_schema import ProductSchema, product_schema, products_schema

# Esquemas de Invoice
from schemas.invoice_schema import (
    InvoiceSchema, invoice_schema, invoices_schema,
    InvoiceItemSchema, invoice_item_schema, invoice_items_schema
) 