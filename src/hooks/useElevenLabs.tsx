import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Voice {
  voice_id: string;
  name: string;
  description?: string;
  category?: string;
  fine_tuning?: {
    is_allowed_to_fine_tune: boolean;
    language?: string;
  };
  samples?: Array<{
    sample_id: string;
    file_name: string;
    mime_type: string;
    size_bytes: number;
    hash: string;
  }>;
  settings?: {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

interface UseElevenLabsReturn {
  voices: Voice[];
  loading: boolean;
  error: string | null;
  cloneVoice: (voiceName: string, audioFile: string, description?: string) => Promise<Voice | null>;
  generateSpeech: (text: string, voiceId: string) => Promise<string | null>;
  deleteVoice: (voiceId: string) => Promise<boolean>;
  fetchVoices: () => Promise<void>;
}

export const useElevenLabs = (): UseElevenLabsReturn => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVoices = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      console.log('Fetching voices from ElevenLabs API');

      const response = await fetch('https://yomqllxkvuwzcskyjesj.supabase.co/functions/v1/elevenlabs-voice', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'list' }),
      });

      console.log('Fetch voices response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        console.error('Fetch voices API error:', errorData);
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log('Fetch voices API success');
      setVoices(result.voices || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch voices';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const cloneVoice = useCallback(async (
    voiceName: string, 
    audioFile: string, 
    description?: string
  ): Promise<Voice | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      console.log('Making voice cloning API call:', { voiceName, description });

      const response = await fetch('https://yomqllxkvuwzcskyjesj.supabase.co/functions/v1/voice-cloning', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: voiceName,
          description: description || '',
          audio_file: audioFile,
        }),
      });

      console.log('Voice cloning response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        console.error('Voice cloning API error:', errorData);
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log('Voice cloning API success');
      
      toast.success(`Voice "${voiceName}" cloned successfully!`);
      await fetchVoices(); // Refresh the voices list
      return result.voice;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to clone voice';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchVoices]);

  const generateSpeech = useCallback(async (text: string, voiceId: string): Promise<string | null> => {
    console.log('generateSpeech called with:', { textLength: text.length, voiceId });
    setLoading(true);
    setError(null);
    
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error(`Authentication error: ${sessionError.message}`);
      }
      
      if (!session) {
        console.error('No active session found');
        throw new Error('Please sign in to generate speech');
      }

      console.log('Session found, user ID:', session.user.id);
      console.log('Making voice generation API call to voice-generation function');

      const requestBody = {
        text,
        voice_id: voiceId,
        model: 'eleven_multilingual_v2',
      };
      console.log('Request body:', requestBody);

      const response = await fetch('https://yomqllxkvuwzcskyjesj.supabase.co/functions/v1/voice-generation', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Voice generation response status:', response.status);
      console.log('Voice generation response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Voice generation API error response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { error: errorText || 'Unknown error' };
        }
        
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log('Voice generation API success, result keys:', Object.keys(result));
      console.log('Audio URL present:', !!result.audio_url);
      
      return result.audio_url;
    } catch (err) {
      console.error('generateSpeech error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate speech';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteVoice = useCallback(async (voiceId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      console.log('Deleting voice:', voiceId);

      const response = await fetch('https://yomqllxkvuwzcskyjesj.supabase.co/functions/v1/elevenlabs-voice', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          voiceId,
        }),
      });

      console.log('Delete voice response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        console.error('Delete voice API error:', errorData);
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log('Delete voice API success');
      
      if (result.success) {
        toast.success('Voice deleted successfully!');
        await fetchVoices(); // Refresh the voices list
        return true;
      }
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete voice';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchVoices]);

  return {
    voices,
    loading,
    error,
    cloneVoice,
    generateSpeech,
    deleteVoice,
    fetchVoices,
  };
};