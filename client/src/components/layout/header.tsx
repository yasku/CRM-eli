import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  SearchIcon, 
  NotificationIcon, 
  SettingsIcon 
} from '@/components/ui/icons';
import { Avatar } from '@/components/ui/avatar';

/**
 * Header component for the application
 * Contains search, notifications, and user profile
 */
interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [_, setLocation] = useLocation();
  
  // Función para navegar al perfil
  const navigateToProfile = () => {
    console.log("Navegando al perfil desde el header");
    setLocation("/profile");
  };
  
  // Función para navegar a configuración
  const navigateToSettings = () => {
    console.log("Navegando a configuración desde el header");
    setLocation("/settings");
  };

  return (
    <header className="bg-black border-b border-gray-900 py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onToggleSidebar} 
            className="text-gray-400 hover:text-purple-400 mr-4"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center flex-1">
          <div className="relative md:w-64 w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="text-gray-400" size={18} />
            </div>
            <Input 
              type="text" 
              placeholder="Search..." 
              className="bg-gray-900 text-gray-200 text-sm rounded-md pl-10 pr-4 py-2 w-full border-0 focus:ring-2 focus:ring-purple-500/50 focus:bg-gray-800"
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center">
          {/* Notification Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-purple-400 ml-4 relative"
          >
            <NotificationIcon size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-purple-500"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Settings Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-purple-400 ml-4"
            onClick={navigateToSettings}
          >
            <SettingsIcon size={20} />
            <span className="sr-only">Settings</span>
          </Button>

          {/* User Profile Icon */}
          <div className="ml-4 relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-purple-700 transition-all duration-150 ease-in-out p-0"
              onClick={navigateToProfile}
            >
              <Avatar className="h-8 w-8 ring-2 ring-purple-700/50">
                <img 
                  className="h-full w-full rounded-full object-cover" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
                  alt="User profile" 
                />
              </Avatar>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
