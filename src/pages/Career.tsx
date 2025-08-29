import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Briefcase,
  Heart,
  Zap,
  Target,
  Coffee,
  Laptop,
  Globe,
  Award,
  ChevronRight
} from 'lucide-react';

const Career = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      salary: "$150k - $200k",
      description: "Lead the development of our voice AI technology and machine learning models.",
      requirements: ["5+ years in AI/ML", "Python, TensorFlow", "Voice processing experience"],
      featured: true
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time", 
      salary: "$120k - $150k",
      description: "Design intuitive user experiences for our voice messaging platform.",
      requirements: ["3+ years product design", "Figma expertise", "B2B SaaS experience"]
    },
    {
      id: 3,
      title: "Sales Development Representative",
      department: "Sales",
      location: "New York / Remote",
      type: "Full-time",
      salary: "$80k - $120k",
      description: "Drive new business growth by identifying and qualifying potential customers.",
      requirements: ["2+ years B2B sales", "CRM experience", "Strong communication skills"]
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $170k",
      description: "Scale our infrastructure to handle millions of voice processing requests.",
      requirements: ["AWS/GCP experience", "Kubernetes", "CI/CD pipelines"]
    },
    {
      id: 5,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $120k",
      description: "Help customers achieve success with VoiceLead and drive expansion revenue.",
      requirements: ["3+ years customer success", "SaaS experience", "Data-driven mindset"]
    },
    {
      id: 6,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote / Austin",
      type: "Full-time",
      salary: "$100k - $130k",
      description: "Lead our marketing efforts and grow brand awareness in the B2B space.",
      requirements: ["4+ years B2B marketing", "Content strategy", "Growth marketing"]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision insurance plus wellness stipend"
    },
    {
      icon: Laptop,
      title: "Remote-First",
      description: "Work from anywhere with a $2000 home office setup budget"
    },
    {
      icon: Coffee,
      title: "Flexible Time Off",
      description: "Unlimited PTO policy and company-wide recharge weeks"
    },
    {
      icon: Award,
      title: "Professional Growth",
      description: "$3000 annual learning budget for courses, conferences, and certifications"
    },
    {
      icon: DollarSign,
      title: "Equity Package",
      description: "Meaningful equity stake in a fast-growing AI company"
    },
    {
      icon: Globe,
      title: "Team Retreats",
      description: "Quarterly team meetups in amazing locations around the world"
    }
  ];

  const values = [
    {
      icon: Zap,
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI and voice technology"
    },
    {
      icon: Users,
      title: "Customer Obsessed",
      description: "Every decision we make starts with how it impacts our customers' success"
    },
    {
      icon: Target,
      title: "Bias for Action",
      description: "We move fast, test quickly, and iterate based on real customer feedback"
    },
    {
      icon: Heart,
      title: "Inclusive Culture",
      description: "We believe diverse perspectives make us stronger and more innovative"
    }
  ];

  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case 'Engineering': return 'bg-primary/20 text-primary';
      case 'Design': return 'bg-accent/20 text-accent';
      case 'Sales': return 'bg-warning/20 text-warning';
      case 'Marketing': return 'bg-error/20 text-error';
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
                <Briefcase className="h-4 w-4 mr-2" />
                Join Our Team
              </Badge>
              <h1 className="text-5xl font-bold font-display text-text-primary mb-6">
                Shape the Future of AI
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto">
                Join VoiceLead and help revolutionize how businesses communicate. We're building the future of personalized voice AI.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          {/* Company Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">Our Values</h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                The principles that guide everything we do at VoiceLead
              </p>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={value.title} className="glass border-border/50 text-center animate-fade-up hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">{value.title}</h3>
                    <p className="text-sm text-text-muted">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">Open Positions</h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                We're looking for talented individuals to join our growing team
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {jobs.map((job, index) => (
                <Card key={job.id} className={`glass border-border/50 animate-fade-up hover-lift ${job.featured ? 'ring-2 ring-primary/20' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-text-primary mb-2 flex items-center">
                          {job.title}
                          {job.featured && (
                            <Badge className="ml-2 bg-primary text-primary-foreground">
                              Featured
                            </Badge>
                          )}
                        </CardTitle>
                        <Badge className={`${getDepartmentColor(job.department)} border-0 text-sm`}>
                          {job.department}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-text-muted">{job.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-text-muted">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-text-muted">
                        <Clock className="h-4 w-4 mr-2" />
                        {job.type}
                      </div>
                      <div className="flex items-center text-text-muted col-span-2">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {job.salary}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Key Requirements:</h4>
                      <ul className="text-sm text-text-muted space-y-1">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full bg-gradient-primary hover:shadow-primary hover-lift group">
                      Apply Now
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">Why VoiceLead?</h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                We offer competitive benefits and a supportive environment for your best work
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={benefit.title} className="glass border-border/50 animate-fade-up hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-2">{benefit.title}</h3>
                        <p className="text-sm text-text-muted">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="glass border-border/50 animate-fade-up">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Don't see a perfect fit?
              </h2>
              <p className="text-text-muted mb-8 max-w-2xl mx-auto">
                We're always looking for exceptional talent. Send us your resume and tell us how you'd like to contribute to VoiceLead's mission.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
                  Send Us Your Resume
                </Button>
                <Button variant="outline" className="border-border hover:bg-surface">
                  Learn About Our Culture
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Career;