import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useVoiceGeneration = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const generateVoice = async (text: string, voiceId: string, model = 'eleven_multilingual_v2') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate voice messages.",
        variant: "destructive",
      });
      return { error: "Not authenticated" };
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('voice-generation', {
        body: { text, voice_id: voiceId, model }
      });

      if (error) throw error;

      toast({
        title: "Voice Generated!",
        description: "Your voice message has been generated successfully.",
      });

      return { data };
    } catch (error) {
      console.error('Voice generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate voice message. Please try again.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const generateOutreach = async (recipientName: string, companyName: string, templateText: string, voiceId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate outreach messages.",
        variant: "destructive",
      });
      return { error: "Not authenticated" };
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('voice-outreach', {
        body: { 
          recipient_name: recipientName,
          company_name: companyName,
          template_text: templateText,
          voice_id: voiceId
        }
      });

      if (error) throw error;

      toast({
        title: "Outreach Message Generated!",
        description: "Your personalized voice message has been created.",
      });

      return { data };
    } catch (error) {
      console.error('Outreach generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate outreach message. Please try again.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return {
    generateVoice,
    generateOutreach,
    loading,
  };
};