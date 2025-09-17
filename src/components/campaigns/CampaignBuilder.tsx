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
import { useToast } from '@/hooks/use-toast';

interface CampaignBuilderProps {
  campaignId?: string;
  onClose?: () => void;
}

export const CampaignBuilder: React.FC<CampaignBuilderProps> = ({ campaignId, onClose }) => {
  const { toast } = useToast();
  const {
    campaign,
    loading,
    saveCampaign,
    launchCampaign,
    pauseCampaign,
    resumeCampaign
  } = useCampaignBuilder(campaignId);

  const [activeTab, setActiveTab] = useState('overview');
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    message_template: '',
    target_audience: {},
  });

  useEffect(() => {
    if (campaign) {
      setCampaignForm({
        name: campaign.name || '',
        message_template: campaign.message_template || '',
        target_audience: campaign.target_audience || {},
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                  Voice DM Campaign
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">{campaign.voice_count || 0}</div>
                <div className="text-xs text-text-muted">Voice Messages Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{campaign.response_count || 0}</div>
                <div className="text-xs text-text-muted">Responses Received</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {campaign.voice_count && campaign.voice_count > 0 
                    ? Math.round(((campaign.response_count || 0) / campaign.voice_count) * 100) 
                    : 0}%
                </div>
                <div className="text-xs text-text-muted">Response Rate</div>
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
          <TabsTrigger value="message" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Message</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Audience</span>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Message Tab */}
        <TabsContent value="message" className="space-y-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Voice Message Template</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="message">Message Template</Label>
                <Textarea
                  id="message"
                  value={campaignForm.message_template}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, message_template: e.target.value }))}
                  placeholder="Write your voice message template here..."
                  className="mt-1 min-h-[120px]"
                />
                <p className="text-sm text-text-muted mt-2">
                  This template will be used to generate personalized voice messages for your campaign.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Target Audience</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <Users className="h-16 w-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">Define Your Audience</h3>
                <p className="text-text-muted mb-6">
                  Set up targeting criteria for your voice outreach campaign.
                </p>
                <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Targeting Rules
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};