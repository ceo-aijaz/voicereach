import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Mic2, 
  Facebook, 
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


const features = [
  {
    icon: Mic2,
    title: 'AI Voice Cloning',
    description: 'Clone your voice with just 2 minutes of audio. Perfect emotional tone replication across 5+ different moods.',
    badge: 'Core',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    icon: Facebook,
    title: 'Facebook DM Automation',
    description: 'Send UpTo 1500 Voice DMs per month across multiple accounts with smart scheduling and anti-detection.',
    badge: 'Premium',
    gradient: 'from-blue-500 to-blue-600'
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
  { icon: Users, value: '15+', label: 'Facebook accounts', color: 'text-blue-500' }
];

export function Features() {
  return (
    <section id="features" className="section-margin bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-800 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="container mx-auto section-padding relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-6 py-3 text-sm font-medium">
            <Sparkles className="h-4 w-4 mr-2" />
            Powerful AI Features
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="text-primary">
              Powerful Features
            </span>
            <br />
            <span className="text-slate-900 dark:text-white">Built for Scale</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            From voice cloning to campaign automation, VoiceLead gives you everything needed to 
            <span className="text-primary font-semibold"> dominate Facebook outreach</span> and 10x your response rates.
          </p>
          <Link to="/auth">
            <Button className="bg-primary hover:bg-primary/90 text-white text-lg font-semibold px-8 py-4 h-auto rounded-lg transition-all duration-200 hover:scale-105">
              <PlayCircle className="mr-2 h-5 w-5" />
              See How It Works
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all duration-300 hover:shadow-lg opacity-0 animate-fade-in h-full"
              style={{ animationDelay: `${(index + 1) * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {feature.badge}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <Card className="border border-slate-200 dark:border-slate-700 shadow-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <CardContent className="p-8 md:p-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                <span className="text-primary">
                  Platform Performance
                </span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Trusted by 300+ agencies worldwide for reliable, high-performance voice automation that delivers results
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group opacity-0 animate-fade-in" style={{ animationDelay: `${(index + 10) * 0.1}s`, animationFillMode: 'forwards' }}>
                  <div className="flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <stat.icon className={`h-8 w-8 ${stat.color} mr-3`} />
                    <span className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}