import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DashboardStats {
  totalCampaigns: number;
  voiceDMsSent: number;
  responseRate: string;
  activeLeads: number;
  responseRateChange: string;
  voiceDMsChange: string;
  leadsChange: string;
  campaignsChange: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  description?: string;
  total_leads?: number;
  contacted_leads?: number;
  replied_leads?: number;
  converted_leads?: number;
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

export interface InstagramAccount {
  id: string;
  user_id: string;
  platform: string;
  username: string;
  status: string;
  created_at: string;
  updated_at: string;
  account_name?: string;
  provider?: string;
  phone_number?: string;
  daily_call_limit?: number;
  calls_made_today?: number;
  health_score?: number;
}

export const useRealTimeData = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalCampaigns: 0,
    voiceDMsSent: 0,
    responseRate: '0%',
    activeLeads: 0,
    responseRateChange: '+0%',
    voiceDMsChange: '+0%',
    leadsChange: '+0%',
    campaignsChange: '+0%',
  });
  
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [instagramAccounts, setInstagramAccounts] = useState<InstagramAccount[]>([]);
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
    
    setLeads((data || []).map(lead => ({
      ...lead,
      tags: Array.isArray(lead.tags) ? lead.tags : 
            typeof lead.tags === 'string' ? [lead.tags] : []
    })));
    return (data || []).map(lead => ({
      ...lead,
      tags: Array.isArray(lead.tags) ? lead.tags : 
            typeof lead.tags === 'string' ? [lead.tags] : []
    }));
  };

  const fetchInstagramAccounts = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('voice_accounts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching Instagram accounts:', error);
      return;
    }
    
    setInstagramAccounts(data || []);
    return data || [];
  };

  const calculateStats = (campaignsData: Campaign[], leadsData: Lead[]) => {
    const totalCampaigns = campaignsData.length;
    const totalVoiceDMs = campaignsData.reduce((sum, campaign) => sum + (campaign.contacted_leads || 0), 0);
    const totalReplies = campaignsData.reduce((sum, campaign) => sum + (campaign.replied_leads || 0), 0);
    const responseRate = totalVoiceDMs > 0 ? ((totalReplies / totalVoiceDMs) * 100).toFixed(1) : '0';
    const activeLeads = leadsData.filter(lead => lead.status === 'pending' || lead.status === 'contacted' || lead.status === 'new').length;

    setStats({
      totalCampaigns,
      voiceDMsSent: totalVoiceDMs,
      responseRate: `${responseRate}%`,
      activeLeads,
      responseRateChange: '+12%', // You can calculate this based on historical data
      voiceDMsChange: '+25%',
      leadsChange: '+18%',
      campaignsChange: totalCampaigns > 0 ? `+${totalCampaigns}` : '+0',
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
        fetchInstagramAccounts(),
      ]);

      if (campaignsData && leadsData) {
        calculateStats(campaignsData, leadsData.map(lead => ({
          ...lead,
          tags: Array.isArray(lead.tags) ? lead.tags : 
                typeof lead.tags === 'string' ? [lead.tags] : []
        })));
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
          fetchInstagramAccounts();
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
    instagramAccounts,
    loading,
    refetch: fetchAllData,
  };
};