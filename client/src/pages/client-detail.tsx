import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { Supplier, Invoice, Product } from '@shared/schema';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  BarChart3, 
  PencilLine,
  FileCheck,
  MessageSquare,
  Clock,
  UserCog,
  Briefcase,
  Box,
  Receipt,
  ShoppingCart,
  Truck,
  DollarSign,
  Building,
  Package
} from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import { useLocation } from 'wouter';

/**
 * Client Detail page component
 * Displays comprehensive information about a single client
 * This view focuses on relationship management rather than transaction history
 */
const ClientDetail: React.FC = () => {
  const [location, setLocation] = useLocation();
  const params = useParams();
  const supplierId = params.id ? parseInt(params.id) : 0;
  
  // Fetch supplier data
  const { data: supplierResponse, isLoading: isLoadingSupplier } = useQuery<{ success: boolean, data: Supplier }>({
    queryKey: ['/api/suppliers', supplierId],
    enabled: !!supplierId,
  });
  const supplier = supplierResponse?.data;

  // Datos de actividad del proveedor
  const supplierActivities = [
    { 
      id: 1,
      type: 'reunión',
      title: 'Consulta inicial',
      date: new Date(2023, 9, 15),
      description: 'Discusión sobre oportunidades potenciales y necesidades de productos'
    },
    { 
      id: 2,
      type: 'llamada',
      title: 'Llamada de seguimiento',
      date: new Date(2023, 9, 22),
      description: 'Llamada para discutir detalles de catálogo y cronograma'
    },
    { 
      id: 3,
      type: 'email',
      title: 'Recepción de catálogo',
      date: new Date(2023, 10, 5),
      description: 'Recibido catálogo completo con precios y condiciones'
    },
    { 
      id: 4,
      type: 'reunión',
      title: 'Firma de contrato',
      date: new Date(2023, 10, 18),
      description: 'Reunión para revisar y firmar acuerdo de suministro'
    }
  ];

  // Estado de la relación con el proveedor
  const relationshipStatus = "Activo";
  const accountManager = "Juan Pérez";
  const nextContactDate = new Date(2023, 11, 10);
  const lastContactDate = new Date(2023, 10, 28);
  const lifetimeValue = 15250;
  const supplierSince = supplier?.createdAt ? new Date(supplier.createdAt) : new Date();
  const projectCount = 3;
  const supplierNotes = "Prefiere comunicación por email. Entrega regular programada los martes.";

  // Contratos de suministro
  const supplierProjects = [
    {
      id: 1,
      name: "Suministro de Componentes Electrónicos",
      status: "Completado",
      startDate: new Date(2023, 6, 15),
      endDate: new Date(2023, 8, 30),
      value: 4500,
      description: "Suministro trimestral de componentes electrónicos para ensamblaje"
    },
    {
      id: 2,
      name: "Provisión de Accesorios",
      status: "En Progreso",
      startDate: new Date(2023, 9, 10),
      endDate: new Date(2023, 11, 15),
      value: 2750,
      description: "Entrega mensual de accesorios para dispositivos móviles"
    },
    {
      id: 3,
      name: "Equipos de Audio",
      status: "Planificado",
      startDate: new Date(2023, 11, 1),
      endDate: new Date(2024, 2, 28),
      value: 8000,
      description: "Acuerdo de suministro de equipos de audio premium"
    }
  ];

  // Manejar la navegación de regreso a la lista de proveedores
  const handleBack = () => {
    setLocation('/clients');
  };

  if (isLoadingSupplier) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-200 mb-2">Proveedor No Encontrado</h2>
        <p className="text-gray-400 mb-6">No pudimos encontrar el proveedor que estás buscando.</p>
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Proveedores
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Back button */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Proveedores
        </Button>
      </div>

      {/* Supplier Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-purple-600">
              <div className="h-full w-full rounded-full bg-gray-700 flex items-center justify-center text-xl text-gray-300 font-medium">
                {supplier?.name ? supplier.name.charAt(0) : ''}
              </div>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold text-white">{supplier?.name}</h1>
              <div className="flex items-center mt-2">
                <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 mr-2">
                  {relationshipStatus}
                </Badge>
                <span className="text-gray-400 text-sm">
                  Proveedor desde {formatDate(supplierSince)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contactar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <PencilLine className="mr-2 h-4 w-4" />
              Editar Proveedor
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Supplier Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Supplier Details Card */}
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardHeader className="pb-2 border-b border-gray-800">
              <CardTitle className="text-white text-lg">Información del Proveedor</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="text-purple-400 h-4 w-4 mr-3" />
                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <p className="text-gray-200">{supplier?.email}</p>
                  </div>
                </div>
                {supplier?.phone && (
                  <div className="flex items-center">
                    <Phone className="text-purple-400 h-4 w-4 mr-3" />
                    <div>
                      <p className="text-gray-400 text-xs">Teléfono</p>
                      <p className="text-gray-200">{supplier.phone}</p>
                    </div>
                  </div>
                )}
                {supplier?.address && (
                  <div className="flex items-center">
                    <MapPin className="text-purple-400 h-4 w-4 mr-3" />
                    <div>
                      <p className="text-gray-400 text-xs">Dirección</p>
                      <p className="text-gray-200">{supplier.address}</p>
                    </div>
                  </div>
                )}
                {supplier?.contactPerson && (
                  <div className="flex items-center">
                    <UserCog className="text-purple-400 h-4 w-4 mr-3" />
                    <div>
                      <p className="text-gray-400 text-xs">Persona de Contacto</p>
                      <p className="text-gray-200">{supplier.contactPerson}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Supplier Stats Card */}
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardHeader className="pb-2 border-b border-gray-800">
              <CardTitle className="text-white text-lg">Estadísticas del Proveedor</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Último Pedido</p>
                  <p className="text-gray-200">{formatDate(lastContactDate)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Próxima Entrega</p>
                  <p className="text-gray-200">{formatDate(nextContactDate)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Total Gastado</p>
                  <p className="text-gray-200 font-medium">{formatCurrency(lifetimeValue)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Pedidos Activos</p>
                  <p className="text-gray-200">{projectCount} pedidos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Notes Card */}
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardHeader className="pb-2 border-b border-gray-800">
              <CardTitle className="text-white text-lg">Notas</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-300 text-sm">{supplierNotes}</p>
              <Button variant="ghost" size="sm" className="mt-3 text-purple-400 hover:text-purple-300 p-0">
                + Añadir Nota
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Tabs for different data views */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="bg-gray-800 border-gray-700 mb-6">
              <TabsTrigger 
                value="activity" 
                className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
              >
                Actividad
              </TabsTrigger>
              <TabsTrigger 
                value="products" 
                className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
              >
                Productos
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
              >
                Pedidos
              </TabsTrigger>
              <TabsTrigger 
                value="invoices" 
                className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
              >
                Facturas
              </TabsTrigger>
              <TabsTrigger 
                value="communication" 
                className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
              >
                Comunicación
              </TabsTrigger>
            </TabsList>

            {/* Activity Timeline Tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card className="bg-gray-900 border-gray-800 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">Actividad Reciente</CardTitle>
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                      + Registrar Actividad
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 relative mt-4">
                    {/* Vertical timeline line */}
                    <div className="absolute left-2.5 top-2 h-full w-0.5 bg-gray-800"></div>

                    {supplierActivities.map((activity, index) => (
                      <div key={activity.id} className="flex gap-4 relative">
                        <div className="rounded-full h-5 w-5 bg-purple-900 border-2 border-purple-500 z-10 mt-1 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-white">{activity.title}</h4>
                            <span className="text-gray-400 text-xs">{formatDate(activity.date)}</span>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{activity.description}</p>
                          <Badge 
                            variant="outline" 
                            className="text-xs border-gray-700 text-gray-400"
                          >
                            {activity.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-4">
              <Card className="bg-gray-900 border-gray-800 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">Productos del Proveedor</CardTitle>
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                      + Añadir Producto
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-4">
                    {/* Productos del proveedor */}
                    {[
                      {
                        id: 1,
                        name: "Laptop Premium",
                        sku: "TECH-LP-001",
                        price: 899.99, 
                        stock: 24,
                        category: "Electrónicos",
                        description: "Laptop de alto rendimiento con 16GB RAM y 512GB SSD",
                        imageUrl: null
                      },
                      {
                        id: 2,
                        name: "Auriculares Inalámbricos",
                        sku: "TECH-AUD-002",
                        price: 79.99,
                        stock: 56,
                        category: "Audio",
                        description: "Auriculares con cancelación de ruido y estuche de carga",
                        imageUrl: null
                      },
                      {
                        id: 3,
                        name: "Reloj Inteligente",
                        sku: "TECH-WR-003",
                        price: 129.99,
                        stock: 18,
                        category: "Vestibles",
                        description: "Reloj inteligente con monitor de ritmo cardíaco y seguimiento fitness",
                        imageUrl: null
                      }
                    ].map((product) => (
                      <Card key={product.id} className="bg-gray-950 border-gray-800">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-white">{product.name}</h3>
                                <Badge className="bg-purple-500/20 text-purple-300">
                                  {product.category}
                                </Badge>
                              </div>
                              <p className="text-gray-400 text-sm">{product.description}</p>
                              <div className="flex gap-4 text-sm">
                                <div className="flex items-center">
                                  <Box className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                  <span className="text-gray-400">
                                    SKU: {product.sku}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                  <span className="text-gray-400">{formatCurrency(product.price)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Package className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                  <span className="text-gray-400">{product.stock} en inventario</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-gray-400">
                                <ShoppingCart className="h-4 w-4" />
                                <span className="sr-only">Order</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Details</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <Card className="bg-gray-900 border-gray-800 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">Órdenes de Compra</CardTitle>
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                      + Nueva Orden
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-4">
                    {/* Órdenes de compra */}
                    {[
                      {
                        id: 1,
                        poNumber: "PO-2023-0084",
                        date: new Date(2023, 9, 12),
                        amount: 2149.97,
                        status: "Entregado",
                        items: 5,
                        expectedDelivery: new Date(2023, 9, 20),
                        actualDelivery: new Date(2023, 9, 19)
                      },
                      {
                        id: 2,
                        poNumber: "PO-2023-0102",
                        date: new Date(2023, 10, 8),
                        amount: 879.98,
                        status: "En Tránsito",
                        items: 2,
                        expectedDelivery: new Date(2023, 10, 18),
                        actualDelivery: null
                      },
                      {
                        id: 3,
                        poNumber: "PO-2023-0115",
                        date: new Date(2023, 10, 28),
                        amount: 4299.95,
                        status: "Procesando",
                        items: 7,
                        expectedDelivery: new Date(2023, 11, 12),
                        actualDelivery: null
                      }
                    ].map((order) => (
                      <Card key={order.id} className="bg-gray-950 border-gray-800">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-white">{order.poNumber}</h3>
                                <Badge 
                                  className={
                                    order.status === "Entregado" 
                                      ? "bg-green-500/20 text-green-300" 
                                      : order.status === "En Tránsito" 
                                        ? "bg-blue-500/20 text-blue-300" 
                                        : "bg-amber-500/20 text-amber-300"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="flex gap-4 text-sm">
                                <div className="flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                  <span className="text-gray-400">
                                    Pedido: {formatDate(order.date)}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                  <span className="text-gray-400">{formatCurrency(order.amount)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Box className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                  <span className="text-gray-400">{order.items} artículos</span>
                                </div>
                              </div>
                              <div className="flex gap-4 text-sm">
                                <div className="flex items-center">
                                  <Truck className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                  <span className="text-gray-400">
                                    Entrega esperada: {formatDate(order.expectedDelivery)}
                                    {order.actualDelivery && ` • Entregado: ${formatDate(order.actualDelivery)}`}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-gray-400">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Details</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400">
                                <Receipt className="h-4 w-4" />
                                <span className="sr-only">Invoice</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="space-y-4">
              <Card className="bg-gray-900 border-gray-800 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">Facturas del Proveedor</CardTitle>
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                      + Registrar Factura
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-4">
                    {/* Facturas del proveedor */}
                    {[
                      {
                        id: 1,
                        invoiceNumber: "INV-2023-0091",
                        poNumber: "PO-2023-0084",
                        date: new Date(2023, 9, 19),
                        dueDate: new Date(2023, 10, 19),
                        amount: 2149.97,
                        status: "Pagado",
                        paymentDate: new Date(2023, 10, 2)
                      },
                      {
                        id: 2,
                        invoiceNumber: "INV-2023-0108",
                        poNumber: "PO-2023-0102",
                        date: new Date(2023, 10, 15),
                        dueDate: new Date(2023, 11, 15),
                        amount: 879.98,
                        status: "Pendiente de pago",
                        paymentDate: null
                      },
                      {
                        id: 3,
                        invoiceNumber: null,
                        poNumber: "PO-2023-0115",
                        date: null,
                        dueDate: null,
                        amount: 4299.95,
                        status: "En procesamiento",
                        paymentDate: null
                      }
                    ].map((invoice) => (
                      <Card key={invoice.id} className="bg-gray-950 border-gray-800">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-white">
                                  {invoice.invoiceNumber || "Factura Pendiente"}
                                </h3>
                                <Badge 
                                  className={
                                    invoice.status === "Pagado" 
                                      ? "bg-green-500/20 text-green-300" 
                                      : invoice.status === "Pendiente de pago" 
                                        ? "bg-red-500/20 text-red-300" 
                                        : "bg-amber-500/20 text-amber-300"
                                  }
                                >
                                  {invoice.status}
                                </Badge>
                              </div>
                              <p className="text-gray-400 text-sm">PO: {invoice.poNumber}</p>
                              <div className="flex gap-4 text-sm">
                                {invoice.date && (
                                  <div className="flex items-center">
                                    <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                    <span className="text-gray-400">
                                      Fecha de factura: {formatDate(invoice.date)}
                                    </span>
                                  </div>
                                )}
                                {invoice.dueDate && (
                                  <div className="flex items-center">
                                    <Clock className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                    <span className="text-gray-400">
                                      Vencimiento: {formatDate(invoice.dueDate)}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-4 text-sm">
                                <div className="flex items-center">
                                  <DollarSign className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                  <span className="text-gray-400">{formatCurrency(invoice.amount)}</span>
                                </div>
                                {invoice.paymentDate && (
                                  <div className="flex items-center">
                                    <FileCheck className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                    <span className="text-gray-400">
                                      Pagado el: {formatDate(invoice.paymentDate)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-gray-400">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Detalles</span>
                              </Button>
                              {invoice.status === "Pendiente de pago" && (
                                <Button variant="ghost" size="sm" className="text-gray-400">
                                  <FileCheck className="h-4 w-4" />
                                  <span className="sr-only">Marcar como Pagado</span>
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Communication Tab */}
            <TabsContent value="communication" className="space-y-4">
              <Card className="bg-gray-900 border-gray-800 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">Registro de Comunicación</CardTitle>
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                      + Añadir Comunicación
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center p-8 border border-dashed border-gray-800 rounded-lg mt-4">
                    <div className="text-center">
                      <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-600" />
                      <h3 className="text-lg font-medium text-gray-300 mb-2">No hay comunicaciones todavía</h3>
                      <p className="text-gray-500 max-w-sm mb-4">Comienza a registrar las comunicaciones con tu proveedor para mejorar la gestión de relaciones</p>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Registrar Primera Comunicación
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;