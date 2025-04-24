# Current Work in Progress

## Project Overview
Este es un proyecto de aplicación web moderna que actualmente tiene implementado el frontend con simulación del backend. El objetivo es desarrollar un backend robusto que se integre con el frontend existente.

### Tecnologías Actuales
- Frontend:
  - React con TypeScript
  - Vite como bundler
  - TailwindCSS para estilos
  - Radix UI para componentes
  - React Query para manejo de estado y peticiones
  - React Hook Form para formularios
  - Zod para validaciones
  - Wouter para enrutamiento

- Backend (A Implementar):
  - Flask (Python)
  - SQLite como base de datos
  - SQLAlchemy como ORM
  - Flask-Login para autenticación
  - Flask-CORS para manejo de CORS
  - Flask-RESTful para APIs
  - Marshmallow para serialización/validación

## Current Focus
Desarrollo del backend real de la aplicación usando Flask y SQLite, reemplazando la simulación actual con una implementación completa.

## Análisis y Plan de Desarrollo

### Fase 1: Configuración del Backend

#### 1.1 Configuración de Base de Datos
- [x] Configurar SQLite y SQLAlchemy
- [x] Definir modelos de datos
- [x] Configurar estructura básica de Flask
  - [x] Crear y configurar app/__init__.py
  - [x] Crear y configurar app/extensions.py
  - [x] Crear y configurar app/config.py
- [x] Configurar sistema de migraciones con Alembic/Flask-Migrate
  - [x] Instalar Alembic y Flask-Migrate
  - [x] Inicializar sistema de migraciones
  - [x] Crear migración inicial
  - [x] Aplicar migración para crear tablas
- [-] Migrar a Poetry para gestión de dependencias
  - [x] Instalar Poetry en Windows (v2.1.2)
  - [x] Exportar dependencias actuales
    - [x] Generar requirements.txt actualizado
    - [x] Revisar y limpiar dependencias innecesarias
  - [x] Preparar entorno para Poetry
    - [x] Desactivar y eliminar venv actual
    - [x] Verificar respaldo de dependencias
  - [x] Inicializar proyecto con Poetry
    - [x] Crear pyproject.toml con configuración base
    - [x] Añadir dependencias con versiones exactas
    - [x] Verificar instalación correcta
  - [x] Finalizar configuración de Poetry
    - [x] Verificar que todas las dependencias estén instaladas y funcionando
    - [x] Actualizar .gitignore para Poetry
    - [x] Crear scripts de desarrollo en pyproject.toml
  - [x] Actualizar documentación
    - [x] Actualizar README.md con instrucciones de Poetry
    - [x] Documentar comandos comunes de desarrollo
    - [x] Actualizar guía de instalación
- [-] Configurar entorno de desarrollo local
  - [x] Configurar Flask-Caching
  - [x] Configurar Flask-Limiter
  - [x] Configurar logging

#### 1.2 Configuración del Servidor Flask
- [-] Estructurar el proyecto backend
  - [x] Configurar extensiones de Flask necesarias (SQLAlchemy, CORS, etc.)
  - [x] Implementar configuración por entornos (development, testing, production)
  - [x] Implementar manejo de errores global
  - [x] Configurar sistema de logging

#### 1.3 Configuración de servicios adicionales
- [-] Implementar blueprints para APIs
  - [x] Crear estructura base de blueprints
  - [x] Implementar endpoints CRUD para cada modelo
    - [x] Customer API
    - [x] Supplier API
    - [x] Product API
    - [x] Order API
    - [x] Invoice API
  - [x] Implementar validación de datos con Marshmallow
  - [x] Implementar manejo de respuestas estándar

#### 1.4 Documentación de APIs
- [x] Implementar Swagger/OpenAPI
  - [x] Configurar Swagger UI
  - [x] Documentar endpoints
  - [x] Añadir ejemplos de uso

### Fase 2: Implementación de Autenticación

#### 2.1 Sistema de Autenticación
- [x] Implementar registro de usuarios con Flask-Login
  - [x] Crear modelo User en models/user.py
  - [x] Crear schema de usuario en schemas/user.py
  - [x] Implementar endpoints de registro en api/auth.py
  - [x] Configurar Flask-Login en extensions.py
  - [x] Implementar UserMixin y métodos requeridos
- [x] Implementar login y manejo de sesiones
  - [x] Crear endpoint de login
  - [x] Implementar manejo de sesión con Flask-Login
  - [x] Configurar remember-me functionality
  - [x] Implementar rate limiting para intentos de login
- [x] Configurar JWT para API authentication
  - [x] Crear modelos para manejo de tokens revocados y sesiones
  - [x] Implementar decoradores para protección de rutas
  - [x] Configurar manejo de tokens de acceso y refresco
  - [x] Implementar endpoint de refresco de token
  - [x] Implementar revocación de tokens en logout
- [x] Implementar middleware de autenticación
  - [x] Crear middleware para verificación de token
  - [x] Implementar manejo de roles y permisos
  - [x] Configurar protección de rutas API
- [x] Implementar logout y manejo de sesiones
  - [x] Crear endpoint de logout
  - [x] Implementar invalidación de tokens
  - [x] Manejar sesiones concurrentes

### Fase 3: Implementación de APIs

#### 3.1 Estructura de APIs
- [x] Definir estructura de rutas RESTful con Flask-RESTful
  - [x] Configuración de Flask-RESTX con Swagger UI
  - [x] Implementación de clase base BaseAPI con operaciones CRUD
  - [x] Organización de endpoints en namespaces
  - [x] Documentación automática con Swagger UI
- [x] Implementar blueprints para modularización
  - [x] Blueprint principal para la API
  - [x] Blueprints individuales para cada recurso (customers, suppliers, products, orders, invoices)
  - [x] Registro correcto de blueprints en la aplicación
  - [x] Estructura modularizada siguiendo mejores prácticas
- [x] Configurar serialización/validación con Marshmallow
  - [x] Configuración base con BaseSchema
  - [x] Schemas específicos para cada modelo
  - [x] Validaciones personalizadas
  - [x] Manejo de relaciones
  - [x] Campos computados
  - [x] Manejo de errores personalizado
- [x] Implementar manejo de respuestas estandarizado
  - [x] Clase APIResponse para respuestas estándar
  - [x] Sistema de errores personalizado
  - [x] Manejadores de errores globales
  - [x] Formato consistente para respuestas exitosas y errores
  - [x] Soporte para paginación y metadata
  - [x] Códigos de error estandarizados

#### 3.2 Endpoints Principales
- [x] Implementar CRUD de usuarios
  - [x] Registro y autenticación
  - [x] Gestión de sesiones
  - [x] Perfil de usuario
  - [x] Refresh de tokens
  - [x] Logout y revocación de tokens
- [x] Implementar endpoints de productos
  - [x] CRUD básico de productos
  - [x] Búsqueda y filtrado
  - [x] Gestión de categorías
  - [x] Control de stock
  - [x] Productos con bajo stock
- [x] Implementar endpoints de ventas
  - [x] CRUD de órdenes y facturas
  - [x] Gestión de items
  - [x] Estados y seguimiento
  - [x] Filtrado por cliente
  - [x] Facturas vencidas
- [x] Implementar endpoints de reportes
  - [x] Métricas de proveedores
  - [x] Reportes de stock
  - [x] Estadísticas de ventas
  - [x] Actividad por cliente

### Fase 4: Integración y Pruebas

#### 4.1 Configuración de Integración Base
- [x] Actualizar configuración CORS en Flask
  - [x] Configurar CORS para aceptar credenciales (credentials: "include")
  - [x] Establecer los orígenes permitidos para desarrollo y producción
  - [x] Configurar headers permitidos
  - [x] Configurar métodos permitidos (GET, POST, PUT, DELETE, PATCH)

#### 4.2 Estandarización de Respuestas API
- [x] Implementar formato de respuesta estándar en todos los endpoints
  ```python
  {
      "success": bool,
      "data": Any,
      "error": Optional[str],
      "metadata": Optional[Dict]
  }
  ```
  - [x] Implementar middleware para transformación automática de respuestas
  - [x] Asegurar compatibilidad con el formato anterior del frontend (documentado en docs/server-api-reference.md)
  - [x] Implementar manejo de paginación estándar
  - [x] Implementar transformación de timestamps a ISO 8601

- [x] Implementar formato de error estándar
  ```python
  {
      "success": false,
      "error": {
          "code": str,
          "message": str,
          "details": Optional[Dict]
      }
  }
  ```
  - [x] Implementar manejo consistente de errores HTTP
  - [x] Implementar transformación de errores de validación
  - [x] Asegurar mensajes de error descriptivos y útiles

- [x] Crear middleware para transformación automática de respuestas
  - [x] Transformación de respuestas exitosas
  - [x] Transformación de errores
  - [x] Manejo de paginación
  - [x] Logging de respuestas

### Notas de Cambios:
- Se ha eliminado la carpeta `server/` que contenía la simulación del backend en TypeScript
- Se ha documentado la estructura de la API simulada en `docs/server-api-reference.md` para referencia
- El frontend (carpeta `client/`) ahora se integrará directamente con el backend Flask

#### 4.3 Adaptación de Endpoints del Dashboard
- [x] Implementar/Verificar endpoint `/api/dashboard/stats`
- [x] Implementar/Verificar endpoint `/api/dashboard/sales-chart`
- [x] Implementar/Verificar endpoint `/api/dashboard/activities`
- [x] Implementar/Verificar endpoint `/api/dashboard/top-products`
- [x] Implementar/Verificar endpoint `/api/dashboard/recent-invoices`

#### 4.4 Adaptación de Endpoints de Gestión
- [x] Verificar endpoints de Clientes
  - [x] GET `/api/customers`
  - [x] GET `/api/customers/:id`
  - [x] GET `/api/customers/:id/orders`
  - [x] POST `/api/customers`
  - [x] PUT `/api/customers/:id`
  - [x] DELETE `/api/customers/:id`
- [x] Verificar endpoints de Productos
  - [x] GET `/api/products`
  - [x] POST `/api/products`
  - [x] PUT `/api/products/:id`
  - [x] DELETE `/api/products/:id`
- [x] Verificar endpoints de Ventas
  - [x] GET `/api/sales`
  - [x] GET `/api/orders`
  - [x] POST `/api/orders`
  - [x] PUT `/api/orders/:id`
  - [x] GET `/api/invoices`

#### 4.5 Manejo de Errores y Validación
- [x] Implementar middleware global de manejo de errores
  - [x] Errores de validación (400)
  - [x] Errores de autenticación (401)
  - [x] Errores de autorización (403)
  - [x] Errores de no encontrado (404)
  - [x] Errores de servidor (500)
- [x] Implementar validación de datos con Marshmallow
  - [x] Schemas de validación para cada modelo
  - [x] Transformación de errores de validación al formato esperado

#### 4.6 Pruebas de Integración
- [x] Crear suite de pruebas de integración
  - [x] Pruebas de endpoints del dashboard
  - [x] Pruebas de endpoints de gestión
  - [x] Pruebas de manejo de errores
  - [x] Pruebas de validación de datos
- [x] Implementar pruebas end-to-end
  - [x] Flujos completos de usuario
  - [x] Escenarios de error
  - [x] Casos límite

#### 4.7 Optimización de Rendimiento
- [ ] Implementar caché para endpoints frecuentes
  - [ ] Caché de estadísticas del dashboard
  - [ ] Caché de listas de productos
  - [ ] Caché de datos de cliente
- [ ] Optimizar consultas a la base de datos
- [ ] Implementar paginación donde sea necesario

### Fase 5: Optimización y Seguridad

#### 5.1 Optimización
- [ ] Implementar caché con Flask-Caching
- [ ] Optimizar consultas SQLite
- [ ] Implementar rate limiting con Flask-Limiter

#### 5.2 Seguridad
- [ ] Implementar validación y sanitización de datos
- [ ] Configurar headers de seguridad
- [ ] Implementar protección contra ataques comunes


## Estructura Actual del Backend

```
backend/
├── app/
│   ├── __init__.py        # Factory pattern y configuración de Flask (64 líneas)
│   ├── config.py          # Configuraciones por entorno (80 líneas)
│   ├── extensions.py      # Inicialización de extensiones Flask (149 líneas)
│   ├── api/
│   │   ├── __init__.py   # Registro de blueprints (36 líneas)
│   │   ├── auth.py       # Endpoints de autenticación (484 líneas)
│   │   ├── base.py       # Clase base para APIs (352 líneas)
│   │   ├── customers.py  # API de Clientes (61 líneas)
│   │   ├── invoices.py   # API de Facturas (236 líneas)
│   │   ├── orders.py     # API de Pedidos (247 líneas)
│   │   ├── products.py   # API de Productos (155 líneas)
│   │   ├── routes.py     # Registro de rutas (26 líneas)
│   │   └── suppliers.py  # API de Proveedores (123 líneas)
│   ├── middleware/
│   │   └── auth.py       # Middleware de autenticación (109 líneas)
│   ├── models/
│   │   ├── __init__.py   # Inicialización de modelos (20 líneas)
│   │   ├── base.py       # Clase base para modelos (33 líneas)
│   │   ├── customer.py   # Modelo de Cliente (42 líneas)
│   │   ├── invoice.py    # Modelo de Factura (76 líneas)
│   │   ├── order.py      # Modelo de Pedido (105 líneas)
│   │   ├── product.py    # Modelo de Producto (51 líneas)
│   │   ├── supplier.py   # Modelo de Proveedor (35 líneas)
│   │   ├── token.py      # Modelos de Token y Sesión (108 líneas)
│   │   └── user.py       # Modelo de Usuario (63 líneas)
│   ├── schemas/
│   │   ├── __init__.py   # Configuración de Marshmallow (29 líneas)
│   │   ├── customer.py   # Schema de Cliente (52 líneas)
│   │   ├── invoice.py    # Schema de Factura (113 líneas)
│   │   ├── order.py      # Schema de Pedido (110 líneas)
│   │   ├── product.py    # Schema de Producto (72 líneas)
│   │   ├── supplier.py   # Schema de Proveedor (59 líneas)
│   │   └── user.py       # Schema de Usuario (83 líneas)
│   ├── services/         # Directorio vacío
│   └── utils/
│       ├── auth.py       # Utilidades de autenticación (65 líneas)
│       ├── errors.py     # Manejo de errores (94 líneas)
│       ├── logger.py     # Configuración de logging (75 líneas)
│       └── responses.py  # Respuestas API estandarizadas (146 líneas)
├── instance/            # Directorio para datos de instancia
├── migrations/
│   ├── versions/
│   │   └── 73eb43acba4e_initial_migration.py  # Migración inicial (131 líneas)
│   ├── env.py          # Configuración de Alembic (114 líneas)
│   ├── README          # Documentación básica (2 líneas)
│   ├── alembic.ini     # Configuración de Alembic (51 líneas)
│   └── script.py.mako  # Plantilla de migraciones (25 líneas)
├── tests/              # Directorio vacío
├── .gitignore         # Configuración de Git (136 líneas)
├── alembic.ini        # Configuración global de Alembic (117 líneas)
├── poetry.lock        # Lock file de dependencias (1566 líneas)
├── pyproject.toml     # Configuración de Poetry (61 líneas)
├── README.md          # Documentación principal (74 líneas)
├── requirements.txt   # Dependencias legacy (50 líneas)
├── run.py            # Script de ejecución (12 líneas)
└── wsgi.py           # Punto de entrada WSGI (7 líneas)
```

## Guías de Desarrollo

### Estándares de Código
1. Seguir PEP 8 para estilo de código Python
2. Usar type hints en Python
3. Documentar con docstrings todas las funciones y clases
4. Implementar blueprints para modularización
5. Seguir principios SOLID

### Manejo de Errores
1. Usar excepciones personalizadas
2. Implementar handlers de error globales
3. Logging estructurado con logging de Python
4. Respuestas de error estandarizadas

### Seguridad
1. Implementar rate limiting con Flask-Limiter
2. Validar todas las entradas con Marshmallow
3. Usar HTTPS en producción
4. Implementar CORS apropiadamente
5. Seguir mejores prácticas de OWASP

### Base de Datos
1. Usar migraciones con Alembic
2. Implementar transacciones donde sea necesario
3. Optimizar consultas SQLite
4. Mantener índices apropiados
5. Usar connection pooling

## Próximos Pasos
1. Configurar el entorno Flask y SQLite
2. Implementar los modelos base con SQLAlchemy
3. Configurar el sistema de autenticación
4. Desarrollar los endpoints principales
5. Integrar con el frontend existente 

## Análisis del Frontend

### Estructura del Proyecto
```
client/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── layout/        # Componentes de layout
│   │   ├── dashboard/     # Componentes específicos del dashboard
│   │   └── ui/           # Componentes de UI genéricos
│   ├── pages/            # Componentes de página
│   │   ├── dashboard.tsx    # Dashboard principal
│   │   ├── products.tsx     # Gestión de productos
│   │   ├── customers.tsx    # Lista de clientes
│   │   ├── customer-detail.tsx  # Detalle de cliente
│   │   ├── clients.tsx      # Lista de clientes
│   │   ├── client-detail.tsx    # Detalle de cliente
│   │   ├── sales.tsx       # Gestión de ventas
│   │   ├── invoices.tsx    # Gestión de facturas
│   │   ├── orders.tsx      # Gestión de pedidos
│   │   ├── reports.tsx     # Reportes y análisis
│   │   ├── profile.tsx     # Perfil de usuario
│   │   └── settings.tsx    # Configuración
│   ├── lib/              # Utilidades y configuraciones
│   │   ├── queryClient.ts  # Configuración de React Query
│   │   └── utils.ts       # Utilidades generales
│   ├── hooks/            # Custom hooks
│   ├── App.tsx          # Componente principal y rutas
│   └── main.tsx         # Punto de entrada
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── theme.json
├── tsconfig.json
├── tsconfig.json
└── vite.config.ts
```

### Tecnologías Principales
- React con TypeScript para el desarrollo de la interfaz
- Vite como bundler para mejor rendimiento en desarrollo
- TailwindCSS para estilos con enfoque utility-first
- Radix UI para componentes accesibles y personalizables
- React Query para manejo de estado del servidor y caché
- React Hook Form para manejo eficiente de formularios
- Zod para validaciones de tipo en runtime
- Wouter para enrutamiento ligero

### Gestión de Estado y Datos
- React Query como solución principal para:
  - Caché de datos del servidor
  - Manejo de estado asíncrono
  - Revalidación automática
  - Manejo de errores
- Configuración personalizada para:
  - Manejo de autenticación (401)
  - Reintento de peticiones
  - Tiempo de caché
  - Revalidación en focus

### Integración con Backend
#### Estado Actual
- Peticiones configuradas con fetch API
- Manejo de CORS con credentials
- Manejo centralizado de errores
- Endpoints simulados para desarrollo

#### Endpoints Utilizados
- Autenticación:
  - POST /api/auth/login
  - POST /api/auth/register
  - POST /api/auth/logout
  - GET /api/auth/me
- Productos:
  - GET /api/products
  - POST /api/products
  - PUT /api/products/:id
  - DELETE /api/products/:id
- Clientes:
  - GET /api/customers
  - GET /api/customers/:id
  - GET /api/customers/:id/orders
- Ventas:
  - GET /api/sales
  - GET /api/orders
  - GET /api/invoices
- Reportes:
  - GET /api/dashboard/stats
  - GET /api/dashboard/sales-chart
  - GET /api/dashboard/activities

### Necesidades de Integración
1. Actualización de endpoints:
   - Migrar a endpoints reales del backend
   - Implementar manejo de tokens JWT
   - Actualizar tipos TypeScript según respuestas reales

2. Manejo de Autenticación:
   - Implementar flujo completo de JWT
   - Manejar refresh de tokens
   - Gestionar sesiones múltiples

3. Gestión de Errores:
   - Implementar manejo consistente de errores
   - Mostrar mensajes de error apropiados
   - Manejar errores de red y timeout

4. Optimizaciones:
   - Implementar caché efectiva
   - Configurar revalidación apropiada
   - Optimizar carga de datos


## Análisis del Frontend y Estructura de APIs

### Endpoints Actuales del Frontend

#### Dashboard APIs
- GET `/api/dashboard/stats` - Estadísticas generales del tablero
- GET `/api/dashboard/sales-chart` - Datos del gráfico de ventas
- GET `/api/dashboard/activities` - Actividades recientes
- GET `/api/dashboard/top-products` - Productos más vendidos
- GET `/api/dashboard/recent-invoices` - Facturas recientes

#### Usuarios y Autenticación
- GET `/api/customers` - Lista de clientes
- GET `/api/customers/:id` - Detalles de un cliente específico
- GET `/api/suppliers` - Lista de proveedores
- GET `/api/suppliers/:id` - Detalles de un proveedor específico

#### Productos
- GET `/api/products` - Lista de productos
- POST `/api/products` - Crear nuevo producto
- PUT `/api/products/:id` - Actualizar producto
- DELETE `/api/products/:id` - Eliminar producto

#### Ventas y Pedidos
- GET `/api/sales` - Lista de ventas
- GET `/api/orders` - Lista de pedidos
- POST `/api/orders` - Crear nuevo pedido
- PUT `/api/orders/:id` - Actualizar estado de pedido
- GET `/api/invoices` - Lista de facturas

### Modelos de Datos Identificados

#### Customer (Cliente)
```python
class Customer(Base):
    id: int
    name: str
    email: str
    phone: str
    address: str
    created_at: datetime
    total_spent: float
    total_orders: int
    last_purchase: datetime
```

#### Supplier (Proveedor)
```python
class Supplier(Base):
    id: int
    name: str
    email: str
    phone: str
    address: str
    created_at: datetime
    relationship_status: str
    account_manager: str
    notes: str
```

#### Product (Producto)
```python
class Product(Base):
    id: int
    name: str
    description: str
    price: float
    stock: int
    category: str
    status: str
    supplier_id: int
    created_at: datetime
```

#### Order (Pedido)
```python
class Order(Base):
    id: int
    order_number: str
    date: datetime
    customer_id: int
    items: List[OrderItem]
    total: float
    status: str
    payment_status: str
    shipping_address: str
    tracking_number: str
    delivery_date: datetime
    notes: str
```

#### Invoice (Factura)
```python
class Invoice(Base):
    id: int
    invoice_number: str
    date: datetime
    customer_id: int
    items: List[InvoiceItem]
    total: float
    status: str
    due_date: datetime
    payment_date: datetime
```

### Estructura de Respuestas API

#### Formato de Respuesta Estándar
```python
{
    "success": bool,
    "data": Any,
    "error": Optional[str],
    "metadata": Optional[Dict]
}
```

#### Formato de Error
```python
{
    "success": false,
    "error": {
        "code": str,
        "message": str,
        "details": Optional[Dict]
    }
}
```
