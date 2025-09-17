import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Eye,
  Clock,
  BarChart3,
  Mic2,
  Play,
  Sparkles,
  Filter,
  Download
} from 'lucide-react';

const Analytics = () => {
  const quickStats = [
    { 
      title: 'Total Campaigns', 
      value: '3', 
      icon: MessageSquare, 
      color: 'text-primary',
      change: '+12%',
      trend: 'up'
    },
    { 
      title: 'Messages Sent', 
      value: '1,247', 
      icon: Mic2, 
      color: 'text-accent',
      change: '+8.2%',
      trend: 'up'
    },
    { 
      title: 'Response Rate', 
      value: '18.4%', 
      icon: TrendingUp, 
      color: 'text-warning',
      change: '+2.1%',
      trend: 'up'
    },
    { 
      title: 'Leads Generated', 
      value: '89', 
      icon: Users, 
      color: 'text-error',
      change: '-3.2%',
      trend: 'down'
    }
  ];

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
                  <h1 className="text-3xl font-bold font-display text-text-primary">Analytics Dashboard</h1>
                  <p className="text-text-muted">Track your voice DM campaign performance and insights</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="border-border hover:bg-surface">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" className="border-border hover:bg-surface">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickStats.map((stat, index) => (
                <Card key={index} className="glass border-border/50 hover:border-primary/20 transition-all hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      <Badge className={`${stat.trend === 'up' ? 'bg-accent/20 text-accent' : 'bg-warning/20 text-warning'} text-xs`}>
                        {stat.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-text-muted">{stat.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Voice Message Performance */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="text-text-primary">Voice Message Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Mic2 className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">No Voice Data Yet</h3>
                    <p className="text-text-muted mb-4">Start sending voice DMs to see performance analytics</p>
                    <Button className="bg-gradient-primary hover:shadow-primary">
                      <Play className="h-4 w-4 mr-2" />
                      Start Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Response Rate Trends */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="text-text-primary">Response Rate Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="h-16 w-16 text-accent mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Trend Analytics</h3>
                    <p className="text-text-muted">Track response rates over time</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;