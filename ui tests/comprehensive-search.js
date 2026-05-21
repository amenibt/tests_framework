import { chromium } from 'playwright';

/**
 * Comprehensive search for firstname/lastname fields
 */
async function comprehensiveSearch() {
  console.log('🔍 Comprehensive search for firstname/lastname fields...\n');
  
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    await page.goto('https://automationintesting.online/', { 
      waitUntil: 'load',
      timeout: 30000 
    });
    await page.waitForTimeout(2000);
    console.log('✅ Page loaded\n');
    
    // Scroll down the entire page
    console.log('📍 Scrolling down the entire page...');
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);
    console.log('✅ Scrolled to bottom\n');
    
    // Now check for firstname ANYWHERE on the page
    console.log('📍 Searching for #firstname ANYWHERE on page...');
    const firstname = page.locator('#firstname');
    const firstnameCount = await firstname.count();
    console.log(`   #firstname count: ${firstnameCount}`);
    
    if (firstnameCount > 0) {
      console.log('✅ FOUND #firstname!\n');
      
      const visible = await firstname.isVisible();
      console.log(`   Visible: ${visible}`);
      
      if (!visible) {
        console.log('   Trying to scroll into view...');
        await firstname.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const nowVisible = await firstname.isVisible();
        console.log(`   Visible after scroll: ${nowVisible}`);
      }
      
      // Get parent element info
      const parent = await firstname.locator('..').first();
      const parentClass = await parent.getAttribute('class');
      const parentId = await parent.getAttribute('id');
      console.log(`   Parent: class="${parentClass}", id="${parentId}"`);
      
      // Try to fill it
      if (await firstname.isVisible()) {
        try {
          await firstname.fill('John');
          console.log('   ✅ Successfully filled firstname!');
        } catch (err) {
          console.log(`   ❌ Could not fill: ${err.message}`);
        }
      }
      
    } else {
      console.log('❌ #firstname does NOT exist on page after scrolling\n');
      
      // Search for inputs with placeholder or name containing "first"
      console.log('📍 Searching for inputs with "first" in placeholder/name...');
      const firstInputs = page.locator('input[placeholder*="first" i], input[name*="first" i], input[placeholder*="name" i]');
      const firstInputsCount = await firstInputs.count();
      console.log(`   Found ${firstInputsCount} inputs\n`);
      
      if (firstInputsCount > 0) {
        for (let i = 0; i < firstInputsCount; i++) {
          const input = firstInputs.nth(i);
          const id = await input.getAttribute('id');
          const name = await input.getAttribute('name');
          const placeholder = await input.getAttribute('placeholder');
          const visible = await input.isVisible();
          console.log(`      Input #${i + 1}: id="${id}", name="${name}", placeholder="${placeholder}", visible=${visible}`);
        }
      }
      
      // Get ALL input elements
      console.log('\n📍 ALL inputs on entire page:');
      const allInputs = page.locator('input');
      const totalCount = await allInputs.count();
      console.log(`   Total: ${totalCount}\n`);
      
      for (let i = 0; i < Math.min(totalCount, 20); i++) {
        const input = allInputs.nth(i);
        const id = await input.getAttribute('id');
        const name = await input.getAttribute('name');
        const type = await input.getAttribute('type');
        const placeholder = await input.getAttribute('placeholder');
        const visible = await input.isVisible();
        console.log(`      #${i + 1}: id="${id}", name="${name}", type="${type}", placeholder="${placeholder}", visible=${visible}`);
      }
    }
    
    console.log('\n📍 Checking page HTML for "firstname" string...');
    const bodyHtml = await page.content();
    const hasFirstname = bodyHtml.includes('firstname');
    const hasFirstName = bodyHtml.includes('firstName');
    const hasFirstDash = bodyHtml.includes('first-name');
    console.log(`   Contains "firstname": ${hasFirstname}`);
    console.log(`   Contains "firstName": ${hasFirstName}`);
    console.log(`   Contains "first-name": ${hasFirstDash}`);
    
    if (hasFirstname) {
      // Find context around "firstname"
      const index = bodyHtml.indexOf('firstname');
      const context = bodyHtml.substring(Math.max(0, index - 200), index + 200);
      console.log('\n   Context around "firstname":');
      console.log(context);
    }
    
    console.log('\n✅ Investigation complete!');
    console.log('📸 Browser remains open. Press Enter to close...\n');
    
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await browser.close();
    console.log('\n👋 Done.');
  }
}

comprehensiveSearch().catch(console.error);
