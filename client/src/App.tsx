import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Layout component
import Layout from "@/components/layout/layout";

// Page components
import Dashboard from "@/pages/dashboard";
import Products from "@/pages/products";
import Customers from "@/pages/customers";
import CustomerDetail from "@/pages/customer-detail";
import Clients from "@/pages/clients";
import ClientDetail from "@/pages/client-detail";
import Sales from "@/pages/sales";
import Invoices from "@/pages/invoices";
import Orders from "@/pages/orders";
import Reports from "@/pages/reports";
import Profile from "@/pages/profile";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

/**
 * Main Router component
 * Handles routing for the application
 */
function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/products" component={Products} />
        <Route path="/customers" component={Customers} />
        <Route path="/customers/:id" component={CustomerDetail} />
        <Route path="/clients" component={Clients} />
        <Route path="/clients/:id" component={ClientDetail} />
        <Route path="/sales" component={Sales} />
        <Route path="/invoices" component={Invoices} />
        <Route path="/orders" component={Orders} />
        <Route path="/reports" component={Reports} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

/**
 * Main App component
 * Sets up providers for the application
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
