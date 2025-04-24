"""
Modelos para las facturas y sus items.
"""

from datetime import datetime, timedelta
from sqlalchemy import Column, String, Float, Integer, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from models.base import db, BaseModel

class InvoiceItem(db.Model, BaseModel):
    """Modelo para los items de una factura."""
    
    # Campos específicos del item
    invoice_id = Column(Integer, ForeignKey('invoice.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('product.id'), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    price = Column(Float, nullable=False)
    
    # Relaciones
    product = relationship('Product')
    
    # Propiedades calculadas
    @property
    def subtotal(self):
        """Calcular el subtotal del item."""
        return self.price * self.quantity
    
    def __repr__(self):
        """Representación en cadena del item."""
        return f"<InvoiceItem {self.id} - {self.product_id} x{self.quantity}>"
    
    def to_dict(self):
        """Convertir el modelo a un diccionario."""
        result = super().to_dict()
        result['subtotal'] = self.subtotal
        if self.product:
            result['product'] = self.product.to_dict()
        return result

class Invoice(db.Model, BaseModel):
    """Modelo para las facturas."""
    
    # Campos específicos de la factura
    invoice_number = Column(String(20), unique=True, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    customer_id = Column(Integer, ForeignKey('customer.id'), nullable=False)
    total = Column(Float, default=0.0)
    status = Column(String(20), default='pending')
    due_date = Column(DateTime)
    payment_date = Column(DateTime, nullable=True)
    
    # Relaciones
    customer = relationship('Customer', backref='invoices')
    items = relationship('InvoiceItem', cascade='all, delete-orphan')
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Generar número de factura automáticamente si no se proporciona
        if 'invoice_number' not in kwargs:
            self.invoice_number = f"INV-{datetime.utcnow().strftime('%Y%m%d')}-{func.count(Invoice.id)}"
        # Establecer fecha de vencimiento predeterminada a 30 días después de la emisión
        if 'due_date' not in kwargs:
            self.due_date = self.date + timedelta(days=30)
    
    def calculate_total(self):
        """Calcular el total de la factura."""
        self.total = sum(item.subtotal for item in self.items)
        db.session.commit()
        return self.total
    
    def __repr__(self):
        """Representación en cadena de la factura."""
        return f"<Invoice {self.invoice_number}>"
    
    def to_dict(self):
        """Convertir el modelo a un diccionario."""
        result = super().to_dict()
        if self.customer:
            result['customer'] = self.customer.to_dict()
        result['items'] = [item.to_dict() for item in self.items]
        return result 