import { chromium } from 'playwright';

export class InstagramAutomationService {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async connectAccount({ email, username, password, twoFactorCode, socket }) {
    try {
      // Emit status update
      socket.emit('connection-status', { 
        status: 'browser-starting', 
        message: 'Starting browser...' 
      });

      // Launch browser
      this.browser = await chromium.launch({ 
        headless: false, // Set to true for production
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      this.context = await this.browser.newContext({
        viewport: { width: 1280, height: 720 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      });

      this.page = await this.context.newPage();

      socket.emit('connection-status', { 
        status: 'navigating', 
        message: 'Navigating to Instagram...' 
      });

      // Navigate to Instagram login page
      await this.page.goto('https://www.instagram.com/accounts/login/', {
        waitUntil: 'networkidle'
      });

      socket.emit('connection-status', { 
        status: 'filling-credentials', 
        message: 'Filling login credentials...' 
      });

      // Wait for login form and fill credentials
      await this.page.waitForSelector('input[name="username"]', { timeout: 10000 });
      
      // Fill username/email
      await this.page.fill('input[name="username"]', username);
      
      // Fill password
      await this.page.fill('input[name="password"]', password);

      socket.emit('connection-status', { 
        status: 'logging-in', 
        message: 'Submitting login form...' 
      });

      // Click login button
      await this.page.click('button[type="submit"]');

      // Wait for either success or error
      try {
        // Check for 2FA challenge
        await this.page.waitForSelector('input[name="verificationCode"]', { timeout: 5000 });
        
        if (twoFactorCode) {
          socket.emit('connection-status', { 
            status: 'two-factor', 
            message: 'Entering 2FA code...' 
          });
          
          await this.page.fill('input[name="verificationCode"]', twoFactorCode);
          await this.page.click('button[type="button"]');
          
          // Wait for 2FA to process
          await this.page.waitForTimeout(3000);
        } else {
          throw new Error('2FA code required but not provided');
        }
      } catch (error) {
        // No 2FA required, continue
        console.log('No 2FA required or error:', error.message);
      }

      // Check for login success by looking for Instagram home page elements
      try {
        await this.page.waitForSelector('svg[aria-label="Home"]', { timeout: 15000 });
        
        socket.emit('connection-status', { 
          status: 'login-success', 
          message: 'Login successful! Fetching profile data...' 
        });

        // Navigate to profile page
        await this.page.goto(`https://www.instagram.com/${username}/`, {
          waitUntil: 'networkidle'
        });

        // Scrape profile data
        const profileData = await this.scrapeProfileData();

        socket.emit('connection-status', { 
          status: 'profile-scraped', 
          message: 'Profile data retrieved successfully!' 
        });

        return {
          success: true,
          profileData
        };

      } catch (error) {
        // Check for login errors
        const errorElement = await this.page.$('div[role="alert"]');
        if (errorElement) {
          const errorText = await errorElement.textContent();
          throw new Error(`Login failed: ${errorText}`);
        }
        
        throw new Error('Login failed: Unable to verify successful login');
      }

    } catch (error) {
      console.error('Instagram connection error:', error);
      return {
        success: false,
        error: error.message
      };
    } finally {
      // Clean up browser resources
      if (this.browser) {
        await this.browser.close();
      }
    }
  }

  async scrapeProfileData() {
    try {
      // Wait for profile page to load
      await this.page.waitForSelector('header', { timeout: 10000 });

      // Extract profile picture
      const profilePictureElement = await this.page.$('header img');
      const profilePicture = profilePictureElement ? 
        await profilePictureElement.getAttribute('src') : null;

      // Extract follower count
      const followerCountElement = await this.page.$('a[href*="/followers/"] span');
      const followerCount = followerCountElement ? 
        await followerCountElement.textContent() : '0';

      // Extract following count
      const followingCountElement = await this.page.$('a[href*="/following/"] span');
      const followingCount = followingCountElement ? 
        await followingCountElement.textContent() : '0';

      // Extract post count
      const postCountElement = await this.page.$('div:has-text("posts") span');
      const postCount = postCountElement ? 
        await postCountElement.textContent() : '0';

      // Extract bio
      const bioElement = await this.page.$('header div:has-text("")');
      const bio = bioElement ? 
        await bioElement.textContent() : '';

      // Extract username
      const usernameElement = await this.page.$('header h2');
      const username = usernameElement ? 
        await usernameElement.textContent() : '';

      // Extract full name
      const fullNameElement = await this.page.$('header h1');
      const fullName = fullNameElement ? 
        await fullNameElement.textContent() : '';

      return {
        username: username.trim(),
        fullName: fullName.trim(),
        bio: bio.trim(),
        profilePicture,
        followerCount: this.parseCount(followerCount),
        followingCount: this.parseCount(followingCount),
        postCount: this.parseCount(postCount),
        isVerified: await this.checkIfVerified(),
        scrapedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('Error scraping profile data:', error);
      throw new Error('Failed to scrape profile data');
    }
  }

  parseCount(countText) {
    if (!countText) return 0;
    
    const cleanText = countText.replace(/[^\d.,KMB]/g, '');
    
    if (cleanText.includes('K')) {
      return Math.floor(parseFloat(cleanText.replace('K', '')) * 1000);
    } else if (cleanText.includes('M')) {
      return Math.floor(parseFloat(cleanText.replace('M', '')) * 1000000);
    } else if (cleanText.includes('B')) {
      return Math.floor(parseFloat(cleanText.replace('B', '')) * 1000000000);
    }
    
    return parseInt(cleanText.replace(/,/g, '')) || 0;
  }

  async checkIfVerified() {
    try {
      const verifiedElement = await this.page.$('svg[aria-label="Verified"]');
      return verifiedElement !== null;
    } catch (error) {
      return false;
    }
  }
}


