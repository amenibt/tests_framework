import { test, expect } from '@playwright/test';

/**
 * Smoke Tests - Quick validation that basic features work
 * Run these first to ensure the application is accessible
 */
test.describe('Smoke Tests', () => {

  test('Application loads successfully', async ({ page }) => {
    await page.goto('https://automationintesting.online/');
    await page.waitForLoadState('domcontentloaded');
    
    // Verify page loaded
    await expect(page).toHaveURL(/automationintesting.online/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Navigation bar is present', async ({ page }) => {
    await page.goto('https://automationintesting.online/');
    await page.waitForSelector('nav', { timeout: 15000 });
    
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('Room cards are displayed', async ({ page }) => {
    await page.goto('https://automationintesting.online/');
    await page.waitForSelector('.room-card', { timeout: 15000 });
    
    const roomCards = page.locator('.room-card');
    const count = await roomCards.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('Booking form is present', async ({ page }) => {
    await page.goto('https://automationintesting.online/');
    await page.waitForSelector('#booking', { timeout: 15000 });
    
    const bookingSection = page.locator('#booking');
    await expect(bookingSection).toBeVisible();
  });

  test('Basic form inputs are functional', async ({ page }) => {
    await page.goto('https://automationintesting.online/');
    
    // Wait for booking section
    await page.waitForSelector('#booking', { timeout: 10000 });
    
    // Wait for email field (actual field that exists)
    await page.waitForSelector('#email', { timeout: 10000 });
    
    // Try filling email
    await page.fill('#email', 'test@example.com');
    const emailValue = await page.inputValue('#email');
    expect(emailValue).toBe('test@example.com');
    
    // Try filling phone
    await page.fill('#phone', '1234567890');
    const phoneValue = await page.inputValue('#phone');
    expect(phoneValue).toBe('1234567890');
  });
});
