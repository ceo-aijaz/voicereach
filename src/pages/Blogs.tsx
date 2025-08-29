import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  TrendingUp,
  MessageCircle,
  BookOpen,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How AI Voice Messages Are Revolutionizing B2B Sales",
      excerpt: "Discover how voice messages are achieving 300%+ higher response rates compared to traditional text-based outreach methods.",
      author: "VoiceLead Team",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Sales Strategy",
      image: "/api/placeholder/400/250",
      trending: true
    },
    {
      id: 2,
      title: "The Psychology Behind Voice Communication in Business",
      excerpt: "Understanding why voice creates deeper connections and trust with prospects, backed by psychological research and real-world data.",
      author: "Dr. Sarah Chen",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Psychology",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Building Your Personal Voice Brand for Outreach",
      excerpt: "Learn how to create a consistent and compelling voice persona that resonates with your target audience.",
      author: "Mark Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Branding",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Voice Cloning Ethics: Best Practices for Business Use",
      excerpt: "Navigate the ethical considerations of AI voice cloning in business communications while maintaining authenticity.",
      author: "VoiceLead Team",
      date: "2024-01-08",
      readTime: "4 min read",
      category: "Ethics",
      image: "/api/placeholder/400/250"
    }
  ];

  const categories = ["All", "Sales Strategy", "Psychology", "Branding", "Ethics", "Technology"];

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
                VoiceLead Blog
              </Badge>
              <h1 className="text-5xl font-bold font-display text-text-primary mb-6">
                Insights & Strategies
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto">
                Expert insights on voice AI, sales psychology, and the future of personalized business communication
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 bg-surface border-border"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className={category === "All" ? "bg-gradient-primary" : "border-border hover:bg-surface"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Article */}
          <Card className="glass border-border/50 mb-12 overflow-hidden animate-fade-up">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Featured article"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-warning text-warning-foreground">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit bg-primary/20 text-primary border-0 mb-4">
                  Sales Strategy
                </Badge>
                <h2 className="text-3xl font-bold text-text-primary mb-4">
                  How AI Voice Messages Are Revolutionizing B2B Sales
                </h2>
                <p className="text-text-muted mb-6">
                  Discover how voice messages are achieving 300%+ higher response rates compared to traditional text-based outreach methods.
                </p>
                <div className="flex items-center space-x-6 text-sm text-text-muted mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    VoiceLead Team
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Jan 15, 2024
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    5 min read
                  </div>
                </div>
                <Button className="w-fit bg-gradient-primary hover:shadow-primary hover-lift">
                  Read Article
                </Button>
              </div>
            </div>
          </Card>

          {/* Blog Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card key={post.id} className="glass border-border/50 overflow-hidden animate-fade-up hover-lift group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary/20 text-primary border-0">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-text-muted mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">{post.date}</span>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-border hover:bg-surface">
              Load More Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;