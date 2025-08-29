import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Mic2, 
  Instagram, 
  Target, 
  Brain, 
  Workflow, 
  BarChart3,
  Zap,
  Shield,
  Clock,
  Users,
  MessageSquare,
  TrendingUp,
  Sparkles,
  ArrowRight,
  PlayCircle
} from 'lucide-react';
import { GlowEffect, MagneticEffect } from '@/components/effects/PremiumEffects';

const features = [
  {
    icon: Mic2,
    title: 'AI Voice Cloning',
    description: 'Clone your voice with just 2 minutes of audio. Perfect emotional tone replication across 5+ different moods.',
    badge: 'Core',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    icon: Instagram,
    title: 'Instagram DM Automation',
    description: 'Send UpTo 1500 Voice DMs per month across multiple accounts with smart scheduling and anti-detection.',
    badge: 'Premium',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Target,
    title: 'Advanced Lead Scraping',
    description: 'Extract qualified leads from hashtags, followers, comments, and locations with powerful filtering options.',
    badge: 'Essential',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Brain,
    title: 'AI Lead Scoring',
    description: 'GPT-4 powered analysis scores leads 1-100 based on buying intent, budget likelihood, and business relevance.',
    badge: 'Smart',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Workflow,
    title: 'Campaign Automation',
    description: 'Drag-and-drop campaign builder with multi-step sequences, conditional logic, and A/B testing.',
    badge: 'Pro',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time performance tracking with conversion attribution, ROI calculation, and optimization insights.',
    badge: 'Data',
    gradient: 'from-cyan-500 to-blue-500'
  }
];

const stats = [
  { icon: Zap, value: '150+', label: 'DMs per account/day', color: 'text-warning' },
  { icon: Shield, value: '99.9%', label: 'Platform uptime', color: 'text-accent' },
  { icon: Clock, value: '5min', label: 'Setup time', color: 'text-primary' },
  { icon: Users, value: '15+', label: 'Instagram accounts', color: 'text-purple-500' }
];

export function Features() {
  return (
    <section id="features" className="section-margin bg-gradient-to-br from-surface/30 to-primary-ultralight/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto section-padding relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-up">
          <Badge className="mb-8 glass-premium text-primary border-primary/20 px-6 py-3 text-lg hover-premium">
            <Sparkles className="h-5 w-5 mr-2" />
            Powerful AI Features
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-8 leading-tight">
            <span className="text-gradient-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text">
              Powerful Features
            </span>
            <br />
            <span className="text-text-primary">Built for Scale</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-text-muted leading-relaxed mb-8">
            From voice cloning to campaign automation, VoiceLead gives you everything needed to 
            <span className="text-primary font-semibold"> dominate Instagram outreach</span> and 10x your response rates.
          </p>
          <Link to="/auth">
            <Button className="bg-gradient-primary hover:shadow-premium text-white text-lg font-bold px-8 py-4 h-auto hover-premium group rounded-2xl border-0 shadow-xl uppercase tracking-wide hover-scale transition-all duration-300">
              <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              See How It Works
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {features.map((feature, index) => (
            <MagneticEffect key={index}>
              <GlowEffect>
                <Card 
                  className="group hover-premium premium-border bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-normal animate-bounce-in h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-premium transition-all hover-float`}>
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs animate-bounce-in" style={{ animationDelay: `${index * 0.2}s` }}>
                        {feature.badge}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-text-primary group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-text-muted leading-relaxed text-base lg:text-lg flex-grow">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </GlowEffect>
            </MagneticEffect>
          ))}
        </div>

        {/* Stats Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-premium opacity-15 rounded-3xl blur-3xl animate-pulse-glow"></div>
          <GlowEffect>
            <Card className="relative glass-premium border-primary/20 shadow-premium hover-tilt">
              <CardContent className="p-8 md:p-16">
                <div className="text-center mb-12">
                  <h3 className="text-3xl lg:text-4xl font-bold font-display mb-6">
                    <span className="text-gradient-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text">
                      Platform Performance
                    </span>
                  </h3>
                  <p className="text-text-muted text-lg lg:text-xl max-w-2xl mx-auto">
                    Trusted by 300+ agencies worldwide for reliable, high-performance voice automation that delivers results
                  </p>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group cursor-pointer animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <stat.icon className={`h-10 w-10 ${stat.color} mr-3`} />
                        <span className="text-4xl lg:text-5xl font-bold text-text-primary">
                          {stat.value}
                        </span>
                      </div>
                      <p className="text-text-muted font-semibold text-sm lg:text-base">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </GlowEffect>
        </div>
      </div>
    </section>
  );
}