import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Plus, 
  Zap, 
  Bug, 
  Shield,
  Sparkles,
  ChevronRight,
  Star,
  TrendingUp
} from 'lucide-react';

const Changelog = () => {
  const releases = [
    {
      version: "v2.4.0",
      date: "2024-01-15",
      type: "major",
      title: "Advanced Voice Analytics & Team Collaboration",
      description: "Major update introducing comprehensive analytics dashboard and enhanced team features.",
      changes: [
        {
          type: "new",
          title: "Advanced Analytics Dashboard",
          description: "Detailed campaign performance metrics, voice engagement insights, and ROI tracking."
        },
        {
          type: "new", 
          title: "Team Collaboration Tools",
          description: "Share voice clones, collaborative campaign management, and role-based permissions."
        },
        {
          type: "improvement",
          title: "Enhanced Voice Quality",
          description: "Improved AI voice processing with 40% better naturalness and emotion detection."
        },
        {
          type: "improvement",
          title: "Faster Processing Times",
          description: "Voice clone generation now 60% faster with optimized AI models."
        },
        {
          type: "fix",
          title: "Campaign Export Issues",
          description: "Fixed issues with exporting large campaign datasets to CSV and Excel formats."
        }
      ]
    },
    {
      version: "v2.3.2",
      date: "2024-01-08",
      type: "patch",
      title: "Bug Fixes & Performance Improvements",
      description: "Important fixes for voice processing and improved system stability.",
      changes: [
        {
          type: "fix",
          title: "Voice Processing Timeout",
          description: "Resolved timeout issues affecting voice clone creation for files over 5 minutes."
        },
        {
          type: "fix",
          title: "Dashboard Loading Performance",
          description: "Fixed slow loading times for users with large campaign histories."
        },
        {
          type: "improvement",
          title: "API Rate Limiting",
          description: "Improved API stability with better rate limiting and error handling."
        }
      ]
    },
    {
      version: "v2.3.0",
      date: "2024-01-01",
      type: "minor",
      title: "New Year Feature Release",
      description: "Starting 2024 with powerful new personalization features and integrations.",
      changes: [
        {
          type: "new",
          title: "Dynamic Voice Variables",
          description: "Insert personalized data like names, companies, and custom fields into voice messages."
        },
        {
          type: "new",
          title: "CRM Integration Hub",
          description: "Connect with Salesforce, HubSpot, Pipedrive, and 20+ other popular CRM platforms."
        },
        {
          type: "new",
          title: "Voice Message Templates",
          description: "Pre-built templates for common use cases: sales, follow-ups, and customer success."
        },
        {
          type: "improvement",
          title: "Mobile App Optimization",
          description: "Redesigned mobile experience with faster loading and better voice recording quality."
        }
      ]
    },
    {
      version: "v2.2.1",
      date: "2023-12-20",
      type: "patch",
      title: "Holiday Stability Update",
      description: "Critical stability improvements for high-volume holiday campaigns.",
      changes: [
        {
          type: "fix",
          title: "High Volume Processing",
          description: "Fixed memory issues when processing large batches of voice messages during peak usage."
        },
        {
          type: "improvement",
          title: "Error Reporting",
          description: "Enhanced error messages with actionable solutions and better debugging information."
        },
        {
          type: "security",
          title: "Security Enhancements",
          description: "Implemented additional security measures for voice data storage and transmission."
        }
      ]
    },
    {
      version: "v2.2.0", 
      date: "2023-12-15",
      type: "minor",
      title: "AI Voice Enhancement Update",
      description: "Significant improvements to voice quality and new AI-powered features.",
      changes: [
        {
          type: "new",
          title: "Emotion Detection",
          description: "AI now detects and preserves emotional nuances in voice clones for more authentic messages."
        },
        {
          type: "new",
          title: "Voice Accent Adaptation",
          description: "Automatically adapt voice clones to match regional accents and speaking patterns."
        },
        {
          type: "improvement",
          title: "Background Noise Removal",
          description: "Advanced AI filtering removes background noise from voice recordings automatically."
        },
        {
          type: "improvement",
          title: "Batch Campaign Processing",
          description: "Process up to 1000 voice messages simultaneously with improved queue management."
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-primary text-primary-foreground';
      case 'minor': return 'bg-accent/20 text-accent';
      case 'patch': return 'bg-warning/20 text-warning';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'new': return <Plus className="h-4 w-4 text-accent" />;
      case 'improvement': return <Zap className="h-4 w-4 text-primary" />;
      case 'fix': return <Bug className="h-4 w-4 text-warning" />;
      case 'security': return <Shield className="h-4 w-4 text-error" />;
      default: return <Sparkles className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'new': return 'bg-accent/20 text-accent';
      case 'improvement': return 'bg-primary/20 text-primary';
      case 'fix': return 'bg-warning/20 text-warning';
      case 'security': return 'bg-error/20 text-error';
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
                <Tag className="h-4 w-4 mr-2" />
                Product Updates
              </Badge>
              <h1 className="text-5xl font-bold font-display text-text-primary mb-6">
                Changelog
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto">
                Stay up to date with new features, improvements, and fixes in VoiceLead
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding py-16">
        <div className="max-w-4xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass border-border/50 animate-fade-up">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-text-primary">47</p>
                <p className="text-sm text-text-muted">Features Added</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-warning/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <p className="text-2xl font-bold text-text-primary">89</p>
                <p className="text-sm text-text-muted">Improvements</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-warning/20 to-error/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Bug className="h-6 w-6 text-warning" />
                </div>
                <p className="text-2xl font-bold text-text-primary">156</p>
                <p className="text-sm text-text-muted">Bugs Fixed</p>
              </CardContent>
            </Card>
          </div>

          {/* Releases Timeline */}
          <div className="space-y-8">
            {releases.map((release, index) => (
              <Card key={release.version} className="glass border-border/50 animate-fade-up overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge className={`${getTypeColor(release.type)} border-0`}>
                        {release.version}
                      </Badge>
                      <div className="flex items-center text-text-muted text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {release.date}
                      </div>
                    </div>
                    {release.type === 'major' && (
                      <Badge className="bg-warning/20 text-warning border-0">
                        <Star className="h-3 w-3 mr-1" />
                        Major Release
                      </Badge>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-text-primary mb-2">{release.title}</CardTitle>
                    <p className="text-text-muted">{release.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {release.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex items-start space-x-4 p-4 rounded-lg bg-surface/30 border border-border/50">
                      <div className="flex-shrink-0 mt-0.5">
                        {getChangeIcon(change.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-text-primary">{change.title}</h4>
                          <Badge className={`${getChangeTypeColor(change.type)} border-0 text-xs`}>
                            {change.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-muted">{change.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-border hover:bg-surface">
              <ChevronRight className="h-4 w-4 mr-2" />
              View Older Releases
            </Button>
          </div>

          {/* Subscribe to Updates */}
          <Card className="glass border-border/50 mt-16 animate-fade-up">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Stay Updated</h3>
              <p className="text-text-muted mb-6 max-w-2xl mx-auto">
                Get notified about new features, improvements, and important updates delivered straight to your inbox.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
                  Subscribe to Updates
                </Button>
                <Button variant="outline" className="border-border hover:bg-surface">
                  Follow on Twitter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Changelog;