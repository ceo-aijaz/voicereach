import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VoiceCloneRequest {
  action: 'clone' | 'list' | 'generate' | 'delete' | 'webhook'
  voiceName?: string
  description?: string
  audioFile?: string
  text?: string
  voiceId?: string
  webhookPayload?: any
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get user from token
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get ElevenLabs API key from environment
    const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY')
    
    if (!elevenLabsApiKey) {
      console.error('ElevenLabs API key not found in environment')
      console.error('Available env vars:', Object.keys(Deno.env.toObject()))
      return new Response(
        JSON.stringify({ error: 'ElevenLabs API key not configured. Please contact support.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('ElevenLabs API key found, length:', elevenLabsApiKey.length)

    // Get ElevenLabs webhook secret
    const elevenLabsWebhookSecret = Deno.env.get('ELEVENLABS_WEBHOOK_SECRET')

    const { action, voiceName, description, audioFile, text, voiceId, webhookPayload }: VoiceCloneRequest = await req.json()

    const elevenLabsHeaders = {
      'xi-api-key': elevenLabsApiKey,
      'Content-Type': 'application/json'
    }

    switch (action) {
      case 'list':
        console.log('Fetching voices from ElevenLabs API...')
        try {
          // Get user's cloned voices
          const voicesResponse = await fetch('https://api.elevenlabs.io/v1/voices', {
            headers: elevenLabsHeaders
          })
          
          console.log('ElevenLabs voices response status:', voicesResponse.status)
          
          if (!voicesResponse.ok) {
            const errorData = await voicesResponse.text()
            console.error('ElevenLabs API error:', errorData)
            return new Response(
              JSON.stringify({ error: `ElevenLabs API error: ${errorData}` }),
              { status: voicesResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }
          
          const voicesData = await voicesResponse.json()
          console.log('Successfully fetched voices:', voicesData.voices?.length || 0)
          
          return new Response(
            JSON.stringify(voicesData),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        } catch (fetchError) {
          console.error('Fetch error:', fetchError)
          return new Response(
            JSON.stringify({ error: `Failed to fetch voices: ${fetchError.message}` }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'clone':
        if (!voiceName || !audioFile) {
          return new Response(
            JSON.stringify({ error: 'Voice name and audio file are required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        // Create FormData for voice cloning
        const formData = new FormData()
        formData.append('name', voiceName)
        formData.append('description', description || '')
        
        // Convert base64 audio to blob
        const audioBlob = new Blob([Uint8Array.from(atob(audioFile), c => c.charCodeAt(0))], {
          type: 'audio/wav'
        })
        formData.append('files', audioBlob, 'voice-sample.wav')

        const cloneResponse = await fetch('https://api.elevenlabs.io/v1/voices/add', {
          method: 'POST',
          headers: {
            'xi-api-key': elevenLabsApiKey,
          },
          body: formData
        })
        
        const cloneData = await cloneResponse.json()
        
        if (!cloneResponse.ok) {
          return new Response(
            JSON.stringify({ error: cloneData.detail || 'Failed to clone voice' }),
            { status: cloneResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        // Store voice info in database
        await supabase
          .from('user_voices')
          .insert({
            user_id: user.id,
            voice_id: cloneData.voice_id,
            name: voiceName,
            description: description || '',
            created_at: new Date().toISOString()
          })

        return new Response(
          JSON.stringify(cloneData),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'generate':
        if (!text || !voiceId) {
          return new Response(
            JSON.stringify({ error: 'Text and voice ID are required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        console.log('Generating speech for voice:', voiceId, 'text length:', text.length)

        try {
          const generateResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: elevenLabsHeaders,
            body: JSON.stringify({
              text,
              model_id: 'eleven_multilingual_v2',
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.8,
                style: 0.0,
                use_speaker_boost: true
              }
            })
          })

          console.log('ElevenLabs generate response status:', generateResponse.status)

          if (!generateResponse.ok) {
            const errorData = await generateResponse.text()
            console.error('ElevenLabs generate error:', errorData)
            return new Response(
              JSON.stringify({ error: `Failed to generate speech: ${errorData}` }),
              { status: generateResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          const audioBuffer = await generateResponse.arrayBuffer()
          const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)))
          
          console.log('Successfully generated speech, audio length:', base64Audio.length)

          return new Response(
            JSON.stringify({ audio: base64Audio }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        } catch (generateError) {
          console.error('Generate speech error:', generateError)
          return new Response(
            JSON.stringify({ error: `Failed to generate speech: ${generateError.message}` }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'delete':
        if (!voiceId) {
          return new Response(
            JSON.stringify({ error: 'Voice ID is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const deleteResponse = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
          method: 'DELETE',
          headers: {
            'xi-api-key': elevenLabsApiKey,
          }
        })

        if (deleteResponse.ok) {
          // Remove from database
          await supabase
            .from('user_voices')
            .delete()
            .eq('user_id', user.id)
            .eq('voice_id', voiceId)
        }

        return new Response(
          JSON.stringify({ success: deleteResponse.ok }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'webhook':
        // Handle ElevenLabs webhook notifications
        if (!elevenLabsWebhookSecret) {
          return new Response(
            JSON.stringify({ error: 'Webhook secret not configured' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        // Process webhook payload (voice cloning completion, etc.)
        console.log('ElevenLabs webhook received:', webhookPayload)
        
        // You can add specific webhook handling logic here
        // For example, update voice status in database when cloning is complete
        
        return new Response(
          JSON.stringify({ success: true, message: 'Webhook processed' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('ElevenLabs function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})