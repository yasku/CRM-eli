import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Download, 
  Calendar,
  Mail,
  Printer
} from 'lucide-react';

/**
 * Componente de página de Informes
 * Muestra varios informes de negocio y análisis
 */
const Reports: React.FC = () => {
  return (
    <div>
      {/* Encabezado de página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Informes</h1>
          <p className="text-gray-400 mt-1">Ver y analizar el rendimiento de tu negocio</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Calendar className="mr-2 h-4 w-4" />
            Rango de Fechas
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Pestañas de Informes */}
      <Tabs defaultValue="sales" className="mb-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="sales" className="data-[state=active]:bg-gray-700">Ventas</TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-gray-700">Clientes</TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-gray-700">Productos</TabsTrigger>
          <TabsTrigger value="finance" className="data-[state=active]:bg-gray-700">Finanzas</TabsTrigger>
        </TabsList>
        
        {/* Pestaña de Informes de Ventas */}
        <TabsContent value="sales" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center justify-between">
                  <span>Ventas Mensuales</span>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-800/30 rounded-lg">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">Visualización de gráfico de ventas mensuales</p>
                    <p className="text-gray-500 text-sm">Comparación de ingresos a lo largo del tiempo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center justify-between">
                  <span>Ventas por Categoría</span>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-800/30 rounded-lg">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">Distribución por categoría de productos</p>
                    <p className="text-gray-500 text-sm">Porcentaje de ventas por categoría</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Pestaña de Informes de Clientes */}
        <TabsContent value="customers" className="mt-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Analítica de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-800/30 rounded-lg">
                <div className="text-center">
                  <LineChart className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">Visualización de crecimiento y retención de clientes</p>
                  <p className="text-gray-500 text-sm">Seguimiento de métricas de clientes a lo largo del tiempo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pestaña de Informes de Productos */}
        <TabsContent value="products" className="mt-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Rendimiento de Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-800/30 rounded-lg">
                <div className="text-center">
                  <BarChart className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">Análisis de ventas e inventario de productos</p>
                  <p className="text-gray-500 text-sm">Seguimiento de los productos con mejor rendimiento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pestaña de Informes Financieros */}
        <TabsContent value="finance" className="mt-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Resumen Financiero</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-800/30 rounded-lg">
                <div className="text-center">
                  <LineChart className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">Visualización de ingresos, gastos y beneficios</p>
                  <p className="text-gray-500 text-sm">Seguimiento de métricas financieras a lo largo del tiempo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
