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

// Generate 2FA code from secret
function generate2FACode(secret: string): string {
  // This is a simplified TOTP implementation
  // In production, use a proper TOTP library
  const epoch = Math.floor(Date.now() / 1000);
  const timeStep = Math.floor(epoch / 30);
  const hash = btoa(secret + timeStep.toString());
  const code = parseInt(hash.slice(-6), 36).toString().padStart(6, '0').slice(-6);
  return code;
}

// Human-like typing with random delays
async function humanType(page: any, selector: string, text: string) {
  await page.click(selector);
  await page.evaluate((sel: string) => {
    const element = document.querySelector(sel) as HTMLInputElement;
    if (element) element.value = '';
  }, selector);
  
  for (const char of text) {
    await page.type(selector, char, { delay: Math.random() * 100 + 50 });
  }
}

// Enhanced Instagram automation simulation with realistic validation
async function connectToInstagram(request: ConnectionRequest): Promise<{ success: boolean; message: string; accountData?: any }> {
  console.log(`Starting Instagram connection simulation for user: ${request.username}`);
  
  try {
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

    console.log('Step 1: Simulating browser initialization...');
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    console.log('Step 2: Simulating Instagram navigation...');
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    console.log('Step 3: Simulating credential entry...');
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    // Simulate various realistic login scenarios
    const random = Math.random();
    
    // 85% success rate for valid-looking credentials
    if (random < 0.05) {
      return { success: false, message: 'Invalid username or password' };
    }
    
    if (random < 0.1 && random >= 0.05) {
      return { success: false, message: 'Account temporarily locked - too many login attempts' };
    }
    
    if (random < 0.15 && random >= 0.1) {
      return { success: false, message: 'Suspicious activity detected - please verify your account manually' };
    }
    
    // Simulate 2FA requirement for some accounts
    const requires2FA = random < 0.3 || request.twoFactorSecret;
    if (requires2FA) {
      console.log('Step 4: Handling 2FA verification...');
      if (!request.twoFactorSecret) {
        return { success: false, message: '2FA secret required for this account. Please provide your 2FA backup code.' };
      }
      
      // Validate 2FA secret format (should be 16+ characters)
      if (request.twoFactorSecret.length < 16) {
        return { success: false, message: 'Invalid 2FA secret format. Please provide the full backup code from Instagram.' };
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    }
    
    console.log('Step 5: Extracting account data...');
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Generate realistic account data based on username
    const usernameHash = request.username.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const baseFollowers = Math.abs(usernameHash % 50000) + 1000;
    const baseFollowing = Math.abs(usernameHash % 2000) + 100;
    const basePosts = Math.abs(usernameHash % 1000) + 20;
    
    // Generate a consistent profile picture URL based on username
    const profilePicSeed = Math.abs(usernameHash % 1000);
    
    // Create realistic bio based on account type
    const bioTemplates = [
      `📸 Content Creator | 🌟 Lifestyle`,
      `💼 Entrepreneur | 🚀 Building the future`,
      `🎨 Artist | ✨ Creative mind`,
      `📱 Tech Enthusiast | 💻 Developer`,
      `🌍 Travel Blogger | ✈️ Wanderlust`,
      `🏋️ Fitness Coach | 💪 Transform your life`,
      `📚 Educator | 🎓 Lifelong learner`,
      `🍽️ Food Lover | 👨‍🍳 Recipe creator`
    ];
    
    const bio = bioTemplates[Math.abs(usernameHash % bioTemplates.length)];
    
    // Check for verification (more likely for accounts with higher follower counts)
    const isVerified = baseFollowers > 25000 && Math.random() > 0.7;
    
    const accountData = {
      username: request.username,
      followers: baseFollowers.toLocaleString(),
      following: baseFollowing.toLocaleString(),
      posts: basePosts.toString(),
      isVerified: isVerified,
      profilePicture: `https://picsum.photos/150/150?random=${profilePicSeed}`,
      bio: bio,
      sessionData: {
        // Simulate session cookies and metadata
        sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        csrfToken: `csrf_${Math.random().toString(36).substr(2, 20)}`,
        deviceId: `device_${Math.random().toString(36).substr(2, 16)}`,
        lastActive: new Date().toISOString(),
        ipAddress: '192.168.1.' + Math.floor(Math.random() * 255),
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };
    
    console.log('Instagram connection simulation completed successfully!');
    return { 
      success: true, 
      message: 'Successfully connected to Instagram account (Demo Mode)',
      accountData: accountData
    };
    
  } catch (error) {
    console.error('Instagram connection simulation error:', error);
    return { 
      success: false, 
      message: 'Connection failed due to network error - please try again'
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

      if (data.success) {
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
                message: 'This Instagram account is already connected to your profile' 
              }),
              { 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 409 
              }
            );
          }
          
          throw new Error('Failed to save account data to database');
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
              profilePicture: connectionResult.accountData?.profilePicture,
              followers: connectionResult.accountData?.followers,
              following: connectionResult.accountData?.following,
              posts: connectionResult.accountData?.posts,
              isVerified: connectionResult.accountData?.isVerified,
              bio: connectionResult.accountData?.bio,
              connectedAt: accountData.last_connected
            }
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            message: connectionResult.message
          }),
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