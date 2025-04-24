import React from 'react';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Componente TarjetaEstadística para las estadísticas del tablero
 * Muestra una métrica con indicador de crecimiento, descripción y barra de progreso
 */
interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  growth: number;
  percentage: number;
  icon?: React.ReactNode;
  progressColor?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  growth,
  percentage,
  icon,
  progressColor = 'bg-purple-500',
  className,
}) => {
  // Determinar color e icono para el indicador de crecimiento
  const isPositiveGrowth = growth >= 0;
  const growthColor = isPositiveGrowth ? 'text-green-400' : 'text-red-400';
  const growthBg = isPositiveGrowth ? 'bg-green-500/20' : 'bg-red-500/20';
  const growthIcon = isPositiveGrowth ? (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-4 w-4 mr-1" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-4 w-4 mr-1" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  return (
    <Card className={cn('bg-gray-950 shadow-md border border-gray-900 transition-transform hover:translate-y-[-3px] hover:shadow-lg', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-300 font-medium">{title}</h3>
          <span className={cn('text-xs px-2 py-1 rounded-full flex items-center', growthBg, growthColor)}>
            {growthIcon}
            {Math.abs(growth).toFixed(1)}%
          </span>
        </div>
        <p className="text-2xl font-semibold text-white mb-1">{value}</p>
        <p className="text-sm text-gray-400">{description}</p>
        <div className="mt-4 h-1 w-full bg-black rounded-full overflow-hidden">
          <div className={cn('h-1 rounded-full', progressColor)} style={{ width: `${percentage}%` }}></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
