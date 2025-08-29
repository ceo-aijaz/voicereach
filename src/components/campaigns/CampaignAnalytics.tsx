import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Mic2,
  Mail,
  Clock,
  Download,
  RefreshCw,
  Target,
  Activity
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CampaignTarget {
  id: string;
  status: string;
  lead: any;
}

interface CampaignAnalytics {
  date: string;
  targets_total: number;
  targets_completed: number;
  messages_sent: number;
  voice_notes_sent: number;
  emails_sent: number;
  responses_received: number;
  errors_count: number;
  conversion_rate: number;
}

interface CampaignAnalyticsProps {
  campaignId?: string;
  analytics?: CampaignAnalytics[];
  targets?: CampaignTarget[];
}

export const CampaignAnalytics: React.FC<CampaignAnalyticsProps> = ({
  campaignId,
  analytics = [],
  targets = []
}) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Generate mock analytics data for demo
  const mockAnalytics = React.useMemo(() => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      
      return {
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        targets_total: Math.floor(Math.random() * 100) + 50,
        targets_completed: Math.floor(Math.random() * 80) + 20,
        messages_sent: Math.floor(Math.random() * 150) + 75,
        voice_notes_sent: Math.floor(Math.random() * 50) + 25,
        emails_sent: Math.floor(Math.random() * 30) + 15,
        responses_received: Math.floor(Math.random() * 25) + 10,
        errors_count: Math.floor(Math.random() * 5),
        conversion_rate: Math.round((Math.random() * 15 + 10) * 100) / 100
      };
    });
  }, [timeRange]);

  const getCurrentStats = () => {
    const totalTargets = targets.length;
    const completed = targets.filter(t => t.status === 'completed').length;
    const inProgress = targets.filter(t => t.status === 'in_progress').length;
    const pending = targets.filter(t => t.status === 'pending').length;
    const failed = targets.filter(t => t.status === 'failed').length;
    
    const totalSent = mockAnalytics.reduce((sum, day) => sum + day.messages_sent + day.voice_notes_sent + day.emails_sent, 0);
    const totalResponses = mockAnalytics.reduce((sum, day) => sum + day.responses_received, 0);
    const avgConversionRate = mockAnalytics.reduce((sum, day) => sum + day.conversion_rate, 0) / mockAnalytics.length;
    
    return {
      totalTargets,
      completed,
      inProgress,
      pending,
      failed,
      totalSent,
      totalResponses,
      avgConversionRate: Math.round(avgConversionRate * 100) / 100
    };
  };

  const stats = getCurrentStats();

  const statusData = [
    { name: 'Completed', value: stats.completed, color: '#10B981' },
    { name: 'In Progress', value: stats.inProgress, color: '#3B82F6' },
    { name: 'Pending', value: stats.pending, color: '#F59E0B' },
    { name: 'Failed', value: stats.failed, color: '#EF4444' }
  ];

  const performanceData = mockAnalytics.map(day => ({
    ...day,
    successRate: day.targets_total > 0 ? Math.round((day.targets_completed / day.targets_total) * 100) : 0,
    responseRate: day.messages_sent > 0 ? Math.round((day.responses_received / day.messages_sent) * 100) : 0
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Campaign Analytics</h2>
          <p className="text-text-muted">Track performance and optimize your campaigns</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="border-border hover:bg-surface">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button variant="outline" className="border-border hover:bg-surface">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass border-border/50 hover:border-primary/20 transition-all hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="text-xs">
                {stats.totalTargets > 0 ? Math.round((stats.completed / stats.totalTargets) * 100) : 0}%
              </Badge>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{stats.completed}</div>
            <div className="text-sm text-text-muted">Completed / {stats.totalTargets} Total</div>
            <Progress 
              value={stats.totalTargets > 0 ? (stats.completed / stats.totalTargets) * 100 : 0} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>

        <Card className="glass border-border/50 hover:border-primary/20 transition-all hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="h-5 w-5 text-accent" />
              <TrendingUp className="h-4 w-4 text-accent" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{stats.totalSent.toLocaleString()}</div>
            <div className="text-sm text-text-muted">Messages Sent</div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50 hover:border-primary/20 transition-all hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-warning" />
              <Badge variant="secondary" className="text-xs">
                {stats.totalSent > 0 ? Math.round((stats.totalResponses / stats.totalSent) * 100) : 0}%
              </Badge>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{stats.totalResponses}</div>
            <div className="text-sm text-text-muted">Responses Received</div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50 hover:border-primary/20 transition-all hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <Badge className="bg-primary/20 text-primary text-xs">
                Avg
              </Badge>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{stats.avgConversionRate}%</div>
            <div className="text-sm text-text-muted">Conversion Rate</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-surface border border-border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="sequences">Sequences</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Progress Chart */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Campaign Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--surface))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="targets_completed" 
                      stackId="1"
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.3}
                      name="Completed"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="targets_total" 
                      stackId="2"
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.2}
                      name="Total Targets"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status Distribution */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Target Status Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-2">
                  {statusData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-text-muted">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-text-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Performance Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--surface))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="successRate" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Success Rate (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="responseRate" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Response Rate (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversion_rate" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    name="Conversion Rate (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Message Types Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--surface))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="messages_sent" fill="#3B82F6" name="Messages" />
                  <Bar dataKey="voice_notes_sent" fill="#10B981" name="Voice Notes" />
                  <Bar dataKey="emails_sent" fill="#F59E0B" name="Emails" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sequences Tab */}
        <TabsContent value="sequences" className="space-y-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Sequence Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock sequence data */}
                {[
                  { name: 'Welcome Sequence', completed: 85, total: 100, conversionRate: 12.5 },
                  { name: 'Follow-up Sequence', completed: 67, total: 85, conversionRate: 8.2 },
                  { name: 'Re-engagement', completed: 42, total: 67, conversionRate: 15.3 }
                ].map((sequence, index) => (
                  <div key={index} className="p-4 bg-surface rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-text-primary">{sequence.name}</h4>
                      <Badge className="bg-primary/20 text-primary">
                        {sequence.conversionRate}% conversion
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-text-muted mb-2">
                      <span>{sequence.completed} completed / {sequence.total} total</span>
                      <span>{Math.round((sequence.completed / sequence.total) * 100)}% completion</span>
                    </div>
                    
                    <Progress 
                      value={(sequence.completed / sequence.total) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};