"""
Inicialización del paquete models.
Importar todos los modelos aquí para facilitar las importaciones.
"""

# Importación de todos los modelos
from models.base import db, BaseModel
from models.customer import Customer
from models.supplier import Supplier
from models.product import Product
from models.invoice import Invoice, InvoiceItem
# A medida que se creen más modelos, se importarán aquí 