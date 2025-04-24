import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  PlusCircle, 
  Calendar, 
  BarChart3, 
  ListFilter,
  Users,
  PackageCheck
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { type SalesChartData } from '@shared/schema';
import SalesChart from '@/components/dashboard/sales-chart';

/**
 * Componente de página de Ventas
 * Muestra datos y métricas de ventas
 */
const Sales: React.FC = () => {
  // Obtener datos del gráfico de ventas
  const { data: chartDataResponse, isLoading: isLoadingChart } = useQuery<{ success: boolean, data: SalesChartData }>({
    queryKey: ['/api/dashboard/sales-chart'],
  });
  const chartData = chartDataResponse?.data;

  return (
    <div>
      {/* Encabezado de página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Ventas</h1>
          <p className="text-gray-400 mt-1">Seguimiento y análisis del rendimiento de ventas</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Calendar className="mr-2 h-4 w-4" />
            Rango de Fechas
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Venta
          </Button>
        </div>
      </div>

      {/* Tarjetas de Resumen de Ventas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Ventas Totales</p>
                <h3 className="text-2xl font-bold text-white mt-1">$24,780</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-green-400 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 11-2 0 1 1 0 012 0zm-1 4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.5a1 1 0 00.4.8V15a1 1 0 102 0v-5a1 1 0 00-2 0v1a1 1 0 104 0V8.4a1 1 0 00-2-.8V7z" clipRule="evenodd" />
                </svg>
                12.5% incremento
              </span>
              <span className="text-gray-500 text-sm ml-2">desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Clientes</p>
                <h3 className="text-2xl font-bold text-white mt-1">256</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-green-400 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 11-2 0 1 1 0 012 0zm-1 4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.5a1 1 0 00.4.8V15a1 1 0 102 0v-5a1 1 0 00-2 0v1a1 1 0 104 0V8.4a1 1 0 00-2-.8V7z" clipRule="evenodd" />
                </svg>
                5.2% incremento
              </span>
              <span className="text-gray-500 text-sm ml-2">desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Productos Vendidos</p>
                <h3 className="text-2xl font-bold text-white mt-1">385</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <PackageCheck className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-green-400 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 11-2 0 1 1 0 012 0zm-1 4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.5a1 1 0 00.4.8V15a1 1 0 102 0v-5a1 1 0 00-2 0v1a1 1 0 104 0V8.4a1 1 0 00-2-.8V7z" clipRule="evenodd" />
                </svg>
                8.7% incremento
              </span>
              <span className="text-gray-500 text-sm ml-2">desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pestañas de Análisis de Ventas */}
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">Visión General</TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">Por Productos</TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">Por Clientes</TabsTrigger>
          <TabsTrigger value="regions" className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">Por Región</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-white">Tendencia de Ventas</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-purple-900/40">
                  <ListFilter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <SalesChart 
                  data={chartData || []} 
                  isLoading={isLoadingChart} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="mt-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="text-center py-20">
                <h3 className="text-xl font-medium text-gray-300">Análisis de Ventas por Producto</h3>
                <p className="text-gray-500 mt-2">Análisis detallado de ventas por producto próximamente.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="mt-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="text-center py-20">
                <h3 className="text-xl font-medium text-gray-300">Análisis de Ventas por Cliente</h3>
                <p className="text-gray-500 mt-2">Análisis detallado de ventas por cliente próximamente.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regions" className="mt-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="text-center py-20">
                <h3 className="text-xl font-medium text-gray-300">Análisis de Ventas por Región</h3>
                <p className="text-gray-500 mt-2">Análisis detallado de ventas por región próximamente.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sales;
