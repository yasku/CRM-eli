"""
Modelo para los productos.
"""

from sqlalchemy import Column, String, Float, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from models.base import db, BaseModel

class Product(db.Model, BaseModel):
    """Modelo para almacenar la información de los productos."""
    
    # Campos específicos del producto
    name = Column(String(100), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    category = Column(String(50))
    status = Column(String(20), default='active')
    
    # Relación con proveedor
    supplier_id = Column(Integer, ForeignKey('supplier.id'), nullable=False)
    supplier = relationship('Supplier', backref='products')
    
    def __repr__(self):
        """Representación en cadena del producto."""
        return f"<Product {self.name}>" 