/**
 * Configuración del cliente
 */

// API base URL según el entorno
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Configuración de la API
export const API_CONFIG = {
  // Headers por defecto para todas las peticiones
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Configuración de credenciales
  credentials: 'include' as const,
  
  // Timeout para peticiones en ms (10 segundos)
  timeout: 10000,
} as const;

// Configuración de React Query
export const QUERY_CONFIG = {
  // Tiempo que los datos se consideran frescos
  staleTime: 1000 * 60 * 5, // 5 minutos
  
  // Tiempo de cache
  cacheTime: 1000 * 60 * 30, // 30 minutos
  
  // Reintentos
  retry: 1,
  
  // Intervalo de refresco
  refetchInterval: false,
  
  // Refresco en focus
  refetchOnWindowFocus: false,
} as const; 