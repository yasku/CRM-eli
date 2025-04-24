"""
Utilidades para el manejo de errores en la API.
"""

from flask import jsonify

class APIError(Exception):
    """Clase base para errores de la API."""
    
    def __init__(self, message, status_code=400, error_code=None):
        self.message = message
        self.status_code = status_code
        self.error_code = error_code or 'API_ERROR'
        super().__init__(self.message)
    
    def to_dict(self):
        """Convertir error a diccionario para respuesta JSON."""
        return {
            'success': False,
            'error': {
                'code': self.error_code,
                'message': self.message
            }
        }

class NotFoundError(APIError):
    """Error para recursos no encontrados."""
    
    def __init__(self, message='Recurso no encontrado'):
        super().__init__(message, status_code=404, error_code='NOT_FOUND')

class ValidationError(APIError):
    """Error para fallos de validación."""
    
    def __init__(self, message='Error de validación'):
        super().__init__(message, status_code=400, error_code='VALIDATION_ERROR')

class DatabaseError(APIError):
    """Error para problemas de base de datos."""
    
    def __init__(self, message='Error de base de datos'):
        super().__init__(message, status_code=500, error_code='DATABASE_ERROR')

def register_error_handlers(app):
    """Registrar manejadores de errores en la aplicación Flask."""
    
    @app.errorhandler(APIError)
    def handle_api_error(error):
        """Manejar errores de la API."""
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response
    
    @app.errorhandler(404)
    def handle_not_found(error):
        """Manejar errores 404."""
        response = jsonify({
            'success': False,
            'error': {
                'code': 'NOT_FOUND',
                'message': 'Recurso no encontrado'
            }
        })
        response.status_code = 404
        return response
    
    @app.errorhandler(500)
    def handle_server_error(error):
        """Manejar errores 500."""
        response = jsonify({
            'success': False,
            'error': {
                'code': 'SERVER_ERROR',
                'message': 'Error interno del servidor'
            }
        })
        response.status_code = 500
        return response 