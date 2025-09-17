import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Campaign {
  id?: string;
  name: string;
  status: string;
  target_audience?: any;
  message_template?: string;
  voice_count?: number;
  response_count?: number;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const useCampaignBuilder = (campaignId?: string) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaignId) {
      fetchCampaignData();
    }
  }, [campaignId]);

  const fetchCampaignData = async () => {
    setLoading(true);
    try {
      if (campaignId) {
        const { data: campaignData } = await supabase
          .from('campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();
        setCampaign(campaignData);
      }
    } catch (error) {
      console.error('Error fetching campaign data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCampaign = async (campaignData: Partial<Campaign>) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      if (campaignId) {
        const { error } = await supabase
          .from('campaigns')
          .update(campaignData)
          .eq('id', campaignId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('campaigns')
          .insert([{
            ...campaignData,
            user_id: user.id,
            name: campaignData.name || 'Untitled Campaign',
            status: campaignData.status || 'draft'
          }])
          .select()
          .single();
        if (error) throw error;
        setCampaign(data);
      }
      await fetchCampaignData();
    } catch (error) {
      throw error;
    }
  };

  const launchCampaign = async () => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({ status: 'active' })
        .eq('id', campaignId);
      if (error) throw error;
      await fetchCampaignData();
    } catch (error) {
      throw error;
    }
  };

  const pauseCampaign = async () => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({ status: 'paused' })
        .eq('id', campaignId);
      if (error) throw error;
      await fetchCampaignData();
    } catch (error) {
      throw error;
    }
  };

  const resumeCampaign = async () => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({ status: 'active' })
        .eq('id', campaignId);
      if (error) throw error;
      await fetchCampaignData();
    } catch (error) {
      throw error;
    }
  };

  return {
    campaign,
    loading,
    saveCampaign,
    launchCampaign,
    pauseCampaign,
    resumeCampaign
  };
};