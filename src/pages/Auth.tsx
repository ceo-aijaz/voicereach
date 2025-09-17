import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Mail, Lock, User, Mic2, TrendingUp, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else if (isLogin) {
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background/95"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-primary opacity-[0.02] rounded-full blur-3xl"></div>
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-lg text-center animate-fade-up">
            <Link to="/" className="inline-flex items-center mb-8 text-primary hover-scale">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            
            <div className="mb-8">
              <Badge className="bg-primary-ultralight text-primary border-primary/20 mb-6 px-4 py-2 animate-pulse-glow">
                ⭐ Rated 4.9/5 by 300+ agencies
              </Badge>
              <h1 className="text-5xl font-bold font-display mb-6 leading-tight">
                Welcome to
                <span className="text-gradient-primary block animate-gradient-x bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text">
                  VoiceLead
                </span>
              </h1>
              <p className="text-xl text-text-muted leading-relaxed">
                Join the AI voice revolution. Send hyper-personalized voice messages that convert 
                <span className="text-accent font-semibold"> 300%+ better</span> than text DMs.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Mic2 className="h-5 w-5 text-primary mr-1" />
                  <span className="text-2xl font-bold text-text-primary">22.5K+</span>
                </div>
                <p className="text-text-muted text-sm">Voice DMs</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-accent mr-1" />
                  <span className="text-2xl font-bold text-text-primary">300%+</span>
                </div>
                <p className="text-text-muted text-sm">Response Rate</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-warning mr-1" />
                  <span className="text-2xl font-bold text-text-primary">300+</span>
                </div>
                <p className="text-text-muted text-sm">Beta Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <Card className="w-full max-w-md glass border-primary/20 shadow-primary/10 animate-scale-in hover-tilt">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold font-display">
                {isLogin ? 'Welcome Back' : 'Get Started'}
              </CardTitle>
              <p className="text-text-muted">
                {isLogin 
                  ? 'Sign in to your VoiceLead account' 
                  : 'Create your VoiceLead account'
                }
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-text-primary">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-surface border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center text-text-primary">
                    <Lock className="h-4 w-4 mr-2" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-surface border-border focus:border-primary"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-primary transition-all hover-lift hover-shine group"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </div>
                  ) : (
                    <>
                      <User className="h-4 w-4 mr-2" />
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <Separator className="my-4" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-card px-2 text-text-muted text-sm">or</span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-text-muted">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:bg-primary/10"
                >
                  {isLogin ? 'Create Account' : 'Sign In'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;