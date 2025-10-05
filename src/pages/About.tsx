import React from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mic2, 
  Users, 
  Target, 
  TrendingUp, 
  Award,
  Heart,
  Zap,
  Globe,
  ArrowRight
} from 'lucide-react';

const About = () => {
  const stats = [
    { value: '300+', label: 'Beta Users', icon: Users },
    { value: '22.5K+', label: 'Voice DMs Sent', icon: Mic2 },
    { value: '300%', label: 'Avg Increase in Response Rate', icon: TrendingUp },
    { value: '95%', label: 'Voice Accuracy', icon: Award },
  ];

  const team = [
    {
      name: 'Alex Rodriguez',
      role: 'CEO & Co-Founder',
      bio: 'Former Head of Growth at TechCorp. 10+ years in marketing automation.',
      image: '👨‍💼'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Google AI researcher. PhD in Machine Learning and Voice Technology.',
      image: '👩‍💻'
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Product',
      bio: 'Product leader from Meta. Expert in social media automation platforms.',
      image: '👨‍🔬'
    },
    {
      name: 'Emily Foster',
      role: 'VP of Marketing',
      bio: 'Growth marketing expert. Scaled 3 startups from 0 to 8-figures.',
      image: '👩‍🚀'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Human-First Technology',
      description: 'We believe technology should enhance human connection, not replace it. Our voice cloning creates authentic, personal experiences.'
    },
    {
      icon: Zap,
      title: 'Innovation at Scale',
      description: 'We push the boundaries of what\'s possible with AI and automation while maintaining simplicity for our users.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Our mission is to democratize personalized outreach for businesses of all sizes, anywhere in the world.'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Every feature we build is designed with one goal: helping our customers achieve measurable business growth.'
    }
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
              <Badge className="bg-primary-ultralight text-primary border-primary/20 mb-6">
                🚀 About VoiceReach
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight mb-6">
                <span className="text-text-primary">Revolutionizing</span>
                <br />
                <span className="text-gradient-primary">Voice Outreach</span>
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto mb-8">
                We're on a mission to transform how businesses connect with their prospects through 
                hyper-personalized AI voice messaging that feels genuinely human.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
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

        {/* Story Section */}
        <section className="section-margin">
          <div className="container mx-auto section-padding">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 animate-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                  <span className="text-text-primary">Our</span>
                  <span className="text-gradient-primary"> Story</span>
                </h2>
                <p className="text-xl text-text-muted">
                  Born from the frustration of low response rates in digital outreach
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-up">
                  <Card className="glass border-border/50">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                        <Mic2 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold font-display text-text-primary mb-4">
                        The Problem We Saw
                      </h3>
                      <p className="text-text-muted leading-relaxed">
                        In 2023, our founders were running a digital marketing agency and struggling with 
                        terrible response rates from traditional text-based outreach. Despite having great 
                        services, generic messages weren't cutting through the noise.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  <Card className="glass border-border/50">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6">
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold font-display text-text-primary mb-4">
                        The Breakthrough
                      </h3>
                      <p className="text-text-muted leading-relaxed">
                        We discovered that voice messages had 300%+ higher response rates than text. 
                        But recording individual voice messages for thousands of prospects wasn't scalable. 
                        That's when we decided to build VoiceReach.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-margin bg-gradient-to-b from-surface/30 to-background">
          <div className="container mx-auto section-padding">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                <span className="text-text-primary">Our</span>
                <span className="text-gradient-primary"> Values</span>
              </h2>
              <p className="text-xl text-text-muted max-w-2xl mx-auto">
                The principles that guide everything we do at VoiceReach
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="glass border-border/50 hover:border-primary/20 transition-all hover-lift animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-text-primary mb-4">
                      {value.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-margin">
          <div className="container mx-auto section-padding">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                <span className="text-text-primary">Meet the</span>
                <span className="text-gradient-primary"> Team</span>
              </h2>
              <p className="text-xl text-text-muted max-w-2xl mx-auto">
                The people building the future of voice-powered outreach
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="glass border-border/50 text-center hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <h3 className="text-lg font-bold font-display text-text-primary mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-margin bg-gradient-to-b from-background to-surface/30">
          <div className="container mx-auto section-padding">
            <Card className="glass border-primary/20 shadow-primary/10 animate-fade-up">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                  <span className="text-text-primary">Ready to Join Our</span>
                  <span className="text-gradient-primary"> Mission?</span>
                </h2>
                <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8">
                  Be part of the voice outreach revolution. Start your free trial today 
                  and see why 300+ agencies trust VoiceReach.
                </p>
                <Button className="bg-gradient-primary hover:shadow-primary hover-lift" size="lg">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;