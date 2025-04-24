"""
Modelo base y configuración de SQLAlchemy para la aplicación.
"""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.ext.declarative import declared_attr

# Inicializar SQLAlchemy
db = SQLAlchemy()

class BaseModel:
    """Clase base para todos los modelos."""
    
    @declared_attr
    def __tablename__(cls):
        """Generar nombre de tabla a partir del nombre de la clase."""
        return cls.__name__.lower()
    
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def save(self):
        """Guardar el modelo en la base de datos."""
        db.session.add(self)
        db.session.commit()
        return self
    
    def delete(self):
        """Eliminar el modelo de la base de datos."""
        db.session.delete(self)
        db.session.commit()
    
    def update(self, **kwargs):
        """Actualizar los atributos del modelo."""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        db.session.commit()
        return self
    
    @classmethod
    def get_by_id(cls, id):
        """Obtener un registro por su ID."""
        return cls.query.get(id)
    
    @classmethod
    def get_all(cls):
        """Obtener todos los registros."""
        return cls.query.all()
    
    def to_dict(self):
        """Convertir el modelo a un diccionario."""
        result = {}
        for column in self.__table__.columns:
            value = getattr(self, column.name)
            if isinstance(value, datetime):
                value = value.isoformat()
            result[column.name] = value
        return result 