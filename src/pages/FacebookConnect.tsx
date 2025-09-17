import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Facebook,
  Plus,
  Settings,
  CheckCircle,
  AlertCircle,
  Download,
  Shield,
  MessageSquare
} from 'lucide-react';

const FacebookConnect = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      status: 'active',
      enabled: true,
      friends: '1,247',
      messages: '89',
      responses: '23',
      lastSync: '2 hours ago'
    }
  ]);

  const toggleAccount = (id: number, enabled: boolean) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { ...account, enabled } : account
    ));
  };

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
                  <h1 className="text-3xl font-bold font-display text-text-primary">Facebook Accounts</h1>
                  <p className="text-text-muted">Connect and manage your Facebook accounts for outreach</p>
                </div>
                <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
                  <Plus className="h-4 w-4 mr-2" />
                  Connect Account
                </Button>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="grid gap-6 mb-8">
              {accounts.map((account, index) => (
                <Card key={account.id} className="glass border-border/50 hover:border-primary/20 transition-all hover-lift animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          <Facebook className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-text-primary">{account.name}</h3>
                          <p className="text-sm text-text-muted">{account.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={account.status === 'active' ? 'bg-accent/20 text-accent' : 'bg-warning/20 text-warning'}>
                          {account.status === 'active' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertCircle className="h-3 w-3 mr-1" />
                          )}
                          {account.status}
                        </Badge>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={account.enabled}
                            onCheckedChange={(checked) => toggleAccount(account.id, checked)}
                          />
                          <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default FacebookConnect;