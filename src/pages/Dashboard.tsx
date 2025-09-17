import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import { MobileOptimized } from '@/components/mobile/MobileOptimized';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  MessageSquare, 
  Mail,
  Eye,
  Clock,
  Bell,
  Settings,
  ChevronRight,
  Info
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { stats, campaigns, loading } = useRealTimeData();

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

  // Statistics data inspired by Dripify
  const statisticsData = [
    {
      title: 'Invites sent',
      value: '0',
      total: '5',
      percentage: '0%',
      icon: Users
    },
    {
      title: 'Messages sent',
      value: '0',
      total: '5',
      percentage: '0%',
      icon: MessageSquare
    },
    {
      title: 'Emails sent',
      value: '0',
      total: '20',
      percentage: '0%',
      icon: Mail
    },
    {
      title: 'Profile viewed',
      value: '0',
      total: '5',
      percentage: '0%',
      icon: Eye
    }
  ];

  // Detailed stats cards
  const detailedStats = [
    {
      title: 'PENDING INVITATIONS',
      value: '11',
      hasAction: true,
      actionText: 'Withdraw',
      actionVariant: 'outline' as const
    },
    {
      title: 'UNREAD MESSAGES',
      value: '0',
      hasAction: false
    },
    {
      title: 'PROFILE VIEWS SINCE LAST WEEK',
      value: '0%',
      hasAction: false
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        
        <main className="flex-1 min-h-screen">
          <MobileOptimized className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Campaign Status Alert */}
            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    Your campaigns are not operating since they're outside of working hours at the moment.{' '}
                    <button className="text-primary hover:underline font-medium">
                      Adjust my schedule
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Greeting */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                {getGreeting()}, {getUserName()}! 👋
              </h1>
              <p className="text-gray-600">Here's what's happening with your LinkedIn account today</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Statistics */}
              <div className="lg:col-span-2 space-y-8">
                {/* Statistics Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Statistics</h2>
                    <button className="text-primary hover:underline text-sm font-medium">
                      View More
                    </button>
                  </div>

                  {/* Statistics Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statisticsData.map((stat, index) => (
                      <Card key={index} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-gray-900 mb-1">
                            {stat.percentage}
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            {stat.value} / {stat.total}
                          </div>
                          <div className="text-sm font-medium text-gray-700">
                            {stat.title}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Detailed Statistics */}
                  <div className="grid lg:grid-cols-3 gap-6">
                    {detailedStats.map((stat, index) => (
                      <Card key={index} className="bg-white border border-gray-200 shadow-sm">
                        <CardContent className="p-6">
                          <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                            {stat.title}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-4xl font-bold text-gray-900">
                              {stat.value}
                            </div>
                            {stat.hasAction && (
                              <Button 
                                variant={stat.actionVariant} 
                                size="sm"
                                className="text-sm"
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
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent campaigns</h2>
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <div className="text-gray-500 mb-4">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
                      <p className="text-gray-600 mb-6">Create your first campaign to start generating leads.</p>
                      <Link to="/campaigns">
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                          Create Campaign
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column - Recent Activity */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent activity</h2>
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <div className="text-2xl">😴</div>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
                      <p className="text-gray-600 text-sm">
                        Your recent activities will appear here once you start using the platform.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Action Card */}
                <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Ready to connect?</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Start building meaningful relationships with your target audience.
                      </p>
                      <Link to="/campaigns">
                        <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                          Start Networking
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </MobileOptimized>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;