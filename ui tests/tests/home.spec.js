import { test, expect } from '@playwright/test';
import { TestUtils } from '../utils/TestUtils.js';
import { HomePage } from '../pages/HomePage.js';

test.describe('Home Page Tests', () => {
  let utils;
  let homePage;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
    homePage = new HomePage(page);
    await utils.navigateToHome();
  });

  test('Should load home page successfully', async ({ page }) => {
    await utils.log('Verifying home page loads correctly');
    await utils.assertURLContains(/automationintesting.online/);
    
    // Verify page title or main heading
    const isLoaded = await page.locator('body').isVisible();
    expect(isLoaded).toBeTruthy();
    
    await utils.log('Home page loaded successfully');
  });

  test('Should display room cards on page', async ({ page }) => {
    await utils.log('Checking room cards visibility');
    
    // Wait for rooms to load
    await utils.waitForElement('.room-card');
    await utils.assertElementVisible('.room-card', 'At least one room card should be visible');
    
    // Get room count
    const roomCount = await utils.getVisibleRoomsCount();
    await utils.log(`Found ${roomCount} room cards on the page`);
    expect(roomCount).toBeGreaterThan(0);
  });

  test('Should display navigation menu', async ({ page }) => {
    await utils.log('Verifying navigation menu visibility');
    await utils.assertElementVisible('nav', 'Navigation menu should be visible');
    
    // Check for common navigation links
    const nav = page.locator('nav');
    const isVisible = await nav.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('Should display footer with content', async ({ page }) => {
    await utils.log('Checking footer visibility and content');
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Verify footer has some content
    const footerText = await footer.textContent();
    expect(footerText?.length).toBeGreaterThan(0);
    
    await utils.log('Footer is visible with content');
  });

  test('Should display multiple page sections', async ({ page }) => {
    await utils.log('Verifying multiple sections are present');
    
    // Check for key sections
    const sections = ['nav', '.room-card', 'footer'];
    await utils.waitForElements(sections);
    
    for (const section of sections) {
      await utils.assertElementVisible(section);
    }
    
    await utils.log('All key sections are visible');
  });

  test('Should have clickable room book buttons', async ({ page }) => {
    await utils.log('Testing room booking buttons');
    
    await utils.waitForElement('.room-card');
    const firstRoom = utils.getRoomCard(0);
    const bookBtn = firstRoom.locator('a.btn-primary');
    
    await expect(bookBtn).toBeVisible();
    await expect(bookBtn).toBeEnabled();
    
    await utils.log('Room booking buttons are clickable');
  });
});