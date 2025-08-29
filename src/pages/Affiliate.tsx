import React, { useState } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAffiliateProgram } from '@/hooks/useAffiliateProgram';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Gift,
  Share2,
  BarChart3,
  Calendar,
  Award,
  Zap,
  Target,
  ArrowRight,
  CheckCircle,
  Loader2
} from 'lucide-react';

const Affiliate = () => {
  const { submitApplication, loading } = useAffiliateProgram();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    experience: '',
    audience: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitApplication(formData);
    
    if (!result.error) {
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        website: '',
        experience: '',
        audience: ''
      });
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: '30% Recurring Commission',
      description: 'Earn 30% commission on every payment for the lifetime of your referrals',
      highlight: true
    },
    {
      icon: Users,
      title: 'No Minimum Payouts',
      description: 'Get paid as soon as you reach $50 in commissions via PayPal or Stripe',
      highlight: false
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Track clicks, conversions, and earnings with our comprehensive dashboard',
      highlight: false
    },
    {
      icon: Gift,
      title: 'Exclusive Resources',
      description: 'Access to marketing materials, case studies, and promotional content',
      highlight: false
    }
  ];

  const tiers = [
    {
      name: 'Starter',
      requirement: '1-5 referrals/month',
      commission: '30%',
      bonuses: ['Marketing materials', 'Basic support'],
      icon: Zap
    },
    {
      name: 'Growth',
      requirement: '6-15 referrals/month',
      commission: '35%',
      bonuses: ['Priority support', 'Custom landing pages', '5% bonus'],
      icon: Target
    },
    {
      name: 'Elite',
      requirement: '16+ referrals/month',
      commission: '40%',
      bonuses: ['Dedicated support', 'Co-marketing opportunities', '10% bonus'],
      icon: Award
    }
  ];

  const stats = [
    { value: '$125K+', label: 'Paid to Affiliates', icon: DollarSign },
    { value: '500+', label: 'Active Affiliates', icon: Users },
    { value: '18.5%', label: 'Conversion Rate', icon: TrendingUp },
    { value: '92%', label: 'Satisfaction Score', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-margin relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          
          <div className="container mx-auto section-padding relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-up">
              <Badge className="bg-accent/10 text-accent border-accent/20 mb-6">
                💰 Affiliate Program
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight mb-6">
                <span className="text-text-primary">Earn</span>
                <span className="text-gradient-primary"> 30% Recurring</span>
                <br />
                <span className="text-text-primary">Commission</span>
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto mb-8">
                Join our affiliate program and earn recurring commissions by referring agencies 
                and entrepreneurs to VoiceLead's voice automation platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-primary hover:shadow-primary hover-lift" size="lg">
                  <Share2 className="h-5 w-5 mr-2" />
                  Join Affiliate Program
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="border-border hover:bg-surface">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  View Demo Dashboard
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-margin bg-gradient-to-b from-background to-surface/30">
          <div className="container mx-auto section-padding">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="glass border-border/50 text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-text-muted">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-margin">
          <div className="container mx-auto section-padding">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                <span className="text-text-primary">Why Join Our</span>
                <span className="text-gradient-primary"> Affiliate Program?</span>
              </h2>
              <p className="text-xl text-text-muted max-w-2xl mx-auto">
                Generous commissions, high-converting product, and full support for your success
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className={`glass hover:border-primary/20 transition-all hover-lift animate-fade-up ${benefit.highlight ? 'border-primary/50 bg-gradient-primary/5' : 'border-border/50'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${benefit.highlight ? 'bg-primary/20' : 'bg-gradient-to-br from-primary to-accent'}`}>
                      <benefit.icon className={`h-6 w-6 ${benefit.highlight ? 'text-primary' : 'text-white'}`} />
                    </div>
                    <h3 className="text-xl font-bold font-display text-text-primary mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Commission Tiers */}
        <section className="section-margin bg-gradient-to-b from-surface/30 to-background">
          <div className="container mx-auto section-padding">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                <span className="text-text-primary">Commission</span>
                <span className="text-gradient-primary"> Tiers</span>
              </h2>
              <p className="text-xl text-text-muted max-w-2xl mx-auto">
                Earn more as you refer more. Our tier system rewards top performers with higher commissions and exclusive benefits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {tiers.map((tier, index) => (
                <Card key={index} className={`glass hover:border-primary/20 transition-all hover-lift animate-scale-in ${index === 1 ? 'scale-105 border-primary/50' : 'border-border/50'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-primary text-white border-0 px-4 py-1">
                        🔥 Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <tier.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold font-display text-text-primary mb-2">
                      {tier.name}
                    </h3>
                    
                    <p className="text-text-muted mb-4">{tier.requirement}</p>
                    
                    <div className="text-4xl font-bold text-primary mb-6">
                      {tier.commission}
                    </div>
                    
                    <div className="space-y-3">
                      {tier.bonuses.map((bonus, bonusIndex) => (
                        <div key={bonusIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-sm text-text-muted">{bonus}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-margin">
          <div className="container mx-auto section-padding">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                <span className="text-text-primary">How It</span>
                <span className="text-gradient-primary"> Works</span>
              </h2>
              <p className="text-xl text-text-muted">
                Simple 4-step process to start earning
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Apply', description: 'Fill out our simple application form', icon: Users },
                { step: '2', title: 'Get Approved', description: 'We review and approve quality partners', icon: CheckCircle },
                { step: '3', title: 'Share & Promote', description: 'Use your unique link to refer customers', icon: Share2 },
                { step: '4', title: 'Earn Commissions', description: 'Get paid monthly for every referral', icon: DollarSign }
              ].map((item, index) => (
                <Card key={index} className="glass border-border/50 text-center hover-lift animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">{item.step}</span>
                    </div>
                    <item.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-text-muted">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="section-margin bg-gradient-to-b from-background to-surface/30">
          <div className="container mx-auto section-padding">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                  <span className="text-text-primary">Ready to</span>
                  <span className="text-gradient-primary"> Get Started?</span>
                </h2>
                <p className="text-xl text-text-muted">
                  Apply now and start earning recurring commissions today
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <Card className="glass border-border/50 animate-fade-up">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display text-text-primary">
                      Affiliate Application
                    </CardTitle>
                    <p className="text-text-muted">
                      Tell us about yourself and your marketing experience
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-text-primary">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="John Smith"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                            className="bg-surface border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-text-primary">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="bg-surface border-border"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website" className="text-text-primary">Website/Social Media</Label>
                        <Input
                          id="website"
                          placeholder="https://yourwebsite.com"
                          value={formData.website}
                          onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                          className="bg-surface border-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="audience" className="text-text-primary">Audience Size</Label>
                        <Input
                          id="audience"
                          placeholder="e.g., 10K email subscribers, 5K Twitter followers"
                          value={formData.audience}
                          onChange={(e) => setFormData(prev => ({ ...prev, audience: e.target.value }))}
                          className="bg-surface border-border"
                        />
                      </div>

                      <Button type="submit" className="w-full bg-gradient-primary hover:shadow-primary" size="lg" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Users className="h-5 w-5 mr-2" />
                            Submit Application
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  <Card className="glass border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-text-primary mb-4">
                        💰 Earning Example
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-text-muted">5 referrals × $127/month</span>
                          <span className="text-text-primary">$635/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">30% commission</span>
                          <span className="text-accent font-bold">$190.50/month</span>
                        </div>
                        <div className="border-t border-border pt-2">
                          <div className="flex justify-between text-lg font-bold">
                            <span className="text-text-primary">Annual earnings:</span>
                            <span className="text-primary">$2,286</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-text-primary mb-4">
                        📊 Success Metrics
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-text-muted">Conversion Rate</span>
                            <span className="text-text-primary">18.5%</span>
                          </div>
                          <Progress value={18.5} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-text-muted">Customer LTV</span>
                            <span className="text-text-primary">$2,100</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-text-muted">Retention Rate</span>
                            <span className="text-text-primary">89%</span>
                          </div>
                          <Progress value={89} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Affiliate;