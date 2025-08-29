import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VoiceGenerationRequest {
  text: string;
  voice_id: string;
  model?: string;
  stability?: number;
  similarity_boost?: number;
  style?: number;
  use_speaker_boost?: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Voice generation request received');
    
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

    const { text, voice_id, model = 'eleven_multilingual_v2', stability = 0.5, similarity_boost = 0.8, style = 0.0, use_speaker_boost = true } = await req.json() as VoiceGenerationRequest;

    if (!text || !voice_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: text and voice_id' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Generating voice with ElevenLabs:', { voice_id, model, text_length: text.length });

    // Check user credits
    const { data: profile } = await supabaseClient
      .from('user_profiles')
      .select('credits_remaining')
      .eq('user_id', user.id)
      .single();

    if (profile && profile.credits_remaining <= 0) {
      return new Response(
        JSON.stringify({ error: 'Insufficient credits' }),
        { 
          status: 402, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create generation record
    const { data: generation, error: dbError } = await supabaseClient
      .from('voice_generations')
      .insert({
        user_id: user.id,
        voice_id,
        text_content: text,
        model,
        generation_status: 'processing'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to create generation record' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Call ElevenLabs API
    const elevenLabsKey = Deno.env.get('ELEVENLABS_API_KEY');
    if (!elevenLabsKey) {
      console.error('ElevenLabs API key not configured');
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': elevenLabsKey,
      },
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: {
          stability,
          similarity_boost,
          style,
          use_speaker_boost,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      
      // Update generation record with error
      await supabaseClient
        .from('voice_generations')
        .update({ generation_status: 'failed' })
        .eq('id', generation.id);

      return new Response(
        JSON.stringify({ error: 'Voice generation failed', details: errorText }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Voice generation successful');

    // Get the audio data
    const audioBuffer = await response.arrayBuffer();
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

    // Update generation record with success
    await supabaseClient
      .from('voice_generations')
      .update({ 
        generation_status: 'completed',
        audio_url: audioUrl
      })
      .eq('id', generation.id);

    // Deduct user credits
    if (profile) {
      await supabaseClient
        .from('user_profiles')
        .update({ credits_remaining: Math.max(0, profile.credits_remaining - 1) })
        .eq('user_id', user.id);
    }

    console.log('Generation completed and saved');

    return new Response(
      JSON.stringify({ 
        success: true, 
        audio_url: audioUrl,
        generation_id: generation.id,
        credits_remaining: profile ? Math.max(0, profile.credits_remaining - 1) : null
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