import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import { 
  Search,
  Plus,
  ChevronRight,
  Clock,
  Info,
  ToggleRight
} from 'lucide-react';

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOnly, setActiveOnly] = useState(false);
  
  // Set this to true to show campaigns, false to show empty state
  const [hasCampaigns] = useState(false);
  
  const campaigns: any[] = [];

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-64 h-48 mb-8 bg-muted/20 rounded-lg flex items-center justify-center">
        <div className="w-32 h-32 bg-muted/30 rounded-lg flex items-center justify-center">
          <Plus className="h-12 w-12 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-xl font-medium text-foreground mb-2">You currently have no campaigns</h3>
      <Button 
        className="mt-4 bg-primary hover:bg-primary/90"
        onClick={() => window.location.href = '/campaign-builder'}
      >
        Create campaign
      </Button>
    </div>
  );

  const CampaignsTable = () => (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="active-only"
              checked={activeOnly}
              onCheckedChange={(checked) => setActiveOnly(checked === true)}
            />
            <label htmlFor="active-only" className="text-sm text-muted-foreground">
              Active only
            </label>
          </div>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => window.location.href = '/campaign-builder'}
        >
          New campaign
        </Button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-5 gap-4 py-3 px-4 text-sm font-medium text-muted-foreground border-b">
        <div>Overview</div>
        <div>Leads</div>
        <div>LinkedIn</div>
        <div>Status</div>
        <div></div>
      </div>

      {/* Campaign rows */}
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="grid grid-cols-5 gap-4 items-center">
              {/* Overview */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{campaign.name}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              
              {/* Leads */}
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">All leads: {campaign.allLeads}</div>
                <div className="text-sm text-primary">Lists of leads: {campaign.listLeads}</div>
              </div>
              
              {/* LinkedIn */}
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Acceptance rate: {campaign.acceptanceRate}%
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <span>Response rate: {campaign.responseRate}%</span>
                  <Info className="h-3 w-3" />
                </div>
              </div>
              
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{campaign.lastUpdated}</span>
                <div className="flex items-center space-x-2">
                  <ToggleRight className="h-5 w-5 text-primary" />
                  <button className="text-muted-foreground hover:text-foreground">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <AppSidebar />
        
        <main className="flex-1 p-8">
          {/* Header with schedule notice */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4" />
              <span>Your campaigns are not operating since they're outside of working hours at the moment.</span>
              <button className="text-primary hover:underline">Adjust my schedule</button>
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Campaigns</h1>
          </div>

          {/* Show empty state or campaigns table based on hasCampaigns */}
          {!hasCampaigns ? <EmptyState /> : <CampaignsTable />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Campaigns;