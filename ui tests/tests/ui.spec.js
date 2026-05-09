import { test, expect } from '@playwright/test';
import { TestUtils } from '../utils/TestUtils.js';

test.describe('UI and Responsiveness Tests', () => {
  let utils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
    await utils.navigateToHome();
  });

  test('Should be responsive on mobile viewport', async ({ page }) => {
    await utils.log('Testing mobile responsiveness');
    
    await utils.setViewport('mobile');
    await expect(page.locator('body')).toBeVisible();
    
    // Verify key elements are still visible on mobile
    await utils.assertElementVisible('nav');
    
    await utils.log('Mobile viewport renders correctly');
  });

  test('Should be responsive on mobile landscape', async ({ page }) => {
    await utils.log('Testing mobile landscape responsiveness');
    
    await utils.setViewport('mobileLandscape');
    await expect(page.locator('body')).toBeVisible();
    await utils.assertElementVisible('nav');
    
    await utils.log('Mobile landscape viewport renders correctly');
  });

  test('Should be responsive on tablet viewport', async ({ page }) => {
    await utils.log('Testing tablet responsiveness');
    
    await utils.setViewport('tablet');
    await expect(page.locator('body')).toBeVisible();
    
    // Verify layout adapts to tablet size
    await utils.waitForElement('.room-card');
    const roomCount = await utils.getVisibleRoomsCount();
    expect(roomCount).toBeGreaterThan(0);
    
    await utils.log(`Tablet viewport shows ${roomCount} rooms`);
  });

  test('Should display navigation menu across viewports', async ({ page }) => {
    await utils.log('Testing navigation visibility across viewports');
    
    const viewports = ['mobile', 'tablet', 'desktop'];
    
    for (const viewport of viewports) {
      await utils.setViewport(viewport);
      await utils.assertElementVisible('nav', `Navigation should be visible on ${viewport}`);
      await utils.log(`✓ Navigation visible on ${viewport}`);
    }
  });

  test('Should handle page reload without errors', async ({ page }) => {
    await utils.log('Testing page reload stability');
    
    // Initial load verification
    await utils.waitForElement('body');
    
    // Reload page
    await utils.reloadPage();
    
    // Verify page is still functional after reload
    await expect(page.locator('body')).toBeVisible();
    await utils.assertElementVisible('nav');
    await utils.waitForElement('.room-card');
    
    await utils.log('Page reload completed successfully');
  });

  test('Should handle multiple page reloads', async ({ page }) => {
    await utils.log('Testing multiple page reloads');
    
    for (let i = 1; i <= 3; i++) {
      await utils.reloadPage();
      await expect(page.locator('body')).toBeVisible();
      await utils.log(`Reload ${i}/3 successful`);
    }
    
    await utils.log('Multiple reloads handled successfully');
  });

  test('Should maintain layout integrity on desktop', async ({ page }) => {
    await utils.log('Testing desktop layout integrity');
    
    await utils.setViewport('desktop');
    
    // Verify all key sections are visible
    const sections = ['nav', '.room-card', '#booking', 'footer'];
    await utils.waitForElements(sections);
    
    for (const section of sections) {
      await utils.assertElementVisible(section);
    }
    
    await utils.log('Desktop layout is intact');
  });

  test('Should have consistent UI after navigation and reload', async ({ page }) => {
    await utils.log('Testing UI consistency after navigation and reload');
    
    // Navigate to section
    await utils.navigateToSection('Rooms');
    await utils.waitForElement('.room-card');
    
    // Get room count before reload
    const countBefore = await utils.getVisibleRoomsCount();
    
    // Reload page
    await utils.reloadPage();
    await utils.waitForElement('.room-card');
    
    // Get room count after reload
    const countAfter = await utils.getVisibleRoomsCount();
    
    // Verify consistency
    expect(countAfter).toBe(countBefore);
    await utils.log(`Room count consistent: ${countBefore} = ${countAfter}`);
  });

  test('Should measure page load performance', async ({ page }) => {
    await utils.log('Measuring page performance');
    
    await utils.reloadPage();
    const metrics = await utils.getPerformanceMetrics();
    
    await utils.log(`Load time: ${metrics.loadTime}ms`);
    await utils.log(`DOM ready: ${metrics.domReady}ms`);
    await utils.log(`Response time: ${metrics.responseTime}ms`);
    
    // Basic performance assertions
    expect(metrics.loadTime).toBeGreaterThan(0);
    expect(metrics.loadTime).toBeLessThan(30000); // Should load within 30s
  });

  test('Should verify responsive room grid layout', async ({ page }) => {
    await utils.log('Testing room grid responsiveness');
    
    const viewports = ['mobile', 'tablet', 'desktop'];
    
    for (const viewport of viewports) {
      await utils.setViewport(viewport);
      await utils.waitForElement('.room-card');
      const count = await utils.getVisibleRoomsCount();
      expect(count).toBeGreaterThan(0);
      await utils.log(`${viewport}: ${count} rooms visible`);
    }
  });
});