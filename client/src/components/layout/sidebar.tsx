import React from 'react';
import { useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { 
  DashboardIcon, 
  CustomerIcon, 
  ProductIcon, 
  SaleIcon, 
  InvoiceIcon, 
  OrderIcon,
  ReportIcon, 
  ProfileIcon, 
  SettingsIcon,
  LogoutIcon
} from '@/components/ui/icons';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

/**
 * Componente de navegación lateral
 * Proporciona navegación principal para la aplicación
 */
interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, onClose }) => {
  const [location, setLocation] = useLocation();

  // Elementos de navegación principales
  const mainNavItems: NavItem[] = [
    { href: '/dashboard', label: 'Tablero', icon: DashboardIcon },
    { href: '/customers', label: 'Clientes', icon: CustomerIcon },
    { href: '/clients', label: 'Proveedores', icon: CustomerIcon },
    { href: '/products', label: 'Productos', icon: ProductIcon },
    { href: '/sales', label: 'Ventas', icon: SaleIcon },
    { href: '/orders', label: 'Pedidos', icon: OrderIcon },
    { href: '/invoices', label: 'Facturas', icon: InvoiceIcon },
    { href: '/reports', label: 'Informes', icon: ReportIcon },
  ];

  // Elementos de navegación de configuración
  const settingsNavItems: NavItem[] = [
    { href: '/profile', label: 'Perfil', icon: ProfileIcon },
    { href: '/settings', label: 'Configuración', icon: SettingsIcon },
  ];
  
  // Log para mostrar la ubicación actual
  console.log("Ubicación actual en sidebar:", location);

  // Mobile sidebar class - improved with transform for smoother animation
  const mobileClasses = isMobile 
    ? isOpen 
      ? 'fixed inset-y-0 left-0 z-50 transform translate-x-0' 
      : 'fixed inset-y-0 left-0 z-50 transform -translate-x-full'
    : 'transform translate-x-0';

  // Función para manejar la navegación de forma directa
  const handleNavigate = (path: string) => {
    console.log(`Navegando a: ${path}`);
    setLocation(path);
    if (isMobile) onClose();
  };

  return (
    <aside 
      className={cn(
        'w-64 bg-black h-screen transition-all duration-300 ease-in-out',
        mobileClasses
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-900">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-purple-600 flex items-center justify-center mr-2">
            <DashboardIcon className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-semibold text-white">SalesPro</h1>
        </div>
        {isMobile && (
          <button 
            onClick={onClose} 
            className="md:hidden text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Navegación */}
      <nav className="mt-4">
        <div className="px-4 py-2">
          <p className="text-xs uppercase tracking-wider text-gray-400">Principal</p>
        </div>
        
        {/* Elementos de Navegación Principal */}
        {mainNavItems.map((item) => {
          const isActive = location === item.href;
          return (
            <div 
              key={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-gray-400 hover:bg-gray-900 hover:text-gray-100 cursor-pointer transition-all duration-200 hover:scale-[1.01] group',
                isActive && 'text-gray-100 bg-purple-600/20 border-l-4 border-purple-600'
              )}
              onClick={() => handleNavigate(item.href)}
            >
              <item.icon className={cn(
                "mr-3 text-lg",
                isActive && 'text-purple-400'
              )} />
              <span>{item.label}</span>
            </div>
          );
        })}
        
        <div className="px-4 py-2 mt-4">
          <p className="text-xs uppercase tracking-wider text-gray-400">Configuración</p>
        </div>
        
        {/* Elementos de Navegación de Configuración */}
        {settingsNavItems.map((item) => {
          const isActive = location === item.href;
          return (
            <div 
              key={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-gray-400 hover:bg-gray-900 hover:text-gray-100 cursor-pointer transition-all duration-200 hover:scale-[1.01]',
                isActive && 'text-gray-100 bg-purple-600/20 border-l-4 border-purple-600'
              )}
              onClick={() => {
                console.log("Clic en configuración:", item.href);
                handleNavigate(item.href);
              }}
            >
              <item.icon className={cn(
                "mr-3 text-lg",
                isActive && 'text-purple-400'
              )} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Sección de Perfil de Usuario */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-900 bg-black/80 backdrop-blur-sm">
        <div 
          className="flex items-center cursor-pointer hover:bg-gray-900 p-2 rounded-md group transition-all duration-200"
          onClick={() => handleNavigate("/profile")}
        >
          <Avatar className="h-8 w-8 border-2 border-purple-900">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
              alt="Perfil de usuario" 
              className="h-full w-full object-cover"
            />
          </Avatar>
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-200 group-hover:text-purple-400">Alex Morgan</p>
            <p className="text-xs text-gray-500">Propietario del Negocio</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto rounded-full p-1.5 text-gray-400 hover:text-gray-200 bg-gray-900 hover:bg-purple-900/50"
            onClick={(e) => {
              e.stopPropagation(); // Evita que el clic se propague al contenedor padre
              console.log("Botón de logout clickeado");
              // Aquí iría la lógica para cerrar sesión
            }}
          >
            <LogoutIcon size={18} />
            <span className="sr-only">Cerrar sesión</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;