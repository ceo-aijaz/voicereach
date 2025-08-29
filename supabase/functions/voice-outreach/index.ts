import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VoiceOutreachRequest {
  campaign_id?: string;
  recipient_name: string;
  company_name?: string;
  template_text: string;
  voice_id: string;
  model?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Voice outreach request received');
    
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

    const { campaign_id, recipient_name, company_name = '', template_text, voice_id, model = 'eleven_multilingual_v2' } = await req.json() as VoiceOutreachRequest;

    if (!recipient_name || !template_text || !voice_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: recipient_name, template_text, and voice_id' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Creating voice outreach message:', { recipient_name, company_name, voice_id });

    // Replace template variables
    let finalText = template_text
      .replace(/\{recipient_name\}/g, recipient_name)
      .replace(/\{company_name\}/g, company_name || recipient_name);

    console.log('Template processed:', { original: template_text, final: finalText });

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

    // Create outreach message record
    const { data: outreachMessage, error: dbError } = await supabaseClient
      .from('voice_outreach_messages')
      .insert({
        user_id: user.id,
        campaign_id,
        recipient_name,
        company_name,
        template_text,
        final_text: finalText,
        voice_id,
        status: 'generating'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to create outreach message record' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate voice message using ElevenLabs
    const elevenLabsKey = Deno.env.get('ELEVENLABS_API_KEY');
    if (!elevenLabsKey) {
      console.error('ElevenLabs API key not configured');
      await supabaseClient
        .from('voice_outreach_messages')
        .update({ status: 'failed' })
        .eq('id', outreachMessage.id);
      
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
        text: finalText,
        model_id: model,
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      
      // Update message record with error
      await supabaseClient
        .from('voice_outreach_messages')
        .update({ status: 'failed' })
        .eq('id', outreachMessage.id);

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

    // Update message record with success
    await supabaseClient
      .from('voice_outreach_messages')
      .update({ 
        status: 'completed',
        audio_url: audioUrl
      })
      .eq('id', outreachMessage.id);

    // Deduct user credits
    if (profile) {
      await supabaseClient
        .from('user_profiles')
        .update({ credits_remaining: Math.max(0, profile.credits_remaining - 1) })
        .eq('user_id', user.id);
    }

    console.log('Outreach message completed and saved');

    return new Response(
      JSON.stringify({ 
        success: true, 
        audio_url: audioUrl,
        message_id: outreachMessage.id,
        final_text: finalText,
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