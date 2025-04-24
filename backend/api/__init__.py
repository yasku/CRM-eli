"""
Inicialización del paquete de API.
"""

from flask import Blueprint
from flask_restx import Api

# Crear blueprint principal
main_bp = Blueprint('api', __name__)

# Crear instancia de API para Swagger
api = Api(
    main_bp,
    version='1.0',
    title='SalesNexus API',
    description='API para el sistema de gestión de ventas SalesNexus (Sin autenticación)',
    doc='/docs'
)

# Importar y registrar namespaces
from api.customers_api import ns as customers_ns
from api.suppliers_api import ns as suppliers_ns
from api.products_api import ns as products_ns
from api.invoices_api import ns as invoices_ns
from api.dashboard_api import ns as dashboard_ns

# Registrar namespaces en la API
api.add_namespace(customers_ns, path='/customers')
api.add_namespace(suppliers_ns, path='/suppliers')
api.add_namespace(products_ns, path='/products')
api.add_namespace(invoices_ns, path='/invoices')
api.add_namespace(dashboard_ns, path='/dashboard')

def register_blueprints(app):
    """Registrar todos los blueprints en la aplicación."""
    from utils.errors import register_error_handlers
    
    # Registrar manejadores de errores
    register_error_handlers(app)
    
    # Registrar blueprint principal
    app.register_blueprint(main_bp, url_prefix='/api')
    
    return app 