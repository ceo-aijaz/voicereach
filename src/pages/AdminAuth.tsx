import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, Lock, Shield, Star, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const { isAdmin, checkAdminStatus } = useAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!checkAdminStatus(email)) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { error } = await signIn(email, password);

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Admin Access Granted",
          description: "Welcome to the admin panel",
        });
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
        {/* Left Side - Admin Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-lg text-center animate-fade-up">
            <Link to="/" className="inline-flex items-center mb-8 text-primary hover-scale">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            
            <div className="mb-8">
              <Badge className="bg-warning/20 text-warning border-warning/20 mb-6 px-4 py-2 animate-pulse-glow">
                <Crown className="h-4 w-4 mr-2" />
                Admin Access Portal
              </Badge>
              <h1 className="text-5xl font-bold font-display mb-6 leading-tight">
                VoiceLead
                <span className="text-gradient-primary block animate-gradient-x bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text">
                  Admin Panel
                </span>
              </h1>
              <p className="text-xl text-text-muted leading-relaxed">
                Secure administrative access to manage content, users, and platform settings.
                <span className="text-primary font-semibold block mt-2"> Full system control</span>
              </p>
            </div>

            {/* Admin Features */}
            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="flex items-center justify-center p-4 bg-surface/50 rounded-lg border border-border/50">
                <Shield className="h-5 w-5 text-primary mr-3" />
                <span className="text-text-primary">Content Management</span>
              </div>
              <div className="flex items-center justify-center p-4 bg-surface/50 rounded-lg border border-border/50">
                <Star className="h-5 w-5 text-accent mr-3" />
                <span className="text-text-primary">User Administration</span>
              </div>
              <div className="flex items-center justify-center p-4 bg-surface/50 rounded-lg border border-border/50">
                <Crown className="h-5 w-5 text-warning mr-3" />
                <span className="text-text-primary">System Analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Admin Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <Card className="w-full max-w-md glass border-primary/20 shadow-primary/10 animate-scale-in hover-tilt">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold font-display">
                Admin Login
              </CardTitle>
              <p className="text-text-muted">
                Enter your admin credentials to access the control panel
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-text-primary">
                    <Mail className="h-4 w-4 mr-2" />
                    Admin Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@voicelead.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-surface border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center text-text-primary">
                    <Lock className="h-4 w-4 mr-2" />
                    Admin Password
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
                      Authenticating...
                    </div>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Access Admin Panel
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-text-muted mb-2">
                  Not an admin?
                </p>
                <Link to="/auth" className="text-primary hover:underline">
                  Go to regular login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;