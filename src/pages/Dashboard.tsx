import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Loader2,
  Settings,
  Mail,
  Linkedin,
  Target,
  BarChart3,
  Filter,
  Search,
  Grid3X3,
  List,
  Calendar,
  Globe,
  Workflow,
  Network,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { stats, campaigns, loading } = useRealTimeData();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState('all');

  // Enterprise template categories inspired by Dripify
  const templateCategories = [
    {
      id: 'lead-generation',
      title: 'Lead Generation',
      description: 'Convert prospects into qualified leads',
      icon: Target,
      templates: [
        {
          id: 1,
          name: 'Cold Outreach Sequence',
          platforms: ['linkedin', 'email'],
          automation: 'Multi-step follow-up with personalized voice messages',
          conversions: '12.4%',
          status: 'active',
          steps: 5
        },
        {
          id: 2,
          name: 'LinkedIn Connection & Follow-up',
          platforms: ['linkedin'],
          automation: 'Connection request + personalized voice message',
          conversions: '18.7%',
          status: 'draft',
          steps: 3
        }
      ]
    },
    {
      id: 'network-expansion',
      title: 'Expand Your Network',
      description: 'Build meaningful professional connections',
      icon: Network,
      templates: [
        {
          id: 3,
          name: 'Industry Leader Outreach',
          platforms: ['linkedin', 'email'],
          automation: 'Personalized connection request with voice introduction',
          conversions: '24.1%',
          status: 'active',
          steps: 4
        },
        {
          id: 4,
          name: 'Event Attendee Follow-up',
          platforms: ['linkedin'],
          automation: 'Post-event engagement with voice recap',
          conversions: '31.2%',
          status: 'active',
          steps: 2
        }
      ]
    },
    {
      id: 'skill-endorsement',
      title: 'Endorse My Skills',
      description: 'Build authority and credibility',
      icon: Award,
      templates: [
        {
          id: 5,
          name: 'Skill Validation Campaign',
          platforms: ['linkedin'],
          automation: 'Mutual endorsement request with voice explanation',
          conversions: '45.3%',
          status: 'active',
          steps: 2
        }
      ]
    },
    {
      id: 'maximize-outreach',
      title: 'Maximize Outreach',
      description: 'Scale your communication efforts',
      icon: TrendingUp,
      templates: [
        {
          id: 6,
          name: 'High-Volume Sequence',
          platforms: ['linkedin', 'email', 'voice'],
          automation: 'Multi-channel approach with voice personalization',
          conversions: '15.8%',
          status: 'active',
          steps: 7
        }
      ]
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="h-3 w-3 text-blue-600" />;
      case 'email': return <Mail className="h-3 w-3 text-green-600" />;
      case 'voice': return <Mic2 className="h-3 w-3 text-primary" />;
      default: return <Globe className="h-3 w-3 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': 
        return <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Active</Badge>;
      case 'draft': 
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200 text-xs">Draft</Badge>;
      case 'paused': 
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">Paused</Badge>;
      default: 
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  const statsDisplay = [
    { title: 'Templates Available', value: '24', change: '+3 this week', icon: Grid3X3, color: 'text-primary' },
    { title: 'Active Campaigns', value: stats.totalCampaigns.toString(), change: stats.campaignsChange, icon: Play, color: 'text-accent' },
    { title: 'Response Rate', value: stats.responseRate, change: stats.responseRateChange, icon: TrendingUp, color: 'text-warning' },
    { title: 'Total Connections', value: stats.activeLeads.toString(), change: stats.leadsChange, icon: Users, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-primary/12">
      <Sidebar />
      
      <div className="lg:ml-64 min-h-screen">
        <MobileOptimized className="p-6 lg:p-8">
          {/* Enterprise Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-8 bg-gradient-primary rounded-full"></div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-text-primary font-display">
                    Dashboard
                  </h1>
                </div>
                <p className="text-text-muted text-lg">Choose a template to automate your outreach campaigns</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Select defaultValue="all-channels">
                  <SelectTrigger className="w-40 bg-white">
                    <SelectValue placeholder="All channels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-channels">All channels</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="voice">Voice</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all-goals">
                  <SelectTrigger className="w-40 bg-white">
                    <SelectValue placeholder="All goals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-goals">All goals</SelectItem>
                    <SelectItem value="lead-gen">Lead Generation</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="bg-gradient-primary hover:shadow-glow text-white px-6">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Custom Campaign
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <MobileGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              statsDisplay.map((stat, index) => (
                <MagneticEffect key={index}>
                  <MobileCard className="bg-white border border-border hover:border-primary/30 transition-all duration-300 hover-lift group cursor-pointer shadow-sm hover:shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-primary/5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-text-primary mb-1 group-hover:text-primary transition-colors duration-300">{stat.value}</div>
                    <div className="text-text-muted text-sm font-medium mb-2">{stat.title}</div>
                    <div className="text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full inline-block">{stat.change}</div>
                  </MobileCard>
                </MagneticEffect>
              ))
            )}
          </MobileGrid>

          {/* Navigation Tabs */}
          <Tabs defaultValue="pre-built" className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <TabsList className="bg-white border border-gray-100 p-1 shadow-sm">
                <TabsTrigger value="pre-built" className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm font-medium">
                  Pre-built Templates
                </TabsTrigger>
                <TabsTrigger value="saved" className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm font-medium">
                  Saved Templates
                </TabsTrigger>
                <TabsTrigger value="team" className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm font-medium">
                  Team Templates
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="w-10 h-10 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="w-10 h-10 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="pre-built">
              {/* Template Categories */}
              <div className="grid lg:grid-cols-2 gap-8">
                {templateCategories.map((category, categoryIndex) => (
                  <Card key={category.id} className="bg-white border border-gray-100 hover:border-primary/20 transition-all hover-lift shadow-sm">
                    <CardHeader className="pb-4 border-b border-gray-50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-primary text-white">
                          <category.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-text-primary">
                            {category.title}
                          </CardTitle>
                          <p className="text-text-muted text-sm">{category.description}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-primary">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6 space-y-4">
                      {category.templates.map((template) => (
                        <div 
                          key={template.id}
                          className="p-4 rounded-lg border border-gray-100 bg-gray-50/30 hover:bg-gray-50 transition-all group cursor-pointer hover:border-primary/20"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                                  {template.name}
                                </h4>
                                {getStatusBadge(template.status)}
                              </div>
                              
                              <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center gap-1">
                                  {template.platforms.map((platform, idx) => (
                                    <span key={idx} className="p-1 rounded bg-white border border-gray-200 shadow-sm">
                                      {getPlatformIcon(platform)}
                                    </span>
                                  ))}
                                </div>
                                <span className="text-xs text-text-muted font-medium">
                                  {template.platforms.join(' + ')}
                                </span>
                              </div>
                              
                              <p className="text-sm text-text-muted mb-3 leading-relaxed">{template.automation}</p>
                              
                              <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1">
                                  <Workflow className="h-3 w-3 text-gray-400" />
                                  <span className="text-text-muted">{template.steps} steps</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <BarChart3 className="h-3 w-3 text-green-500" />
                                  <span className="font-semibold text-green-600">{template.conversions}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="text-xs text-text-muted">
                              Ready to launch
                            </div>
                            
                            <Button size="sm" className="bg-gradient-primary hover:shadow-glow text-white">
                              Use Template
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved">
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Grid3X3 className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">No Saved Templates</h3>
                <p className="text-text-muted mb-6 max-w-md mx-auto">Save templates from the pre-built collection to access them quickly for future campaigns.</p>
                <Button className="bg-gradient-primary hover:shadow-glow text-white">
                  Browse Templates
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">No Team Templates</h3>
                <p className="text-text-muted mb-6 max-w-md mx-auto">Collaborate with your team to create shared templates and improve campaign performance together.</p>
                <Button className="bg-gradient-primary hover:shadow-glow text-white">
                  Invite Team Members
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions Footer */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 shadow-sm">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white shadow-sm">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      Ready to get started?
                    </h3>
                    <p className="text-text-muted">
                      Upload your voice sample and start creating personalized voice messages in minutes.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link to="/voice">
                    <Button variant="outline" className="border-primary/30 hover:bg-primary/10 text-primary">
                      <Mic2 className="h-4 w-4 mr-2" />
                      Clone Voice
                    </Button>
                  </Link>
                  <Link to="/campaigns">
                    <Button className="bg-gradient-primary hover:shadow-glow text-white px-6">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create Campaign
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </MobileOptimized>
      </div>
    </div>
  );
};

export default Dashboard;