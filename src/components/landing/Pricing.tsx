import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Check, Zap, Crown, Rocket, ArrowRight, Star, Sparkles } from 'lucide-react';


const plans = [
  {
    name: 'Starter',
    price: 67,
    description: 'Perfect for small agencies getting started',
    icon: Zap,
    gradient: 'from-blue-500 to-cyan-500',
    popular: false,
    features: [
      '3 Instagram accounts',
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
      '9 Instagram accounts',
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
      'Unlimited Instagram Accounts',
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
    <section id="pricing" className="section-margin bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-800 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="container mx-auto section-padding relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <Badge className="mb-8 bg-accent/10 text-accent border-accent/20 px-6 py-3 text-sm font-medium">
            <Star className="h-4 w-4 mr-2" />
            Simple, Transparent Pricing
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="text-slate-900 dark:text-white">Choose Your</span>
            <br />
            <span className="text-primary">
              Growth Plan
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            Start with our <span className="text-accent font-semibold">14-day free trial</span>. No credit card required. 
            Cancel anytime. <span className="text-primary font-semibold">Upgrade as you scale</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
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
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative group transition-all duration-300 h-full opacity-0 animate-fade-in ${
                plan.popular 
                  ? 'scale-105 shadow-xl border-primary/50 bg-white dark:bg-slate-800 hover:scale-[1.02]' 
                  : 'hover:border-primary/30 border-slate-200 dark:border-slate-700 hover:scale-[1.01] hover:shadow-lg'
              }`}
              style={{ animationDelay: `${(index + 2) * 0.1}s`, animationFillMode: 'forwards' }}
            >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white border-0 px-4 py-2 shadow-lg">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6 flex-shrink-0">
                    <div className="flex items-center justify-center mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all`}>
                        <plan.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      {plan.name}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {plan.description}
                    </p>
                    
                    <div className="mb-6">
                      <span className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-slate-500 ml-2">/month</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 flex-grow flex flex-col">
                    <Link to="/auth">
                      <Button 
                        className={`w-full transition-all group h-12 ${
                          plan.popular 
                            ? 'bg-primary hover:bg-primary/90 text-white font-semibold' 
                            : 'bg-primary hover:bg-primary/90 text-white font-semibold'
                        }`}
                      >
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                
                    <div className="space-y-4 pt-6 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
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
        <div className="text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <Card className="inline-block p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Need a Custom Solution?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-lg">
                Enterprise plans with custom voice training, dedicated support, and white-label options available.
              </p>
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 h-auto group rounded-lg transition-all duration-200 hover:scale-105">
                  Contact Sales Team
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}