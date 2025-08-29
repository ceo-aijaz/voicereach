import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  UserPlus, 
  Users, 
  TrendingUp,
  Instagram,
  MapPin,
  Hash,
  MessageSquare,
  Star,
  Loader2
} from 'lucide-react';

const Leads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { leads, loading } = useRealTimeData();
  
  const leadSources = [
    { name: 'Total Leads', count: leads.length, icon: Users, color: 'text-primary' },
    { name: 'Qualified', count: leads.filter(l => l.status === 'qualified').length, icon: Star, color: 'text-accent' },
    { name: 'Contacted', count: leads.filter(l => l.status === 'contacted').length, icon: MessageSquare, color: 'text-warning' },
    { name: 'Converted', count: leads.filter(l => l.status === 'converted').length, icon: TrendingUp, color: 'text-success' },
  ];

  // Filter leads based on search term
  const filteredLeads = leads.filter(lead => 
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'qualified': return 'bg-accent/20 text-accent';
      case 'contacted': return 'bg-primary/20 text-primary';
      case 'new': return 'bg-warning/20 text-warning';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-accent';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-warning';
    return 'text-text-muted';
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold font-display text-text-primary">Lead Management</h1>
                <p className="text-text-muted">Discover, score, and manage your Facebook leads</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="border-border hover:bg-surface">
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV
                </Button>
                <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Scrape New Leads
                </Button>
              </div>
            </div>
          </div>

          {/* Lead Sources Overview */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {leadSources.map((source, index) => (
                <Card key={index} className="glass border-border/50 hover:border-primary/20 transition-all hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <source.icon className={`h-5 w-5 ${source.color}`} />
                      <TrendingUp className="h-4 w-4 text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-text-primary mb-1">{source.count}</div>
                    <div className="text-sm text-text-muted">{source.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Tabs defaultValue="all-leads" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="bg-surface border border-border">
                <TabsTrigger value="all-leads">All Leads ({leads.length})</TabsTrigger>
                <TabsTrigger value="qualified">Qualified ({leads.filter(l => l.status === 'qualified').length})</TabsTrigger>
                <TabsTrigger value="contacted">Contacted ({leads.filter(l => l.status === 'contacted').length})</TabsTrigger>
                <TabsTrigger value="responded">Responded ({leads.filter(l => l.status === 'responded').length})</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <Input
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-surface border-border"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <TabsContent value="all-leads" className="space-y-4">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Lead Database</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredLeads.length > 0 ? (
                    <>
                      <div className="space-y-4">
                        {filteredLeads.map((lead, index) => (
                          <div key={lead.id} className="flex items-center justify-between p-4 rounded-lg bg-surface/50 hover:bg-surface transition-all hover-lift" style={{ animationDelay: `${index * 0.05}s` }}>
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-semibold text-text-primary">{lead.name || 'Unknown'}</h4>
                                  <Badge className={getStatusColor(lead.status)} variant="secondary">
                                    {lead.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-text-muted">{lead.email || 'No email'}</p>
                                <p className="text-xs text-text-muted">{lead.company || 'Unknown company'} • {lead.position || 'Unknown position'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-6">
                              <div className="text-center">
                                <div className="flex items-center space-x-1 mb-1">
                                  <Star className={`h-4 w-4 ${getScoreColor(lead.engagement_score)}`} />
                                  <span className={`font-bold ${getScoreColor(lead.engagement_score)}`}>{lead.engagement_score}</span>
                                </div>
                                <p className="text-xs text-text-muted">AI Score</p>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="border-border hover:bg-surface">
                                  View Profile
                                </Button>
                                <Button size="sm" className="bg-gradient-primary hover:shadow-primary">
                                  Send Voice DM
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {filteredLeads.length >= 10 && (
                        <div className="flex items-center justify-center mt-8">
                          <Button variant="outline" className="border-border hover:bg-surface">
                            Load More Leads
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Users className="h-16 w-16 text-text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-text-primary mb-2">No leads found</h3>
                      <p className="text-text-muted">Import leads or start scraping to see your lead database here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qualified">
              <Card className="glass border-border/50">
                <CardContent className="p-8 text-center">
                  <Users className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Qualified Leads</h3>
                  <p className="text-text-muted">Your highest-scoring leads with 80+ AI score</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacted">
              <Card className="glass border-border/50">
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Contacted Leads</h3>
                  <p className="text-text-muted">Leads you've already sent voice DMs to</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="responded">
              <Card className="glass border-border/50">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Responded Leads</h3>
                  <p className="text-text-muted">Leads who have responded to your outreach</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Leads;