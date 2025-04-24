import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Componente AccionesRápidas para el tablero
 * Muestra botones para acciones de uso común
 */
interface QuickAction {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions?: QuickAction[];
}

const defaultActions: Omit<QuickAction, 'onClick'>[] = [
  {
    title: 'Nueva Venta',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    bgColor: 'bg-purple-500/20',
    iconColor: 'text-purple-400'
  },
  {
    title: 'Añadir Cliente',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
      </svg>
    ),
    bgColor: 'bg-indigo-500/20',
    iconColor: 'text-indigo-400'
  },
  {
    title: 'Nueva Factura',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
    bgColor: 'bg-violet-500/20',
    iconColor: 'text-violet-400'
  },
  {
    title: 'Añadir Producto',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
      </svg>
    ),
    bgColor: 'bg-fuchsia-500/20',
    iconColor: 'text-fuchsia-400'
  },
  {
    title: 'Soporte',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
      </svg>
    ),
    bgColor: 'bg-pink-500/20',
    iconColor: 'text-pink-400'
  },
  {
    title: 'Configuración',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
    bgColor: 'bg-purple-500/20',
    iconColor: 'text-purple-400'
  }
];

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  // Crear acciones con manejadores predeterminados si no se proporcionan
  const quickActions = actions || defaultActions.map(action => ({
    ...action,
    onClick: () => console.log(`Clic en ${action.title}`)
  }));

  return (
    <Card className="bg-gray-950 rounded-lg shadow-md border border-gray-900 h-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-white mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-black hover:bg-gray-900 transition-colors duration-150 h-auto border border-gray-900"
              onClick={action.onClick}
            >
              <div className={`h-12 w-12 rounded-full ${action.bgColor} flex items-center justify-center ${action.iconColor} mb-2`}>
                {action.icon}
              </div>
              <span className="text-gray-200 text-sm">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
