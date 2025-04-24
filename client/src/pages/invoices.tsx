import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Invoice } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FilePlus, 
  Search, 
  Filter, 
  FileDown, 
  MoreVertical,
  Eye,
  Download,
  FileText
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatDate, getStatusConfig } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

/**
 * Componente de página de Facturas
 * Muestra y administra las facturas en el sistema
 */
const Invoices: React.FC = () => {
  // Obtener datos de facturas
  const { data: invoicesResponse, isLoading } = useQuery<{ success: boolean, data: Invoice[] }>({
    queryKey: ['/api/invoices'],
  });
  const invoices = invoicesResponse?.data;

  return (
    <div>
      {/* Encabezado de página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Facturas</h1>
          <p className="text-gray-400 mt-1">Administra tus facturas de venta</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <FilePlus className="mr-2 h-4 w-4" />
          Crear Factura
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar facturas..." 
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
        <div className="md:col-span-2">
          <select 
            className="w-full h-10 rounded-md bg-gray-800 border-gray-700 text-gray-300 px-3 appearance-none focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="all">Todas las Facturas</option>
            <option value="paid">Pagado</option>
            <option value="pending">Pendiente</option>
            <option value="failed">Fallido</option>
            <option value="processing">Procesando</option>
            <option value="cancelled">Cancelado</option>
            <option value="refunded">Reembolsado</option>
          </select>
        </div>
      </div>

      {/* Tabla de facturas */}
      <Card className="bg-gray-950 border border-gray-900 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-400" />
              Lista de Facturas
            </div>
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
                  <TableHead className="text-gray-400">Factura #</TableHead>
                  <TableHead className="text-gray-400">Fecha</TableHead>
                  <TableHead className="text-gray-400">Cliente</TableHead>
                  <TableHead className="text-gray-400">Importe</TableHead>
                  <TableHead className="text-gray-400">Estado</TableHead>
                  <TableHead className="text-right text-gray-400">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(invoices) && invoices.map((invoice) => {
                  const { text: statusText, bgColor, textColor } = getStatusConfig(invoice.status);
                  
                  return (
                    <TableRow key={invoice.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell className="font-medium text-purple-400">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatDate(invoice.date)}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        Cliente {invoice.customerId}
                      </TableCell>
                      <TableCell className="text-gray-300 font-medium">
                        {formatCurrency(invoice.total)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${bgColor} ${textColor} border-0`}>
                          {statusText}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300" title="Ver">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300" title="Descargar">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300" title="Más">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;
