import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowRight, 
  CheckCircle, 
  Building2, 
  Users, 
  Target, 
  Mic2,
  Facebook,
  TrendingUp
} from 'lucide-react';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    teamSize: '',
    goals: '',
    experience: ''
  });
  const navigate = useNavigate();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      title: "Welcome to VoiceLead!",
      description: "Let's get you set up in just a few minutes",
      content: (
        <div className="text-center space-y-6 animate-fade-up">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
            <Mic2 className="h-10 w-10 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-display mb-4">Ready to 10x Your Response Rates?</h3>
            <p className="text-text-muted max-w-md mx-auto">
              We'll help you set up everything you need to start sending hyper-personalized voice DMs that convert.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm text-text-muted">Voice Cloning</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm text-text-muted">Lead Scraping</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm text-text-muted">Automation</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Tell us about your company",
      description: "Help us personalize your experience",
      content: (
        <div className="space-y-6 animate-fade-up">
          <div className="space-y-4">
            <div>
              <Label htmlFor="company" className="flex items-center text-text-primary mb-2">
                <Building2 className="h-4 w-4 mr-2" />
                Company Name
              </Label>
              <Input
                id="company"
                placeholder="Acme Marketing Agency"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="bg-surface border-border"
              />
            </div>
            <div>
              <Label htmlFor="role" className="flex items-center text-text-primary mb-2">
                <Users className="h-4 w-4 mr-2" />
                Your Role
              </Label>
              <Input
                id="role"
                placeholder="CEO, Marketing Director, etc."
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="bg-surface border-border"
              />
            </div>
            <div>
              <Label className="text-text-primary mb-2 block">Team Size</Label>
              <div className="grid grid-cols-2 gap-2">
                {['1-5', '6-20', '21-50', '50+'].map((size) => (
                  <Button
                    key={size}
                    variant={formData.teamSize === size ? "default" : "outline"}
                    onClick={() => handleInputChange('teamSize', size)}
                    className="h-12"
                  >
                    {size} people
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "What are your goals?",
      description: "Let's understand what you want to achieve",
      content: (
        <div className="space-y-6 animate-fade-up">
          <div className="grid grid-cols-1 gap-4">
            {[
              { id: 'lead-gen', label: 'Generate More Leads', icon: Target },
              { id: 'response-rate', label: 'Increase Response Rates', icon: TrendingUp },
              { id: 'automate', label: 'Automate Outreach', icon: Facebook },
              { id: 'scale', label: 'Scale Agency Operations', icon: Users }
            ].map((goal) => (
              <Button
                key={goal.id}
                variant={formData.goals.includes(goal.id) ? "default" : "outline"}
                onClick={() => {
                  const goals = formData.goals.split(',').filter(Boolean);
                  if (goals.includes(goal.id)) {
                    handleInputChange('goals', goals.filter(g => g !== goal.id).join(','));
                  } else {
                    handleInputChange('goals', [...goals, goal.id].join(','));
                  }
                }}
                className="h-16 justify-start text-left"
              >
                <goal.icon className="h-5 w-5 mr-3" />
                {goal.label}
              </Button>
            ))}
          </div>
          <div>
            <Label htmlFor="experience" className="text-text-primary mb-2 block">
              Tell us about your current outreach process (optional)
            </Label>
            <Textarea
              id="experience"
              placeholder="We currently send text DMs but response rates are low..."
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="bg-surface border-border min-h-[100px]"
            />
          </div>
        </div>
      )
    },
    {
      title: "You're all set!",
      description: "Ready to start your voice outreach journey",
      content: (
        <div className="text-center space-y-6 animate-fade-up">
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto animate-glow">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-display mb-4">Welcome to VoiceLead!</h3>
            <p className="text-text-muted max-w-md mx-auto mb-6">
              Your account is ready. Let's start by cloning your voice and setting up your first campaign.
            </p>
            <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
              <Badge className="bg-primary-ultralight text-primary border-primary/20 py-2">
                ✅ Account created successfully
              </Badge>
              <Badge className="bg-accent/10 text-accent border-accent/20 py-2">
                🎯 Goals and preferences saved
              </Badge>
              <Badge className="bg-warning/10 text-warning border-warning/20 py-2">
                🚀 Ready to start voice campaigns
              </Badge>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background/95"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-primary opacity-[0.03] rounded-full blur-3xl"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8 animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg lg:text-xl font-semibold text-text-primary">Setup Progress</h2>
              <span className="text-sm lg:text-base text-text-muted">{step} of {totalSteps}</span>
            </div>
            <Progress value={progress} className="h-3 animate-pulse-glow" />
            <p className="text-sm text-text-muted mt-2">Just a few steps to get you started!</p>
          </div>

          {/* Main Card */}
          <Card className="glass border-primary/20 shadow-primary/10 animate-scale-in hover-tilt">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl lg:text-4xl font-bold font-display mb-4 text-gradient-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text">
                {steps[step - 1].title}
              </CardTitle>
              <p className="text-text-muted text-lg lg:text-xl">
                {steps[step - 1].description}
              </p>
            </CardHeader>

            <CardContent className="space-y-8 p-6 lg:p-8">
              {steps[step - 1].content}

              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                  className="border-border hover:bg-surface hover-lift w-full sm:w-auto"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-gradient-primary hover:shadow-primary transition-all hover-lift hover-shine group w-full sm:w-auto"
                >
                  {step === totalSteps ? 'Go to Dashboard' : 'Continue'}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;