import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  trial_start_date: string;
  trial_end_date: string;
  subscription_status: string;
  created_at: string;
  updated_at: string;
}

export const useTrialStatus = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [isLastDay, setIsLastDay] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (profile) {
      calculateTrialStatus();
      // Update every minute to keep countdown accurate
      const interval = setInterval(calculateTrialStatus, 60000);
      return () => clearInterval(interval);
    }
  }, [profile]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      // First try to get existing profile
      let { data: existingProfile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: user.id,
              trial_start_date: new Date().toISOString(),
              trial_end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
              subscription_status: 'trial'
            }
          ])
          .select()
          .single();

        if (insertError) {
          console.error('Error creating profile:', insertError);
          return;
        }
        setProfile(newProfile);
      } else if (error) {
        console.error('Error fetching profile:', error);
        return;
      } else {
        setProfile(existingProfile);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTrialStatus = () => {
    if (!profile) return;

    const now = new Date();
    const trialEnd = new Date(profile.trial_end_date);
    const timeDiff = trialEnd.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    setDaysRemaining(Math.max(0, daysDiff));
    setIsTrialExpired(daysDiff <= 0);
    setIsLastDay(daysDiff === 1 || daysDiff === 0);
  };

  const getTrialMessage = () => {
    if (loading) return 'Loading...';
    if (!profile) return 'Free Plan';
    
    if (profile.subscription_status === 'active') {
      return 'Pro Plan';
    }

    if (isTrialExpired) {
      return 'Trial Expired';
    }

    if (daysRemaining === 1) {
      return '1 Day Left';
    }

    return `${daysRemaining} Days Left`;
  };

  const getTrialColor = () => {
    if (loading || !profile) return 'bg-warning/20 text-warning border-warning/30';
    
    if (profile.subscription_status === 'active') {
      return 'bg-accent/20 text-accent border-accent/30';
    }

    if (isTrialExpired) {
      return 'bg-error/20 text-error border-error/30';
    }

    if (isLastDay) {
      return 'bg-error/20 text-error border-error/30';
    }

    if (daysRemaining <= 3) {
      return 'bg-warning/20 text-warning border-warning/30';
    }

    return 'bg-primary/20 text-primary border-primary/30';
  };

  const shouldShowUpgrade = () => {
    return profile && profile.subscription_status === 'trial' && (isTrialExpired || isLastDay);
  };

  return {
    profile,
    loading,
    daysRemaining,
    isTrialExpired,
    isLastDay,
    getTrialMessage,
    getTrialColor,
    shouldShowUpgrade,
    refreshProfile: fetchProfile
  };
};
