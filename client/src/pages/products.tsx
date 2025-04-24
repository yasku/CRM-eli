import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { 
  Package2, 
  SquarePlus, 
  Search, 
  FileDown, 
  FileUp, 
  Filter,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

/**
 * Componente de página de Productos
 * Muestra y administra los productos en el sistema
 */
const Products: React.FC = () => {
  // Obtener datos de productos
  const { data: productsResponse, isLoading } = useQuery<{ success: boolean, data: Product[] }>({
    queryKey: ['/api/products'],
  });
  const products = productsResponse?.data;

  // Función para determinar el estado del inventario
  const getStockStatus = (stock: number) => {
    if (stock <= 0) return { text: 'Sin Existencias', color: 'bg-pink-500/20 text-pink-400' };
    if (stock < 10) return { text: 'Stock Bajo', color: 'bg-amber-500/20 text-amber-400' };
    return { text: 'En Stock', color: 'bg-emerald-500/20 text-emerald-400' };
  };

  return (
    <div>
      {/* Encabezado de página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Productos</h1>
          <p className="text-gray-400 mt-1">Administra tu inventario de productos</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <SquarePlus className="mr-2 h-4 w-4" />
          Añadir Nuevo Producto
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar productos..." 
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
          <Button variant="outline" className="w-full border-gray-700 text-gray-300">
            <FileUp className="mr-2 h-4 w-4" />
            Importar
          </Button>
        </div>
      </div>

      {/* Tabla de productos */}
      <Card className="bg-gray-950 border border-gray-900 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">Inventario de Productos</CardTitle>
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
                  <TableHead className="text-gray-400">Producto</TableHead>
                  <TableHead className="text-gray-400">Precio</TableHead>
                  <TableHead className="text-gray-400">Categoría</TableHead>
                  <TableHead className="text-gray-400">Inventario</TableHead>
                  <TableHead className="text-gray-400">Estado</TableHead>
                  <TableHead className="text-right text-gray-400">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(products) && products.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <TableRow key={product.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell className="font-medium text-gray-300">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded bg-gray-800 flex items-center justify-center text-gray-400 mr-3">
                            <Package2 className="h-5 w-5" />
                          </div>
                          <div>
                            <p>{product.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{product.description?.substring(0, 30)}...</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 font-medium">
                        {formatCurrency(product.price)}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {product.category || 'Sin Categoría'}
                      </TableCell>
                      <TableCell className="text-gray-300">{product.stock}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${stockStatus.color} border-0`}>
                          {stockStatus.text}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
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

export default Products;
