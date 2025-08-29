import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  ExternalLink, 
  Download, 
  Newspaper,
  Trophy,
  Quote,
  Users,
  Building,
  Camera,
  FileText,
  Video,
  Mic,
  TrendingUp
} from 'lucide-react';

const Press = () => {
  const pressReleases = [
    {
      id: 1,
      title: "VoiceLead Raises $15M Series A to Revolutionize B2B Voice Communication",
      date: "2024-01-10",
      excerpt: "Leading voice AI platform secures funding from top-tier VCs to expand team and accelerate product development.",
      category: "Funding",
      featured: true
    },
    {
      id: 2,
      title: "VoiceLead Achieves 300% Growth in Enterprise Customers",
      date: "2023-12-15",
      excerpt: "Platform demonstrates strong market demand with rapid adoption among Fortune 500 companies.",
      category: "Milestone"
    },
    {
      id: 3,
      title: "VoiceLead Launches Advanced AI Voice Cloning Technology",
      date: "2023-11-20",
      excerpt: "New breakthrough AI technology enables hyper-realistic voice cloning with just 2 minutes of audio.",
      category: "Product"
    },
    {
      id: 4,
      title: "VoiceLead Partners with Major CRM Platforms for Seamless Integration",
      date: "2023-10-05",
      excerpt: "Strategic partnerships with Salesforce, HubSpot, and Pipedrive bring voice messaging to millions of users.",
      category: "Partnership"
    }
  ];

  const mediaHighlights = [
    {
      outlet: "TechCrunch",
      title: "How VoiceLead is Changing the Future of Sales Outreach",
      date: "2024-01-08",
      type: "Article",
      logo: "/api/placeholder/120/60"
    },
    {
      outlet: "Forbes",
      title: "The Rise of AI Voice Technology in Business Communications",
      date: "2023-12-20",
      type: "Feature",
      logo: "/api/placeholder/120/60"
    },
    {
      outlet: "Wired",
      title: "Inside the Voice AI Revolution",
      date: "2023-11-15",
      type: "Interview",
      logo: "/api/placeholder/120/60"
    },
    {
      outlet: "The Verge",
      title: "VoiceLead's AI Can Clone Your Voice in Minutes",
      date: "2023-10-28",
      type: "Review",
      logo: "/api/placeholder/120/60"
    }
  ];

  const awards = [
    {
      title: "AI Innovation Award 2023",
      organization: "Tech Innovation Summit",
      description: "Recognized for breakthrough voice cloning technology"
    },
    {
      title: "Best B2B SaaS Product",
      organization: "SaaS Awards 2023",
      description: "Winner in the Business Communication category"
    },
    {
      title: "Startup of the Year",
      organization: "AI Startup Awards",
      description: "Leading innovation in voice AI technology"
    }
  ];

  const teamMembers = [
    {
      name: "Alex Chen",
      title: "CEO & Co-Founder",
      bio: "Former VP of AI at Google, 15+ years in voice technology",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Sarah Rodriguez",
      title: "CTO & Co-Founder", 
      bio: "Ex-Tesla AI Engineer, PhD in Machine Learning from Stanford",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Michael Thompson",
      title: "VP of Sales",
      bio: "Former Salesforce executive, expert in B2B sales strategy",
      image: "/api/placeholder/150/150"
    }
  ];

  const resources = [
    {
      title: "VoiceLead Brand Kit",
      description: "Logos, brand guidelines, and visual assets",
      type: "ZIP",
      icon: Download
    },
    {
      title: "High-Resolution Photos",
      description: "Team photos and product screenshots",
      type: "ZIP",
      icon: Camera
    },
    {
      title: "Executive Bios",
      description: "Detailed biographies of leadership team",
      type: "PDF",
      icon: FileText
    },
    {
      title: "Product Demo Video",
      description: "2-minute overview of VoiceLead platform",
      type: "MP4",
      icon: Video
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Funding': return 'bg-primary/20 text-primary';
      case 'Product': return 'bg-accent/20 text-accent';
      case 'Milestone': return 'bg-warning/20 text-warning';
      case 'Partnership': return 'bg-error/20 text-error';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-background/95"></div>
        <div className="relative z-10 section-padding py-16">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center text-primary hover-scale mb-8">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            
            <div className="text-center animate-fade-up">
              <Badge className="bg-primary-ultralight text-primary border-primary/20 mb-6 px-4 py-2">
                <Newspaper className="h-4 w-4 mr-2" />
                Press Center
              </Badge>
              <h1 className="text-5xl font-bold font-display text-text-primary mb-6">
                VoiceLead in the News
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto">
                Latest news, press releases, and media resources about VoiceLead's mission to revolutionize business communication
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="glass border-border/50 animate-fade-up">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-text-primary">$15M</p>
                <p className="text-sm text-text-muted">Series A Funding</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-warning/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <p className="text-2xl font-bold text-text-primary">10K+</p>
                <p className="text-sm text-text-muted">Active Users</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-warning/20 to-error/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Building className="h-6 w-6 text-warning" />
                </div>
                <p className="text-2xl font-bold text-text-primary">500+</p>
                <p className="text-sm text-text-muted">Enterprise Clients</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-error/20 to-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Mic className="h-6 w-6 text-error" />
                </div>
                <p className="text-2xl font-bold text-text-primary">1M+</p>
                <p className="text-sm text-text-muted">Voice Messages</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Press Releases */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-6">Latest Press Releases</h2>
                <div className="space-y-6">
                  {pressReleases.map((release, index) => (
                    <Card key={release.id} className={`glass border-border/50 animate-fade-up hover-lift ${release.featured ? 'ring-2 ring-primary/20' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge className={`${getCategoryColor(release.category)} border-0`}>
                            {release.category}
                          </Badge>
                          {release.featured && (
                            <Badge className="bg-primary text-primary-foreground">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-text-primary mb-3 hover:text-primary transition-colors cursor-pointer">
                          {release.title}
                        </h3>
                        <p className="text-text-muted mb-4">{release.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-text-muted">
                            <Calendar className="h-4 w-4 mr-2" />
                            {release.date}
                          </div>
                          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                            Read More
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Media Highlights */}
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-6">Media Highlights</h2>
                <div className="grid gap-4">
                  {mediaHighlights.map((highlight, index) => (
                    <Card key={index} className="glass border-border/50 animate-fade-up hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={highlight.logo} 
                            alt={highlight.outlet}
                            className="w-16 h-8 object-contain bg-surface rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-text-primary hover:text-primary transition-colors cursor-pointer">
                              {highlight.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-text-muted mt-1">
                              <span>{highlight.outlet}</span>
                              <span>•</span>
                              <span>{highlight.type}</span>
                              <span>•</span>
                              <span>{highlight.date}</span>
                            </div>
                          </div>
                          <ExternalLink className="h-5 w-5 text-text-muted hover:text-primary transition-colors cursor-pointer" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Media Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-text-primary">Sarah Johnson</p>
                    <p className="text-sm text-text-muted">Head of Communications</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-text-muted">
                      <span className="text-text-primary">Email:</span> press@voicelead.ai
                    </p>
                    <p className="text-text-muted">
                      <span className="text-text-primary">Phone:</span> +1 (555) 123-4567
                    </p>
                  </div>
                  <Button className="w-full bg-gradient-primary hover:shadow-primary hover-lift">
                    Contact Press Team
                  </Button>
                </CardContent>
              </Card>

              {/* Awards */}
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="flex items-center text-text-primary">
                    <Trophy className="h-5 w-5 mr-2 text-warning" />
                    Awards & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {awards.map((award, index) => (
                    <div key={index} className="p-3 rounded-lg bg-surface/30 border border-border/50">
                      <h4 className="font-semibold text-text-primary text-sm">{award.title}</h4>
                      <p className="text-xs text-text-muted mb-1">{award.organization}</p>
                      <p className="text-xs text-text-muted">{award.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Leadership */}
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Leadership Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover bg-surface"
                      />
                      <div>
                        <h4 className="font-semibold text-text-primary text-sm">{member.name}</h4>
                        <p className="text-xs text-primary mb-1">{member.title}</p>
                        <p className="text-xs text-text-muted">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Resources */}
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Media Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <resource.icon className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium text-text-primary text-sm">{resource.title}</h4>
                          <p className="text-xs text-text-muted">{resource.description}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;