import React from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Scale, Shield, AlertTriangle, Users, CreditCard } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: FileText,
      content: `By accessing and using VoiceLead, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: 'Use License',
      icon: Scale,
      content: `Permission is granted to temporarily download one copy of VoiceLead for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to reverse engineer any software contained on the website; or remove any copyright or other proprietary notations from the materials.`
    },
    {
      title: 'Service Description',
      icon: Users,
      content: `VoiceLead provides AI-powered voice cloning and automated Facebook DM services. Our platform allows users to create voice clones, manage lead databases, and automate personalized outreach campaigns. We reserve the right to modify, suspend, or discontinue any part of our service at any time with reasonable notice.`
    },
    {
      title: 'User Responsibilities',
      icon: Shield,
      content: `Users are responsible for: maintaining the confidentiality of their account; ensuring all activities under their account comply with applicable laws; obtaining necessary consents for voice cloning; respecting Facebook's terms of service; not using the service for spam, harassment, or illegal activities; providing accurate information during registration.`
    },
    {
      title: 'Payment Terms',
      icon: CreditCard,
      content: `Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to change our pricing with 30 days notice. Accounts may be suspended for non-payment. Users are responsible for applicable taxes.`
    },
    {
      title: 'Prohibited Uses',
      icon: AlertTriangle,
      content: `You may not use VoiceLead to: send unsolicited messages or spam; impersonate others without consent; violate any laws or regulations; harass, abuse, or harm others; share malicious content or viruses; attempt to gain unauthorized access to our systems; use automated tools to access our service without permission.`
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
          
          <div className="container mx-auto section-padding relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-up">
              <Badge className="bg-primary-ultralight text-primary border-primary/20 mb-6">
                📋 Terms of Service
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight mb-6">
                <span className="text-text-primary">Terms &</span>
                <br />
                <span className="text-gradient-primary">Conditions</span>
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto mb-8">
                Please read these terms and conditions carefully before using VoiceLead. 
                By using our service, you agree to these terms. Last updated: December 2024
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="section-margin">
          <div className="container mx-auto section-padding">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <Card className="glass border-border/50 mb-12 animate-fade-up">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-display text-text-primary mb-4">
                    Welcome to VoiceLead
                  </h2>
                  <p className="text-text-muted leading-relaxed mb-4">
                    These Terms of Service ("Terms") govern your use of VoiceLead's website and services. 
                    VoiceLead ("we", "us", or "our") provides AI-powered voice cloning and automated 
                    Facebook outreach services.
                  </p>
                  <p className="text-text-muted leading-relaxed">
                    By creating an account or using our services, you agree to be bound by these Terms. 
                    If you disagree with any part of these terms, you may not access the service.
                  </p>
                </CardContent>
              </Card>

              {/* Terms Sections */}
              <div className="grid gap-8">
                {sections.map((section, index) => (
                  <Card key={index} className="glass border-border/50 hover:border-primary/20 transition-all animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                          <section.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold font-display text-text-primary">
                          {section.title}
                        </h3>
                      </div>
                      
                      <p className="text-text-muted leading-relaxed">
                        {section.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional Terms */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <Card className="glass border-border/50 animate-fade-up">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold font-display text-text-primary mb-4">
                      Intellectual Property
                    </h3>
                    <p className="text-text-muted leading-relaxed mb-4">
                      All content, features, and functionality of VoiceLead are owned by us and are 
                      protected by copyright, trademark, and other intellectual property laws.
                    </p>
                    <p className="text-text-muted leading-relaxed">
                      Users retain ownership of their voice recordings and generated content, 
                      but grant us a license to use them for providing our services.
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold font-display text-text-primary mb-4">
                      Privacy & Data
                    </h3>
                    <p className="text-text-muted leading-relaxed mb-4">
                      Your privacy is important to us. Our Privacy Policy explains how we collect, 
                      use, and protect your information when you use our service.
                    </p>
                    <p className="text-text-muted leading-relaxed">
                      By using VoiceLead, you also agree to our Privacy Policy and Cookie Policy.
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold font-display text-text-primary mb-4">
                      Limitation of Liability
                    </h3>
                    <p className="text-text-muted leading-relaxed mb-4">
                      VoiceLead shall not be liable for any indirect, incidental, special, 
                      consequential, or punitive damages resulting from your use of the service.
                    </p>
                    <p className="text-text-muted leading-relaxed">
                      Our total liability is limited to the amount you paid for the service 
                      in the 12 months preceding the claim.
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold font-display text-text-primary mb-4">
                      Termination
                    </h3>
                    <p className="text-text-muted leading-relaxed mb-4">
                      We may terminate or suspend your account immediately if you breach these Terms. 
                      You may terminate your account at any time from your settings.
                    </p>
                    <p className="text-text-muted leading-relaxed">
                      Upon termination, your right to use the service ceases immediately, 
                      and we may delete your data.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Governing Law */}
              <Card className="glass border-border/50 mt-12 animate-fade-up">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-display text-text-primary mb-6">
                    Governing Law & Disputes
                  </h2>
                  
                  <div className="space-y-4 text-text-muted">
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of 
                      the State of California, without regard to its conflict of law provisions.
                    </p>
                    <p>
                      Any disputes arising from these Terms or your use of VoiceLead shall be resolved 
                      through binding arbitration in San Francisco, California, except for claims that 
                      may be brought in small claims court.
                    </p>
                    <p>
                      We reserve the right to modify these Terms at any time. We will notify users of 
                      significant changes via email or through our platform. Continued use of the service 
                      after changes constitutes acceptance of the new Terms.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="glass border-border/50 mt-12 animate-fade-up">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold font-display text-text-primary mb-4">
                    Questions About These Terms?
                  </h2>
                  <p className="text-text-muted mb-6">
                    If you have any questions about these Terms of Service, please contact us.
                  </p>
                  <div className="space-y-2 text-text-muted">
                    <p><strong>Email:</strong> legal@voicelead.ai</p>
                    <p><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;