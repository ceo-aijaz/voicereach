import React from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Users, Database, Globe } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Account information (name, email, company details)',
        'Usage data (campaign performance, message statistics)',
        'Voice recordings for cloning purposes',
        'Facebook account connection data',
        'Payment and billing information',
        'Support communications and feedback'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Users,
      content: [
        'Provide and improve our voice cloning services',
        'Manage your campaigns and automate outreach',
        'Process payments and billing',
        'Provide customer support',
        'Send important service updates',
        'Analyze usage patterns to enhance our platform'
      ]
    },
    {
      title: 'Information Sharing',
      icon: Globe,
      content: [
        'We do not sell your personal information to third parties',
        'Service providers who help us operate our platform',
        'Legal compliance when required by law',
        'Business transfers (with user notification)',
        'Public information you choose to share',
        'Anonymized, aggregated data for research'
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        'End-to-end encryption for voice recordings',
        'Secure data centers with 24/7 monitoring',
        'Regular security audits and penetration testing',
        'Limited access controls and authentication',
        'Automated backup and disaster recovery',
        'Compliance with industry security standards'
      ]
    },
    {
      title: 'Your Rights',
      icon: Eye,
      content: [
        'Access and download your data',
        'Correct inaccurate information',
        'Delete your account and data',
        'Opt-out of marketing communications',
        'Data portability to other services',
        'Withdraw consent for data processing'
      ]
    },
    {
      title: 'Data Retention',
      icon: Shield,
      content: [
        'Account data: Until account deletion',
        'Voice recordings: Until you remove them',
        'Campaign data: 3 years for analytics',
        'Support communications: 2 years',
        'Payment records: 7 years for compliance',
        'Anonymized data: May be retained indefinitely'
      ]
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
                🔒 Privacy Policy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight mb-6">
                <span className="text-text-primary">Your Privacy,</span>
                <br />
                <span className="text-gradient-primary">Our Priority</span>
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto mb-8">
                We're committed to protecting your privacy and being transparent about how we collect, 
                use, and share your information. Last updated: December 2024
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="section-margin">
          <div className="container mx-auto section-padding">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <Card className="glass border-border/50 mb-12 animate-fade-up">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-display text-text-primary mb-4">
                    Introduction
                  </h2>
                  <p className="text-text-muted leading-relaxed mb-4">
                    At VoiceLead, we understand that your privacy is fundamental to your trust in our platform. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                    when you use our voice DM automation service.
                  </p>
                  <p className="text-text-muted leading-relaxed">
                    By using VoiceLead, you agree to the collection and use of information in accordance with 
                    this policy. If you do not agree with this policy, please do not use our service.
                  </p>
                </CardContent>
              </Card>

              {/* Privacy Sections */}
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
                      
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-text-muted leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* GDPR & CCPA */}
              <Card className="glass border-border/50 mt-12 animate-fade-up">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-display text-text-primary mb-6">
                    International Privacy Rights
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-4">GDPR (European Users)</h3>
                      <p className="text-text-muted mb-4">
                        If you're in the European Union, you have additional rights under GDPR:
                      </p>
                      <ul className="space-y-2 text-text-muted">
                        <li>• Right to be informed about data processing</li>
                        <li>• Right of access to your personal data</li>
                        <li>• Right to rectification of inaccurate data</li>
                        <li>• Right to erasure ("right to be forgotten")</li>
                        <li>• Right to restrict processing</li>
                        <li>• Right to data portability</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-4">CCPA (California Users)</h3>
                      <p className="text-text-muted mb-4">
                        California residents have rights under the CCPA:
                      </p>
                      <ul className="space-y-2 text-text-muted">
                        <li>• Right to know about personal information collected</li>
                        <li>• Right to delete personal information</li>
                        <li>• Right to opt-out of the sale of personal information</li>
                        <li>• Right to non-discrimination for exercising rights</li>
                        <li>• Right to request specific pieces of information</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="glass border-border/50 mt-12 animate-fade-up">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold font-display text-text-primary mb-4">
                    Questions About Privacy?
                  </h2>
                  <p className="text-text-muted mb-6">
                    If you have any questions about this Privacy Policy or our data practices, 
                    please don't hesitate to contact us.
                  </p>
                  <div className="space-y-2 text-text-muted">
                    <p><strong>Email:</strong> privacy@voicelead.ai</p>
                    <p><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
                    <p><strong>Data Protection Officer:</strong> dpo@voicelead.ai</p>
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

export default Privacy;