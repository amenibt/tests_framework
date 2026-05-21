import { chromium } from 'playwright';

/**
 * Diagnostic script - Test the "Check Availability" button click
 */
async function testCheckAvailabilityClick() {
  console.log('🔍 Testing "Check Availability" button functionality...\n');
  
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('📍 Step 1: Navigate to website');
    await page.goto('https://automationintesting.online/', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
    console.log('✅ Page loaded\n');
    
    console.log('📍 Step 2: Check for booking section');
    const bookingSection = page.locator('#booking');
    const bookingSectionVisible = await bookingSection.isVisible();
    console.log(`✅ Booking section visible: ${bookingSectionVisible}\n`);
    
    console.log('📍 Step 3: Count initial input fields');
    const initialInputs = await page.locator('#booking input').count();
    console.log(`   Initial inputs: ${initialInputs}\n`);
    
    console.log('📍 Step 4: Look for Check Availability button');
    const checkBtn = page.locator('button:has-text("Check Availability")');
    const buttonExists = await checkBtn.count() > 0;
    console.log(`   Button exists: ${buttonExists}`);
    
    if (buttonExists) {
      const buttonVisible = await checkBtn.isVisible();
      console.log(`   Button visible: ${buttonVisible}\n`);
      
      console.log('📍 Step 5: Click "Check Availability" button');
      await checkBtn.click();
      console.log('✅ Button clicked!\n');
      
      console.log('⏳ Waiting 3 seconds for form to expand...');
      await page.waitForTimeout(3000);
      
      console.log('\n📍 Step 6: Re-count input fields after click');
      const afterInputs = await page.locator('#booking input').count();
      console.log(`   Inputs after click: ${afterInputs}`);
      console.log(`   Change: ${afterInputs - initialInputs} new fields\n`);
      
      console.log('📍 Step 7: Check for firstname field');
      const firstname = page.locator('#firstname');
      const firstnameExists = await firstname.count() > 0;
      console.log(`   #firstname exists: ${firstnameExists}`);
      
      if (firstnameExists) {
        const firstnameVisible = await firstname.isVisible();
        console.log(`   #firstname visible: ${firstnameVisible}`);
      } else {
        console.log('   ❌ #firstname NOT FOUND after clicking button!');
        
        // List all inputs that DO exist
        console.log('\n   📋 All inputs after clicking button:');
        for (let i = 0; i < afterInputs; i++) {
          const input = page.locator('#booking input').nth(i);
          const id = await input.getAttribute('id').catch(() => 'none');
          const placeholder = await input.getAttribute('placeholder').catch(() => 'none');
          const type = await input.getAttribute('type').catch(() => 'none');
          console.log(`      Input #${i + 1}: id="${id}", placeholder="${placeholder}", type="${type}"`);
        }
      }
      
      console.log('\n   📄 Booking section HTML after click (first 1500 chars):');
      const html = await bookingSection.innerHTML();
      console.log(html.substring(0, 1500) + '...\n');
      
    } else {
      console.log('   ❌ "Check Availability" button NOT FOUND!');
    }
    
    console.log('\n✅ Test complete!');
    console.log('📸 Browser will remain open. Press Enter to close...\n');
    
    // Wait for user input
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
    console.log('\n👋 Browser closed.');
  }
}

testCheckAvailabilityClick().catch(console.error);
