import React, { useState } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, MessageSquare, Clock, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
                📞 Get in Touch
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight mb-6">
                <span className="text-gradient-primary">Contact Our Team</span>
              </h1>
              <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8">
                Have questions about VoiceLead? Want to discuss enterprise solutions? 
                We're here to help you scale your outreach.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="section-margin">
          <div className="container mx-auto section-padding">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="glass border-border/50 animate-fade-up">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display text-text-primary">
                      Send us a Message
                    </CardTitle>
                    <p className="text-text-muted">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-text-primary">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="John Smith"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            className="bg-surface border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-text-primary">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className="bg-surface border-border"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-text-primary">Company</Label>
                          <Input
                            id="company"
                            placeholder="Acme Marketing Agency"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="bg-surface border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-text-primary">Subject</Label>
                          <Input
                            id="subject"
                            placeholder="Enterprise inquiry"
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            required
                            className="bg-surface border-border"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-text-primary">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your outreach goals and how we can help..."
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                          className="bg-surface border-border min-h-[120px]"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary hover:shadow-primary transition-all hover-lift"
                        size="lg"
                      >
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-display text-text-primary mb-6">
                      Get in Touch
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">Email</p>
                          <p className="text-text-muted">hello@voicelead.ai</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                          <Phone className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">Phone</p>
                          <p className="text-text-muted">+1 (555) 123-4567</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-warning" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">Address</p>
                          <p className="text-text-muted">
                            123 Innovation Drive<br />
                            San Francisco, CA 94105
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-display text-text-primary mb-6">
                      Support Hours
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-text-primary">Monday - Friday</p>
                          <p className="text-text-muted">9:00 AM - 6:00 PM PST</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-accent" />
                        <div>
                          <p className="font-medium text-text-primary">Weekend</p>
                          <p className="text-text-muted">Limited support available</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-display text-text-primary mb-4">
                      Enterprise Sales
                    </h3>
                    <p className="text-text-muted mb-4">
                      Need a custom solution for your organization? Our enterprise team is ready to help.
                    </p>
                    <Button variant="outline" className="w-full border-border hover:bg-surface">
                      <Users className="h-4 w-4 mr-2" />
                      Schedule Enterprise Demo
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;