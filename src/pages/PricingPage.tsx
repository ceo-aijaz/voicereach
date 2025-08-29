import React from 'react';
import { Header } from '@/components/landing/Header';
import { Pricing } from '@/components/landing/Pricing';
import { Footer } from '@/components/landing/Footer';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;