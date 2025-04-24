"""
Modelo para los clientes.
"""

from sqlalchemy import Column, String, Text
from models.base import db, BaseModel

class Customer(db.Model, BaseModel):
    """Modelo para almacenar la información de los clientes."""
    
    # Campos específicos del cliente
    name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    phone = Column(String(20))
    address = Column(Text)
    
    def __repr__(self):
        """Representación en cadena del cliente."""
        return f"<Customer {self.name}>" 