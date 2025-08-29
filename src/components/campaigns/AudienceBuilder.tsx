import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Upload, 
  Filter, 
  Search, 
  Download, 
  Trash2, 
  Plus,
  FileText,
  Target,
  Settings,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  name: string;
  email: string;
  username?: string;
  full_name?: string;
  url?: string;
  bio?: string;
  total_followers?: number;
  engagement_rate?: number;
  platform?: string;
  tags?: string[];
  status: string;
}

interface CampaignTarget {
  id: string;
  lead_id: string;
  status: string;
  lead: Lead;
}

interface AudienceBuilderProps {
  campaignId?: string;
  targets?: CampaignTarget[];
  onAddTargets: (leadIds: string[]) => Promise<void>;
  onRemoveTarget: (targetId: string) => Promise<void>;
}

export const AudienceBuilder: React.FC<AudienceBuilderProps> = ({
  campaignId,
  targets = [],
  onAddTargets,
  onRemoveTarget
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    platform: '',
    minFollowers: '',
    maxFollowers: '',
    minEngagement: '',
    maxEngagement: '',
    tags: []
  });
  const [isImporting, setIsImporting] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [availableLeads, setAvailableLeads] = useState<Lead[]>([]);
  
  // Mock data for available leads
  React.useEffect(() => {
    // This would typically fetch from your API
    setAvailableLeads([
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        username: 'johndoe',
        full_name: 'John Doe',
        url: 'https://instagram.com/johndoe',
        bio: 'Entrepreneur & SaaS founder',
        total_followers: 15000,
        engagement_rate: 3.2,
        platform: 'instagram',
        tags: ['entrepreneur', 'saas'],
        status: 'new'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        username: 'janesmith',
        full_name: 'Jane Smith',
        url: 'https://instagram.com/janesmith',
        bio: 'Digital marketing expert',
        total_followers: 25000,
        engagement_rate: 4.1,
        platform: 'instagram',
        tags: ['marketing', 'digital'],
        status: 'new'
      }
    ]);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    
    try {
      // Parse CSV file
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const leads: Partial<Lead>[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length >= headers.length) {
          const lead: Partial<Lead> = {};
          
          headers.forEach((header, index) => {
            const value = values[index]?.trim();
            switch (header) {
              case 'username':
                lead.username = value;
                break;
              case 'full name':
              case 'fullname':
              case 'name':
                lead.full_name = value;
                break;
              case 'url':
              case 'profile_url':
                lead.url = value;
                break;
              case 'bio':
              case 'biography':
                lead.bio = value;
                break;
              case 'total followers':
              case 'followers':
                lead.total_followers = parseInt(value) || 0;
                break;
              case 'email':
                lead.email = value;
                break;
            }
          });
          
          if (lead.username || lead.email) {
            leads.push(lead);
          }
        }
      }
      
      // Here you would call your API to import the leads
      console.log('Importing leads:', leads);
      
      toast({
        title: "Import Successful",
        description: `Successfully imported ${leads.length} leads.`,
      });
      
    } catch (error) {
      toast({
        title: "Import Error",
        description: "Failed to import CSV file. Please check the format.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddToAudience = async () => {
    if (selectedLeads.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select at least one lead to add.",
        variant: "destructive",
      });
      return;
    }

    try {
      await onAddTargets(selectedLeads);
      setSelectedLeads([]);
      toast({
        title: "Leads Added",
        description: `Successfully added ${selectedLeads.length} leads to your audience.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add leads to audience. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredLeads = availableLeads.filter(lead => {
    const matchesSearch = !searchTerm || 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = !filters.platform || lead.platform === filters.platform;
    
    const matchesFollowers = (!filters.minFollowers || (lead.total_followers || 0) >= parseInt(filters.minFollowers)) &&
      (!filters.maxFollowers || (lead.total_followers || 0) <= parseInt(filters.maxFollowers));
    
    const matchesEngagement = (!filters.minEngagement || (lead.engagement_rate || 0) >= parseFloat(filters.minEngagement)) &&
      (!filters.maxEngagement || (lead.engagement_rate || 0) <= parseFloat(filters.maxEngagement));
    
    return matchesSearch && matchesPlatform && matchesFollowers && matchesEngagement;
  });

  const currentTargetIds = targets.map(t => t.lead_id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Audience Builder</h2>
          <p className="text-text-muted">Import and manage your campaign audience</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            variant="outline"
            className="border-border hover:bg-surface"
          >
            {isImporting ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            Import CSV
          </Button>
          
          <Button 
            onClick={() => {}} 
            variant="outline"
            className="border-border hover:bg-surface"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Template
          </Button>
        </div>
      </div>

      {/* Current Audience Stats */}
      <Card className="glass border-border/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-text-primary">{targets.length}</div>
              <div className="text-sm text-text-muted">Total Targets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">
                {targets.filter(t => t.status === 'pending').length}
              </div>
              <div className="text-sm text-text-muted">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {targets.filter(t => t.status === 'in_progress').length}
              </div>
              <div className="text-sm text-text-muted">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">
                {targets.filter(t => t.status === 'completed').length}
              </div>
              <div className="text-sm text-text-muted">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="add-leads" className="space-y-6">
        <TabsList className="bg-surface border border-border">
          <TabsTrigger value="add-leads">Add Leads</TabsTrigger>
          <TabsTrigger value="current-audience">Current Audience ({targets.length})</TabsTrigger>
          <TabsTrigger value="filters">Smart Filters</TabsTrigger>
        </TabsList>

        {/* Add Leads Tab */}
        <TabsContent value="add-leads" className="space-y-6">
          {/* Search and Filters */}
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <Input
                      placeholder="Search leads by name, username, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={filters.platform} onValueChange={(value) => setFilters(prev => ({ ...prev, platform: value }))}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Platforms</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Leads */}
          <Card className="glass border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Available Leads ({filteredLeads.length})</CardTitle>
                
                {selectedLeads.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-muted">
                      {selectedLeads.length} selected
                    </span>
                    <Button onClick={handleAddToAudience} className="bg-gradient-primary hover:shadow-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Audience
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {filteredLeads.map((lead) => {
                const isSelected = selectedLeads.includes(lead.id);
                const isAlreadyAdded = currentTargetIds.includes(lead.id);
                
                return (
                  <div
                    key={lead.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg border transition-all cursor-pointer ${
                      isSelected ? 'bg-primary/5 border-primary' :
                      isAlreadyAdded ? 'bg-muted border-border opacity-50 cursor-not-allowed' :
                      'bg-surface border-border/50 hover:bg-surface-hover'
                    }`}
                    onClick={() => {
                      if (isAlreadyAdded) return;
                      
                      if (isSelected) {
                        setSelectedLeads(prev => prev.filter(id => id !== lead.id));
                      } else {
                        setSelectedLeads(prev => [...prev, lead.id]);
                      }
                    }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                      {lead.username?.[0]?.toUpperCase() || lead.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-text-primary">
                          {lead.full_name || lead.name}
                        </h4>
                        {lead.username && (
                          <Badge variant="secondary" className="text-xs">
                            @{lead.username}
                          </Badge>
                        )}
                        {isAlreadyAdded && (
                          <Badge className="bg-accent/20 text-accent text-xs">
                            Already Added
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-text-muted line-clamp-1">
                        {lead.bio || lead.email}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-2 text-xs text-text-muted">
                        {lead.total_followers && (
                          <span>{lead.total_followers.toLocaleString()} followers</span>
                        )}
                        {lead.engagement_rate && (
                          <span>{lead.engagement_rate}% engagement</span>
                        )}
                        <span className="capitalize">{lead.platform}</span>
                      </div>
                    </div>
                    
                    {lead.tags && lead.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {lead.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {lead.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{lead.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {filteredLeads.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No Leads Found</h3>
                  <p className="text-text-muted">Try adjusting your search or import new leads</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Current Audience Tab */}
        <TabsContent value="current-audience">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Current Campaign Audience</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {targets.map((target) => (
                <div key={target.id} className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {target.lead?.username?.[0]?.toUpperCase() || target.lead?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-text-primary">
                        {target.lead?.full_name || target.lead?.name}
                      </h4>
                      <p className="text-sm text-text-muted">
                        {target.lead?.email} • @{target.lead?.username}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge className={
                      target.status === 'completed' ? 'bg-primary/20 text-primary' :
                      target.status === 'in_progress' ? 'bg-accent/20 text-accent' :
                      target.status === 'failed' ? 'bg-error/20 text-error' :
                      'bg-muted text-muted-foreground'
                    }>
                      {target.status.replace('_', ' ')}
                    </Badge>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveTarget(target.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {targets.length === 0 && (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No Audience Yet</h3>
                  <p className="text-text-muted">Add leads to your campaign audience to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Smart Filters Tab */}
        <TabsContent value="filters">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Smart Audience Filters</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Follower Range</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      placeholder="Min followers"
                      value={filters.minFollowers}
                      onChange={(e) => setFilters(prev => ({ ...prev, minFollowers: e.target.value }))}
                    />
                    <span className="text-text-muted">to</span>
                    <Input
                      placeholder="Max followers"
                      value={filters.maxFollowers}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxFollowers: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Engagement Rate</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      placeholder="Min %"
                      value={filters.minEngagement}
                      onChange={(e) => setFilters(prev => ({ ...prev, minEngagement: e.target.value }))}
                    />
                    <span className="text-text-muted">to</span>
                    <Input
                      placeholder="Max %"
                      value={filters.maxEngagement}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxEngagement: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setFilters({
                    platform: '',
                    minFollowers: '',
                    maxFollowers: '',
                    minEngagement: '',
                    maxEngagement: '',
                    tags: []
                  })}
                >
                  Clear Filters
                </Button>
                <Button className="bg-gradient-primary hover:shadow-primary">
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};