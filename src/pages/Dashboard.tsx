import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Settings,
  Zap,
  Loader2,
  BarChart3,
  Target,
  Calendar,
  Phone,
  Mail,
  Globe,
  Filter,
  Search,
  MoreVertical,
  Edit3,
  Copy,
  Trash2
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { stats, campaigns, loading } = useRealTimeData();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock template data (inspired by dripify)
  const templates = [
    {
      id: 1,
      name: 'Lead Generation',
      description: 'Generate qualified leads from LinkedIn',
      type: 'LinkedIn',
      steps: 4,
      responses: 'High',
      status: 'active',
      connections: [
        { type: 'start', label: 'Start' },
        { type: 'condition', label: 'Profile Check' },
        { type: 'action', label: 'Send Connection' },
        { type: 'action', label: 'Follow Up' },
        { type: 'end', label: 'Convert' }
      ]
    },
    {
      id: 2,
      name: 'Expand Your Network', 
      description: 'Build authority and expand connections',
      type: 'LinkedIn',
      steps: 3,
      responses: 'Medium',
      status: 'paused',
      connections: [
        { type: 'start', label: 'Start' },
        { type: 'action', label: 'Connect' },
        { type: 'action', label: 'Engage' },
        { type: 'end', label: 'Follow' }
      ]
    },
    {
      id: 3,
      name: 'Endorse My Skills',
      description: 'Get endorsements for your skills',
      type: 'LinkedIn', 
      steps: 2,
      responses: 'High',
      status: 'draft',
      connections: [
        { type: 'start', label: 'Start' },
        { type: 'action', label: 'Request' },
        { type: 'end', label: 'Thank' }
      ]
    },
    {
      id: 4,
      name: 'Free Trial Campaign',
      description: 'Convert prospects with free trials',
      type: 'Email',
      steps: 5,
      responses: 'High',
      status: 'active',
      connections: [
        { type: 'start', label: 'Start' },
        { type: 'condition', label: 'Interest Check' },
        { type: 'action', label: 'Send Trial' },
        { type: 'action', label: 'Follow Up' },
        { type: 'end', label: 'Convert' }
      ]
    }
  ];

  const statsCards = [
    { 
      title: 'Voice DMs Sent', 
      value: '2,847', 
      change: '+12.5%', 
      trend: 'up',
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    { 
      title: 'Response Rate', 
      value: '34.2%', 
      change: '+5.2%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    { 
      title: 'Active Leads', 
      value: '1,249', 
      change: '+8.1%', 
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    { 
      title: 'Conversion Rate', 
      value: '12.8%', 
      change: '+2.3%', 
      trend: 'up',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  const WorkflowCard = ({ template }: { template: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary/30 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              {template.type === 'LinkedIn' ? (
                <MessageSquare className="h-5 w-5 text-blue-600" />
              ) : (
                <Mail className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant={template.status === 'active' ? 'default' : template.status === 'paused' ? 'secondary' : 'outline'}
              className="text-xs capitalize"
            >
              {template.status}
            </Badge>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Workflow Visualization */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between space-x-2">
            {template.connections.map((connection: any, index: number) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    connection.type === 'start' ? 'bg-green-100 text-green-700' :
                    connection.type === 'end' ? 'bg-red-100 text-red-700' :
                    connection.type === 'condition' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {connection.type === 'start' ? '▶' : 
                     connection.type === 'end' ? '⏹' : 
                     connection.type === 'condition' ? '?' : '◯'}
                  </div>
                  <span className="text-xs text-gray-600 mt-1 text-center">
                    {connection.label}
                  </span>
                </div>
                {index < template.connections.length - 1 && (
                  <div className="flex-1 h-px bg-gray-300 mx-1"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Template Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Settings className="h-4 w-4 mr-1" />
              {template.steps} steps
            </span>
            <span className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-1" />
              {template.responses} response
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {template.type}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
            <Play className="h-3 w-3 mr-1" />
            Launch
          </Button>
          <Button variant="outline" size="sm">
            <Edit3 className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64 min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your campaigns.</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                This Month
              </Button>
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <PlusCircle className="h-4 w-4" />
                New Campaign
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="templates" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                >
                  Templates
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                  <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                          <div className="flex items-center mt-2">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm font-medium text-green-600">{stat.change}</span>
                            <span className="text-sm text-gray-500 ml-1">vs last month</span>
                          </div>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center ${stat.color}`}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-white border border-gray-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-900">Recent Campaigns</CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/campaigns">
                          View All
                          <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaigns.slice(0, 5).map((campaign, index) => (
                        <div key={campaign.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              campaign.status === 'active' ? 'bg-green-500' :
                              campaign.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`} />
                            <div>
                              <p className="font-medium text-gray-900">{campaign.name}</p>
                              <p className="text-sm text-gray-500 capitalize">{campaign.status}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {campaign.contacted_leads > 0 ? `${((campaign.replied_leads / campaign.contacted_leads) * 100).toFixed(1)}%` : '0%'}
                            </p>
                            <p className="text-sm text-gray-500">{campaign.replied_leads}/{campaign.contacted_leads}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild className="w-full justify-start bg-primary hover:bg-primary/90 h-12">
                      <Link to="/voice" className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <Mic2 className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Clone Voice</p>
                          <p className="text-xs opacity-90">Upload audio sample</p>
                        </div>
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="w-full justify-start h-12">
                      <Link to="/leads" className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Import Leads</p>
                          <p className="text-xs text-gray-500">Add new prospects</p>
                        </div>
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="w-full justify-start h-12">
                      <Link to="/campaigns" className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">New Campaign</p>
                          <p className="text-xs text-gray-500">Start automation</p>
                        </div>
                      </Link>
                    </Button>

                    {/* Setup Progress */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Setup Progress</h4>
                        <span className="text-sm text-gray-500">{user ? '3/4' : '0/4'}</span>
                      </div>
                      <Progress value={user ? 75 : 0} className="mb-3" />
                      <div className="space-y-2 text-sm">
                        <div className={`flex items-center ${user ? 'text-green-600' : 'text-gray-400'}`}>
                          {user ? <CheckCircle className="h-4 w-4 mr-2" /> : <Clock className="h-4 w-4 mr-2" />}
                          Account created
                        </div>
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Voice sample uploaded
                        </div>
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Database connected
                        </div>
                        <Link to="/campaigns" className="flex items-center text-gray-400 hover:text-primary transition-colors">
                          <Clock className="h-4 w-4 mr-2" />
                          Launch first campaign
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              {/* Filter Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search templates..." 
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    All Channels
                  </Button>
                  <Button variant="outline" className="gap-2">
                    All Goals
                  </Button>
                </div>
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create Template
                </Button>
              </div>

              {/* Templates Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <WorkflowCard key={template.id} template={template} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Analytics Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Advanced analytics and reporting features will be available here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Campaign and account settings will be available here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;