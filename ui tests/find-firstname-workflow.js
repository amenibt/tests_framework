import { chromium } from 'playwright';

/**
 * Find the correct workflow to access firstname field
 */
async function findFirstnameWorkflow() {
  console.log('🔍 Finding the correct workflow to access #firstname field...\n');
  
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('📍 Step 1: Navigate to website');
    await page.goto('https://automationintesting.online/', { 
      waitUntil: 'load',
      timeout: 30000 
    });
    await page.waitForTimeout(2000);
    console.log('✅ Page loaded\n');
    
    console.log('📍 Step 2: Check for #firstname on initial page');
    let firstname = page.locator('#firstname');
    let count = await firstname.count();
    console.log(`   #firstname count: ${count}`);
    if (count > 0) {
      console.log('✅ #firstname EXISTS on initial load!\n');
    } else {
      console.log('❌ #firstname NOT on initial load\n');
    }
    
    console.log('📍 Step 3: Look for room Book buttons');
    const bookButtons = page.locator('button:has-text("Book this room"), button:has-text("Book")');
    const bookBtnCount = await bookButtons.count();
    console.log(`   Found ${bookBtnCount} Book buttons\n`);
    
    if (bookBtnCount > 0) {
      console.log('📍 Step 4: Click first Book button');
      await bookButtons.first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await bookButtons.first().click();
      console.log('✅ Clicked Book button!\n');
      
      console.log('⏳ Waiting 2 seconds for modal/form...');
      await page.waitForTimeout(2000);
      
      console.log('\n📍 Step 5: Check for #firstname after clicking Book');
      firstname = page.locator('#firstname');
      count = await firstname.count();
      console.log(`   #firstname count: ${count}`);
      
      if (count > 0) {
        console.log('✅ SUCCESS! #firstname appears after clicking Book button!\n');
        const visible = await firstname.isVisible();
        console.log(`   Visible: ${visible}`);
        
        // Try to interact with it
        if (visible) {
          await firstname.fill('Test Name');
          const value = await firstname.inputValue();
          console.log(`   Filled value: "${value}"\n`);
        }
        
        // Check for modal
        const modal = page.locator('.modal, [role="dialog"], .ReactModal__Content');
        const modalCount = await modal.count();
        console.log(`   Modal/dialog found: ${modalCount > 0}`);
        
        if (modalCount > 0) {
          console.log('\n   📋 Modal/Dialog HTML (first 2000 chars):');
          const modalHtml = await modal.first().innerHTML();
          console.log(modalHtml.substring(0, 2000) + '...\n');
        }
        
      } else {
        console.log('❌ Still no #firstname after clicking Book button\n');
        
        // Check all inputs on the page
        console.log('   📋 All inputs on entire page:');
        const allInputs = page.locator('input[type="text"], input:not([type]), input[type="email"], input[type="tel"]');
        const inputCount = await allInputs.count();
        console.log(`   Total text-like inputs: ${inputCount}\n`);
        
        for (let i = 0; i < Math.min(inputCount, 10); i++) {
          const input = allInputs.nth(i);
          const id = await input.getAttribute('id');
          const name = await input.getAttribute('name');
          const placeholder = await input.getAttribute('placeholder');
          const visible = await input.isVisible();
          console.log(`      Input #${i + 1}: id="${id}", name="${name}", placeholder="${placeholder}", visible=${visible}`);
        }
      }
    } else {
      console.log('❌ No Book buttons found on page\n');
      
      // List all buttons
      console.log('   📋 All buttons on page:');
      const allButtons = page.locator('button');
      const btnCount = await allButtons.count();
      console.log(`   Total buttons: ${btnCount}\n`);
      
      for (let i = 0; i < Math.min(btnCount, 15); i++) {
        const btn = allButtons.nth(i);
        const text = await btn.textContent();
        const visible = await btn.isVisible();
        console.log(`      Button #${i + 1}: "${text?.trim()}", visible=${visible}`);
      }
    }
    
    console.log('\n✅ Investigation complete!');
    console.log('📸 Browser remains open. Press Enter to close...\n');
    
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
    console.log('\n👋 Done.');
  }
}

findFirstnameWorkflow().catch(console.error);
