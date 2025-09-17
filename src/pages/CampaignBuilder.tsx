import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import { CampaignBuilder } from '@/components/campaigns/CampaignBuilder';

const CampaignBuilderPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <CampaignBuilder onClose={() => window.history.back()} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CampaignBuilderPage;