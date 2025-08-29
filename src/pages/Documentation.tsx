import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Zap, 
  Settings, 
  Users,
  MessageCircle,
  Shield,
  Code,
  Play,
  Download,
  ChevronRight
} from 'lucide-react';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    {
      title: "Getting Started",
      icon: Zap,
      color: "text-primary",
      articles: [
        { title: "Quick Start Guide", description: "Get up and running in 5 minutes", time: "2 min" },
        { title: "Account Setup", description: "Configure your VoiceLead account", time: "3 min" },
        { title: "First Voice Message", description: "Send your first personalized voice message", time: "5 min" },
        { title: "Understanding the Dashboard", description: "Navigate the VoiceLead interface", time: "4 min" }
      ]
    },
    {
      title: "Voice Cloning",
      icon: MessageCircle,
      color: "text-accent",
      articles: [
        { title: "Creating Voice Clones", description: "Step-by-step voice cloning process", time: "8 min" },
        { title: "Voice Quality Guidelines", description: "Best practices for high-quality clones", time: "6 min" },
        { title: "Managing Voice Library", description: "Organize and edit your voice clones", time: "4 min" },
        { title: "Voice Clone Sharing", description: "Share clones with team members", time: "3 min" }
      ]
    },
    {
      title: "Campaigns & Outreach",
      icon: Users,
      color: "text-warning",
      articles: [
        { title: "Creating Campaigns", description: "Set up targeted voice campaigns", time: "10 min" },
        { title: "Contact Management", description: "Import and organize your leads", time: "7 min" },
        { title: "Message Personalization", description: "Dynamic content and variables", time: "12 min" },
        { title: "Campaign Analytics", description: "Track and optimize performance", time: "8 min" }
      ]
    },
    {
      title: "Advanced Features",
      icon: Settings,
      color: "text-error",
      articles: [
        { title: "API Integration", description: "Connect VoiceLead with your tools", time: "15 min" },
        { title: "Webhook Configuration", description: "Real-time event notifications", time: "10 min" },
        { title: "Custom Variables", description: "Advanced personalization options", time: "8 min" },
        { title: "Team Management", description: "User roles and permissions", time: "6 min" }
      ]
    }
  ];

  const quickLinks = [
    { title: "API Reference", icon: Code, url: "#" },
    { title: "Video Tutorials", icon: Play, url: "#" },
    { title: "Download Resources", icon: Download, url: "#" },
    { title: "Security Guide", icon: Shield, url: "#" }
  ];

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
                <BookOpen className="h-4 w-4 mr-2" />
                Documentation
              </Badge>
              <h1 className="text-5xl font-bold font-display text-text-primary mb-6">
                VoiceLead Docs
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto mb-8">
                Everything you need to master AI voice messaging and maximize your outreach success
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                <Input 
                  placeholder="Search documentation..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-surface border-border"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          {/* Quick Links */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {quickLinks.map((link, index) => (
              <Card key={link.title} className="glass border-border/50 hover-lift animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-text-primary">{link.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Documentation Sections */}
          <div className="grid lg:grid-cols-2 gap-8">
            {sections.map((section, sectionIndex) => (
              <Card key={section.title} className="glass border-border/50 animate-fade-up" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="flex items-center text-text-primary">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mr-3">
                      <section.icon className={`h-5 w-5 ${section.color}`} />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {section.articles.map((article, articleIndex) => (
                    <div key={article.title} className="flex items-center justify-between p-3 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors group cursor-pointer">
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-sm text-text-muted">{article.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-text-muted">
                        <span className="text-xs">{article.time}</span>
                        <ChevronRight className="h-4 w-4 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Articles */}
          <Card className="glass border-border/50 mt-12 animate-fade-up">
            <CardHeader>
              <CardTitle className="text-text-primary">Popular Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors cursor-pointer group">
                  <Badge className="bg-primary/20 text-primary border-0 mb-3">Getting Started</Badge>
                  <h4 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    How to Create Your First Voice Clone
                  </h4>
                  <p className="text-sm text-text-muted mb-3">
                    Complete walkthrough of the voice cloning process with tips for best results.
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>10 min read</span>
                    <span>⭐ 4.9/5</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors cursor-pointer group">
                  <Badge className="bg-accent/20 text-accent border-0 mb-3">Advanced</Badge>
                  <h4 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    Maximizing Response Rates
                  </h4>
                  <p className="text-sm text-text-muted mb-3">
                    Advanced strategies and psychology behind effective voice messaging.
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>15 min read</span>
                    <span>⭐ 4.8/5</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors cursor-pointer group">
                  <Badge className="bg-warning/20 text-warning border-0 mb-3">Integration</Badge>
                  <h4 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    CRM Integration Guide
                  </h4>
                  <p className="text-sm text-text-muted mb-3">
                    Connect VoiceLead with popular CRM platforms and automate workflows.
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>12 min read</span>
                    <span>⭐ 4.7/5</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Still need help?
            </h2>
            <p className="text-text-muted mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
                Contact Support
              </Button>
              <Button variant="outline" className="border-border hover:bg-surface">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;