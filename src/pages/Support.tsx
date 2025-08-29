import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock,
  Search,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Zap,
  Users,
  Settings,
  BookOpen,
  Send,
  CheckCircle
} from 'lucide-react';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      color: "text-primary",
      available: "Available 24/7",
      action: "Start Chat"
    },
    {
      title: "Email Support", 
      description: "Send us a detailed message",
      icon: Mail,
      color: "text-accent",
      available: "Response within 2 hours",
      action: "Send Email"
    },
    {
      title: "Phone Support",
      description: "Talk to our experts directly",
      icon: Phone,
      color: "text-warning",
      available: "Mon-Fri 9AM-6PM EST",
      action: "Schedule Call"
    }
  ];

  const faqCategories = [
    { name: "All", icon: HelpCircle },
    { name: "Getting Started", icon: Zap },
    { name: "Voice Cloning", icon: MessageCircle },
    { name: "Billing", icon: Settings },
    { name: "Account", icon: Users }
  ];

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I create my first voice clone?",
      answer: "Creating your first voice clone is simple! Go to the Voice Cloning section, click 'Create New Voice', record or upload a 2-5 minute audio sample, and our AI will process it within minutes. Follow our step-by-step tutorial for best results."
    },
    {
      category: "Getting Started", 
      question: "What's the difference between voice messages and regular messages?",
      answer: "Voice messages create a personal connection that text can't match. They show 300%+ higher response rates because recipients hear your actual voice, creating trust and authenticity. It's like having a personal conversation at scale."
    },
    {
      category: "Voice Cloning",
      question: "How long does it take to create a voice clone?",
      answer: "Voice clone processing typically takes 5-15 minutes depending on the audio length and quality. You'll receive a notification when your voice clone is ready to use."
    },
    {
      category: "Voice Cloning",
      question: "What makes a good voice recording?",
      answer: "For best results: Record in a quiet environment, speak naturally with varied tones, include different emotions, record 2-5 minutes of content, and use a good quality microphone. Our quality analyzer will guide you through the process."
    },
    {
      category: "Billing",
      question: "Can I change my plan at any time?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades. All unused credits roll over to the next month."
    },
    {
      category: "Billing",
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for new subscribers. If you're not satisfied within the first 30 days, contact our support team for a full refund."
    },
    {
      category: "Account",
      question: "How do I add team members?",
      answer: "In your Account Settings, go to Team Management and click 'Add Member'. You can set different permission levels and share voice clones with team members based on your plan."
    },
    {
      category: "Account",
      question: "Is my data secure?",
      answer: "Absolutely! We use enterprise-grade encryption, secure data centers, and comply with GDPR and SOC 2 standards. Your voice data is never shared and you maintain full ownership."
    }
  ];

  const filteredFaqs = selectedCategory && selectedCategory !== "All" 
    ? faqs.filter(faq => faq.category === selectedCategory)
    : faqs;

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
                <HelpCircle className="h-4 w-4 mr-2" />
                Support Center
              </Badge>
              <h1 className="text-5xl font-bold font-display text-text-primary mb-6">
                How can we help?
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto mb-8">
                Get the support you need to succeed with VoiceLead. We're here to help 24/7.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                <Input 
                  placeholder="Search for help..." 
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
          {/* Support Options */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <Card key={option.title} className="glass border-border/50 hover-lift animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className={`h-8 w-8 ${option.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">{option.title}</h3>
                  <p className="text-text-muted mb-4">{option.description}</p>
                  <Badge variant="secondary" className="bg-surface text-text-muted border-0 mb-6">
                    <Clock className="h-3 w-3 mr-1" />
                    {option.available}
                  </Badge>
                  <Button className="w-full bg-gradient-primary hover:shadow-primary hover-lift">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* FAQ Section */}
            <div className="lg:col-span-2">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Frequently Asked Questions</CardTitle>
                  
                  {/* FAQ Categories */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {faqCategories.map((category) => (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name || (!selectedCategory && category.name === "All") ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.name)}
                        className={selectedCategory === category.name || (!selectedCategory && category.name === "All") 
                          ? "bg-gradient-primary" 
                          : "border-border hover:bg-surface"
                        }
                      >
                        <category.icon className="h-3 w-3 mr-1" />
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div key={index} className="border border-border/50 rounded-lg">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface/30 transition-colors"
                      >
                        <span className="font-medium text-text-primary">{faq.question}</span>
                        {expandedFaq === index ? 
                          <ChevronDown className="h-5 w-5 text-text-muted" /> : 
                          <ChevronRight className="h-5 w-5 text-text-muted" />
                        }
                      </button>
                      {expandedFaq === index && (
                        <div className="px-4 pb-4 text-text-muted">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-text-primary">Name</Label>
                    <Input id="name" placeholder="Your name" className="bg-surface border-border" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-text-primary">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="bg-surface border-border" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-text-primary">Category</Label>
                    <Select>
                      <SelectTrigger className="bg-surface border-border">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-text-primary">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your question or issue..." 
                      className="bg-surface border-border min-h-[120px]" 
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-primary hover:shadow-primary hover-lift">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/documentation" className="flex items-center justify-between p-3 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors group">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-primary mr-3" />
                      <span className="text-text-primary group-hover:text-primary transition-colors">Documentation</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
                  </Link>
                  
                  <Link to="/tutorials" className="flex items-center justify-between p-3 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors group">
                    <div className="flex items-center">
                      <MessageCircle className="h-5 w-5 text-accent mr-3" />
                      <span className="text-text-primary group-hover:text-primary transition-colors">Video Tutorials</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
                  </Link>
                  
                  <Link to="/status" className="flex items-center justify-between p-3 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors group">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-warning mr-3" />
                      <span className="text-text-primary group-hover:text-primary transition-colors">System Status</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;