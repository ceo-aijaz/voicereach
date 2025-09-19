import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ConnectionRequest {
  username: string;
  password: string;
  email: string;
  twoFactorSecret?: string;
}

// Simple encryption function (in production, use proper encryption)
function encrypt(text: string, key: string): string {
  try {
    // Simple XOR encryption for demo purposes
    // In production, use proper encryption libraries
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result);
  } catch (error) {
    console.error('Encryption error:', error);
    return btoa(text); // fallback to base64
  }
}

// Simulate Instagram automation process
async function connectToInstagram(request: ConnectionRequest): Promise<{ success: boolean; message: string; accountData?: any }> {
  console.log(`Starting Instagram connection for user: ${request.username}`);
  
  try {
    // Simulate connection steps with delays
    console.log('Step 1: Initializing browser...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Step 2: Navigating to Instagram...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Step 3: Entering credentials...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Basic validation
    if (!request.username || request.username.length < 3) {
      return { success: false, message: 'Invalid username provided' };
    }
    
    if (!request.password || request.password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }
    
    if (!request.email || !request.email.includes('@')) {
      return { success: false, message: 'Valid email address required' };
    }
    
    // Simulate 2FA if secret is provided
    if (request.twoFactorSecret) {
      console.log('Step 4: Handling 2FA...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('Step 5: Verifying login...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful connection
    const accountData = {
      username: request.username,
      followers: Math.floor(Math.random() * 10000) + 1000,
      following: Math.floor(Math.random() * 1000) + 100,
      posts: Math.floor(Math.random() * 500) + 50,
      isVerified: Math.random() > 0.8,
      profilePicture: `https://picsum.photos/150/150?random=${Math.floor(Math.random() * 1000)}`,
      bio: `Connected Instagram account for ${request.username}`,
    };
    
    console.log('Instagram connection successful!');
    return { 
      success: true, 
      message: 'Successfully connected to Instagram',
      accountData 
    };
    
  } catch (error) {
    console.error('Instagram connection error:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to connect to Instagram'
    };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the authorization header
    const authorization = req.headers.get('Authorization');
    if (!authorization) {
      throw new Error('No authorization header');
    }

    // Get the JWT token from the authorization header
    const token = authorization.replace('Bearer ', '');

    // Verify the JWT token and get the user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError || !user) {
      throw new Error('Invalid authentication token');
    }

    console.log('Authenticated user:', user.id);

    const requestData: ConnectionRequest = await req.json();
    console.log('Instagram connection request received for:', requestData.username);

    // Validate input
    if (!requestData.username || !requestData.password || !requestData.email) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Username, password, and email are required' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Attempt to connect to Instagram
    const connectionResult = await connectToInstagram(requestData);

    if (connectionResult.success) {
      // Encrypt sensitive data
      const encryptionKey = Deno.env.get('ENCRYPTION_KEY') || 'default-key-change-in-production';
      const encryptedPassword = encrypt(requestData.password, encryptionKey);
      const encryptedTwoFactorSecret = requestData.twoFactorSecret 
        ? encrypt(requestData.twoFactorSecret, encryptionKey) 
        : null;

      // Store the account in the database
      const { data: accountData, error: dbError } = await supabaseClient
        .from('instagram_accounts')
        .insert({
          user_id: user.id,
          instagram_username: requestData.username,
          encrypted_password: encryptedPassword,
          email: requestData.email,
          encrypted_2fa_secret: encryptedTwoFactorSecret,
          session_data: connectionResult.accountData,
          status: 'active',
          last_connected: new Date().toISOString()
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        
        // Check if it's a unique constraint violation
        if (dbError.code === '23505') {
          return new Response(
            JSON.stringify({ 
              success: false, 
              message: 'This Instagram account is already connected' 
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 409 
            }
          );
        }
        
        throw new Error('Failed to save account data');
      }

      console.log('Instagram account saved successfully:', accountData.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: connectionResult.message,
          accountData: {
            id: accountData.id,
            username: accountData.instagram_username,
            status: accountData.status,
            ...connectionResult.accountData
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    } else {
      return new Response(
        JSON.stringify(connectionResult),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

  } catch (error) {
    console.error('Instagram connect function error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || 'Internal server error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});