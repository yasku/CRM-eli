import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';

/**
 * Componente SelectorDePeriodo para tableros
 * Permite seleccionar período de tiempo y exportar datos
 */
interface PeriodSelectorProps {
  onPeriodChange?: (period: string) => void;
  onExport?: () => void;
  defaultPeriod?: string;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  onPeriodChange,
  onExport,
  defaultPeriod = 'month',
}) => {
  const handlePeriodChange = (value: string) => {
    if (onPeriodChange) {
      onPeriodChange(value);
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      console.log('Funcionalidad de exportación no implementada');
    }
  };

  return (
    <div className="flex space-x-2">
      <div className="relative">
        <Select defaultValue={defaultPeriod} onValueChange={handlePeriodChange}>
          <SelectTrigger className="bg-gray-950 border-gray-900 text-gray-200 w-[140px]">
            <SelectValue placeholder="Seleccionar Período" />
          </SelectTrigger>
          <SelectContent className="bg-gray-950 border-gray-900 text-gray-200">
            <SelectItem value="today">Hoy</SelectItem>
            <SelectItem value="week">Esta Semana</SelectItem>
            <SelectItem value="month">Este Mes</SelectItem>
            <SelectItem value="quarter">Últimos 3 Meses</SelectItem>
            <SelectItem value="year">Este Año</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={handleExport}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        <Download className="mr-2 h-4 w-4" />
        <span>Exportar</span>
      </Button>
    </div>
  );
};

export default PeriodSelector;
