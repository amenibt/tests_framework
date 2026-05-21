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
    
    // Verify required input fields exist in the booking form
    // The booking form has: date pickers, email, and phone
    const requiredFields = ['#email', '#phone'];
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
    
    // Fill only the fields that exist (email and phone)
    await page.waitForSelector('#email', { timeout: 10000 });
    await page.fill('#email', testData.email);
    await page.fill('#phone', testData.phone);
    
    // Verify data was filled correctly
    const emailValue = await page.inputValue('#email');
    expect(emailValue).toBe(testData.email);
    const phoneValue = await page.inputValue('#phone');
    expect(phoneValue).toBe(testData.phone);
  });

  test('Should show booking form is interactive', async ({ page }) => {
    await utils.log('Testing booking form interactivity');
    
    await utils.waitForElement('#booking');
    
    // Test email field interaction (actual field that exists)
    await utils.waitForElement('#email');
    await utils.safeClick('#email');
    await page.fill('#email', 'test@example.com');
    const emailValue = await page.inputValue('#email');
    expect(emailValue).toBe('test@example.com');
    
    // Test phone field interaction
    await utils.waitForElement('#phone');
    await page.fill('#phone', '1234567890');
    const phoneValue = await page.inputValue('#phone');
    expect(phoneValue).toBe('1234567890');
    
    await utils.log('Booking form is interactive and accepts input');
  });
});