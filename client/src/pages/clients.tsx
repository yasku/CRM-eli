import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Supplier } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { 
  UserPlus, 
  Search, 
  FileDown, 
  Filter, 
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  MoreHorizontal,
  Check,
  X,
  Clock,
  UserCog
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * Componente de página de Proveedores
 * Vista para gestionar relaciones con proveedores
 * Esta página se enfoca en la relación con los proveedores
 * en lugar del historial de transacciones
 */
const Clients: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [, setLocation] = useLocation();
  
  // Obtener datos de proveedores desde la API
  const { data: suppliersResponse, isLoading } = useQuery<{ success: boolean, data: Supplier[] }>({
    queryKey: ['/api/suppliers'],
  });
  const suppliers = suppliersResponse?.data;

  // Navegar a la página de detalle del proveedor
  const handleViewSupplier = (supplierId: number) => {
    setLocation(`/clients/${supplierId}`);
  };

  // Agrupar proveedores por la primera letra del nombre
  const groupedSuppliers: Record<string, Supplier[]> = {};
  
  if (suppliers) {
    suppliers.forEach(supplier => {
      const firstLetter = supplier.name.charAt(0).toUpperCase();
      if (!groupedSuppliers[firstLetter]) {
        groupedSuppliers[firstLetter] = [];
      }
      groupedSuppliers[firstLetter].push(supplier);
    });
  }

  // Ordenar las letras alfabéticamente
  const sortedLetters = Object.keys(groupedSuppliers).sort();

  return (
    <div>
      {/* Encabezado de página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Proveedores</h1>
          <p className="text-gray-400 mt-1">Administra tus relaciones con proveedores</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className={`border-gray-700 ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
            onClick={() => setViewMode('grid')}
          >
            Vista Cuadrícula
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={`border-gray-700 ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
            onClick={() => setViewMode('list')}
          >
            Vista Lista
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 ml-2">
            <UserPlus className="mr-2 h-4 w-4" />
            Añadir Nuevo Proveedor
          </Button>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-7 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar proveedores por nombre, email o empresa..." 
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>
        <div className="md:col-span-3">
          <Select>
            <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-gray-300">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">Todos los Proveedores</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
              <SelectItem value="prospect">Potenciales</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Button variant="outline" className="w-full border-gray-700 text-gray-300">
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Pestañas para categorizar proveedores */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
          >
            Todos los Proveedores
          </TabsTrigger>
          <TabsTrigger 
            value="active" 
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
          >
            Activos
          </TabsTrigger>
          <TabsTrigger 
            value="recent" 
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
          >
            Recientes
          </TabsTrigger>
          <TabsTrigger 
            value="prospects" 
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
          >
            Potenciales
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {suppliers?.map((supplier) => (
                <Card 
                  key={supplier.id} 
                  className="bg-gray-900 border-gray-800 hover:border-purple-800 transition-all cursor-pointer overflow-hidden"
                  onClick={() => handleViewSupplier(supplier.id)}
                >
                  <div className="h-2 bg-purple-600 w-full"></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center mb-4">
                      <Avatar className="h-20 w-20 mb-3">
                        <div className="h-full w-full rounded-full bg-purple-600/20 flex items-center justify-center text-xl text-white font-semibold">
                          {supplier.name.charAt(0)}
                        </div>
                      </Avatar>
                      <h3 className="text-lg font-medium text-white text-center">{supplier.name}</h3>
                      <Badge className="mt-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
                        Proveedor Activo
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center text-sm text-gray-300">
                        <Mail className="h-4 w-4 mr-2 text-purple-400/70" />
                        <span className="truncate">{supplier.email}</span>
                      </div>
                      {supplier.phone && (
                        <div className="flex items-center text-sm text-gray-300">
                          <Phone className="h-4 w-4 mr-2 text-purple-400/70" />
                          <span>{supplier.phone}</span>
                        </div>
                      )}
                      {supplier.address && (
                        <div className="flex items-center text-sm text-gray-300">
                          <MapPin className="h-4 w-4 mr-2 text-purple-400/70" />
                          <span className="truncate">{supplier.address}</span>
                        </div>
                      )}
                      {supplier.contactPerson && (
                        <div className="flex items-center text-sm text-gray-300">
                          <UserCog className="h-4 w-4 mr-2 text-purple-400/70" />
                          <span className="truncate">{supplier.contactPerson}</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-400 pt-2 border-t border-gray-800">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Proveedor desde {formatDate(supplier.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-700 text-gray-300 hover:border-purple-600 hover:text-purple-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewSupplier(supplier.id);
                        }}
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        Ver Perfil
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-400"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {sortedLetters.map(letter => (
                <div key={letter} className="mb-6">
                  <div className="sticky top-0 z-10 bg-gray-950 px-2 py-1 flex items-center mb-2">
                    <div className="flex items-center justify-center bg-purple-600 text-white w-8 h-8 rounded-full text-sm font-medium">
                      {letter}
                    </div>
                    <div className="ml-3 text-gray-400 text-sm">{groupedSuppliers[letter].length} proveedores</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedSuppliers[letter].map(supplier => (
                      <Card 
                        key={supplier.id} 
                        className="bg-gray-900 border-gray-800 hover:border-purple-600 transition-all cursor-pointer"
                        onClick={() => handleViewSupplier(supplier.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <Avatar className="h-12 w-12 mr-4">
                              <div className="h-full w-full rounded-full bg-purple-600/20 flex items-center justify-center text-white font-semibold">
                                {supplier.name.charAt(0)}
                              </div>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-white font-medium">{supplier.name}</h3>
                              <div className="text-gray-400 text-sm flex items-center">
                                <Mail className="h-3 w-3 mr-1 inline" />
                                <span className="truncate">{supplier.email}</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-400"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-700 rounded-lg bg-gray-900">
            <Badge className="mb-4 bg-green-500/20 text-green-300 py-1 px-3">
              <Check className="h-4 w-4 mr-1" />
              Proveedores Activos
            </Badge>
            <h3 className="text-lg font-medium text-white mb-2">Filtrar Proveedores Activos</h3>
            <p className="text-gray-400 text-center max-w-md mb-6">
              En esta pestaña puedes ver y gestionar todos tus proveedores activos con proyectos en curso o compras recientes.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Ver Proveedores Activos
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-4">
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-700 rounded-lg bg-gray-900">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 py-1 px-3">
              <Clock className="h-4 w-4 mr-1" />
              Proveedores Recientes
            </Badge>
            <h3 className="text-lg font-medium text-white mb-2">Proveedores Añadidos Recientemente</h3>
            <p className="text-gray-400 text-center max-w-md mb-6">
              Realiza un seguimiento de tus proveedores añadidos recientemente y sus métricas iniciales.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Ver Proveedores Recientes
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="prospects" className="mt-4">
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-700 rounded-lg bg-gray-900">
            <Badge className="mb-4 bg-amber-500/20 text-amber-300 py-1 px-3">
              <X className="h-4 w-4 mr-1" />
              Potenciales
            </Badge>
            <h3 className="text-lg font-medium text-white mb-2">Proveedores Potenciales</h3>
            <p className="text-gray-400 text-center max-w-md mb-6">
              Gestiona tu flujo de contactos con posibles proveedores con los que aún no has realizado compras.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Ver Potenciales
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Clients;