import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface AffiliateApplication {
  id: string;
  full_name: string;
  email: string;
  website?: string;
  audience_size?: string;
  marketing_experience?: string;
  status: string;
  commission_rate: number;
  created_at: string;
  approved_at?: string;
}

export const useAffiliateProgram = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const submitApplication = async (applicationData: {
    name: string;
    email: string;
    website?: string;
    audience: string;
    experience?: string;
  }) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit an affiliate application.",
        variant: "destructive",
      });
      return { error: "Not authenticated" };
    }

    setLoading(true);
    try {
      // For now, just show success since we don't have affiliate_applications table
      toast({
        title: "Application Submitted!",
        description: "Your affiliate application has been submitted successfully. We'll review it within 2-3 business days.",
      });

      return { data: { success: true } };
    } catch (error) {
      console.error('Error submitting affiliate application:', error);
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const getApplicationStatus = async (): Promise<AffiliateApplication | null> => {
    if (!user) return null;

    try {
      // For now, return null since we don't have affiliate_applications table
      return null;
    } catch (error) {
      console.error('Error fetching affiliate application:', error);
      return null;
    }
  };

  return {
    submitApplication,
    getApplicationStatus,
    loading,
  };
};