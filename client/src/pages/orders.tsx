import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  Truck, 
  Package, 
  FileText, 
  Edit, 
  Trash, 
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  ShoppingCart
} from 'lucide-react';
import { formatDate, formatCurrency, getStatusConfig } from '@/lib/utils';

/**
 * Opciones de estado de pedido para la aplicación
 */
const ORDER_STATUSES = [
  { id: 'all', name: 'Todos' },
  { id: 'pending', name: 'Pendiente', color: 'amber' },
  { id: 'processing', name: 'Procesando', color: 'blue' },
  { id: 'shipped', name: 'Enviado', color: 'indigo' },
  { id: 'delivered', name: 'Entregado', color: 'green' },
  { id: 'cancelled', name: 'Cancelado', color: 'red' },
  { id: 'returned', name: 'Devuelto', color: 'pink' },
];

/**
 * Datos de ejemplo de pedidos
 * En una aplicación real, esto vendría de una API
 */
const SAMPLE_ORDERS = [
  {
    id: 1,
    orderNumber: 'PED-2023-0001',
    date: new Date(2023, 9, 5),
    customerId: 1,
    customerName: 'Amy Thompson',
    items: [
      { productId: 1, productName: 'Smartphone X Pro', quantity: 2, price: 899.99 },
      { productId: 3, productName: 'Auriculares Inalámbricos', quantity: 1, price: 199.99 }
    ],
    total: 1999.97,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: 'Calle Principal 123, Boston, MA 02108',
    trackingNumber: 'TRK928374651',
    deliveryDate: new Date(2023, 9, 10),
    notes: 'Cliente solicitó empaque discreto'
  },
  {
    id: 2,
    orderNumber: 'PED-2023-0002',
    date: new Date(2023, 9, 12),
    customerId: 2,
    customerName: 'Mark Wilson',
    items: [
      { productId: 2, productName: 'Laptop Pro 15"', quantity: 1, price: 1299.99 },
      { productId: 5, productName: 'Ratón Inalámbrico', quantity: 1, price: 49.99 },
      { productId: 6, productName: 'Soporte para Laptop', quantity: 1, price: 79.99 }
    ],
    total: 1429.97,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: 'Avenida Roble 456, Chicago, IL 60007',
    trackingNumber: 'TRK837465918',
    deliveryDate: null,
    notes: ''
  },
  {
    id: 3,
    orderNumber: 'PED-2023-0003',
    date: new Date(2023, 9, 18),
    customerId: 3,
    customerName: 'Sarah Johnson',
    items: [
      { productId: 4, productName: 'Reloj Inteligente', quantity: 1, price: 249.99 }
    ],
    total: 249.99,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: 'Calle Pino 789, Seattle, WA 98101',
    trackingNumber: null,
    deliveryDate: null,
    notes: 'Solicitó envoltura para regalo'
  },
  {
    id: 4,
    orderNumber: 'PED-2023-0004',
    date: new Date(2023, 9, 20),
    customerId: 4,
    customerName: 'Robert Brown',
    items: [
      { productId: 7, productName: 'Altavoz Bluetooth', quantity: 1, price: 129.99 },
      { productId: 8, productName: 'Carcasa para Teléfono', quantity: 2, price: 24.99 }
    ],
    total: 179.97,
    status: 'pending',
    paymentStatus: 'pending',
    shippingAddress: 'Avenida Arce 321, Austin, TX 78701',
    trackingNumber: null,
    deliveryDate: null,
    notes: ''
  },
  {
    id: 5,
    orderNumber: 'PED-2023-0005',
    date: new Date(2023, 9, 22),
    customerId: 5,
    customerName: 'Emily Davis',
    items: [
      { productId: 9, productName: 'Teclado Inalámbrico', quantity: 1, price: 89.99 },
      { productId: 5, productName: 'Ratón Inalámbrico', quantity: 1, price: 49.99 },
      { productId: 10, productName: 'Monitor 27"', quantity: 1, price: 299.99 }
    ],
    total: 439.97,
    status: 'cancelled',
    paymentStatus: 'refunded',
    shippingAddress: 'Calle Cedro 555, San Francisco, CA 94101',
    trackingNumber: null,
    deliveryDate: null,
    notes: 'Cliente canceló debido al retraso'
  },
  {
    id: 6,
    orderNumber: 'PED-2023-0006',
    date: new Date(2023, 9, 25),
    customerId: 6,
    customerName: 'Michael Green',
    items: [
      { productId: 2, productName: 'Laptop Pro 15"', quantity: 1, price: 1299.99 },
      { productId: 11, productName: 'Bolsa para Laptop', quantity: 1, price: 59.99 },
      { productId: 12, productName: 'Hub USB-C', quantity: 1, price: 39.99 }
    ],
    total: 1399.97,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: 'Calle Olmo 777, Denver, CO 80201',
    trackingNumber: 'TRK738294651',
    deliveryDate: new Date(2023, 9, 30),
    notes: ''
  },
  {
    id: 7,
    orderNumber: 'PED-2023-0007',
    date: new Date(2023, 10, 2),
    customerId: 7,
    customerName: 'Jennifer White',
    items: [
      { productId: 13, productName: 'Tablet 10"', quantity: 1, price: 349.99 },
      { productId: 14, productName: 'Funda para Tablet', quantity: 1, price: 29.99 },
      { productId: 15, productName: 'Protector de Pantalla', quantity: 1, price: 19.99 }
    ],
    total: 399.97,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: 'Calle Abedul 999, Miami, FL 33101',
    trackingNumber: 'TRK928374652',
    deliveryDate: null,
    notes: ''
  },
  {
    id: 8,
    orderNumber: 'PED-2023-0008',
    date: new Date(2023, 10, 5),
    customerId: 8,
    customerName: 'David Miller',
    items: [
      { productId: 16, productName: 'Auriculares para Gaming', quantity: 1, price: 129.99 },
      { productId: 17, productName: 'Ratón para Gaming', quantity: 1, price: 79.99 },
      { productId: 18, productName: 'Teclado para Gaming', quantity: 1, price: 119.99 }
    ],
    total: 329.97,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: 'Calle Nogal 111, Las Vegas, NV 89101',
    trackingNumber: null,
    deliveryDate: null,
    notes: ''
  },
  {
    id: 9,
    orderNumber: 'PED-2023-0009',
    date: new Date(2023, 10, 8),
    customerId: 9,
    customerName: 'Susan Harris',
    items: [
      { productId: 1, productName: 'Smartphone X Pro', quantity: 1, price: 899.99 }
    ],
    total: 899.99,
    status: 'pending',
    paymentStatus: 'pending',
    shippingAddress: 'Calle Abeto 222, Atlanta, GA 30301',
    trackingNumber: null,
    deliveryDate: null,
    notes: 'Cliente solicitó entrega nocturna'
  },
  {
    id: 10,
    orderNumber: 'PED-2023-0010',
    date: new Date(2023, 10, 10),
    customerId: 10,
    customerName: 'Thomas Jackson',
    items: [
      { productId: 19, productName: 'SSD Externo 1TB', quantity: 1, price: 149.99 },
      { productId: 20, productName: 'Memoria USB 128GB', quantity: 2, price: 29.99 }
    ],
    total: 209.97,
    status: 'returned',
    paymentStatus: 'refunded',
    shippingAddress: 'Calle Álamo 333, Portland, OR 97201',
    trackingNumber: 'TRK192837465',
    deliveryDate: new Date(2023, 10, 15),
    notes: 'Producto devuelto por defecto'
  }
];

/**
 * Componente de página de pedidos
 * Muestra una lista de pedidos con capacidades de filtrado y búsqueda
 */
const OrdersPage: React.FC = () => {
  // Estado para filtros y pedido activo
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeOrder, setActiveOrder] = useState<any | null>(null);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showViewDialog, setShowViewDialog] = useState<boolean>(false);
  const [editedStatus, setEditedStatus] = useState<string>('');

  // En una aplicación real, obtendríamos los pedidos de la API
  // const { data: orders = [], isLoading } = useQuery({ 
  //   queryKey: ['/api/orders'], 
  // });

  // Usando datos de ejemplo por ahora
  const orders = SAMPLE_ORDERS;
  const isLoading = false;
  
  // Filtrar pedidos basados en estado y consulta de búsqueda
  const filteredOrders = orders.filter(order => {
    // Aplicar filtro de estado
    const statusMatch = statusFilter === 'all' || order.status === statusFilter;
    
    // Aplicar filtro de búsqueda
    const searchLower = searchQuery.toLowerCase();
    const searchMatch = !searchQuery || 
      order.orderNumber.toLowerCase().includes(searchLower) ||
      order.customerName.toLowerCase().includes(searchLower);
    
    return statusMatch && searchMatch;
  });

  // Manejar cambio de estado
  const handleStatusChange = (newStatus: string) => {
    if (activeOrder) {
      setEditedStatus(newStatus);
    }
  };

  // Guardar cambio de estado
  const saveStatusChange = () => {
    // En una aplicación real, haríamos una llamada a la API para actualizar el pedido
    // Por ahora, solo cerramos el diálogo
    setShowEditDialog(false);
  };
  
  // Manejar la visualización de detalles del pedido
  const handleViewOrder = (order: any) => {
    setActiveOrder(order);
    setShowViewDialog(true);
  };
  
  // Manejar la edición del pedido
  const handleEditOrder = (order: any) => {
    setActiveOrder(order);
    setEditedStatus(order.status);
    setShowEditDialog(true);
  };

  // Generar insignia para el estado del pedido
  const getStatusBadge = (status: string) => {
    const statusObj = ORDER_STATUSES.find(s => s.id === status);
    if (!statusObj) return null;
    
    return (
      <Badge className={`bg-${statusObj.color}-500/20 text-${statusObj.color}-300 hover:bg-${statusObj.color}-500/30`}>
        {statusObj.name}
      </Badge>
    );
  };

  // Generar icono de estado
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-400" />;
      case 'processing':
        return <ShoppingCart className="h-4 w-4 text-blue-400" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-indigo-400" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'returned':
        return <Package className="h-4 w-4 text-pink-400" />;
      default:
        return <Package className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Pedidos</h1>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Input
              type="text"
              placeholder="Buscar pedidos..."
              className="bg-gray-900 text-white border-gray-700 pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 bg-gray-900 text-white border-gray-700">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white border-gray-700">
              <SelectGroup>
                <SelectLabel>Filtrar por Estado</SelectLabel>
                {ORDER_STATUSES.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    <div className="flex items-center gap-2">
                      {status.id !== 'all' && getStatusIcon(status.id)}
                      {status.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" /> Nuevo Pedido
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-800 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-900">
                  <TableHead className="w-[100px] text-gray-400">Pedido #</TableHead>
                  <TableHead className="text-gray-400">Fecha</TableHead>
                  <TableHead className="text-gray-400">Cliente</TableHead>
                  <TableHead className="text-gray-400">Artículos</TableHead>
                  <TableHead className="text-gray-400">Total</TableHead>
                  <TableHead className="text-gray-400">Estado</TableHead>
                  <TableHead className="text-right text-gray-400">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                      </div>
                      <div className="mt-2">Cargando pedidos...</div>
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                      <Package className="h-10 w-10 mx-auto mb-2 text-gray-600" />
                      <p>No se encontraron pedidos</p>
                      <p className="text-sm text-gray-500 mt-1">Intenta ajustar tu búsqueda o filtros</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-gray-800 hover:bg-gray-850">
                      <TableCell className="font-medium text-white">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatDate(order.date)}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {order.customerName}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {order.items.length} {order.items.length === 1 ? 'artículo' : 'artículos'}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span className={`text-${ORDER_STATUSES.find(s => s.id === order.status)?.color}-300`}>
                            {ORDER_STATUSES.find(s => s.id === order.status)?.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-gray-800 text-white border-gray-700">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem 
                              className="hover:bg-gray-700 cursor-pointer"
                              onClick={() => handleViewOrder(order)}
                            >
                              <Eye className="h-4 w-4 mr-2" /> Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="hover:bg-gray-700 cursor-pointer"
                              onClick={() => handleEditOrder(order)}
                            >
                              <Edit className="h-4 w-4 mr-2" /> Actualizar estado
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="hover:bg-gray-700 cursor-pointer text-red-300 hover:text-red-200"
                            >
                              <Trash className="h-4 w-4 mr-2" /> Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de Detalles del Pedido */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-[700px] bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl text-white flex items-center gap-3">
              {activeOrder && (
                <>
                  <span>Pedido {activeOrder.orderNumber}</span>
                  {getStatusBadge(activeOrder.status)}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Detalles del pedido y su estado actual
            </DialogDescription>
            {activeOrder && (
              <div className="flex gap-4 mt-2 text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{formatDate(activeOrder.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className={activeOrder.paymentStatus === 'paid' ? 'text-green-400' : 'text-amber-400'}>
                    {activeOrder.paymentStatus === 'paid' ? 'Pagado' : 
                     activeOrder.paymentStatus === 'pending' ? 'Pendiente' : 
                     activeOrder.paymentStatus === 'refunded' ? 'Reembolsado' : 
                     activeOrder.paymentStatus}
                  </span>
                </div>
              </div>
            )}
          </DialogHeader>

          {activeOrder && (
            <div className="space-y-6 mt-2">
              {/* Información del Cliente y Envío */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-white">Cliente</h3>
                  <p className="text-gray-300">{activeOrder.customerName}</p>
                  <p className="text-gray-400">ID: {activeOrder.customerId}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-white">Dirección de Envío</h3>
                  <p className="text-gray-300">{activeOrder.shippingAddress}</p>
                  {activeOrder.trackingNumber && (
                    <p className="text-gray-400">
                      Seguimiento: <span className="text-blue-400">{activeOrder.trackingNumber}</span>
                    </p>
                  )}
                  {activeOrder.deliveryDate && (
                    <p className="text-gray-400">
                      Entregado: <span className="text-green-400">{formatDate(activeOrder.deliveryDate)}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Artículos del Pedido */}
              <div>
                <h3 className="font-medium text-white mb-3">Artículos del Pedido</h3>
                <div className="bg-gray-800 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-gray-800">
                        <TableHead className="text-gray-400">Producto</TableHead>
                        <TableHead className="text-gray-400 text-right">Cantidad</TableHead>
                        <TableHead className="text-gray-400 text-right">Precio</TableHead>
                        <TableHead className="text-gray-400 text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeOrder.items.map((item: any, index: number) => (
                        <TableRow key={index} className="border-gray-700 hover:bg-gray-800">
                          <TableCell className="text-white">{item.productName}</TableCell>
                          <TableCell className="text-gray-300 text-right">{item.quantity}</TableCell>
                          <TableCell className="text-gray-300 text-right">{formatCurrency(item.price)}</TableCell>
                          <TableCell className="text-gray-300 text-right">{formatCurrency(item.price * item.quantity)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="border-t border-gray-700 bg-gray-850">
                        <TableCell colSpan={3} className="text-right font-medium text-white">Total</TableCell>
                        <TableCell className="text-right font-medium text-white">{formatCurrency(activeOrder.total)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Notas */}
              {activeOrder.notes && (
                <div className="space-y-2">
                  <h3 className="font-medium text-white">Notas</h3>
                  <p className="text-gray-300 bg-gray-800 p-3 rounded-md">{activeOrder.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de Edición de Estado del Pedido */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Actualizar Estado del Pedido</DialogTitle>
            <DialogDescription className="text-gray-400">
              Cambiar el estado del pedido {activeOrder?.orderNumber}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={editedStatus} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full bg-gray-800 text-white border-gray-700">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-700">
                  <SelectGroup>
                    {ORDER_STATUSES.filter(s => s.id !== 'all').map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(status.id)}
                          {status.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => setShowEditDialog(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={saveStatusChange}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;