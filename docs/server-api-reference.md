# Referencia de API del Servidor Simulado

## Estructura de Datos y Endpoints

### Formatos de Respuesta Estándar

#### Respuesta Exitosa
```typescript
{
  success: true,
  data: any,
  message?: string
}
```

#### Respuesta de Error
```typescript
{
  success: false,
  message: string,
  errors?: ValidationError[],
  error_code?: string
}
```

#### Respuesta con Paginación
```typescript
{
  success: true,
  data: any[],
  metadata: {
    pagination: {
      total_items: number,
      total_pages: number,
      current_page: number,
      per_page: number,
      has_next: boolean,
      has_prev: boolean
    }
  }
}
```

### Endpoints Implementados

#### Dashboard
- GET `/api/dashboard/stats` - Estadísticas generales
- GET `/api/dashboard/sales-chart` - Datos del gráfico de ventas
- GET `/api/dashboard/top-products` - Productos más vendidos
- GET `/api/dashboard/recent-invoices` - Facturas recientes
- GET `/api/dashboard/activities` - Actividades recientes

#### Clientes
- GET `/api/customers` - Listar clientes
- GET `/api/customers/:id` - Obtener cliente
- POST `/api/customers` - Crear cliente
- PATCH `/api/customers/:id` - Actualizar cliente
- DELETE `/api/customers/:id` - Eliminar cliente
- GET `/api/customers/:id/invoices` - Facturas del cliente

#### Proveedores
- GET `/api/suppliers` - Listar proveedores
- GET `/api/suppliers/:id` - Obtener proveedor
- POST `/api/suppliers` - Crear proveedor
- PATCH `/api/suppliers/:id` - Actualizar proveedor
- DELETE `/api/suppliers/:id` - Eliminar proveedor

#### Productos
- GET `/api/products` - Listar productos
- GET `/api/products/:id` - Obtener producto
- POST `/api/products` - Crear producto
- PATCH `/api/products/:id` - Actualizar producto
- DELETE `/api/products/:id` - Eliminar producto

#### Facturas
- GET `/api/invoices` - Listar facturas
- GET `/api/invoices/:id` - Obtener factura
- POST `/api/invoices` - Crear factura
- PATCH `/api/invoices/:id` - Actualizar factura
- DELETE `/api/invoices/:id` - Eliminar factura
- GET `/api/invoices/:id/items` - Items de la factura
- POST `/api/invoices/:id/items` - Añadir item a factura

### Validaciones

#### Cliente
```typescript
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  totalSpent?: number;
  totalOrders?: number;
  lastPurchase?: Date;
}
```

#### Proveedor
```typescript
interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  relationshipStatus?: string;
  accountManager?: string;
  notes?: string;
}
```

#### Producto
```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: string;
  supplierId: number;
  createdAt: Date;
}
```

#### Factura
```typescript
interface Invoice {
  id: number;
  invoiceNumber: string;
  date: Date;
  customerId: number;
  items: InvoiceItem[];
  total: number;
  status: string;
  dueDate: Date;
  paymentDate?: Date;
}
```

### Manejo de Errores

#### Errores de Validación
```typescript
{
  success: false,
  message: "Validation error",
  errors: [
    {
      field: string,
      message: string,
      code: string
    }
  ]
}
```

#### Errores HTTP
- 400: Bad Request (errores de validación)
- 401: Unauthorized (no autenticado)
- 403: Forbidden (no autorizado)
- 404: Not Found (recurso no encontrado)
- 500: Internal Server Error (error del servidor)

### Notas de Implementación
1. Todas las respuestas deben seguir el formato estándar
2. Los errores deben ser descriptivos y seguir el formato de error
3. Las validaciones deben realizarse antes de cualquier operación
4. Las respuestas paginadas deben incluir metadata
5. Los timestamps deben estar en formato ISO 8601
6. Los IDs son numéricos y auto-incrementales
7. Las operaciones de actualización (PATCH) permiten actualizaciones parciales
8. Las eliminaciones son lógicas (soft delete) cuando sea posible 