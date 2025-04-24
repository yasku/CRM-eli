import React, { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Customer, Invoice, InvoiceItem, Product } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  Package,
  Edit,
  ArrowLeft,
  Clock,
  DollarSign,
  ShoppingCart,
  Award,
  ExternalLink
} from 'lucide-react';
import { formatCurrency, formatDate, getStatusConfig } from '@/lib/utils';

/**
 * Customer detail page component
 * Displays comprehensive information about a single customer
 */
const CustomerDetail: React.FC = () => {
  const params = useParams();
  const [, setLocation] = useLocation();
  const customerId = params.id ? parseInt(params.id) : 0;
  
  // Fetch customer data
  const { data: customerResponse, isLoading: isLoadingCustomer } = useQuery<{ success: boolean, data: Customer }>({
    queryKey: [`/api/customers/${customerId}`],
    enabled: !isNaN(customerId)
  });
  const customer = customerResponse?.data;
  
  // Fetch customer invoices
  const { data: invoicesResponse, isLoading: isLoadingInvoices } = useQuery<{ success: boolean, data: Invoice[] }>({
    queryKey: ['/api/invoices'],
    select: (response) => ({
      ...response,
      data: response.data.filter(invoice => invoice.customerId === customerId)
    }),
    enabled: !isNaN(customerId)
  });
  const invoices = invoicesResponse?.data;

  // Calculate customer metrics
  const totalSpent = invoices?.reduce((sum, invoice) => sum + Number(invoice.total), 0) || 0;
  const totalOrders = invoices?.length || 0;
  const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
  const firstPurchaseDate = invoices && invoices.length > 0 
    ? new Date(Math.min(...invoices.map(inv => new Date(inv.date).getTime())))
    : null;
  const lastPurchaseDate = invoices && invoices.length > 0 
    ? new Date(Math.max(...invoices.map(inv => new Date(inv.date).getTime())))
    : null;
    
  if (isLoadingCustomer) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold text-white mb-2">Customer Not Found</h2>
        <p className="text-gray-400 mb-4">The customer you're looking for doesn't exist or has been removed.</p>
        <Button 
          onClick={() => setLocation('/customers')}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Customers
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Page header with back button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation('/customers')}
            className="mr-4 border-gray-700 text-gray-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold text-white">Customer Profile</h1>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Edit className="mr-2 h-4 w-4" />
          Edit Customer
        </Button>
      </div>

      {/* Customer Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-gray-800">
                {customer.avatarUrl ? (
                  <img 
                    src={customer.avatarUrl} 
                    alt={customer.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-full bg-purple-600/20 flex items-center justify-center text-2xl text-white font-semibold">
                    {customer.name.charAt(0)}
                  </div>
                )}
              </Avatar>
              <h2 className="text-xl font-semibold text-white">{customer.name}</h2>
              <p className="text-gray-400 mb-4">Customer #{customer.id}</p>
              
              <div className="w-full mt-4 space-y-3">
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-3 text-purple-400" />
                  <span>{customer.email}</span>
                </div>
                {customer.phone && (
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-4 w-4 mr-3 text-purple-400" />
                    <span>{customer.phone}</span>
                  </div>
                )}
                {customer.address && (
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-3 text-purple-400" />
                    <span>{customer.address}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-4 w-4 mr-3 text-purple-400" />
                  <span>Member since {formatDate(customer.createdAt)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Statistics */}
        <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg text-white">Customer Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600/20 text-purple-400 mb-3 mx-auto">
                  <DollarSign className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold text-white text-center">{formatCurrency(totalSpent)}</p>
                <p className="text-xs text-gray-400 text-center mt-1">Total Spent</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600/20 text-purple-400 mb-3 mx-auto">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold text-white text-center">{totalOrders}</p>
                <p className="text-xs text-gray-400 text-center mt-1">Total Orders</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600/20 text-purple-400 mb-3 mx-auto">
                  <Award className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold text-white text-center">{formatCurrency(avgOrderValue)}</p>
                <p className="text-xs text-gray-400 text-center mt-1">Avg. Order Value</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600/20 text-purple-400 mb-3 mx-auto">
                  <Clock className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold text-white text-center">
                  {lastPurchaseDate ? formatDate(lastPurchaseDate) : 'N/A'}
                </p>
                <p className="text-xs text-gray-400 text-center mt-1">Last Purchase</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Customer Data */}
      <Tabs defaultValue="orders" className="mb-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger 
            value="orders" 
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
          >
            Orders History
          </TabsTrigger>
          <TabsTrigger 
            value="purchases" 
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
          >
            Purchased Products
          </TabsTrigger>
          <TabsTrigger 
            value="notes" 
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
          >
            Notes & Activities
          </TabsTrigger>
        </TabsList>
        
        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-400" />
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingInvoices ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : invoices && invoices.length > 0 ? (
                <Table>
                  <TableHeader className="bg-gray-800/50">
                    <TableRow className="border-gray-800 hover:bg-gray-800/50">
                      <TableHead className="text-gray-400">Invoice #</TableHead>
                      <TableHead className="text-gray-400">Date</TableHead>
                      <TableHead className="text-gray-400">Amount</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => {
                      const { text, bgColor, textColor } = getStatusConfig(invoice.status);
                      
                      return (
                        <TableRow key={invoice.id} className="border-gray-800 hover:bg-gray-800/50">
                          <TableCell className="font-medium text-purple-400">
                            {invoice.invoiceNumber}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {formatDate(invoice.date)}
                          </TableCell>
                          <TableCell className="text-gray-300 font-medium">
                            {formatCurrency(invoice.total)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${bgColor} ${textColor} border-0`}>
                              {text}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-gray-400 hover:text-gray-300"
                              onClick={() => setLocation(`/invoices/${invoice.id}`)}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <FileText className="h-10 w-10 mb-2 text-gray-500 mx-auto" />
                  <p className="text-gray-300 text-lg">No orders found</p>
                  <p className="text-gray-500 mt-1">This customer hasn't made any purchases yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Purchased Products Tab */}
        <TabsContent value="purchases">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center">
                <Package className="h-5 w-5 mr-2 text-purple-400" />
                Products Purchased
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingInvoices ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : invoices && invoices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-200">Smartphone X Pro</h3>
                      <Badge className="bg-purple-600">Electronics</Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Latest flagship smartphone with high-resolution camera</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-300 font-medium">{formatCurrency(1299)}</span>
                      <span className="text-gray-500 text-sm">Qty: 1</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-200">Wireless Earbuds</h3>
                      <Badge className="bg-purple-600">Electronics</Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Premium wireless earbuds with noise cancellation</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-300 font-medium">{formatCurrency(199)}</span>
                      <span className="text-gray-500 text-sm">Qty: 1</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <Package className="h-10 w-10 mb-2 text-gray-500 mx-auto" />
                  <p className="text-gray-300 text-lg">No products purchased</p>
                  <p className="text-gray-500 mt-1">This customer hasn't bought any products yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notes Tab */}
        <TabsContent value="notes">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center">
                <User className="h-5 w-5 mr-2 text-purple-400" />
                Notes & Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="relative pl-8 pb-4 border-l border-gray-800">
                  <div className="absolute left-0 top-0 transform -translate-x-1/2 h-4 w-4 rounded-full bg-purple-500"></div>
                  <p className="text-gray-300">Customer signed up</p>
                  <p className="text-sm text-gray-500">{formatDate(customer.createdAt)}</p>
                </div>
                
                {firstPurchaseDate && (
                  <div className="relative pl-8 pb-4 border-l border-gray-800">
                    <div className="absolute left-0 top-0 transform -translate-x-1/2 h-4 w-4 rounded-full bg-green-500"></div>
                    <p className="text-gray-300">First purchase</p>
                    <p className="text-sm text-gray-500">{formatDate(firstPurchaseDate)}</p>
                  </div>
                )}
                
                {invoices && invoices.filter(i => i.status === 'paid').map((invoice, idx) => (
                  <div key={invoice.id} className="relative pl-8 pb-4 border-l border-gray-800">
                    <div className="absolute left-0 top-0 transform -translate-x-1/2 h-4 w-4 rounded-full bg-blue-500"></div>
                    <p className="text-gray-300">Payment received for invoice {invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-500">{formatDate(invoice.date)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetail;