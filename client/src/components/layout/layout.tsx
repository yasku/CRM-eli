import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import { useMobile } from '@/hooks/use-mobile';

/**
 * Main layout component for the application
 * Handles responsive layout and sidebar state
 */
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Handle sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black text-gray-100">
      {/* Backdrop overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar 
        isMobile={isMobile} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-gray-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
