import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
      const { data, error } = await supabase
        .from('affiliate_applications')
        .insert([
          {
            user_id: user.id,
            full_name: applicationData.name,
            email: applicationData.email,
            website: applicationData.website,
            audience_size: applicationData.audience,
            marketing_experience: applicationData.experience,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error submitting affiliate application:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Application Submitted!",
        description: "Your affiliate application has been submitted successfully. We'll review it within 2-3 business days.",
      });

      return { data };
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
      const { data, error } = await supabase
        .from('affiliate_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching affiliate application:', error);
        return null;
      }

      return data;
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