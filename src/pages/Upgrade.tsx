import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Pricing } from '@/components/landing/Pricing';

const Upgrade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 text-center animate-fade-up">
            <h1 className="text-4xl font-bold font-display text-text-primary mb-4">
              Upgrade Your Plan
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Unlock unlimited voice DMs, advanced AI features, and premium support
            </p>
          </div>

          <Pricing />
        </div>
      </div>
    </div>
  );
};

export default Upgrade;