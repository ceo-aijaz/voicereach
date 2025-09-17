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
  MessageCircle, 
  Mail, 
  Phone,
  BarChart3,
  Calendar,
  Download,
  Filter
} from 'lucide-react';

const Analytics = () => {
  const metrics = [
    {
      title: "Total Voice Messages",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: MessageCircle,
      color: "text-primary"
    },
    {
      title: "Response Rate",
      value: "68.3%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-accent"
    },
    {
      title: "New Leads",
      value: "423",
      change: "+8.1%",
      trend: "up",
      icon: Users,
      color: "text-warning"
    },
    {
      title: "Conversion Rate",
      value: "24.6%",
      change: "-1.3%",
      trend: "down",
      icon: BarChart3,
      color: "text-error"
    }
  ];

  const campaigns = [
    {
      name: "SaaS Founders Outreach",
      sent: 156,
      opened: 142,
      responded: 89,
      converted: 23,
      conversionRate: 14.7
    },
    {
      name: "Agency Owner Campaign",
      sent: 98,
      opened: 91,
      responded: 67,
      converted: 18,
      conversionRate: 18.4
    },
    {
      name: "E-commerce Follow-up",
      sent: 203,
      opened: 187,
      responded: 134,
      converted: 31,
      conversionRate: 15.3
    }
  ];

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
                <h1 className="text-3xl font-bold font-display text-text-primary">Analytics</h1>
                <p className="text-text-muted">Track your voice message performance and engagement metrics</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="border-border hover:bg-surface">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="border-border hover:bg-surface">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last 30 days
                </Button>
                <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <Card key={metric.title} className="glass border-border/50 animate-fade-up hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center`}>
                      <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${metric.trend === 'up' ? 'bg-accent/20 text-accent' : 'bg-error/20 text-error'} border-0`}
                    >
                      {metric.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-text-primary">{metric.value}</p>
                    <p className="text-sm text-text-muted">{metric.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Campaign Performance */}
            <div className="lg:col-span-2">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign, index) => (
                      <div key={campaign.name} className="p-4 rounded-lg bg-surface/30 border border-border/50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-text-primary">{campaign.name}</h4>
                          <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                            {campaign.conversionRate}% CVR
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <p className="text-lg font-bold text-text-primary">{campaign.sent}</p>
                            <p className="text-xs text-text-muted">Sent</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-accent">{campaign.opened}</p>
                            <p className="text-xs text-text-muted">Opened</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-warning">{campaign.responded}</p>
                            <p className="text-xs text-text-muted">Responded</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-primary">{campaign.converted}</p>
                            <p className="text-xs text-text-muted">Converted</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="text-text-primary">Avg. Message Length</span>
                    </div>
                    <span className="font-semibold text-text-primary">2m 34s</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <span className="text-text-primary">Best Send Time</span>
                    </div>
                    <span className="font-semibold text-text-primary">10:30 AM</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-warning" />
                      <span className="text-text-primary">Active Campaigns</span>
                    </div>
                    <span className="font-semibold text-text-primary">8</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Top Performing Voice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-1">Professional Tone</h4>
                    <p className="text-sm text-text-muted mb-3">76.2% response rate</p>
                    <Badge className="bg-accent/20 text-accent border-0">+12% vs avg</Badge>
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

export default Analytics;