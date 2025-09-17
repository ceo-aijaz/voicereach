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
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { 
  Facebook, 
  Plus, 
  Settings, 
  Shield, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  MessageSquare,
  TrendingUp,
  Loader2
} from 'lucide-react';

const FacebookConnect = () => {
  const { facebookAccounts, stats, loading } = useRealTimeData();
  
  // Map real data to display format
  const accounts = facebookAccounts.map(account => ({
    id: account.id,
    username: account.account_name,
    status: account.status,
    followers: 'N/A', // You can add follower tracking later
    dailyLimit: account.daily_call_limit,
    sentToday: account.calls_made_today,
    responseRate: 'N/A', // You can calculate this from interactions
    isActive: account.status === 'active'
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-accent/20 text-accent';
      case 'warning': return 'bg-warning/20 text-warning';
      case 'error': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold font-display text-text-primary">Facebook Accounts</h1>
                <p className="text-text-muted">Connect and manage your Facebook accounts for voice DM automation</p>
              </div>
              <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="glass border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Facebook className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-text-primary">{facebookAccounts.length}</p>
                        <p className="text-sm text-text-muted">Connected Accounts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-text-primary">{stats.voiceDMsSent}</p>
                        <p className="text-sm text-text-muted">DMs Sent Total</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-text-primary">{stats.responseRate}</p>
                        <p className="text-sm text-text-muted">Avg Response Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Connected Accounts */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Connected Accounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : accounts.length > 0 ? (
                    accounts.map((account, index) => (
                      <div key={account.id} className="p-6 rounded-lg bg-surface/50 hover:bg-surface transition-all hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                            <Facebook className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-text-primary">{account.username}</h4>
                            <p className="text-sm text-text-muted">{account.followers} followers</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(account.status)} variant="secondary">
                            {getStatusIcon(account.status)}
                            <span className="ml-1 capitalize">{account.status}</span>
                          </Badge>
                          <Switch checked={account.isActive} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-text-primary">{account.sentToday}</p>
                          <p className="text-xs text-text-muted">Sent Today</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-text-primary">{account.dailyLimit}</p>
                          <p className="text-xs text-text-muted">Daily Limit</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-accent">{account.responseRate}</p>
                          <p className="text-xs text-text-muted">Response Rate</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-muted">Daily Usage</span>
                          <span className="text-text-primary">{account.sentToday}/{account.dailyLimit}</span>
                        </div>
                        <Progress 
                          value={(account.sentToday / account.dailyLimit) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="flex justify-end mt-4 space-x-2">
                        <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                          <Settings className="h-4 w-4 mr-1" />
                          Settings
                        </Button>
                        <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                          View Analytics
                        </Button>
                      </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-text-muted">No Facebook accounts connected yet. Add your first account to get started!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Add New Account & Safety Settings */}
            <div className="space-y-6">
              <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="text-text-primary">Add New Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-text-primary">Facebook Username</Label>
                    <Input
                      id="username"
                      placeholder="your_username"
                      className="bg-surface border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-text-primary">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-surface border-border"
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-primary hover:shadow-primary">
                    <Facebook className="h-4 w-4 mr-2" />
                    Connect Account
                  </Button>
                  
                  <div className="text-xs text-text-muted p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Your credentials are encrypted and stored securely. We use advanced proxy rotation and human-like behavior patterns to protect your accounts.
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <CardTitle className="text-text-primary">Safety Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">Auto-pause on limits</p>
                      <p className="text-sm text-text-muted">Automatically pause when daily limits are reached</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">Smart delays</p>
                      <p className="text-sm text-text-muted">Add random delays between messages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">Account rotation</p>
                      <p className="text-sm text-text-muted">Rotate between accounts automatically</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-text-primary">Default Daily Limit</Label>
                    <Input
                      type="number"
                      placeholder="150"
                      className="bg-surface border-border"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacebookConnect;