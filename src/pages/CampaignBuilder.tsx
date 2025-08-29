import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { CampaignBuilder } from '@/components/campaigns/CampaignBuilder';

const CampaignBuilderPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64">
        <CampaignBuilder onClose={() => window.history.back()} />
      </div>
    </div>
  );
};

export default CampaignBuilderPage;