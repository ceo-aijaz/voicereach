import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRealTimeData } from '@/hooks/useRealTimeData';
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
  const { stats, campaigns, leads, voiceAccounts, loading } = useRealTimeData();

  // Debug logging to see real data
  console.log('Analytics Data:', {
    campaignsCount: campaigns.length,
    leadsCount: leads.length,
    voiceAccountsCount: voiceAccounts.length,
    voiceAccounts: voiceAccounts,
    leads: leads,
    campaigns: campaigns
  });

  // Calculate real analytics data
  const totalVoiceSent = voiceAccounts.filter(va => va.voice_message_sent).length;
  const totalVoiceOpened = voiceAccounts.filter(va => va.voice_message_opened).length;
  const totalResponses = voiceAccounts.filter(va => va.response_received).length;
  const responseRate = totalVoiceSent > 0 ? (totalResponses / totalVoiceSent * 100) : 0;
  const openRate = totalVoiceSent > 0 ? (totalVoiceOpened / totalVoiceSent * 100) : 0;
  const conversionRate = leads.length > 0 ? (leads.filter(lead => lead.status === 'responded').length / leads.length * 100) : 0;

  console.log('Calculated Analytics:', {
    totalVoiceSent,
    totalVoiceOpened,
    totalResponses,
    responseRate,
    openRate,
    conversionRate
  });

  const metrics = [
    {
      title: "Total Voice Messages",
      value: totalVoiceSent.toString(),
      change: totalVoiceSent > 0 ? "Active" : "No Data",
      trend: totalVoiceSent > 0 ? "up" : "neutral",
      icon: MessageCircle,
      color: "text-primary"
    },
    {
      title: "Open Rate",
      value: `${openRate.toFixed(1)}%`,
      change: openRate > 0 ? "Tracked" : "No Data",
      trend: openRate > 50 ? "up" : openRate > 0 ? "neutral" : "down",
      icon: TrendingUp,
      color: "text-accent"
    },
    {
      title: "Total Leads",
      value: leads.length.toString(),
      change: leads.length > 0 ? "Growing" : "New",
      trend: leads.length > 0 ? "up" : "neutral",
      icon: Users,
      color: "text-warning"
    },
    {
      title: "Response Rate",
      value: `${responseRate.toFixed(1)}%`,
      change: responseRate > 0 ? (responseRate > 25 ? "Good" : "Fair") : "No Data",
      trend: responseRate > 25 ? "up" : responseRate > 0 ? "neutral" : "down",
      icon: BarChart3,
      color: responseRate > 25 ? "text-accent" : responseRate > 0 ? "text-warning" : "text-error"
    }
  ];

  // Transform real campaign data for display
  const campaignAnalytics = campaigns.map(campaign => {
    const campaignVoiceAccounts = voiceAccounts.filter(va => va.campaign_id === campaign.id);
    const campaignLeads = leads.filter(lead => lead.campaign_id === campaign.id);
    
    const sent = campaignVoiceAccounts.filter(va => va.voice_message_sent).length;
    const opened = campaignVoiceAccounts.filter(va => va.voice_message_opened).length;
    const responded = campaignVoiceAccounts.filter(va => va.response_received).length;
    const converted = campaignLeads.filter(lead => lead.status === 'responded').length;
    const conversionRate = sent > 0 ? (converted / sent * 100) : 0;

    return {
      name: campaign.name,
      sent,
      opened,
      responded,
      converted,
      conversionRate: conversionRate.toFixed(1)
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
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
                      className={`${
                        metric.trend === 'up' 
                          ? 'bg-accent/20 text-accent' 
                          : metric.trend === 'neutral'
                          ? 'bg-warning/20 text-warning'
                          : 'bg-error/20 text-error'
                      } border-0`}
                    >
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : metric.trend === 'down' ? (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      ) : (
                        <div className="h-3 w-3 mr-1 rounded-full bg-current opacity-60" />
                      )}
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
                    {campaignAnalytics.length > 0 ? (
                      campaignAnalytics.map((campaign, index) => (
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
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium text-text-primary mb-2">No Campaign Data</h3>
                        <p className="text-text-muted">Create campaigns to see performance analytics here.</p>
                      </div>
                    )}
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
                      <span className="text-text-primary">Total Voice Sent</span>
                    </div>
                    <span className="font-semibold text-text-primary">{totalVoiceSent}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <span className="text-text-primary">Messages Opened</span>
                    </div>
                    <span className="font-semibold text-text-primary">{totalVoiceOpened}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-warning" />
                      <span className="text-text-primary">Active Campaigns</span>
                    </div>
                    <span className="font-semibold text-text-primary">{stats.activeCampaigns}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <span className="text-text-primary">Total Responses</span>
                    </div>
                    <span className="font-semibold text-text-primary">{totalResponses}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-1">Overall Stats</h4>
                    <p className="text-sm text-text-muted mb-3">{responseRate.toFixed(1)}% response rate</p>
                    <Badge className={`${responseRate > 15 ? 'bg-accent/20 text-accent' : 'bg-warning/20 text-warning'} border-0`}>
                      {responseRate > 15 ? 'Above Average' : 'Room for Growth'}
                    </Badge>
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