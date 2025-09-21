import { chromium } from 'playwright';

async function testInstagramConnection() {
  console.log('🧪 Testing Instagram Connection Setup...');
  
  try {
    // Test Playwright installation
    console.log('📦 Testing Playwright installation...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Test navigation to Instagram
    console.log('🌐 Testing navigation to Instagram...');
    await page.goto('https://www.instagram.com/', { 
      waitUntil: 'networkidle',
      timeout: 10000 
    });
    
    const title = await page.title();
    console.log(`✅ Successfully navigated to Instagram. Page title: ${title}`);
    
    // Test form elements detection
    console.log('🔍 Testing form element detection...');
    const loginButton = await page.$('a[href="/accounts/login/"]');
    if (loginButton) {
      console.log('✅ Login button found');
    } else {
      console.log('⚠️ Login button not found (might be already logged in)');
    }
    
    await browser.close();
    console.log('🎉 All tests passed! Instagram connection setup is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('💡 Make sure you have:');
    console.log('   - Internet connection');
    console.log('   - Playwright installed: npx playwright install chromium');
    console.log('   - Instagram is accessible from your location');
  }
}

// Run the test
testInstagramConnection();


