# Plan para Implementar "Añadir Nuevo Cliente" con Componente Modal Separado

## Información de Referencia

### Estructura del Cliente en Backend
- **Modelo (customer.py)**:
  - Campos obligatorios: `name`, `email`
  - Campos opcionales: `phone`, `address`
  - ID autogenerado y timestamps manejados por BaseModel

- **Schema (customer_schema.py)**:
  - Validaciones: nombre (1-100 caracteres), email (formato válido), teléfono (máx 20 caracteres)
  - Campos controlados por el sistema: id, created_at, updated_at

- **API (customers_api.py)**:
  - Endpoint POST a `/api/customers/` 
  - Acepta objetos JSON con el modelo `customer_input_model`
  - Retorna el cliente creado con código 201 si es exitoso

## Tareas a realizar

### 1. Crear un componente modal separado para el formulario
- [x] Crear archivo `client/src/components/customers/CustomerFormDialog.tsx`
- [x] Implementar el componente con interfaz de props adecuada:
  ```typescript
  interface CustomerFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
  }
  ```
- [x] Añadir estados para el formulario:
  ```typescript
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  ```
- [x] Implementar validaciones de campos
- [x] Añadir función de envío al backend que maneje éxito y errores

### 2. Modificar la página de clientes para usar el componente
- [x] Importar el nuevo componente en `client/src/pages/customers.tsx`
  ```typescript
  import CustomerFormDialog from '@/components/customers/CustomerFormDialog';
  ```
- [x] Añadir estado para controlar la visibilidad del modal
  ```typescript
  const [showAddDialog, setShowAddDialog] = useState(false);
  ```
- [x] Modificar el botón "Añadir Nuevo Cliente" para abrir el modal
  ```typescript
  <Button 
    className="bg-purple-600 hover:bg-purple-700"
    onClick={() => setShowAddDialog(true)}
  >
    <UserPlus className="mr-2 h-4 w-4" />
    Añadir Nuevo Cliente
  </Button>
  ```
- [x] Implementar función de callback para actualizar la lista
  ```typescript
  const handleAddSuccess = () => {
    refetch(); // Usando react-query para actualizar datos
  };
  ```
- [x] Integrar el componente de diálogo en el JSX

### 3. Implementar la comunicación con la API
- [x] Utilizar axios o fetch para realizar la petición POST:
  ```typescript
  try {
    await axios.post('/api/customers/', formData);
    onSuccess();
    onOpenChange(false);
    // Resetear el formulario
  } catch (error) {
    // Manejar errores
  }
  ```
- [x] Manejar posibles errores de validación del backend
- [x] Verificar formato correcto de los datos enviados

### 4. Validaciones y UX
- [x] Implementar validaciones de cliente:
  ```typescript
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  ```
- [x] Mostrar mensajes de error debajo de cada campo correspondiente
- [x] Añadir indicadores visuales durante la carga y envío

### 5. Pruebas
- [ ] Verificar apertura y cierre del modal
- [ ] Probar la validación de formularios
- [ ] Comprobar que se envíen correctamente los datos
- [ ] Verificar que se actualice la lista tras creación exitosa

## Estructura del componente CustomerFormDialog

```tsx
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

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    // Implementar validaciones
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // Implementar envío al backend
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Añadir Nuevo Cliente</DialogTitle>
          <DialogDescription className="text-gray-400">
            Complete el formulario para crear un nuevo cliente
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos del formulario */}
          
          <DialogFooter className="mt-6">
            {/* Botones */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormDialog;
``` 