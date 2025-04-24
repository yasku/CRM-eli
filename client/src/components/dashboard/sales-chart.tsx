import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { type SalesChartData } from '@shared/schema';

/**
 * Componente GráficoVentas para el tablero
 * Muestra ingresos y ganancias a lo largo del tiempo
 */
interface SalesChartProps {
  data: SalesChartData;
  isLoading?: boolean;
}

const SalesChart: React.FC<SalesChartProps> = ({ data, isLoading = false }) => {
  // Elemento de marcador de posición durante la carga
  if (isLoading) {
    return (
      <Card className="bg-gray-950 rounded-lg shadow-md border border-gray-900 lg:col-span-2">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white">Resumen de Ventas</h3>
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-purple-500 mr-2"></span>
                <span className="text-gray-400">Ingresos</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></span>
                <span className="text-gray-400">Ganancias</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full bg-black rounded-lg animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  // Tooltip personalizado para el gráfico
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 p-3 rounded shadow-lg border border-gray-800 backdrop-blur-sm">
          <p className="text-gray-200 font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p 
              key={`tooltip-${index}`} 
              className="text-sm" 
              style={{ color: entry.color }}
            >
              {entry.name === "Revenue" ? "Ingresos" : "Ganancias"}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-950 rounded-lg shadow-md border border-gray-900 lg:col-span-2">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">Resumen de Ventas</h3>
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-purple-500 mr-2"></span>
              <span className="text-gray-400">Ingresos</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></span>
              <span className="text-gray-400">Ganancias</span>
            </div>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#9CA3AF' }}
                tickLine={{ stroke: '#6B7280' }}
                axisLine={{ stroke: '#4B5563' }}
              />
              <YAxis 
                tick={{ fill: '#9CA3AF' }}
                tickLine={{ stroke: '#6B7280' }}
                axisLine={{ stroke: '#4B5563' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) => {
                  const label = value === "Revenue" ? "Ingresos" : "Ganancias";
                  return <span className="text-gray-300">{label}</span>;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8B5CF6" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                name="Revenue"
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="#6366F1" 
                fillOpacity={1} 
                fill="url(#colorProfit)" 
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
