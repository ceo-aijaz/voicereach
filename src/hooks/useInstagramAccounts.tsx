import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface InstagramAccount {
  id: string;
  user_id: string;
  instagram_username: string;
  email: string;
  encrypted_password: string;
  encrypted_2fa_secret?: string;
  status: string;
  session_data?: any;
  last_connected?: string;
  created_at: string;
  updated_at: string;
}

export const useInstagramAccounts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<InstagramAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('instagram_accounts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching Instagram accounts:', error);
        toast({
          title: "Error",
          description: "Failed to fetch Instagram accounts",
          variant: "destructive"
        });
        return;
      }
      
      setAccounts(data || []);
    } catch (error) {
      console.error('Error fetching Instagram accounts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch Instagram accounts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (accountId: string) => {
    try {
      const { error } = await supabase
        .from('instagram_accounts')
        .delete()
        .eq('id', accountId)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error deleting Instagram account:', error);
        toast({
          title: "Error",
          description: "Failed to delete Instagram account",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Account deleted",
        description: "Instagram account has been removed successfully",
      });
      
      fetchAccounts(); // Refresh the list
      return true;
    } catch (error) {
      console.error('Error deleting Instagram account:', error);
      toast({
        title: "Error",
        description: "Failed to delete Instagram account",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [user]);

  // Set up real-time subscription for Instagram accounts
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('instagram-accounts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'instagram_accounts',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchAccounts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    accounts,
    loading,
    refetch: fetchAccounts,
    deleteAccount,
  };
};