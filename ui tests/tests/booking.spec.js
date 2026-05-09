import { test, expect } from '@playwright/test';
import { TestUtils } from '../utils/TestUtils.js';
import { BookingPage } from '../pages/BookingPage.js';

test.describe('Booking Form Tests', () => {
  let utils;
  let bookingPage;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
    bookingPage = new BookingPage(page);
    await utils.navigateToHome();
  });

  test('Should display booking form on page load', async ({ page }) => {
    await utils.log('Verifying booking form visibility');
    await utils.assertElementVisible('#booking', 'Booking section should be visible');
    
    // Additional validation
    const formElement = page.locator('#booking form');
    await expect(formElement).toBeVisible();
  });

  test('Should load homepage with correct URL', async ({ page }) => {
    await utils.log('Validating homepage URL');
    await utils.assertURLContains(/automationintesting.online/);
    
    // Verify page is fully loaded
    const bodyVisible = await page.locator('body').isVisible();
    expect(bodyVisible).toBeTruthy();
  });

  test('Should display all required booking form input fields', async ({ page }) => {
    await utils.log('Checking booking form input fields');
    
    // Wait for booking section
    await utils.waitForElement('#booking');
    
    // Verify required input fields exist
    const requiredFields = ['#firstname', '#lastname', '#email', '#phone'];
    await utils.waitForElements(requiredFields);
    
    // Count all input fields
    const bookingSection = page.locator('#booking');
    await expect(bookingSection).toBeVisible({ timeout: 10000 });
    const inputs = bookingSection.locator('input');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
    
    await utils.log(`Found ${count} input fields in booking form`);
  });

  test('Should validate booking form with test data', async ({ page }) => {
    await utils.log('Testing booking form with generated test data');
    
    // Generate test data
    const testData = utils.generateTestData();
    await utils.log(`Generated test data: ${testData.email}`);
    
    // Scroll to booking section
    await utils.scrollToElement('#booking');
    
    // Fill booking form
    await bookingPage.fillForm(testData);
    
    // Verify data was filled correctly
    const emailValue = await page.inputValue('#email');
    expect(emailValue).toBe(testData.email);
  });

  test('Should show booking form is interactive', async ({ page }) => {
    await utils.log('Testing booking form interactivity');
    
    await utils.waitForElement('#booking');
    
    // Test firstname field interaction
    await utils.safeClick('#firstname');
    await page.fill('#firstname', 'Test');
    const value = await page.inputValue('#firstname');
    expect(value).toBe('Test');
    
    await utils.log('Booking form is interactive and accepts input');
  });
});