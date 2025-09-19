import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Instagram, CheckCircle, XCircle, Loader2, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ConnectionStatus {
  step: string;
  message: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export const InstagramConnect = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    twoFactorSecret: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>({
    step: '',
    message: '',
    isLoading: false,
    isError: false,
    isSuccess: false
  });

  const updateStatus = (newStatus: Partial<ConnectionStatus>) => {
    setStatus(prev => ({ ...prev, ...newStatus }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConnect = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to connect an Instagram account.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.username || !formData.password || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Show initial connecting status
    updateStatus({
      step: 'Connecting...',
      message: 'Initializing browser...',
      isLoading: true,
      isError: false,
      isSuccess: false
    });

    try {
      // Update status messages to show real-time progress
      const statusUpdates = [
        { message: 'Initializing browser...', delay: 0 },
        { message: 'Navigating to Instagram...', delay: 2000 },
        { message: 'Entering credentials...', delay: 4000 },
        { message: 'Logging into account...', delay: 6000 },
        { message: 'Extracting profile data...', delay: 8000 },
        { message: 'Verifying connection...', delay: 10000 }
      ];

      // Show progress updates
      statusUpdates.forEach(({ message, delay }) => {
        setTimeout(() => {
          if (status.isLoading) { // Only update if still loading
            updateStatus({
              step: 'Connecting...',
              message,
              isLoading: true,
              isError: false,
              isSuccess: false
            });
          }
        }, delay);
      });

      // Call the Instagram connection edge function
      const { data, error } = await supabase.functions.invoke('instagram-connect', {
        body: {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          twoFactorSecret: formData.twoFactorSecret
        }
      });

      if (error) {
        console.error('Instagram connection error:', error);
        updateStatus({
          isLoading: false,
          isError: true,
          step: "Connection Failed",
          message: error.message || "Failed to connect to Instagram"
        });
        
        toast({
          title: "Connection Failed",
          description: error.message || "Failed to connect to Instagram",
          variant: "destructive"
        });
        return;
      }

      if (data?.success) {
        updateStatus({
          isLoading: false,
          isSuccess: true,
          step: "Connected!",
          message: `Successfully connected @${formData.username} with real profile data!`
        });

        toast({
          title: "Account Connected",
          description: `Instagram account @${formData.username} has been connected successfully with real profile data!`,
        });

        // Redirect to Instagram accounts page after a short delay
        setTimeout(() => {
          navigate('/instagram');
        }, 2000);
      } else {
        updateStatus({
          isLoading: false,
          isError: true,
          step: "Connection Failed",
          message: data?.message || "Failed to connect to Instagram"
        });
        
        toast({
          title: "Connection Failed",
          description: data?.message || "Failed to connect to Instagram",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Connection error:', error);
      updateStatus({
        isLoading: false,
        isError: true,
        step: "Connection Failed",
        message: "Network error occurred - please try again"
      });
      
      toast({
        title: "Connection Failed",
        description: "Network error occurred - please try again",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    navigate('/instagram');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Instagram className="h-16 w-16 text-[#3B82F6]" />
          </div>
          <CardTitle className="text-2xl font-bold">Connect Instagram Account</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step 1 of 3</span>
              <span>Account Setup</span>
            </div>
            <Progress value={33} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Instagram Username</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">@</span>
                <Input
                  id="username"
                  type="text"
                  placeholder="your_username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="pl-8"
                  disabled={status.isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pr-10"
                  disabled={status.isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={status.isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={status.isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="twoFactorSecret">2FA Secret Key</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get this from Instagram 2FA settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="twoFactorSecret"
                type="text"
                placeholder="Optional: 2FA secret key"
                value={formData.twoFactorSecret}
                onChange={(e) => handleInputChange('twoFactorSecret', e.target.value)}
                disabled={status.isLoading}
              />
            </div>
          </div>

          {/* Status Section */}
          {(status.isLoading || status.isError || status.isSuccess) && (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                {status.isLoading && <Loader2 className="h-5 w-5 animate-spin text-[#3B82F6]" />}
                {status.isSuccess && <CheckCircle className="h-5 w-5 text-green-500" />}
                {status.isError && <XCircle className="h-5 w-5 text-red-500" />}
                <div>
                  <div className="font-medium">{status.step}</div>
                  <div className="text-sm text-muted-foreground">{status.message}</div>
                </div>
              </div>
              {status.isLoading && (
                <Progress value={50} className="h-2" />
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleConnect}
              disabled={status.isLoading || !formData.username || !formData.password || !formData.email}
              className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90"
            >
              {status.isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect Account'
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={status.isLoading}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramConnect;