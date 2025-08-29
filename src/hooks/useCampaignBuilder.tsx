import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Campaign {
  id?: string;
  name: string;
  description?: string;
  campaign_type: string;
  status: string;
  target_audience?: any;
  schedule_settings?: any;
  throttle_settings?: any;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CampaignSequence {
  id: string;
  name: string;
  description?: string;
  status: string;
  sequence_order: number;
  delay_hours: number;
  steps?: any[];
}

export interface CampaignTarget {
  id: string;
  lead_id: string;
  status: string;
  lead: any;
}

export const useCampaignBuilder = (campaignId?: string) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [sequences, setSequences] = useState<CampaignSequence[]>([]);
  const [targets, setTargets] = useState<CampaignTarget[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaignId) {
      fetchCampaignData();
    }
  }, [campaignId]);

  const fetchCampaignData = async () => {
    setLoading(true);
    try {
      // Fetch campaign
      if (campaignId) {
        const { data: campaignData } = await supabase
          .from('campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();
        setCampaign(campaignData);

        // Fetch sequences
        const { data: sequencesData } = await supabase
          .from('campaign_sequences')
          .select('*')
          .eq('campaign_id', campaignId)
          .order('sequence_order');
        setSequences(sequencesData || []);

        // Fetch targets
        const { data: targetsData } = await supabase
          .from('campaign_targets')
          .select('*, lead:leads(*)')
          .eq('campaign_id', campaignId);
        setTargets(targetsData || []);
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
            name: campaignData.name || 'Untitled Campaign'
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

  const createSequence = async (sequenceData: Partial<CampaignSequence>) => {
    try {
      if (!user || !campaignId) throw new Error('User not authenticated or campaign not found');
      
      const { error } = await supabase
        .from('campaign_sequences')
        .insert([{ 
          ...sequenceData, 
          campaign_id: campaignId,
          user_id: user.id,
          name: sequenceData.name || 'Untitled Sequence'
        }]);
      if (error) throw error;
      await fetchCampaignData();
    } catch (error) {
      throw error;
    }
  };

  const updateSequence = async (sequenceId: string, updates: Partial<CampaignSequence>) => {
    try {
      const { error } = await supabase
        .from('campaign_sequences')
        .update(updates)
        .eq('id', sequenceId);
      if (error) throw error;
      await fetchCampaignData();
    } catch (error) {
      throw error;
    }
  };

  const deleteSequence = async (sequenceId: string) => {
    try {
      const { error } = await supabase
        .from('campaign_sequences')
        .delete()
        .eq('id', sequenceId);
      if (error) throw error;
      await fetchCampaignData();
    } catch (error) {
      throw error;
    }
  };

  const addTargets = async (leadIds: string[]) => {
    try {
      if (!user || !campaignId) throw new Error('User not authenticated or campaign not found');
      
      const targetData = leadIds.map(leadId => ({
        campaign_id: campaignId,
        lead_id: leadId,
        status: 'pending',
        user_id: user.id
      }));
      
      const { error } = await supabase
        .from('campaign_targets')
        .insert(targetData);
      if (error) throw error;
      await fetchCampaignData();
    } catch (error) {
      throw error;
    }
  };

  const removeTarget = async (targetId: string) => {
    try {
      const { error } = await supabase
        .from('campaign_targets')
        .delete()
        .eq('id', targetId);
      if (error) throw error;
      await fetchCampaignData();
    } catch (error) {
      throw error;
    }
  };

  const launchCampaign = async () => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({ status: 'active', started_at: new Date().toISOString() })
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
    sequences,
    targets,
    analytics,
    loading,
    saveCampaign,
    createSequence,
    updateSequence,
    deleteSequence,
    addTargets,
    removeTarget,
    launchCampaign,
    pauseCampaign,
    resumeCampaign
  };
};