import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Save, 
  Play, 
  Users, 
  MessageSquare, 
  Mic2, 
  Mail, 
  Clock, 
  Settings,
  Trash2,
  ArrowUp,
  ArrowDown,
  Copy,
  Target,
  BarChart3,
  Calendar,
  Filter,
  Upload,
  Download
} from 'lucide-react';
import { useCampaignBuilder } from '@/hooks/useCampaignBuilder';
import { SequenceBuilder } from './SequenceBuilder';
import { AudienceBuilder } from './AudienceBuilder';
import { CampaignScheduler } from './CampaignScheduler';
import { CampaignAnalytics } from './CampaignAnalytics';
import { useToast } from '@/hooks/use-toast';

interface CampaignBuilderProps {
  campaignId?: string;
  onClose?: () => void;
}

export const CampaignBuilder: React.FC<CampaignBuilderProps> = ({ campaignId, onClose }) => {
  const { toast } = useToast();
  const {
    campaign,
    sequences,
    targets,
    analytics,
    loading,
    saveCampaign,
    createSequence,
    updateSequence,
    deleteSequence,
    addTargets,
    removeTarget,
    launchCampaign,
    pauseCampaign,
    resumeCampaign
  } = useCampaignBuilder(campaignId);

  const [activeTab, setActiveTab] = useState('overview');
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    description: '',
    campaign_type: 'outreach',
    target_audience: {},
    schedule_settings: {},
    throttle_settings: { messages_per_day: 50, messages_per_hour: 10 }
  });

  useEffect(() => {
    if (campaign) {
      setCampaignForm({
        name: campaign.name || '',
        description: campaign.description || '',
        campaign_type: campaign.campaign_type || 'outreach',
        target_audience: campaign.target_audience || {},
        schedule_settings: campaign.schedule_settings || {},
        throttle_settings: campaign.throttle_settings || { messages_per_day: 50, messages_per_hour: 10 }
      });
    }
  }, [campaign]);

  const handleSaveCampaign = async () => {
    try {
      await saveCampaign(campaignForm);
      toast({
        title: "Campaign Saved",
        description: "Your campaign has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLaunchCampaign = async () => {
    try {
      await launchCampaign();
      toast({
        title: "Campaign Launched",
        description: "Your campaign is now running.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to launch campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getCampaignProgress = () => {
    if (!targets?.length) return 0;
    const completed = targets.filter(t => t.status === 'completed').length;
    return Math.round((completed / targets.length) * 100);
  };

  const getCampaignStats = () => {
    const totalTargets = targets?.length || 0;
    const completed = targets?.filter(t => t.status === 'completed').length || 0;
    const inProgress = targets?.filter(t => t.status === 'in_progress').length || 0;
    const pending = targets?.filter(t => t.status === 'pending').length || 0;
    
    return { totalTargets, completed, inProgress, pending };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = getCampaignStats();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-text-primary">
            {campaignId ? 'Edit Campaign' : 'Create Campaign'}
          </h1>
          <p className="text-text-muted">
            Build and manage your voice outreach automation
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {campaign?.status === 'draft' && (
            <Button 
              onClick={handleLaunchCampaign}
              className="bg-gradient-primary hover:shadow-primary hover-lift"
              disabled={!sequences?.length || !targets?.length}
            >
              <Play className="h-4 w-4 mr-2" />
              Launch Campaign
            </Button>
          )}
          
          {campaign?.status === 'active' && (
            <Button 
              onClick={pauseCampaign}
              variant="outline"
              className="border-warning text-warning hover:bg-warning/10"
            >
              Pause Campaign
            </Button>
          )}
          
          {campaign?.status === 'paused' && (
            <Button 
              onClick={resumeCampaign}
              className="bg-gradient-primary hover:shadow-primary hover-lift"
            >
              Resume Campaign
            </Button>
          )}
          
          <Button onClick={handleSaveCampaign} variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          {onClose && (
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Campaign Status */}
      {campaign && (
        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Badge 
                  className={
                    campaign.status === 'active' ? 'bg-accent/20 text-accent' :
                    campaign.status === 'paused' ? 'bg-warning/20 text-warning' :
                    campaign.status === 'completed' ? 'bg-primary/20 text-primary' :
                    'bg-muted text-muted-foreground'
                  }
                >
                  {campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1)}
                </Badge>
                <span className="text-text-muted">•</span>
                <span className="text-sm text-text-muted">
                  {stats.totalTargets} targets • {sequences?.length || 0} sequences
                </span>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">
                  {getCampaignProgress()}% Complete
                </div>
                <Progress value={getCampaignProgress()} className="w-32 h-2 mt-1" />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">{stats.totalTargets}</div>
                <div className="text-xs text-text-muted">Total Targets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{stats.inProgress}</div>
                <div className="text-xs text-text-muted">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.completed}</div>
                <div className="text-xs text-text-muted">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{stats.pending}</div>
                <div className="text-xs text-text-muted">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-surface border border-border">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Audience</span>
          </TabsTrigger>
          <TabsTrigger value="sequences" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Sequences</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>Campaign Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      value={campaignForm.name}
                      onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter campaign name"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Campaign Type</Label>
                    <Select
                      value={campaignForm.campaign_type}
                      onValueChange={(value) => setCampaignForm(prev => ({ ...prev, campaign_type: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="outreach">Outreach</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="voice_cloning">Voice Cloning</SelectItem>
                        <SelectItem value="follow_up">Follow Up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={campaignForm.description}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your campaign goals and strategy"
                    className="mt-1 min-h-[120px]"
                  />
                </div>
              </div>
              
              {/* Throttle Settings */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Throttle Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="messagesPerDay">Messages Per Day</Label>
                    <Input
                      id="messagesPerDay"
                      type="number"
                      value={campaignForm.throttle_settings.messages_per_day}
                      onChange={(e) => setCampaignForm(prev => ({
                        ...prev,
                        throttle_settings: {
                          ...prev.throttle_settings,
                          messages_per_day: parseInt(e.target.value)
                        }
                      }))}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="messagesPerHour">Messages Per Hour</Label>
                    <Input
                      id="messagesPerHour"
                      type="number"
                      value={campaignForm.throttle_settings.messages_per_hour}
                      onChange={(e) => setCampaignForm(prev => ({
                        ...prev,
                        throttle_settings: {
                          ...prev.throttle_settings,
                          messages_per_hour: parseInt(e.target.value)
                        }
                      }))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience">
          <AudienceBuilder 
            campaignId={campaignId}
            targets={targets}
            onAddTargets={addTargets}
            onRemoveTarget={removeTarget}
          />
        </TabsContent>

        {/* Sequences Tab */}
        <TabsContent value="sequences">
          <SequenceBuilder
            campaignId={campaignId}
            sequences={sequences}
            onCreateSequence={createSequence}
            onUpdateSequence={updateSequence}
            onDeleteSequence={deleteSequence}
          />
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <CampaignScheduler
            campaign={campaign}
            onUpdateSchedule={(settings) => setCampaignForm(prev => ({ ...prev, schedule_settings: settings }))}
          />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <CampaignAnalytics
            campaignId={campaignId}
            analytics={analytics}
            targets={targets}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};