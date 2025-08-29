import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MobileOptimized, MobileCard, MobileGrid } from '@/components/mobile/MobileOptimized';
import { GlowEffect, MagneticEffect } from '@/components/effects/PremiumEffects';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Mic2, 
  Play,
  PlusCircle,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Sparkles,
  Zap,
  Loader2
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { stats, campaigns, loading } = useRealTimeData();

  const statsDisplay = [
    { title: 'Voice DMs Sent', value: stats.voiceDMsSent.toLocaleString(), change: stats.voiceDMsChange, icon: MessageSquare, color: 'text-primary' },
    { title: 'Response Rate', value: stats.responseRate, change: stats.responseRateChange, icon: TrendingUp, color: 'text-accent' },
    { title: 'Active Leads', value: stats.activeLeads.toString(), change: stats.leadsChange, icon: Users, color: 'text-warning' },
    { title: 'Campaigns Running', value: stats.totalCampaigns.toString(), change: stats.campaignsChange, icon: Mic2, color: 'text-primary' },
  ];

  const recentCampaigns = campaigns.slice(0, 3).map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    status: campaign.status,
    sent: campaign.contacted_leads,
    responses: campaign.replied_leads,
    rate: campaign.contacted_leads > 0 ? `${((campaign.replied_leads / campaign.contacted_leads) * 100).toFixed(1)}%` : '0%'
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface/30">
      <Sidebar />
      
      <div className="lg:ml-64">
        <MobileOptimized className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8 animate-fade-up">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold font-display text-text-primary mb-2">
                  Welcome Back! 
                  <span className="text-gradient-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text">
                    Dashboard
                  </span>
                </h1>
                <p className="text-text-muted text-lg">Here's your voice outreach performance overview.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/voice">
                  <Button variant="outline" className="border-border hover:bg-surface hover-lift group">
                    <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    View Demo
                  </Button>
                </Link>
                <Link to="/campaigns">
                  <Button className="bg-gradient-primary hover:shadow-premium text-white text-lg font-bold px-8 py-4 h-auto hover-premium group rounded-2xl border-0 shadow-xl uppercase tracking-wide w-full sm:w-auto hover-scale transition-all duration-300">
                    <PlusCircle className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                    New Campaign
                    <Sparkles className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <GlowEffect>
              <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-3 text-base animate-pulse-glow">
                <Zap className="h-4 w-4 mr-2" />
                Your voice cloning is ready! Start your first campaign.
              </Badge>
            </GlowEffect>
          </div>

          {/* Stats Grid */}
          <MobileGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              statsDisplay.map((stat, index) => (
              <MagneticEffect key={index}>
                <GlowEffect>
                  <MobileCard className="glass border-border/50 hover:border-primary/20 transition-all hover-lift animate-bounce-in group cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                      <Badge variant="secondary" className="text-xs bg-accent/10 text-accent animate-pulse-glow">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">{stat.value}</div>
                    <div className="text-text-muted font-medium">{stat.title}</div>
                  </MobileCard>
                </GlowEffect>
              </MagneticEffect>
              ))
            )}
          </MobileGrid>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Campaigns */}
            <Card className="glass border-border/50 animate-fade-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-text-primary">Recent Campaigns</CardTitle>
                  <Link to="/campaigns">
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                      View All
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : recentCampaigns.length > 0 ? (
                  recentCampaigns.map((campaign, index) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 rounded-lg bg-surface/50 hover:bg-surface transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          campaign.status === 'active' ? 'bg-accent animate-pulse' :
                          campaign.status === 'paused' ? 'bg-warning' : 'bg-primary'
                        }`} />
                        <div>
                          <p className="font-medium text-text-primary">{campaign.name}</p>
                          <p className="text-sm text-text-muted capitalize">{campaign.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-text-primary">{campaign.rate}</p>
                        <p className="text-sm text-text-muted">{campaign.responses}/{campaign.sent}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-text-muted">No campaigns yet. Create your first campaign to get started!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Link to="/voice">
                    <Button className="h-16 justify-start bg-gradient-primary hover:shadow-premium text-white font-bold px-6 py-4 h-auto hover-premium group rounded-2xl border-0 shadow-xl w-full hover-scale transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Mic2 className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Clone Your Voice</p>
                          <p className="text-sm opacity-80">Upload 2-5 minutes of audio</p>
                        </div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/leads">
                    <Button className="h-16 justify-start bg-gradient-primary hover:shadow-premium text-white font-bold px-6 py-4 h-auto hover-premium group rounded-2xl border-0 shadow-xl w-full hover-scale transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Import Leads</p>
                          <p className="text-sm opacity-80">Scrape or upload lead lists</p>
                        </div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/campaigns">
                    <Button className="h-16 justify-start bg-gradient-primary hover:shadow-premium text-white font-bold px-6 py-4 h-auto hover-premium group rounded-2xl border-0 shadow-xl w-full hover-scale transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Create Campaign</p>
                          <p className="text-sm opacity-80">Start voice DM automation</p>
                        </div>
                      </div>
                    </Button>
                  </Link>
                </div>
                
                {/* Setup Progress */}
                <div className="mt-6 p-4 bg-surface/30 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-text-primary">Setup Progress</h4>
                    <span className="text-sm text-text-muted">{user ? '3/4' : '0/4'} completed</span>
                  </div>
                  <Progress value={user ? 75 : 0} className="mb-3" />
                  <div className="space-y-2 text-sm">
                    <div className={`flex items-center ${user ? 'text-accent' : 'text-text-muted'}`}>
                      {user ? <CheckCircle className="h-4 w-4 mr-2" /> : <Clock className="h-4 w-4 mr-2" />}
                      Account created
                    </div>
                    <div className="flex items-center text-accent">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Voice sample uploaded
                    </div>
                    <div className="flex items-center text-accent">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Supabase connected
                    </div>
                    <Link to="/campaigns" className="flex items-center text-text-muted hover:text-primary transition-colors">
                      <Clock className="h-4 w-4 mr-2" />
                      Launch first campaign
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </MobileOptimized>
      </div>
    </div>
  );
};

export default Dashboard;