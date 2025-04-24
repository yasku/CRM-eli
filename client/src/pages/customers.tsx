import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Customer } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { 
  UserPlus, 
  Search, 
  FileDown, 
  Filter, 
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  ExternalLink,
  Eye
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils';

/**
 * Componente de página de Clientes
 * Muestra y administra los clientes en el sistema
 */
const Customers: React.FC = () => {
  const [, setLocation] = useLocation();
  
  // Obtener datos de clientes
  const { data: customersResponse, isLoading } = useQuery<{ success: boolean, data: Customer[] }>({
    queryKey: ['/api/customers'],
  });
  const customers = customersResponse?.data;

  const handleViewCustomer = (customerId: number) => {
    setLocation(`/customers/${customerId}`);
  };

  return (
    <div>
      {/* Encabezado de página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Clientes</h1>
          <p className="text-gray-400 mt-1">Administra tu base de datos de clientes</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Añadir Nuevo Cliente
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-7 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar clientes por nombre, email o teléfono..." 
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>
        <div className="md:col-span-3">
          <Button variant="outline" className="w-full border-gray-700 text-gray-300">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
        </div>
        <div className="md:col-span-2">
          <Button variant="outline" className="w-full border-gray-700 text-gray-300">
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Tabla de clientes */}
      <Card className="bg-gray-950 border border-gray-900 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white flex items-center">
            <UserPlus className="h-5 w-5 mr-2 text-purple-400" />
            Base de Datos de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-gray-800/50">
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-400">Cliente</TableHead>
                  <TableHead className="text-gray-400">Contacto</TableHead>
                  <TableHead className="text-gray-400">Dirección</TableHead>
                  <TableHead className="text-gray-400">Creado</TableHead>
                  <TableHead className="text-right text-gray-400">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(customers) && customers.map((customer) => (
                  <TableRow 
                    key={customer.id} 
                    className="border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                    onClick={() => handleViewCustomer(customer.id)}
                  >
                    <TableCell className="font-medium text-gray-300">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          {customer.avatarUrl ? (
                            <img 
                              src={customer.avatarUrl} 
                              alt={customer.name} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                              {customer.name.charAt(0)}
                            </div>
                          )}
                        </Avatar>
                        <span>{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3.5 w-3.5 mr-1.5 text-purple-500/70" />
                          <span>{customer.email}</span>
                        </div>
                        {customer.phone && (
                          <div className="flex items-center text-sm">
                            <Phone className="h-3.5 w-3.5 mr-1.5 text-purple-500/70" />
                            <span>{customer.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {customer.address || 'No se proporcionó dirección'}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(customer.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-purple-400 hover:text-purple-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewCustomer(customer.id);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-gray-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-gray-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
