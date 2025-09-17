import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Mail, Lock, User, Shield, CheckCircle, Building2 } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 relative">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Enterprise Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-lg">
            <Link to="/" className="inline-flex items-center mb-12 text-slate-600 hover:text-primary transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <div className="mb-12">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">VoiceLead</h1>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Enterprise Voice Automation</p>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Transform Your
                <span className="block text-primary">Outreach Strategy</span>
              </h2>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Join 300+ agencies using AI-powered voice automation to achieve 
                <span className="text-primary font-semibold"> 300%+ higher response rates</span> on Facebook.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-slate-700 dark:text-slate-300">Enterprise-grade security</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-slate-700 dark:text-slate-300">99.9% platform uptime</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-3">
                  <Building2 className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-slate-700 dark:text-slate-300">Trusted by Fortune 500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Professional Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <Card className="w-full max-w-md border border-slate-200 dark:border-slate-700 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                {isLogin 
                  ? 'Sign in to continue to VoiceLead' 
                  : 'Get started with VoiceLead today'
                }
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">
                    Work Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12 border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-primary bg-white dark:bg-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder={isLogin ? "Enter your password" : "Create a secure password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 h-12 border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-primary bg-white dark:bg-slate-700"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </div>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <Separator className="bg-slate-200 dark:bg-slate-600" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white dark:bg-slate-800 px-3 text-slate-500 text-sm">or</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:bg-primary/10 font-medium"
                >
                  {isLogin ? 'Create Account' : 'Sign In'}
                </Button>
              </div>

              {!isLogin && (
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;