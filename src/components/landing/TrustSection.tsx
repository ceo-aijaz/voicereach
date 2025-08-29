import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Shield, Clock } from 'lucide-react';

export function TrustSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director, GrowthLab",
      avatar: "SC",
      content: "VoiceLead increased our Facebook DM response rate from 8% to 31%. The personalization is incredible.",
      rating: 5,
      results: "+287% response rate"
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO, Digital Reach",
      avatar: "MR", 
      content: "We've sent 10,000+ voice DMs in the last month. Our clients are getting meetings booked daily.",
      rating: 5,
      results: "10K+ DMs sent"
    },
    {
      name: "Emily Watson",
      role: "Agency Owner",
      avatar: "EW",
      content: "The AI voice clone sounds exactly like me. Our prospects are shocked it's not a real recording.",
      rating: 5,
      results: "95% voice accuracy"
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "300%+ Higher Response Rate",
      description: "Voice messages get 3x more responses than text DMs"
    },
    {
      icon: Clock,
      title: "10x Faster Outreach",
      description: "Send thousands of personalized voice DMs in minutes"
    },
    {
      icon: Shield,
      title: "Facebook Safe",
      description: "Built to comply with Facebook's terms of service"
    }
  ];

  return (
    <section className="section-margin bg-gradient-to-br from-surface/50 to-primary-ultralight/30">
      <div className="container mx-auto section-padding">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <Badge className="bg-accent/10 text-accent border-accent/20 mb-6 px-4 py-2">
            <Star className="h-4 w-4 mr-2 fill-accent" />
            Trusted by 300+ Agencies
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
            See Why Agencies Choose
            <span className="text-gradient-primary block">VoiceLead</span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Join hundreds of successful agencies using AI voice messaging to scale their outreach and book more meetings.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-8 text-center hover-lift glass border-primary/10 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-text-muted">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 hover-lift hover-tilt glass animate-bounce-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-text-muted">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="flex mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              
              <p className="text-text-secondary mb-4 italic">"{testimonial.content}"</p>
              
              <Badge className="bg-accent/10 text-accent border-accent/20">
                {testimonial.results}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}