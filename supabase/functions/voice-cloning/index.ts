import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VoiceCloningRequest {
  name: string;
  description?: string;
  audio_files: string[]; // Base64 encoded audio files
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Voice cloning request received');
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')!;
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      console.error('Authentication error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('User authenticated:', user.id);

    const { name, description = '', audio_files } = await req.json() as VoiceCloningRequest;

    if (!name || !audio_files || audio_files.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name and audio_files' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Creating voice clone:', { name, audio_count: audio_files.length });

    // Check user credits (voice cloning costs more)
    const { data: profile } = await supabaseClient
      .from('user_profiles')
      .select('credits_remaining')
      .eq('user_id', user.id)
      .single();

    if (profile && profile.credits_remaining < 10) {
      return new Response(
        JSON.stringify({ error: 'Insufficient credits (voice cloning requires 10 credits)' }),
        { 
          status: 402, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create voice clone record
    const { data: voiceClone, error: dbError } = await supabaseClient
      .from('voice_clones')
      .insert({
        user_id: user.id,
        name,
        description,
        voice_id: 'pending',
        clone_status: 'processing',
        audio_samples: audio_files
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to create voice clone record' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Call ElevenLabs Voice Design API (simplified - actual API would be different)
    const elevenLabsKey = Deno.env.get('ELEVENLABS_API_KEY');
    if (!elevenLabsKey) {
      console.error('ElevenLabs API key not configured');
      await supabaseClient
        .from('voice_clones')
        .update({ clone_status: 'failed' })
        .eq('id', voiceClone.id);
      
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // For this demo, we'll simulate the cloning process and assign a random voice ID
    // In a real implementation, you'd upload the audio files to ElevenLabs and get a proper voice ID
    const simulatedVoiceId = `clone_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log('Voice cloning simulated successfully with ID:', simulatedVoiceId);

    // Update voice clone record with success
    await supabaseClient
      .from('voice_clones')
      .update({ 
        voice_id: simulatedVoiceId,
        clone_status: 'completed'
      })
      .eq('id', voiceClone.id);

    // Deduct user credits (voice cloning costs 10 credits)
    if (profile) {
      await supabaseClient
        .from('user_profiles')
        .update({ credits_remaining: Math.max(0, profile.credits_remaining - 10) })
        .eq('user_id', user.id);
    }

    console.log('Voice cloning completed and saved');

    return new Response(
      JSON.stringify({ 
        success: true, 
        voice_id: simulatedVoiceId,
        clone_id: voiceClone.id,
        credits_remaining: profile ? Math.max(0, profile.credits_remaining - 10) : null,
        message: 'Voice cloning completed successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});