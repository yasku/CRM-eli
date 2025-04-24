import React, { useState } from 'react';
import axios from 'axios';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface CustomerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const CustomerFormDialog: React.FC<CustomerFormDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSuccess 
}) => {
  // Estados del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  // Handler para cambios en los campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Limpiar error al editar un campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validación del nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length > 100) {
      newErrors.name = 'El nombre no puede exceder los 100 caracteres';
    }
    
    // Validación del email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    
    // Validación del teléfono (opcional)
    if (formData.phone && formData.phone.length > 20) {
      newErrors.phone = 'El teléfono no puede exceder los 20 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    setErrors({});
    setApiError(null);
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    
    // Validar antes de enviar
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/customers/', formData);
      
      if (response.data.success) {
        onSuccess();
        onOpenChange(false);
        resetForm();
      } else {
        setApiError('Error al crear cliente: ' + response.data.message);
      }
    } catch (error: any) {
      console.error('Error al crear cliente:', error);
      
      // Manejar errores de validación del backend
      if (error.response && error.response.status === 400) {
        if (error.response.data && error.response.data.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError('Error de validación en el servidor');
        }
      } else {
        setApiError('Error al conectar con el servidor');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!isSubmitting) {
        if (!newOpen) {
          resetForm();
        }
        onOpenChange(newOpen);
      }
    }}>
      <DialogContent className="bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Añadir Nuevo Cliente</DialogTitle>
          <DialogDescription className="text-gray-400">
            Complete el formulario para crear un nuevo cliente
          </DialogDescription>
        </DialogHeader>
        
        {apiError && (
          <div className="bg-red-900/30 border border-red-800 rounded-md p-3 flex items-start mb-4">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
            <span className="text-red-300 text-sm">{apiError}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Nombre <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`bg-gray-800 border-${errors.name ? 'red-600' : 'gray-700'} focus:border-purple-600 text-white`}
              placeholder="Nombre completo"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`bg-gray-800 border-${errors.email ? 'red-600' : 'gray-700'} focus:border-purple-600 text-white`}
              placeholder="email@ejemplo.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`bg-gray-800 border-${errors.phone ? 'red-600' : 'gray-700'} focus:border-purple-600 text-white`}
              placeholder="+1234567890"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="text-white">Dirección</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 focus:border-purple-600 text-white"
              placeholder="Dirección completa"
            />
          </div>
          
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-purple-600 hover:bg-purple-700" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : 'Guardar Cliente'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormDialog; 