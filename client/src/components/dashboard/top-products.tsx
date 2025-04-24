import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { type TopProduct } from '@shared/schema';
import { useLocation } from 'wouter';

/**
 * Componente ProductosDestacados para el tablero
 * Muestra los productos con mejor rendimiento
 */
interface TopProductsProps {
  products: TopProduct[];
  isLoading?: boolean;
}

const getIconForProduct = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    smartphone: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
    laptop: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
      </svg>
    ),
    headphone: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
      </svg>
    ),
    watch: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
    box: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
      </svg>
    )
  };

  return iconMap[iconName] || iconMap.box;
};

const TopProducts: React.FC<TopProductsProps> = ({ products, isLoading = false }) => {
  const [_, navigate] = useLocation();
  // Estado de carga
  if (isLoading) {
    return (
      <Card className="bg-gray-950 rounded-lg shadow-md border border-gray-900 h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white">Productos Destacados</h3>
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
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center animate-pulse">
                <div className="h-10 w-10 bg-black rounded mr-3"></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="h-4 bg-black rounded w-24 mb-1"></div>
                    <div className="h-4 bg-black rounded w-16"></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="h-3 bg-black rounded w-32"></div>
                    <div className="h-3 bg-black rounded w-12"></div>
                  </div>
                  <div className="w-full h-1 bg-black rounded-full mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-950 rounded-lg shadow-md border border-gray-900 h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">Productos Destacados</h3>
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
          {products.map((product) => (
            <div key={product.id} className="flex items-center">
              <div className="h-10 w-10 rounded bg-black flex items-center justify-center mr-3 text-purple-400">
                {getIconForProduct(product.icon)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-gray-200">{product.name}</p>
                  <p className="font-medium text-gray-200">{formatCurrency(product.price)}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-gray-500 text-sm">{product.unitsSold} unidades vendidas</p>
                  <span className={product.growth >= 0 ? "text-emerald-400 text-xs" : "text-pink-400 text-xs"}>
                    {formatPercentage(product.growth)}
                  </span>
                </div>
                <div className="w-full h-1 bg-black rounded-full mt-2">
                  <div className="bg-purple-500 h-1 rounded-full" style={{ width: `${product.percentage}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button 
            variant="link" 
            className="text-purple-400 hover:text-purple-300 text-sm"
            onClick={() => navigate('/products')}
          >
            Ver Todos los Productos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
