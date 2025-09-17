import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Check, Zap, Crown, Rocket, ArrowRight, Star, Sparkles } from 'lucide-react';
import { GlowEffect, MagneticEffect } from '@/components/effects/PremiumEffects';

const plans = [
  {
    name: 'Starter',
    price: 67,
    description: 'Perfect for small agencies getting started',
    icon: Zap,
    gradient: 'from-blue-500 to-cyan-500',
    popular: false,
    features: [
      '3 Facebook accounts',
      '900 Voice DMs per Account',
      'Basic voice cloning + Built-in Templates',
      'Basic Lead Scraping',
      'Basic AI lead scoring',
      'Email support',
      'Standard analytics'
    ]
  },
  {
    name: 'Professional',
    price: 127,
    description: 'Most popular for growing agencies',
    icon: Crown,
    gradient: 'from-purple-500 to-pink-500',
    popular: true,
    features: [
      '9 Facebook accounts',
      '1200 Voice DMs per Account',
      'Advanced voice cloning + 10 Built-in voice templates',
      'Unlimited Lead Scraping',
      'Advanced AI lead scoring',
      'Priority email + chat support',
      'Advanced analytics & ROI tracking',
      'Campaign A/B testing',
      'Sequence automation',
      'CRM Built-in',
      'Add 6 team members'
    ]
  },
  {
    name: 'Enterprise',
    price: 297,
    description: 'For agencies scaling to 7-figures',
    icon: Rocket,
    gradient: 'from-orange-500 to-red-500',
    popular: false,
    features: [
      'Unlimited Facebook Accounts',
      '1500 Voice DMs per Account',
      'Custom voice training and voice Cloning feature + unlimited premium Built-in voice templates',
      'Scrape Unlimited Leads',
      'Enterprise AI with Predictive Analytics',
      '24/7 Priority Support + Success Manager',
      'White-label reporting',
      'API access & webhooks',
      'Team collaboration',
      'Custom integrations',
      'Add Unlimited Team Members'
    ]
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-6 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 text-sm">
            <Star className="h-4 w-4 mr-2" />
            Simple, Transparent Pricing
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight text-gray-900">
            Choose Your Growth Plan
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Start with our <span className="text-blue-600 font-semibold">14-day free trial</span>. No credit card required. 
            Cancel anytime. <span className="text-blue-600 font-semibold">Upgrade as you scale</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              No setup fees
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative group border transition-all duration-300 h-full ${
                plan.popular 
                  ? 'border-blue-600 shadow-xl transform hover:shadow-2xl ring-2 ring-blue-600 ring-opacity-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
              }`}
            >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white border-0 px-4 py-2 shadow-lg">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6 flex-shrink-0 bg-white">
                    <div className="flex items-center justify-center mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}>
                        <plan.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold font-display text-text-primary mb-3">
                      {plan.name}
                    </h3>
                    
                    <p className="text-text-muted mb-6 text-base lg:text-lg">
                      {plan.description}
                    </p>
                    
                    <div className="mb-6">
                      <span className="text-5xl lg:text-6xl font-bold text-text-primary">
                        ${plan.price}
                      </span>
                      <span className="text-text-muted ml-2 text-lg">/month</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 flex-grow flex flex-col">
                    <Link to="/auth">
                      <Button 
                        className={`w-full transition-all group ${
                          plan.popular 
                            ? 'bg-gradient-primary hover:shadow-premium text-white text-lg font-bold px-8 py-4 h-auto hover-premium rounded-2xl border-0 shadow-xl uppercase tracking-wide hover-scale duration-300' 
                            : 'bg-gradient-primary hover:shadow-premium text-white text-lg font-bold px-8 py-4 h-auto hover-premium rounded-2xl border-0 shadow-xl uppercase tracking-wide hover-scale duration-300'
                        }`}
                        size="lg"
                      >
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                
                    <div className="space-y-4 pt-6 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3 animate-scale-in" style={{ animationDelay: `${featureIndex * 0.05}s` }}>
                          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5 flex-shrink-0 animate-pulse-glow">
                            <Check className="h-4 w-4 text-accent" />
                          </div>
                          <span className="text-text-secondary leading-relaxed text-base">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-fade-up">
          <GlowEffect>
            <Card className="inline-block p-8 glass-premium border-primary/20 hover-tilt">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
                <p className="text-text-muted mb-6 max-w-lg">
                  Enterprise plans with custom voice training, dedicated support, and white-label options available.
                </p>
                <Link to="/contact">
                  <Button className="bg-gradient-primary hover:shadow-premium text-white text-lg font-bold px-8 py-4 h-auto hover-premium group rounded-2xl border-0 shadow-xl uppercase tracking-wide hover-scale transition-all duration-300">
                    Contact Sales Team
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          </GlowEffect>
        </div>
      </div>
    </section>
  );
}