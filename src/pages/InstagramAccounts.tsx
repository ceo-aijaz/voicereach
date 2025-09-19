import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useInstagramAccounts } from '@/hooks/useInstagramAccounts';
import { 
  Instagram, 
  Plus, 
  Settings, 
  Shield, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  MessageSquare,
  TrendingUp,
  Loader2,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InstagramAccounts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { accounts, loading, deleteAccount } = useInstagramAccounts();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-accent/20 text-accent';
      case 'warning': return 'bg-warning/20 text-warning';
      case 'error': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleAddAccount = () => {
    navigate('/instagram/connect');
  };

  const handleDeleteAccount = async (accountId: string, username: string) => {
    if (window.confirm(`Are you sure you want to delete the Instagram account @${username}?`)) {
      await deleteAccount(accountId);
    }
  };

  const activeAccounts = accounts.filter(account => account.status === 'active');
  const totalDMs = activeAccounts.length * 25; // Estimate based on active accounts
  const responseRate = accounts.length > 0 ? 15.5 : 0; // Sample response rate

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold font-display text-text-primary">Instagram Accounts</h1>
                <p className="text-text-muted">Connect and manage your Instagram accounts for voice DM automation</p>
              </div>
              <Button 
                onClick={handleAddAccount}
                className="bg-gradient-primary hover:shadow-primary hover-lift"
              >
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
                        <Instagram className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-text-primary">{accounts.length}</p>
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
                        <p className="text-2xl font-bold text-text-primary">{totalDMs}</p>
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
                        <p className="text-2xl font-bold text-text-primary">{responseRate}%</p>
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
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-800 rounded-full flex items-center justify-center">
                              <Instagram className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-text-primary">@{account.instagram_username}</h4>
                              <p className="text-sm text-text-muted">{account.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <Badge className={getStatusColor(account.status)} variant="secondary">
                              {getStatusIcon(account.status)}
                              <span className="ml-1 capitalize">{account.status}</span>
                            </Badge>
                            <Switch checked={account.status === 'active'} />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-text-primary">5</p>
                            <p className="text-xs text-text-muted">Sent Today</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-text-primary">50</p>
                            <p className="text-xs text-text-muted">Daily Limit</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-accent">12.5%</p>
                            <p className="text-xs text-text-muted">Response Rate</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-text-muted">Daily Usage</span>
                            <span className="text-text-primary">5/50</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                        
                        <div className="flex justify-end mt-4 space-x-2">
                          <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                            <Settings className="h-4 w-4 mr-1" />
                            Settings
                          </Button>
                          <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                            View Analytics
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-destructive/20 text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteAccount(account.id, account.instagram_username)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Instagram className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-text-muted mb-4">No Instagram accounts connected yet. Add your first account to get started!</p>
                      <Button 
                        onClick={handleAddAccount}
                        className="bg-gradient-primary hover:shadow-primary"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Connect Your First Account
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Safety Settings */}
            <div className="space-y-6">
              <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.2s' }}>
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
                    <label className="text-text-primary font-medium">Default Daily Limit</label>
                    <input
                      type="number"
                      placeholder="50"
                      className="w-full px-3 py-2 bg-surface border border-border rounded-md text-text-primary"
                    />
                  </div>
                  
                  <div className="text-xs text-text-muted p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Your credentials are encrypted and stored securely. We use advanced proxy rotation and human-like behavior patterns to protect your accounts.
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

export default InstagramAccounts;