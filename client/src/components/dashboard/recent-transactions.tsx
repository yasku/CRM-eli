import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { type Invoice, type Customer } from '@shared/schema';
import { formatCurrency, formatDate, getStatusConfig } from '@/lib/utils';
import { useLocation } from 'wouter';

/**
 * Componente TransaccionesRecientes para el tablero
 * Muestra una tabla de ventas/facturas recientes
 */
interface RecentTransactionsProps {
  transactions: (Invoice & { customer: Customer })[];
  isLoading?: boolean;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions, isLoading = false }) => {
  const [_, navigate] = useLocation();
  // Estado de carga
  if (isLoading) {
    return (
      <Card className="bg-gray-950 rounded-lg shadow-md border border-gray-900 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex justify-between items-center p-6 border-b border-gray-900">
            <h3 className="text-lg font-medium text-white">Transacciones Recientes</h3>
            <Button 
              variant="link" 
              className="text-purple-400 hover:text-purple-300 text-sm font-medium"
              onClick={() => navigate('/invoices')}
            >
              Ver Todo
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-900">
              <thead className="bg-black/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Factura
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Monto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900 bg-gray-950">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-black rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-black rounded-full"></div>
                        <div className="ml-3">
                          <div className="h-4 bg-black rounded w-24 mb-1"></div>
                          <div className="h-3 bg-black rounded w-32"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-black rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-black rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-6 bg-black rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="h-4 bg-black rounded w-12 ml-auto"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-950 rounded-lg shadow-md border border-gray-900 overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-gray-900">
        <h3 className="text-lg font-medium text-white">Transacciones Recientes</h3>
        <Button 
          variant="link" 
          className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          onClick={() => navigate('/invoices')}
        >
          Ver Todo
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-900">
          <thead className="bg-black/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Factura
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Monto
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-900">
            {transactions.map((transaction) => {
              const { text: statusText, bgColor, textColor } = getStatusConfig(transaction.status);
              
              return (
                <tr key={transaction.id} className="hover:bg-black/40 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-200 font-medium">{transaction.invoiceNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        {transaction.customer.avatarUrl ? (
                          <img 
                            className="h-full w-full rounded-full" 
                            src={transaction.customer.avatarUrl} 
                            alt={transaction.customer.name} 
                          />
                        ) : (
                          <div className="h-full w-full rounded-full bg-gray-800 flex items-center justify-center text-gray-300">
                            {transaction.customer.name.charAt(0)}
                          </div>
                        )}
                      </Avatar>
                      <div className="ml-3">
                        <p className="text-gray-200">{transaction.customer.name}</p>
                        <p className="text-gray-500 text-sm">{transaction.customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-200">
                    {formatCurrency(transaction.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${bgColor} ${textColor}`}>
                      {statusText}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 mr-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-black/30 border-t border-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">{transactions.length}</span> de <span className="font-medium">25</span> resultados
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-900 text-gray-400 hover:bg-gray-900 hover:text-white disabled:opacity-50"
              disabled
            >
              Anterior
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-900 text-gray-400 hover:bg-gray-900 hover:text-white"
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecentTransactions;
