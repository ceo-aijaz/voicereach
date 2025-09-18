import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, SidebarProvider, useSidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileOptimized } from '@/components/mobile/MobileOptimized';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useAuth } from '@/contexts/AuthContext';
import { CollapseMenuIcon } from '@/components/ui/collapse-menu';
import { 
  Users, 
  MessageSquare, 
  Mail,
  Eye,
  Clock,
  Bell,
  Settings,
  ChevronRight,
  Info,
  Mic,
  TrendingUp,
  Target,
  BarChart3
} from 'lucide-react';

const DashboardContent = () => {
  const { user } = useAuth();
  const { stats, campaigns, loading } = useRealTimeData();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  // Get current time and greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserName = () => {
    return user?.email?.split('@')[0] || 'User';
  };

  // Statistics data for voice outreach with real data
  const statisticsData = [
    {
      title: 'Voice Send',
      value: stats.totalVoiceSent.toString(),
      total: '25',
      percentage: `${Math.round((stats.totalVoiceSent / 25) * 100)}%`,
      icon: Mic,
      color: 'text-primary'
    },
    {
      title: 'Open Rate',
      value: stats.engagementRate.toString(),
      total: '100',
      percentage: `${stats.engagementRate}%`,
      icon: Eye,
      color: 'text-accent'
    },
    {
      title: 'Profile Viewed',
      value: stats.qualifiedLeads.toString(),
      total: stats.totalLeads.toString(),
      percentage: stats.totalLeads > 0 ? `${Math.round((stats.qualifiedLeads / stats.totalLeads) * 100)}%` : '0%',
      icon: Users,
      color: 'text-warning'
    },
    {
      title: 'Total Campaign',
      value: stats.activeCampaigns.toString(),
      total: campaigns.length.toString(),
      percentage: campaigns.length > 0 ? `${Math.round((stats.activeCampaigns / campaigns.length) * 100)}%` : '0%',
      icon: Target,
      color: 'text-success'
    }
  ];

  // Detailed stats cards with real data
  const detailedStats = [
    {
      title: 'TOTAL VOICE SEND',
      value: stats.totalVoiceSent.toString(),
      hasAction: true,
      actionText: 'View All',
      actionVariant: 'outline' as const,
      icon: Mic,
      color: 'text-primary'
    },
    {
      title: 'ENGAGEMENT RATE',
      value: `${stats.engagementRate}%`,
      hasAction: false,
      icon: TrendingUp,
      color: 'text-accent'
    },
    {
      title: 'ACTIVE CAMPAIGNS',
      value: stats.activeCampaigns.toString(),
      hasAction: false,
      icon: BarChart3,
      color: 'text-success'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className={`min-h-screen transition-all duration-300 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Collapse Toggle Button */}
        <div className="hidden lg:block fixed top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="glass border border-border/50 shadow-glow hover-lift transition-all duration-300 text-text-primary hover:text-primary"
          >
            <CollapseMenuIcon className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        <MobileOptimized className="p-6 lg:p-8 max-w-7xl mx-auto pt-16 lg:pt-8">
          {/* Campaign Status Alert */}
          <div className="mb-6 animate-fade-up">
            <div className="glass border border-primary/20 rounded-lg p-4 flex items-center gap-3">
              <Info className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-text-primary">
                  Your campaigns are not operating since they're outside of working hours at the moment.{' '}
                  <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Adjust my schedule
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Personal Greeting */}
          <div className="mb-8 animate-fade-up">
            <h1 className="text-3xl font-bold font-display text-text-primary mb-2">
              {getGreeting()}, {getUserName()}!
            </h1>
            <p className="text-text-muted">Here's what's happening with your voice outreach campaigns today</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Statistics */}
            <div className="lg:col-span-2 space-y-8">
              {/* Statistics Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">Statistics</h2>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                    View More
                  </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {statisticsData.map((stat, index) => (
                    <Card key={index} className="glass border-border/50 hover:border-primary/20 transition-all hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                          <TrendingUp className="h-4 w-4 text-accent" />
                        </div>
                        <div className="text-2xl font-bold text-text-primary mb-1">
                          {stat.percentage}
                        </div>
                        <div className="text-sm text-text-muted mb-2">
                          {stat.value} / {stat.total}
                        </div>
                        <div className="text-sm font-medium text-text-primary">
                          {stat.title}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Detailed Statistics */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {detailedStats.map((stat, index) => (
                    <Card key={index} className="glass border-border/50 hover:border-primary/20 transition-all hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-xs font-medium text-text-muted uppercase tracking-wide">
                            {stat.title}
                          </div>
                          {stat.icon && <stat.icon className={`h-4 w-4 ${stat.color}`} />}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold text-text-primary">
                            {stat.value}
                          </div>
                          {stat.hasAction && (
                            <Button 
                              variant={stat.actionVariant} 
                              size="sm"
                              className="border-border hover:bg-surface text-sm"
                            >
                              {stat.actionText}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Campaigns */}
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-6">Recent campaigns</h2>
                <Card className="glass border-border/50 animate-fade-up">
                  <CardContent className="p-8 text-center">
                    <div className="text-text-muted mb-4">
                      <Mic className="h-12 w-12 mx-auto mb-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-text-primary mb-2">No voice campaigns yet</h3>
                    <p className="text-text-muted mb-6">Create your first voice campaign to start generating leads.</p>
                    <Link to="/campaigns">
                      <Button className="bg-gradient-primary hover:shadow-primary hover-lift text-white">
                        Create Voice Campaign
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Recent Activity */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-6">Recent activity</h2>
                <Card className="glass border-border/50 animate-fade-up">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-text-primary mb-2">No activity yet</h3>
                    <p className="text-text-muted text-sm">
                      Your recent activities will appear here once you start using the platform.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Action Card */}
              <Card className="glass bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 animate-fade-up hover-lift">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-primary">
                      <Mic className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">Ready to start?</h3>
                    <p className="text-sm text-text-muted mb-4">
                      Create voice campaigns and connect with your target audience.
                    </p>
                    <Link to="/campaigns">
                      <Button className="bg-gradient-primary hover:shadow-primary hover-lift text-white w-full">
                        Start Voice Outreach
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </MobileOptimized>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
};

export default Dashboard;