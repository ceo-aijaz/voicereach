import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  User, 
  BookOpen,
  Star,
  Eye,
  PlayCircle,
  ChevronRight
} from 'lucide-react';

const Tutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: "VoiceLead Complete Beginner's Guide",
      description: "Everything you need to know to get started with AI voice messaging",
      duration: "25:30",
      level: "Beginner",
      views: "12.5K",
      rating: 4.9,
      thumbnail: "/api/placeholder/600/400",
      featured: true
    },
    {
      id: 2,
      title: "Creating Your First Voice Clone",
      description: "Step-by-step tutorial on recording and training your AI voice",
      duration: "18:45",
      level: "Beginner",
      views: "8.2K",
      rating: 4.8,
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "Advanced Personalization Techniques",
      description: "Master dynamic variables and advanced message customization",
      duration: "22:15",
      level: "Advanced",
      views: "5.7K",
      rating: 4.9,
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 4,
      title: "Campaign Optimization Strategies",
      description: "Data-driven approaches to maximize your response rates",
      duration: "31:20",
      level: "Intermediate",
      views: "6.3K",
      rating: 4.7,
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 5,
      title: "Integration with Popular CRMs",
      description: "Connect VoiceLead with Salesforce, HubSpot, and more",
      duration: "28:10",
      level: "Intermediate",
      views: "4.1K",
      rating: 4.6,
      thumbnail: "/api/placeholder/400/300"
    },
    {
      id: 6,
      title: "Voice Psychology & Persuasion",
      description: "Understanding the psychology behind effective voice communication",
      duration: "35:45",
      level: "Advanced",
      views: "7.8K",
      rating: 4.9,
      thumbnail: "/api/placeholder/400/300"
    }
  ];

  const categories = [
    { name: "All", count: 24 },
    { name: "Getting Started", count: 8 },
    { name: "Voice Cloning", count: 6 },
    { name: "Campaigns", count: 5 },
    { name: "Analytics", count: 3 },
    { name: "Integrations", count: 2 }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-accent/20 text-accent';
      case 'Intermediate': return 'bg-warning/20 text-warning';
      case 'Advanced': return 'bg-error/20 text-error';
      default: return 'bg-primary/20 text-primary';
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
                <PlayCircle className="h-4 w-4 mr-2" />
                Video Tutorials
              </Badge>
              <h1 className="text-5xl font-bold font-display text-text-primary mb-6">
                Learn VoiceLead
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto">
                Master AI voice messaging with our comprehensive video tutorials and hands-on guides
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={category.name === "All" ? "default" : "outline"}
                className={category.name === "All" ? "bg-gradient-primary" : "border-border hover:bg-surface"}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* Featured Tutorial */}
          <Card className="glass border-border/50 mb-12 overflow-hidden animate-fade-up">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative group">
                <img 
                  src={tutorials[0].thumbnail} 
                  alt={tutorials[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                </div>
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Featured
                </Badge>
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded px-2 py-1 text-white text-sm">
                  {tutorials[0].duration}
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className={`w-fit ${getLevelColor(tutorials[0].level)} border-0 mb-4`}>
                  {tutorials[0].level}
                </Badge>
                <h2 className="text-3xl font-bold text-text-primary mb-4">
                  {tutorials[0].title}
                </h2>
                <p className="text-text-muted mb-6">
                  {tutorials[0].description}
                </p>
                <div className="flex items-center space-x-6 text-sm text-text-muted mb-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {tutorials[0].duration}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    {tutorials[0].views} views
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-warning fill-current" />
                    {tutorials[0].rating}
                  </div>
                </div>
                <Button className="w-fit bg-gradient-primary hover:shadow-primary hover-lift">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Now
                </Button>
              </div>
            </div>
          </Card>

          {/* Tutorial Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {tutorials.slice(1).map((tutorial, index) => (
              <Card key={tutorial.id} className="glass border-border/50 overflow-hidden animate-fade-up hover-lift group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img 
                    src={tutorial.thumbnail} 
                    alt={tutorial.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded px-2 py-1 text-white text-xs">
                    {tutorial.duration}
                  </div>
                  <Badge className={`absolute top-3 left-3 ${getLevelColor(tutorial.level)} border-0 text-xs`}>
                    {tutorial.level}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-text-muted mb-4 text-sm line-clamp-2">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {tutorial.views}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-warning fill-current" />
                        {tutorial.rating}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="w-full text-primary hover:bg-primary/10 group">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Tutorial
                    <ChevronRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Learning Path */}
          <Card className="glass border-border/50 mt-16 animate-fade-up">
            <CardHeader>
              <CardTitle className="flex items-center text-text-primary">
                <BookOpen className="h-6 w-6 mr-3 text-primary" />
                Recommended Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Getting Started</h4>
                  <p className="text-sm text-text-muted">Learn the basics and set up your account</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Voice Cloning</h4>
                  <p className="text-sm text-text-muted">Create your first AI voice clone</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Campaigns</h4>
                  <p className="text-sm text-text-muted">Launch your first voice campaign</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">4</span>
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Optimization</h4>
                  <p className="text-sm text-text-muted">Advanced strategies and analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Ready to get started?
            </h2>
            <p className="text-text-muted mb-6">
              Join thousands of users who are already using VoiceLead to transform their outreach.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-border hover:bg-surface">
                View All Tutorials
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;