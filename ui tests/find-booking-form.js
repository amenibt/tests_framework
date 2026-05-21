import { chromium } from 'playwright';

/**
 * Diagnostic - Find where the booking form really is
 */
async function findBookingForm() {
  console.log('🔍 Searching for the actual booking form...\n');
  
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
    
    // Check if there are room cards with Book buttons
    console.log('📍 Looking for room cards and Book buttons...');
    const roomCards = page.locator('.room-card, .card, [class*="room"]');
    const roomCount = await roomCards.count();
    console.log(`   Found ${roomCount} potential room elements\n`);
    
    // Look for "Book" buttons
    const bookButtons = page.locator('button:has-text("Book")');
    const bookButtonCount = await bookButtons.count();
    console.log(`   Found ${bookButtonCount} "Book" buttons\n`);
    
    if (bookButtonCount > 0) {
      console.log('📍 Clicking first "Book" button...');
      await bookButtons.first().scrollIntoViewIfNeeded();
      await bookButtons.first().click();
      console.log('✅ Clicked!\n');
      
      console.log('⏳ Waiting 3 seconds for form/modal...');
      await page.waitForTimeout(3000);
      
      // Now look for firstname field ANYWHERE on the page
      console.log('\n📍 Searching for #firstname ANYWHERE on page...');
      const firstname = page.locator('#firstname');
      const firstnameCount = await firstname.count();
      
      if (firstnameCount > 0) {
        console.log(`✅ FOUND #firstname! (count: ${firstnameCount})`);
        const visible = await firstname.isVisible();
        console.log(`   Visible: ${visible}`);
        
        // Get parent elements to understand context
        const parent1 = await firstname.locator('..').first().getAttribute('class').catch(() => 'unknown');
        console.log(`   Parent class: ${parent1}`);
        
      } else {
        console.log('❌ Still no #firstname field\n');
        
        // Look for modal or popup
        console.log('📍 Checking for modals/popups...');
        const modal = page.locator('.modal, [role="dialog"], .popup, .booking-modal');
        const modalCount = await modal.count();
        console.log(`   Modals found: ${modalCount}`);
        
        if (modalCount > 0) {
          console.log('\n   📋 Modal content (first 1000 chars):');
          const modalHtml = await modal.first().innerHTML().catch(() => 'Unable to get');
          console.log(modalHtml.substring(0, 1000));
        }
        
        // List ALL input fields on entire page
        console.log('\n📍 ALL input fields on page:');
        const allInputs = page.locator('input');
        const allInputCount = await allInputs.count();
        console.log(`   Total inputs: ${allInputCount}\n`);
        
        for (let i = 0; i < Math.min(allInputCount, 15); i++) {
          const input = allInputs.nth(i);
          const id = await input.getAttribute('id').catch(() => 'none');
          const name = await input.getAttribute('name').catch(() => 'none');
          const placeholder = await input.getAttribute('placeholder').catch(() => 'none');
          const visible = await input.isVisible().catch(() => false);
          console.log(`      Input #${i + 1}: id="${id}", name="${name}", placeholder="${placeholder}", visible=${visible}`);
        }
      }
      
    } else {
      console.log('❌ No "Book" buttons found\n');
      
      // Maybe the form is already visible somewhere?
      console.log('📍 Checking if #firstname exists without clicking anything...');
      const firstname = page.locator('#firstname');
      const exists = await firstname.count() > 0;
      
      if (exists) {
        console.log('✅ #firstname EXISTS on initial page load!');
        const visible = await firstname.isVisible();
        console.log(`   Visible: ${visible}`);
        
        if (!visible) {
          console.log('   Trying to scroll to it...');
          await firstname.scrollIntoViewIfNeeded().catch(() => console.log('   Could not scroll'));
          await page.waitForTimeout(1000);
          const visibleNow = await firstname.isVisible();
          console.log(`   Visible after scroll: ${visibleNow}`);
        }
      } else {
        console.log('❌ #firstname does not exist on initial load');
      }
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

findBookingForm().catch(console.error);
