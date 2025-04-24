import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  type DashboardStats, 
  type SalesChartData, 
  type Activity, 
  type TopProduct,
  type Invoice,
  type Customer
} from '@shared/schema';
import { formatCurrency } from '@/lib/utils';

// Components
import StatCard from '@/components/dashboard/stat-card';
import SalesChart from '@/components/dashboard/sales-chart';
import RecentActivity from '@/components/dashboard/recent-activity';
import RecentTransactions from '@/components/dashboard/recent-transactions';
import QuickActions from '@/components/dashboard/quick-actions';
import TopProducts from '@/components/dashboard/top-products';
import PeriodSelector from '@/components/dashboard/period-selector';

/**
 * Componente de página de Tablero
 * Página principal con resumen de métricas de negocio
 */
const Dashboard: React.FC = () => {
  // Obtener estadísticas del tablero
  const { data: statsResponse, isLoading: isLoadingStats } = useQuery<{ success: boolean, data: DashboardStats }>({
    queryKey: ['/api/dashboard/stats'],
  });
  const stats = statsResponse?.data;

  // Obtener datos del gráfico de ventas
  const { data: chartDataResponse, isLoading: isLoadingChart } = useQuery<{ success: boolean, data: SalesChartData }>({
    queryKey: ['/api/dashboard/sales-chart'],
  });
  const chartData = chartDataResponse?.data;

  // Obtener actividades recientes
  const { data: activitiesResponse, isLoading: isLoadingActivities } = useQuery<{ success: boolean, data: Activity[] }>({
    queryKey: ['/api/dashboard/activities'],
  });
  const activities = activitiesResponse?.data;

  // Obtener productos principales
  const { data: topProductsResponse, isLoading: isLoadingProducts } = useQuery<{ success: boolean, data: TopProduct[] }>({
    queryKey: ['/api/dashboard/top-products'],
  });
  const topProducts = topProductsResponse?.data;

  // Obtener facturas recientes
  const { data: recentInvoicesResponse, isLoading: isLoadingInvoices } = useQuery<{ success: boolean, data: (Invoice & { customer: Customer })[] }>({
    queryKey: ['/api/dashboard/recent-invoices'],
  });
  const recentInvoices = recentInvoicesResponse?.data;

  // Manejar cambio de período
  const handlePeriodChange = (period: string) => {
    console.log(`Período cambiado a: ${period}`);
    // En una aplicación real, volverías a obtener datos según el período seleccionado
  };

  // Manejar exportación
  const handleExport = () => {
    console.log('Exportando datos del tablero...');
    // En una aplicación real, generarías y descargarías un informe
  };

  return (
    <div>
      {/* Título de la página y Selector de Período */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Tablero</h1>
          <p className="text-gray-400 mt-1">Resumen del rendimiento de tu negocio</p>
        </div>
        <PeriodSelector onPeriodChange={handlePeriodChange} onExport={handleExport} />
      </div>

      {/* Fila de Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Ventas Totales"
          value={isLoadingStats ? "Cargando..." : formatCurrency(stats?.totalSales || 0)}
          description={`Comparado con ${formatCurrency(stats?.totalSales ? stats.totalSales * 0.89 : 0)} el mes pasado`}
          growth={stats?.salesGrowth || 0}
          percentage={78}
          progressColor="bg-purple-500"
        />
        
        <StatCard 
          title="Clientes"
          value={isLoadingStats ? "Cargando..." : (stats?.customerCount?.toString() || "0")}
          description={`${stats?.customerCount ? Math.round(stats.customerCount * 0.1) : 0} nuevos clientes este mes`}
          growth={stats?.customerGrowth || 0}
          percentage={65}
          progressColor="bg-indigo-500"
        />
        
        <StatCard 
          title="Productos"
          value={isLoadingStats ? "Cargando..." : (stats?.productCount?.toString() || "0")}
          description={`${stats?.productCount ? Math.round(stats.productCount * 0.025) : 0} productos con poco stock`}
          growth={stats?.productGrowth || 0}
          percentage={45}
          progressColor="bg-violet-500"
        />
        
        <StatCard 
          title="Margen de Ganancia"
          value={isLoadingStats ? "Cargando..." : `${stats?.profitMargin?.toFixed(1) || 0}%`}
          description={`Subió desde ${stats?.profitMargin && stats?.profitMarginGrowth ? (stats.profitMargin - stats.profitMarginGrowth).toFixed(1) : 0}% el mes pasado`}
          growth={stats?.profitMarginGrowth || 0}
          percentage={82}
          progressColor="bg-fuchsia-500"
        />
      </div>

      {/* Contenido Principal del Tablero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Ventas (ocupa 2 columnas) */}
        <SalesChart 
          data={Array.isArray(chartData) ? chartData : []} 
          isLoading={isLoadingChart} 
        />
        
        {/* Actividad Reciente */}
        <RecentActivity 
          activities={Array.isArray(activities) ? activities : []} 
          isLoading={isLoadingActivities} 
        />
      </div>

      {/* Transacciones Recientes */}
      <div className="mt-6">
        <RecentTransactions 
          transactions={Array.isArray(recentInvoices) ? recentInvoices : []} 
          isLoading={isLoadingInvoices} 
        />
      </div>

      {/* Acciones Rápidas y Productos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <QuickActions />
        <TopProducts 
          products={Array.isArray(topProducts) ? topProducts : []} 
          isLoading={isLoadingProducts} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
