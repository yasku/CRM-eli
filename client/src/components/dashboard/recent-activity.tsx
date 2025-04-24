import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  NewOrderIcon, 
  NewCustomerIcon, 
  PaymentIcon, 
  AlertIcon, 
  RefundIcon 
} from '@/components/ui/icons';
import { type Activity } from '@shared/schema';
import { useLocation } from 'wouter';

/**
 * Componente ActividadReciente para el tablero
 * Muestra una línea de tiempo de actividades recientes en el sistema
 */
interface RecentActivityProps {
  activities: Activity[];
  isLoading?: boolean;
}

// Mapear tipos de actividad a iconos y colores
const activityIconMap: Record<string, {
  icon: React.FC<{ className?: string }>;
  bgColor: string;
  iconColor: string;
}> = {
  'sale': {
    icon: NewOrderIcon,
    bgColor: 'bg-purple-500/20',
    iconColor: 'text-purple-400'
  },
  'customer': {
    icon: NewCustomerIcon,
    bgColor: 'bg-violet-500/20',
    iconColor: 'text-violet-400'
  },
  'payment': {
    icon: PaymentIcon,
    bgColor: 'bg-indigo-500/20',
    iconColor: 'text-indigo-400'
  },
  'alert': {
    icon: AlertIcon,
    bgColor: 'bg-fuchsia-500/20',
    iconColor: 'text-fuchsia-400'
  },
  'refund': {
    icon: RefundIcon,
    bgColor: 'bg-pink-500/20',
    iconColor: 'text-pink-400'
  }
};

// Formatear diferencia de tiempo a texto legible
const formatTimeAgo = (timestamp: Date): string => {
  const now = new Date();
  const timeDiff = now.getTime() - new Date(timestamp).getTime();
  
  // Convertir a minutos
  const minutes = Math.floor(timeDiff / (1000 * 60));
  
  if (minutes < 60) {
    return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }
  
  const days = Math.floor(hours / 24);
  return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities, isLoading = false }) => {
  const [_, navigate] = useLocation();
  // Estado de carga
  if (isLoading) {
    return (
      <Card className="bg-gray-950 rounded-lg shadow-md border border-gray-900 h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white">Actividad Reciente</h3>
            <Button variant="ghost" size="sm" className="text-gray-400">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </Button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex animate-pulse">
                <div className="mr-4 flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-black"></div>
                  <div className="h-full w-px bg-gray-900 mt-2"></div>
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-black rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-black rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Obtener icono y colores basados en el tipo de actividad
  const getActivityIcon = (activity: Activity) => {
    // Icono predeterminado si no se encuentra el tipo
    const defaultIcon = {
      icon: NewOrderIcon,
      bgColor: 'bg-gray-500/20',
      iconColor: 'text-gray-400'
    };
    
    // Manejar ambos casos de tipo y acción
    let iconKey = activity.type;
    
    // Para reembolsos
    if (activity.action === 'refund' || activity.description.toLowerCase().includes('refund')) {
      iconKey = 'refund';
    }
    
    // Para alertas de stock bajo
    if (activity.description.toLowerCase().includes('alert') || 
        activity.description.toLowerCase().includes('low stock')) {
      iconKey = 'alert';
    }
    
    // Para pagos
    if (activity.description.toLowerCase().includes('payment')) {
      iconKey = 'payment';
    }
    
    return activityIconMap[iconKey] || defaultIcon;
  };

  // Extraer texto resaltado de la descripción (texto entre etiquetas <span>)
  const formatDescription = (description: string) => {
    // Reemplazar patrones como "Nombre Cliente" o #INV-123 con spans resaltados
    const formattedDesc = description
      .replace(/(#[A-Z0-9-]+)/g, '<span class="text-purple-400">$1</span>')
      .replace(/([A-Z][a-z]+ [A-Z][a-z]+)/g, '<span class="text-purple-400">$1</span>');
    
    return <p className="text-gray-200" dangerouslySetInnerHTML={{ __html: formattedDesc }} />;
  };
  
  return (
    <Card className="bg-gray-950 rounded-lg shadow-md border border-gray-900 h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">Actividad Reciente</h3>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </Button>
        </div>
        
        <div className="space-y-4">
          {activities.map((activity) => {
            const { icon: ActivityIcon, bgColor, iconColor } = getActivityIcon(activity);
            
            return (
              <div key={activity.id} className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full ${bgColor} flex items-center justify-center ${iconColor}`}>
                    <ActivityIcon />
                  </div>
                  <div className="h-full w-px bg-gray-900 mt-2"></div>
                </div>
                <div className="flex-1">
                  {formatDescription(activity.description)}
                  <p className="text-gray-500 text-sm">{formatTimeAgo(activity.timestamp)}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-center">
          <Button 
            variant="link" 
            className="text-purple-400 hover:text-purple-300 text-sm"
            onClick={() => navigate('/reports')}
          >
            Ver Toda la Actividad
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
