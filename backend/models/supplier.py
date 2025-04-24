"""
Modelo para los proveedores.
"""

from sqlalchemy import Column, String, Text
from models.base import db, BaseModel

class Supplier(db.Model, BaseModel):
    """Modelo para almacenar la información de los proveedores."""
    
    # Campos específicos del proveedor
    name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    phone = Column(String(20))
    address = Column(Text)
    relationship_status = Column(String(50))
    account_manager = Column(String(100))
    notes = Column(Text)
    
    def __repr__(self):
        """Representación en cadena del proveedor."""
        return f"<Supplier {self.name}>" 