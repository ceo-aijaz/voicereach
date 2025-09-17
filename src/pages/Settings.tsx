import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Key,
  Smartphone,
  Mail,
  Lock,
  Globe,
  Moon,
  Sun,
  Volume2,
  Database,
  Trash2
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    campaignUpdates: true,
    leadAlerts: false,
    weeklyReports: true
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          {/* Content here */}
        </main>
      </div>
    </SidebarProvider>
  );
      
      <div className="lg:ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 animate-fade-up">
            <h1 className="text-3xl font-bold font-display text-text-primary">Settings</h1>
            <p className="text-text-muted">Manage your account preferences and application settings</p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="bg-surface border border-border">
              <TabsTrigger value="account" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center space-x-2">
                <Key className="h-4 w-4" />
                <span>API Keys</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {user?.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="border-border hover:bg-surface">
                        Change Avatar
                      </Button>
                      <p className="text-sm text-text-muted">Upload a profile picture</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-text-primary">Email Address</Label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-surface border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-text-primary">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="bg-surface border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-text-primary">Company</Label>
                      <Input
                        id="company"
                        placeholder="Your company name"
                        className="bg-surface border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="text-text-primary">Timezone</Label>
                      <Input
                        id="timezone"
                        placeholder="UTC-5 (Eastern Time)"
                        className="bg-surface border-border"
                      />
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div className="space-y-4">
                    <h4 className="font-semibold text-text-primary">Preferences</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-text-muted" />
                        <div>
                          <p className="font-medium text-text-primary">Language</p>
                          <p className="text-sm text-text-muted">Choose your preferred language</p>
                        </div>
                      </div>
                      <Badge variant="secondary">English (US)</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Sun className="h-5 w-5 text-text-muted" />
                        <div>
                          <p className="font-medium text-text-primary">Dark Mode</p>
                          <p className="text-sm text-text-muted">Toggle dark mode interface</p>
                        </div>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-gradient-primary hover:shadow-primary">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-text-muted" />
                        <div>
                          <p className="font-medium text-text-primary">Email Notifications</p>
                          <p className="text-sm text-text-muted">Receive updates via email</p>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.email} 
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-text-muted" />
                        <div>
                          <p className="font-medium text-text-primary">Push Notifications</p>
                          <p className="text-sm text-text-muted">Get notified on your device</p>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.push} 
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                      />
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div className="space-y-4">
                    <h4 className="font-semibold text-text-primary">Campaign Notifications</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-text-primary">Campaign Updates</p>
                        <p className="text-sm text-text-muted">When campaigns complete or pause</p>
                      </div>
                      <Switch 
                        checked={notifications.campaignUpdates} 
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, campaignUpdates: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-text-primary">Lead Alerts</p>
                        <p className="text-sm text-text-muted">When high-quality leads respond</p>
                      </div>
                      <Switch 
                        checked={notifications.leadAlerts} 
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, leadAlerts: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-text-primary">Weekly Reports</p>
                        <p className="text-sm text-text-muted">Performance summary every week</p>
                      </div>
                      <Switch 
                        checked={notifications.weeklyReports} 
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg border border-border/50">
                      <div className="flex items-center space-x-3">
                        <Lock className="h-5 w-5 text-accent" />
                        <div>
                          <p className="font-medium text-text-primary">Password</p>
                          <p className="text-sm text-text-muted">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-border hover:bg-surface">
                        Change Password
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg border border-border/50">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-warning" />
                        <div>
                          <p className="font-medium text-text-primary">Two-Factor Authentication</p>
                          <p className="text-sm text-text-muted">Not enabled</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-border hover:bg-surface">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div className="space-y-4">
                    <h4 className="font-semibold text-text-primary">Account Actions</h4>
                    
                    <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center space-x-3">
                        <Trash2 className="h-5 w-5 text-destructive" />
                        <div>
                          <p className="font-medium text-text-primary">Delete Account</p>
                          <p className="text-sm text-text-muted">Permanently delete your account and all data</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Billing & Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gradient-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-text-primary">Current Plan</h4>
                        <p className="text-sm text-text-muted">Free Trial</p>
                      </div>
                      <Badge className="bg-accent/20 text-accent">14 days left</Badge>
                    </div>
                    <p className="text-text-muted mb-4">
                      You're currently on the free trial. Upgrade to unlock unlimited features.
                    </p>
                    <Button className="bg-gradient-primary hover:shadow-primary">
                      Upgrade to Pro
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-text-primary">Billing History</h4>
                    <div className="text-center py-8 text-text-muted">
                      No billing history yet
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">API Keys & Integrations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg border border-border/50">
                      <div>
                        <p className="font-medium text-text-primary">Facebook API</p>
                        <p className="text-sm text-text-muted">For automated DM sending</p>
                      </div>
                      <Badge className="bg-accent/20 text-accent">Connected</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg border border-border/50">
                      <div>
                        <p className="font-medium text-text-primary">Voice Cloning API</p>
                        <p className="text-sm text-text-muted">For AI voice generation</p>
                      </div>
                      <Badge className="bg-warning/20 text-warning">Needs Setup</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg border border-border/50">
                      <div>
                        <p className="font-medium text-text-primary">Webhook URL</p>
                        <p className="text-sm text-text-muted">For real-time campaign updates</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div className="space-y-4">
                    <h4 className="font-semibold text-text-primary">API Access</h4>
                    <div className="space-y-2">
                      <Label className="text-text-primary">API Key</Label>
                      <div className="flex space-x-2">
                        <Input
                          value="vl_••••••••••••••••••••••••••••••••"
                          disabled
                          className="bg-surface border-border flex-1"
                        />
                        <Button variant="outline" className="border-border hover:bg-surface">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;