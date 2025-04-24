# SalesNexus Backend

Backend API para el sistema de gestión de ventas SalesNexus.

## Tecnologías

- Python 3.8+
- Flask
- Flask-RESTx
- SQLAlchemy
- Marshmallow
- SQLite

## Instalación

1. Asegúrate de tener Poetry instalado:

```bash
pip install poetry
```

2. Instala las dependencias:

```bash
cd backend
poetry install
```

3. Activa el entorno virtual:

```bash
poetry shell
```

## Ejecución

1. Inicia el servidor de desarrollo:

```bash
python run.py
```

El servidor estará disponible en http://localhost:5000.

La documentación de la API estará disponible en http://localhost:5000/api/docs.

## Estructura del Proyecto

```
backend/
├── api/                # Endpoints de la API
│   ├── customers_api.py     # API de clientes
│   ├── suppliers_api.py     # API de proveedores
│   ├── products_api.py      # API de productos
│   ├── invoices_api.py      # API de facturas
│   └── dashboard_api.py     # API del dashboard
├── models/            # Modelos de datos
│   ├── base.py        # Modelo base y configuración de SQLAlchemy
│   ├── customer.py    # Modelo de clientes
│   ├── supplier.py    # Modelo de proveedores
│   ├── product.py     # Modelo de productos
│   └── invoice.py     # Modelo de facturas e items
├── schemas/           # Esquemas para serialización/deserialización
│   ├── customer_schema.py
│   ├── supplier_schema.py
│   ├── product_schema.py
│   └── invoice_schema.py
├── utils/             # Utilidades
│   └── errors.py      # Manejo de errores
├── instance/          # Configuración de instancia y base de datos
├── app.py             # Aplicación principal
└── run.py             # Script para ejecutar la aplicación
```

## API Endpoints

### Clientes
- `GET /api/customers` - Listar clientes
- `GET /api/customers/:id` - Obtener cliente
- `POST /api/customers` - Crear cliente
- `PUT /api/customers/:id` - Actualizar cliente
- `DELETE /api/customers/:id` - Eliminar cliente
- `GET /api/customers/:id/invoices` - Obtener facturas de un cliente

### Proveedores
- `GET /api/suppliers` - Listar proveedores
- `GET /api/suppliers/:id` - Obtener proveedor
- `POST /api/suppliers` - Crear proveedor
- `PUT /api/suppliers/:id` - Actualizar proveedor
- `DELETE /api/suppliers/:id` - Eliminar proveedor

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Obtener producto
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto
- `GET /api/products/low-stock` - Listar productos con bajo stock

### Facturas
- `GET /api/invoices` - Listar facturas
- `GET /api/invoices/:id` - Obtener factura
- `POST /api/invoices` - Crear factura
- `PUT /api/invoices/:id` - Actualizar factura
- `DELETE /api/invoices/:id` - Eliminar factura
- `GET /api/invoices/:id/items` - Listar items de una factura
- `POST /api/invoices/:id/items` - Añadir item a una factura

### Dashboard
- `GET /api/dashboard/stats` - Estadísticas generales
- `GET /api/dashboard/sales-chart` - Datos del gráfico de ventas
- `GET /api/dashboard/top-products` - Productos más vendidos
- `GET /api/dashboard/recent-invoices` - Facturas recientes
- `GET /api/dashboard/activities` - Actividades recientes
- `GET /api/dashboard/sales-summary` - Resumen de ventas
- `GET /api/dashboard/sales-by-period` - Ventas por período
- `GET /api/dashboard/customer-statistics` - Estadísticas de clientes 