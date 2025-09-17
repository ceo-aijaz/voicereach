import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { 
  Users,
  MessageSquare, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Upload,
  Filter,
  Download
} from 'lucide-react';

const Leads = () => {
  const { leads } = useRealTimeData();

  const stats = [
    { title: 'Total Leads', value: '247', icon: Users, color: 'text-primary' },
    { title: 'Active', value: '89', icon: MessageSquare, color: 'text-accent' },
    { title: 'Responded', value: '23', icon: TrendingUp, color: 'text-warning' },
    { title: 'Converted', value: '7', icon: CheckCircle, color: 'text-success' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-primary/20 text-primary';
      case 'contacted': return 'bg-warning/20 text-warning';
      case 'responded': return 'bg-accent/20 text-accent';
      case 'converted': return 'bg-success/20 text-success';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="h-3 w-3" />;
      case 'contacted': return <MessageSquare className="h-3 w-3" />;
      case 'responded': return <CheckCircle className="h-3 w-3" />;
      case 'converted': return <TrendingUp className="h-3 w-3" />;
      default: return <AlertCircle className="h-3 w-3" />;
    }
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
                  <h1 className="text-3xl font-bold font-display text-text-primary">Leads Management</h1>
                  <p className="text-text-muted">Manage and organize your voice DM leads</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" className="border-border hover:bg-surface">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Leads
                  </Button>
                  <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lead
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="glass border-border/50 hover:border-primary/20 transition-all hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-text-muted">{stat.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="all-leads" className="space-y-6">
              <TabsList className="bg-surface border border-border">
                <TabsTrigger value="all-leads">All Leads ({leads.length})</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="contacted">Contacted</TabsTrigger>
                <TabsTrigger value="responded">Responded</TabsTrigger>
              </TabsList>

              <TabsContent value="all-leads" className="space-y-4">
                <div className="grid gap-6">
                  {leads.map((lead, index) => (
                    <Card key={lead.id} className="glass border-border/50 hover:border-primary/20 transition-all hover-lift animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">
                                {lead.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-text-primary">{lead.name}</h3>
                              <p className="text-sm text-text-muted">{lead.company}</p>
                              <p className="text-sm text-text-muted">{lead.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <Badge className={getStatusColor(lead.status)} variant="secondary">
                              {getStatusIcon(lead.status)}
                              <span className="ml-1 capitalize">{lead.status}</span>
                            </Badge>
                            
                            <div className="text-right">
                              <p className="text-sm font-medium text-text-primary">LinkedIn</p>
                              <p className="text-xs text-text-muted">Today</p>
                            </div>
                            
                            <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="active">
                <Card className="glass border-border/50">
                  <CardContent className="p-8 text-center">
                    <Users className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Active Leads</h3>
                    <p className="text-text-muted">Leads currently in your active campaigns</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contacted">
                <Card className="glass border-border/50">
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-16 w-16 text-warning mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Contacted Leads</h3>
                    <p className="text-text-muted">Leads who have been reached out to</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="responded">
                <Card className="glass border-border/50">
                  <CardContent className="p-8 text-center">
                    <TrendingUp className="h-16 w-16 text-accent mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Responded Leads</h3>
                    <p className="text-text-muted">Leads who have responded to your outreach</p>
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

export default Leads;