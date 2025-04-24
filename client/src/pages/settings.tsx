import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Settings as SettingsIcon, 
  Users, 
  Globe, 
  Shield, 
  Database,
  Building,
  Save,
  AlertTriangle
} from 'lucide-react';

/**
 * Settings page component
 * Allows users to configure application settings
 */
const Settings: React.FC = () => {
  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Configure your application preferences</p>
        </div>
      </div>

      {/* Settings Content */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-2">
          <Tabs defaultValue="general">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="general" className="data-[state=active]:bg-gray-700">
                <SettingsIcon className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="company" className="data-[state=active]:bg-gray-700">
                <Building className="h-4 w-4 mr-2" />
                Company
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-gray-700">
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-gray-700">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-gray-700">
                <Database className="h-4 w-4 mr-2" />
                Advanced
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="general">
            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Application Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-gray-300">Language</Label>
                    <select 
                      id="language" 
                      className="w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 h-10 px-3"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="pt">Portuguese</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-gray-300">Timezone</Label>
                    <select 
                      id="timezone" 
                      className="w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 h-10 px-3"
                    >
                      <option value="utc">UTC (GMT)</option>
                      <option value="est">Eastern Time</option>
                      <option value="cst">Central Time</option>
                      <option value="mst">Mountain Time</option>
                      <option value="pst">Pacific Time</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-200 font-medium">Dark Mode</h4>
                      <p className="text-gray-500 text-sm">Enable dark mode for the application</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-200 font-medium">Notifications</h4>
                      <p className="text-gray-500 text-sm">Enable in-app notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-200 font-medium">Sound Effects</h4>
                      <p className="text-gray-500 text-sm">Enable sound effects for notifications</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Regional Format</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-gray-300">Currency</Label>
                    <select 
                      id="currency" 
                      className="w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 h-10 px-3"
                    >
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                      <option value="jpy">JPY (¥)</option>
                      <option value="cad">CAD ($)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat" className="text-gray-300">Date Format</Label>
                    <select 
                      id="dateFormat" 
                      className="w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 h-10 px-3"
                    >
                      <option value="mdy">MM/DD/YYYY</option>
                      <option value="dmy">DD/MM/YYYY</option>
                      <option value="ymd">YYYY/MM/DD</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </TabsContent>

            {/* Company Settings */}
            <TabsContent value="company" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Company Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-gray-300">Company Name</Label>
                    <Input 
                      id="companyName" 
                      defaultValue="SalesPro Inc." 
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-gray-300">Contact Email</Label>
                    <Input 
                      id="contactEmail" 
                      type="email" 
                      defaultValue="contact@salespro.com" 
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="text-gray-300">Contact Phone</Label>
                    <Input 
                      id="contactPhone" 
                      defaultValue="+1 (555) 987-6543" 
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-gray-300">Website</Label>
                    <Input 
                      id="website" 
                      defaultValue="https://www.salespro.com" 
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="text-gray-300">Business Address</Label>
                    <textarea 
                      id="address" 
                      rows={3} 
                      className="w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 p-2 focus:ring-2 focus:ring-blue-500/50"
                      defaultValue="123 Business Street, Suite 101, Metropolis, NY 10001, USA"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Business Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="text-gray-300">Tax ID / VAT Number</Label>
                    <Input 
                      id="taxId" 
                      defaultValue="US123456789" 
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-gray-300">Business Type</Label>
                    <select 
                      id="businessType" 
                      className="w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 h-10 px-3"
                    >
                      <option value="corporation">Corporation</option>
                      <option value="llc">LLC</option>
                      <option value="partnership">Partnership</option>
                      <option value="soleProprietor">Sole Proprietorship</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Company Information
                </Button>
              </div>
            </TabsContent>

            {/* Users Settings */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">User Management</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Users className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {[
                      { name: 'Alex Morgan', email: 'alex@example.com', role: 'Admin', status: 'Active' },
                      { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Manager', status: 'Active' },
                      { name: 'Michael Chen', email: 'michael@example.com', role: 'User', status: 'Inactive' }
                    ].map((user, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 mr-3">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-gray-200 font-medium">{user.name}</p>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full mr-4 ${
                            user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {user.status}
                          </span>
                          <span className="text-gray-300 mr-4">{user.role}</span>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                            <SettingsIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Security Settings</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-200 font-medium">Two-Factor Authentication</h4>
                      <p className="text-gray-500 text-sm">Require 2FA for all users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-200 font-medium">Password Expiry</h4>
                      <p className="text-gray-500 text-sm">Force password reset every 90 days</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-200 font-medium">Failed Login Lockout</h4>
                      <p className="text-gray-500 text-sm">Lock account after 5 failed attempts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Password Policy</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-200 font-medium">Minimum Length (8 characters)</h4>
                      <p className="text-gray-500 text-sm">Require at least 8 characters</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-200 font-medium">Require Special Characters</h4>
                      <p className="text-gray-500 text-sm">Must include at least one special character</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-200 font-medium">Require Numbers</h4>
                      <p className="text-gray-500 text-sm">Must include at least one number</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </TabsContent>

            {/* Advanced Settings */}
            <TabsContent value="advanced" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">System Settings</h3>
                
                <div className="space-y-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-200 text-lg flex items-center">
                        <Database className="h-5 w-5 mr-2" />
                        Data Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-gray-200 font-medium">Database Backup</h4>
                          <p className="text-gray-500 text-sm">Last backup: 12 hours ago</p>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Backup Now
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-gray-200 font-medium">Export Data</h4>
                          <p className="text-gray-500 text-sm">Export all system data</p>
                        </div>
                        <Button variant="outline" className="border-gray-700 text-gray-300">
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-yellow-900/20 border-yellow-800">
                    <CardHeader>
                      <CardTitle className="text-yellow-200 text-lg flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Danger Zone
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-yellow-200 font-medium">Clear All Data</h4>
                          <p className="text-yellow-400/80 text-sm">This will permanently erase all data</p>
                        </div>
                        <Button variant="destructive">
                          Clear Data
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-yellow-200 font-medium">Reset System</h4>
                          <p className="text-yellow-400/80 text-sm">Reset to factory defaults</p>
                        </div>
                        <Button variant="destructive">
                          Reset
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
