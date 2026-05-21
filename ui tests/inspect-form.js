import { chromium } from 'playwright';

/**
 * Diagnostic script to inspect booking form structure
 * Helps identify correct selectors for form fields
 */
async function inspectBookingForm() {
  console.log('🔍 Starting booking form inspection...\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate to the website
    console.log('📍 Navigating to https://automationintesting.online/');
    await page.goto('https://automationintesting.online/', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Wait for page to load
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
    
    console.log('✅ Page loaded\n');
    
    // Check for booking section
    console.log('🔎 Looking for booking section (#booking)...');
    const bookingSection = page.locator('#booking');
    const bookingSectionExists = await bookingSection.count() > 0;
    console.log(bookingSectionExists ? '✅ Booking section found' : '❌ Booking section NOT found');
    
    if (bookingSectionExists) {
      const isVisible = await bookingSection.isVisible();
      console.log(`   Visible: ${isVisible ? 'YES' : 'NO'}\n`);
    }
    
    // Try to find all input fields in booking section
    console.log('🔎 Looking for input fields in booking section...');
    const inputs = page.locator('#booking input');
    const inputCount = await inputs.count();
    console.log(`   Found ${inputCount} input fields\n`);
    
    if (inputCount > 0) {
      console.log('📋 Input field details:');
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id').catch(() => 'none');
        const name = await input.getAttribute('name').catch(() => 'none');
        const type = await input.getAttribute('type').catch(() => 'none');
        const placeholder = await input.getAttribute('placeholder').catch(() => 'none');
        const className = await input.getAttribute('class').catch(() => 'none');
        
        console.log(`\n   Input #${i + 1}:`);
        console.log(`      ID: ${id}`);
        console.log(`      Name: ${name}`);
        console.log(`      Type: ${type}`);
        console.log(`      Placeholder: ${placeholder}`);
        console.log(`      Class: ${className}`);
      }
    }
    
    // Check for specific IDs we're looking for
    console.log('\n\n🔎 Checking for expected field IDs...');
    const expectedFields = ['firstname', 'lastname', 'email', 'phone'];
    
    for (const fieldId of expectedFields) {
      const selector = `#${fieldId}`;
      const field = page.locator(selector);
      const exists = await field.count() > 0;
      
      if (exists) {
        const isVisible = await field.isVisible();
        console.log(`✅ ${selector} - EXISTS (visible: ${isVisible})`);
      } else {
        console.log(`❌ ${selector} - NOT FOUND`);
        
        // Try alternative selectors
        const nameSelector = `input[name="${fieldId}"]`;
        const nameExists = await page.locator(nameSelector).count() > 0;
        if (nameExists) {
          console.log(`   ℹ️  Alternative found: ${nameSelector}`);
        }
      }
    }
    
    // Check for any form element
    console.log('\n\n🔎 Looking for form elements...');
    const forms = page.locator('#booking form');
    const formCount = await forms.count();
    console.log(`   Found ${formCount} form(s)`);
    
    if (formCount > 0) {
      const formInputs = page.locator('#booking form input');
      const formInputCount = await formInputs.count();
      console.log(`   Form contains ${formInputCount} input fields`);
    }
    
    // Get page HTML for debugging (first 5000 chars of booking section)
    console.log('\n\n📄 Booking section HTML preview:');
    if (bookingSectionExists) {
      const html = await bookingSection.innerHTML().catch(() => 'Unable to get HTML');
      console.log(html.substring(0, 1000) + '...');
    }
    
    // Check if we need to scroll or interact first
    console.log('\n\n🔎 Checking if booking section needs scrolling...');
    await page.locator('#booking').scrollIntoViewIfNeeded().catch(() => {
      console.log('   ⚠️  Could not scroll to booking section');
    });
    await page.waitForTimeout(1000);
    
    // Re-check after scroll
    const inputsAfterScroll = await page.locator('#booking input').count();
    console.log(`   Input count after scroll: ${inputsAfterScroll}`);
    
    console.log('\n\n✅ Inspection complete!');
    console.log('📸 Browser will remain open for manual inspection.');
    console.log('   Press Enter in terminal to close...\n');
    
    // Wait for user input before closing
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });
    
  } catch (error) {
    console.error('\n❌ Error during inspection:', error.message);
  } finally {
    await browser.close();
    console.log('\n👋 Browser closed. Inspection complete.');
  }
}

// Run the inspection
inspectBookingForm().catch(console.error);
