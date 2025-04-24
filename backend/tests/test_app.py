"""
Pruebas básicas para la aplicación.
"""

import pytest
from app import create_app

@pytest.fixture
def app():
    """Crear una instancia de la aplicación para pruebas."""
    app = create_app({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
    })
    
    with app.app_context():
        from models.base import db
        db.create_all()
    
    yield app

@pytest.fixture
def client(app):
    """Cliente para realizar peticiones a la aplicación."""
    return app.test_client()

def test_health_check(client):
    """Probar el endpoint de verificación de salud."""
    response = client.get('/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'ok'
    assert data['message'] == 'API is running'

def test_api_docs(client):
    """Probar que la documentación de la API esté disponible."""
    response = client.get('/api/docs/')
    assert response.status_code == 200
    assert b'Swagger' in response.data or b'swagger' in response.data 