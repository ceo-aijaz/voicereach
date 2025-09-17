import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DashboardStats {
  totalLeads: number;
  qualifiedLeads: number;
  contactedLeads: number;
  respondedLeads: number;
  activeCampaigns: number;
  totalVoiceSent: number;
  engagementRate: number;
}

export interface Campaign {
  id: string;
  name: string;
  status: string;
  user_id: string;
  target_audience?: any;
  message_template?: string;
  voice_count: number;
  response_count: number;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  user_id: string;
  campaign_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
  engagement_score?: number;
  tags?: any;
  phone_number?: string;
  company?: string;
  position?: string;
  profile_url?: string;
  notes?: string;
  username?: string;
  full_name?: string;
  url?: string;
  bio?: string;
  total_followers?: number;
  engagement_rate?: number;
  platform?: string;
  lead_source?: string;
  last_active_date?: string;
  score?: number;
}

export interface VoiceAccount {
  id: string;
  user_id: string;
  campaign_id?: string;
  lead_id?: string;
  voice_message_sent: boolean;
  voice_message_opened: boolean;
  response_received: boolean;
  sent_at?: string;
  opened_at?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

export const useRealTimeData = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    qualifiedLeads: 0,
    contactedLeads: 0,
    respondedLeads: 0,
    activeCampaigns: 0,
    totalVoiceSent: 0,
    engagementRate: 0
  });
  
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [voiceAccounts, setVoiceAccounts] = useState<VoiceAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching campaigns:', error);
      return;
    }
    
    setCampaigns(data || []);
    return data || [];
  };

  const fetchLeads = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching leads:', error);
      return;
    }
    
    setLeads(data || []);
    return data || [];
  };

  const fetchVoiceAccounts = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('voice_accounts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching voice accounts:', error);
      return;
    }
    
    setVoiceAccounts(data || []);
    return data || [];
  };

  const calculateStats = (campaignsData: Campaign[], leadsData: Lead[]) => {
    const totalLeads = leadsData.length;
    const qualifiedLeads = leadsData.filter(lead => (lead.engagement_score || 0) >= 80).length;
    const contactedLeads = leadsData.filter(lead => lead.status === 'contacted').length;
    const respondedLeads = leadsData.filter(lead => lead.status === 'responded').length;
    const activeCampaigns = campaignsData.filter(campaign => campaign.status === 'active').length;
    
    // Calculate voice metrics from voice accounts
    const totalVoiceSent = voiceAccounts.filter(va => va.voice_message_sent).length;
    const voiceOpened = voiceAccounts.filter(va => va.voice_message_opened).length;
    const engagementRate = totalVoiceSent > 0 ? (voiceOpened / totalVoiceSent) * 100 : 0;

    setStats({
      totalLeads,
      qualifiedLeads,
      contactedLeads,
      respondedLeads,
      activeCampaigns,
      totalVoiceSent,
      engagementRate: Math.round(engagementRate * 10) / 10
    });
  };

  const fetchAllData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [campaignsData, leadsData] = await Promise.all([
        fetchCampaigns(),
        fetchLeads(),
        fetchVoiceAccounts(),
      ]);

      if (campaignsData && leadsData) {
        calculateStats(campaignsData, leadsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [user]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const campaignsChannel = supabase
      .channel('campaigns-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'campaigns',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchCampaigns();
        }
      )
      .subscribe();

    const leadsChannel = supabase
      .channel('leads-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchLeads();
        }
      )
      .subscribe();

    const accountsChannel = supabase
      .channel('voice-accounts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'voice_accounts',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchVoiceAccounts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(campaignsChannel);
      supabase.removeChannel(leadsChannel);
      supabase.removeChannel(accountsChannel);
    };
  }, [user]);

  return {
    stats,
    campaigns,
    leads,
    voiceAccounts,
    loading,
    refetch: fetchAllData,
  };
};