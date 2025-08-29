import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Square, 
  Plus, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  Settings,
  BarChart3,
  Mic2
} from 'lucide-react';

const Campaigns = () => {
  const campaigns = [
    {
      id: 1,
      name: 'SaaS Founders Outreach',
      status: 'active',
      progress: 65,
      sent: 1247,
      total: 1900,
      responses: 234,
      responseRate: '18.8%',
      voiceClone: 'Professional Tone',
      schedule: 'Daily 9AM-6PM',
      created: '2 days ago'
    },
    {
      id: 2,
      name: 'E-commerce Agency Leads',
      status: 'paused',
      progress: 42,
      sent: 856,
      total: 2100,
      responses: 147,
      responseRate: '17.2%',
      voiceClone: 'Friendly Casual',
      schedule: 'Daily 10AM-5PM',
      created: '5 days ago'
    },
    {
      id: 3,
      name: 'Marketing Directors Q4',
      status: 'completed',
      progress: 100,
      sent: 1654,
      total: 1654,
      responses: 312,
      responseRate: '18.9%',
      voiceClone: 'Professional Tone',
      schedule: 'Completed',
      created: '1 week ago'
    },
    {
      id: 4,
      name: 'Startup CEOs Series',
      status: 'draft',
      progress: 0,
      sent: 0,
      total: 2500,
      responses: 0,
      responseRate: '0%',
      voiceClone: 'Enthusiastic',
      schedule: 'Not scheduled',
      created: '3 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-accent/20 text-accent';
      case 'paused': return 'bg-warning/20 text-warning';
      case 'completed': return 'bg-primary/20 text-primary';
      case 'draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'draft': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const stats = [
    { title: 'Active Campaigns', value: '2', icon: Play, color: 'text-accent' },
    { title: 'Total Sent', value: '3,757', icon: MessageSquare, color: 'text-primary' },
    { title: 'Total Responses', value: '693', icon: Users, color: 'text-warning' },
    { title: 'Avg Response Rate', value: '18.4%', icon: TrendingUp, color: 'text-accent' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold font-display text-text-primary">Voice Campaigns</h1>
                <p className="text-text-muted">Create and manage your voice DM automation campaigns</p>
              </div>
              <Button 
                className="bg-gradient-primary hover:shadow-primary hover-lift"
                onClick={() => window.location.href = '/campaign-builder'}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
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

          <Tabs defaultValue="all-campaigns" className="space-y-6">
            <TabsList className="bg-surface border border-border">
              <TabsTrigger value="all-campaigns">All Campaigns (4)</TabsTrigger>
              <TabsTrigger value="active">Active (2)</TabsTrigger>
              <TabsTrigger value="completed">Completed (1)</TabsTrigger>
              <TabsTrigger value="drafts">Drafts (1)</TabsTrigger>
            </TabsList>

            <TabsContent value="all-campaigns" className="space-y-4">
              <div className="grid gap-6">
                {campaigns.map((campaign, index) => (
                  <Card key={campaign.id} className="glass border-border/50 hover:border-primary/20 transition-all hover-lift animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                            <Mic2 className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-text-primary">{campaign.name}</h3>
                            <p className="text-sm text-text-muted">{campaign.voiceClone} • {campaign.schedule}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(campaign.status)} variant="secondary">
                            {getStatusIcon(campaign.status)}
                            <span className="ml-1 capitalize">{campaign.status}</span>
                          </Badge>
                          
                          <div className="flex space-x-2">
                            {campaign.status === 'active' && (
                              <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                                <Pause className="h-4 w-4" />
                              </Button>
                            )}
                            {campaign.status === 'paused' && (
                              <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                            {campaign.status === 'draft' && (
                              <Button size="sm" className="bg-gradient-primary hover:shadow-primary">
                                <Play className="h-4 w-4 mr-1" />
                                Launch
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-text-primary">{campaign.sent}</p>
                          <p className="text-xs text-text-muted">Messages Sent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-text-primary">{campaign.total}</p>
                          <p className="text-xs text-text-muted">Total Leads</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-accent">{campaign.responses}</p>
                          <p className="text-xs text-text-muted">Responses</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">{campaign.responseRate}</p>
                          <p className="text-xs text-text-muted">Response Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-text-primary">{campaign.created}</p>
                          <p className="text-xs text-text-muted">Created</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-muted">Campaign Progress</span>
                          <span className="text-text-primary">{campaign.progress}%</span>
                        </div>
                        <Progress value={campaign.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          View Analytics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active">
              <Card className="glass border-border/50">
                <CardContent className="p-8 text-center">
                  <Play className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Active Campaigns</h3>
                  <p className="text-text-muted">Your currently running voice DM campaigns</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed">
              <Card className="glass border-border/50">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Completed Campaigns</h3>
                  <p className="text-text-muted">Successfully finished campaigns with full analytics</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="drafts">
              <Card className="glass border-border/50">
                <CardContent className="p-8 text-center">
                  <Clock className="h-16 w-16 text-warning mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Draft Campaigns</h3>
                  <p className="text-text-muted">Campaigns ready to launch when you are</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;