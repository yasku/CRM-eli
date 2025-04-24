import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield,
  Upload,
  Save
} from 'lucide-react';

/**
 * Componente de página de Perfil
 * Permite a los usuarios administrar su configuración de perfil
 */
const Profile: React.FC = () => {
  console.log("Componente Profile montado");
  
  React.useEffect(() => {
    console.log("Profile: useEffect ejecutado");
  }, []);
  return (
    <div>
      {/* Encabezado de la página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Perfil</h1>
          <p className="text-gray-400 mt-1">Administra la configuración de tu cuenta</p>
        </div>
      </div>

      {/* Contenido del Perfil */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Barra lateral del Perfil */}
        <Card className="bg-gray-900 border-gray-800 lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
                  alt="Avatar del usuario" 
                  className="h-full w-full object-cover"
                />
              </Avatar>
              <h2 className="text-xl font-semibold text-white">Alex Morgan</h2>
              <p className="text-gray-400 mb-4">Dueño de Negocio</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Upload className="h-4 w-4 mr-2" />
                Cambiar Avatar
              </Button>
            </div>
            
            <div className="mt-6">
              <div className="text-sm text-gray-400 mb-2">Completado del Perfil</div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-2" style={{ width: '85%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">85% Completado</div>
            </div>
            
            <div className="mt-6">
              <div className="text-sm text-gray-400 mb-2">Información de la Cuenta</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-300">alex.morgan</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-300">alex@example.com</span>
                </div>
                <div className="flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-300">Notificaciones Activadas</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-300">2FA Activado</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuración del Perfil */}
        <Card className="bg-gray-900 border-gray-800 lg:col-span-3">
          <CardHeader className="pb-2">
            <Tabs defaultValue="general">
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="general" className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">
                  General
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">
                  Seguridad
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">
                  Notificaciones
                </TabsTrigger>
                <TabsTrigger value="billing" className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">
                  Facturación
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="general">
              <TabsContent value="general" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-300">Nombre Completo</Label>
                    <Input 
                      id="fullName" 
                      defaultValue="Alex Morgan" 
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-300">Nombre de Usuario</Label>
                    <Input 
                      id="username" 
                      defaultValue="alex.morgan" 
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Correo Electrónico</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue="alex@example.com" 
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Teléfono</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      defaultValue="+1 (555) 123-4567" 
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio" className="text-gray-300">Biografía</Label>
                    <textarea 
                      id="bio" 
                      rows={4} 
                      className="w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 p-2 focus:ring-2 focus:ring-blue-500/50"
                      defaultValue="Dueño de negocio y emprendedor con pasión por las ventas y relaciones con clientes."
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-200 text-lg">Cambiar Contraseña</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-gray-300">Contraseña Actual</Label>
                      <Input 
                        id="currentPassword" 
                        type="password" 
                        className="bg-gray-700 border-gray-600 text-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-gray-300">Nueva Contraseña</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        className="bg-gray-700 border-gray-600 text-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-300">Confirmar Nueva Contraseña</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        className="bg-gray-700 border-gray-600 text-gray-200"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-purple-600 hover:bg-purple-700">Actualizar Contraseña</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-200 text-lg">Autenticación de Dos Factores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300">Mejora la seguridad de tu cuenta activando 2FA</p>
                        <p className="text-gray-500 text-sm mt-1">Usa una aplicación de autenticación para generar códigos de un solo uso</p>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Shield className="h-4 w-4 mr-2" />
                        Activado
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-200">Notificaciones por Correo</h3>
                  <div className="space-y-2">
                    {['Notificaciones de nuevos pedidos', 'Registros de clientes', 'Alertas de inventario de productos', 'Confirmaciones de pago', 'Actualizaciones del sistema'].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-300">{item}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-purple-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Preferencias
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="billing" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-200 text-lg">Métodos de Pago</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 border border-gray-700 rounded-md mb-4">
                      <div className="flex items-center">
                        <CreditCard className="h-6 w-6 mr-3 text-purple-400" />
                        <div>
                          <p className="text-gray-300">Visa terminada en 4242</p>
                          <p className="text-gray-500 text-sm">Vence 12/2024</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-gray-700 text-gray-300">
                        Editar
                      </Button>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Añadir Método de Pago
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-200 text-lg">Historial de Facturación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { date: '15 Oct, 2023', amount: '$29.99', status: 'Pagado' },
                        { date: '15 Sep, 2023', amount: '$29.99', status: 'Pagado' },
                        { date: '15 Ago, 2023', amount: '$29.99', status: 'Pagado' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700">
                          <div>
                            <p className="text-gray-300">{item.date}</p>
                            <p className="text-gray-500 text-sm">Suscripción mensual</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-300">{item.amount}</p>
                            <p className="text-green-400 text-sm">{item.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
