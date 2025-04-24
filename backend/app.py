"""
Aplicación principal de SalesNexus.
Este archivo inicializa la aplicación Flask y configura sus componentes.
"""

import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from models.base import db
from api import register_blueprints

# Cargar variables de entorno
load_dotenv()

def create_app(test_config=None):
    """Crear y configurar la aplicación Flask."""
    # Crear instancia de la aplicación
    app = Flask(__name__, instance_relative_config=True)
    
    # Configuración por defecto
    app.config.from_mapping(
        SECRET_KEY=os.environ.get('SECRET_KEY', 'dev-key-replace-in-production'),
        SQLALCHEMY_DATABASE_URI=os.environ.get('SQLALCHEMY_DATABASE_URI', 
                                              'sqlite:///' + os.path.join(app.instance_path, 'salesnexus.db')),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )
    
    # Asegurar que la carpeta instance existe
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    # Cargar configuración específica del entorno
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)
    
    # Configurar CORS
    cors_origins = os.environ.get('CORS_ORIGINS', '*').split(',')
    CORS(app, resources={r"/api/*": {"origins": cors_origins}}, supports_credentials=True)
    
    # Inicializar la base de datos
    db.init_app(app)
    
    # Registrar blueprints
    register_blueprints(app)
    
    # Crear todas las tablas
    with app.app_context():
        db.create_all()
    
    @app.route('/health')
    def health_check():
        """Verificar que la aplicación está funcionando."""
        return {'status': 'ok', 'message': 'API is running'}
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'False').lower() in ('true', '1', 't')
    app.run(debug=debug, host='0.0.0.0', port=port) 