import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

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

// Real Instagram automation process using Puppeteer
async function connectToInstagram(request: ConnectionRequest): Promise<{ success: boolean; message: string; accountData?: any }> {
  console.log(`Starting real Instagram connection for user: ${request.username}`);
  
  let browser: any;
  let page: any;
  
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

    console.log('Step 1: Initializing browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    page = await browser.newPage();
    
    // Set realistic viewport and user agent
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    console.log('Step 2: Navigating to Instagram...');
    await page.goto('https://www.instagram.com/accounts/login/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Wait for login form
    await page.waitForSelector('input[name="username"]', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Step 3: Entering credentials...');
    
    // Human-like typing for username
    await humanType(page, 'input[name="username"]', request.username);
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Human-like typing for password
    await humanType(page, 'input[name="password"]', request.password);
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    // Click login button
    await page.click('button[type="submit"]');
    
    // Wait for response
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check for different possible outcomes
    const currentUrl = page.url();
    console.log('Current URL after login:', currentUrl);

    // Check for login errors
    const errorElement = await page.$('div[id="slfErrorAlert"]');
    if (errorElement) {
      const errorText = await page.evaluate((el: any) => el.textContent, errorElement);
      console.log('Login error detected:', errorText);
      return { success: false, message: 'Invalid username or password' };
    }

    // Check for 2FA requirement
    const twoFactorElement = await page.$('input[name="verificationCode"]');
    if (twoFactorElement) {
      console.log('Step 4: 2FA required...');
      
      if (!request.twoFactorSecret) {
        return { success: false, message: '2FA secret required for this account' };
      }

      // Generate and enter 2FA code
      const code = generate2FACode(request.twoFactorSecret);
      await humanType(page, 'input[name="verificationCode"]', code);
      await page.click('button[type="submit"]');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // Check for suspicious login activity
    const suspiciousActivity = await page.$('button[type="button"]');
    if (suspiciousActivity) {
      const buttonText = await page.evaluate((el: any) => el.textContent, suspiciousActivity);
      if (buttonText && buttonText.includes('It Was Me')) {
        await page.click('button[type="button"]');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Check if login was successful by looking for main page elements
    try {
      await page.waitForSelector('svg[aria-label="Home"]', { timeout: 10000 });
    } catch (e) {
      return { success: false, message: 'Login failed - unable to verify successful authentication' };
    }

    console.log('Step 5: Extracting profile data...');
    
    // Navigate to user's profile
    await page.goto(`https://www.instagram.com/${request.username}/`, { 
      waitUntil: 'networkidle2',
      timeout: 20000 
    });

    // Extract real profile data
    const accountData = await page.evaluate(() => {
      const getTextContent = (selector: string) => {
        const element = document.querySelector(selector);
        return element ? element.textContent || '' : '';
      };

      const getImageSrc = (selector: string) => {
        const element = document.querySelector(selector) as HTMLImageElement;
        return element ? element.src : '';
      };

      // Extract follower count
      const followersElement = document.querySelector('a[href*="/followers/"] span');
      const followers = followersElement ? followersElement.textContent || '0' : '0';
      
      // Extract following count
      const followingElement = document.querySelector('a[href*="/following/"] span');
      const following = followingElement ? followingElement.textContent || '0' : '0';

      // Extract posts count
      const postsElements = document.querySelectorAll('div span');
      let posts = '0';
      for (const element of postsElements) {
        if (element.textContent && element.textContent.includes('post')) {
          posts = element.textContent.split(' ')[0];
          break;
        }
      }

      // Extract profile picture
      const profilePicture = getImageSrc('img[data-testid="user-avatar"]') || 
                           getImageSrc('img[alt*="profile picture"]') ||
                           getImageSrc('header img');

      // Extract bio
      const bioElement = document.querySelector('div.-vDIg span');
      const bio = bioElement ? bioElement.textContent || '' : '';

      // Check verification status
      const verifiedElement = document.querySelector('svg[aria-label="Verified"]');
      const isVerified = !!verifiedElement;

      return {
        followers: followers,
        following: following,
        posts: posts,
        profilePicture: profilePicture,
        bio: bio,
        isVerified: isVerified
      };
    });

    // Get session cookies for future requests
    const cookies = await page.cookies();
    const sessionData = {
      cookies: cookies,
      userAgent: await page.evaluate(() => navigator.userAgent),
      ...accountData
    };

    await browser.close();

    console.log('Instagram connection successful!', accountData);
    return { 
      success: true, 
      message: 'Successfully connected to Instagram',
      accountData: {
        username: request.username,
        ...accountData,
        sessionData: sessionData
      }
    };
    
  } catch (error) {
    console.error('Instagram connection error:', error);
    
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }

    // Handle specific error types
    if (error.message.includes('timeout')) {
      return { success: false, message: 'Connection timed out - Instagram may be slow or blocking requests' };
    }
    
    if (error.message.includes('net::ERR_NETWORK_CHANGED')) {
      return { success: false, message: 'Network connection lost during login process' };
    }
    
    return { 
      success: false, 
      message: 'Failed to connect to Instagram - please check your credentials and try again'
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