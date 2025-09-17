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
import { 
  Settings as SettingsIcon,
  Mic2,
  CreditCard,
  Shield,
  CheckCircle
} from 'lucide-react';

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    company: 'Acme Inc'
  });

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
        <main className="flex-1">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold font-display text-text-primary">Settings</h1>
                  <p className="text-text-muted">Manage your account and application preferences</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="bg-surface border border-border">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="voice">Voice Settings</TabsTrigger>
                <TabsTrigger value="automation">Automation</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle className="text-text-primary">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-text-primary">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                          className="border-border focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-text-primary">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                          className="border-border focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-text-primary">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="border-border focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-text-primary">Company</Label>
                      <Input
                        id="company"
                        value={profile.company}
                        onChange={(e) => setProfile({...profile, company: e.target.value})}
                        className="border-border focus:border-primary"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-gradient-primary hover:shadow-primary">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="voice">
                <Card className="glass border-border/50">
                  <CardContent className="p-8 text-center">
                    <Mic2 className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Voice Settings</h3>
                    <p className="text-text-muted">Configure your voice cloning preferences</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="automation">
                <Card className="glass border-border/50">
                  <CardContent className="p-8 text-center">
                    <SettingsIcon className="h-16 w-16 text-warning mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Automation Settings</h3>
                    <p className="text-text-muted">Configure automation rules and schedules</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing">
                <Card className="glass border-border/50">
                  <CardContent className="p-8 text-center">
                    <CreditCard className="h-16 w-16 text-accent mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Billing & Subscription</h3>
                    <p className="text-text-muted">Manage your subscription and billing information</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="glass border-border/50">
                  <CardContent className="p-8 text-center">
                    <Shield className="h-16 w-16 text-error mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Security Settings</h3>
                    <p className="text-text-muted">Manage your password and security preferences</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;