import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import { Pricing } from '@/components/landing/Pricing';

const Upgrade = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <div className="p-8">
            <Pricing />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Upgrade;