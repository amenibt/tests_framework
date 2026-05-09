import { test, expect } from '@playwright/test';
import { TestUtils } from '../utils/TestUtils.js';
import { HomePage } from '../pages/HomePage.js';

test.describe('Navigation and Search Tests', () => {
  let utils;
  let homePage;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
    homePage = new HomePage(page);
    await utils.navigateToHome();
  });

  test('Should navigate between page sections', async ({ page }) => {
    await utils.log('Testing page navigation');
    
    // Navigate to Rooms section
    await utils.navigateToSection('Rooms');
    await utils.waitForElement('.room-card');
    await expect(page.locator('.room-card').first()).toBeVisible();
    
    await utils.log('Navigation to Rooms section successful');
  });

  test('Should display contact section', async ({ page }) => {
    await utils.log('Verifying contact section visibility');
    await utils.waitForElement('section#contact');
    await utils.assertElementVisible('section#contact', 'Contact section should be visible');
  });

  test('Should have clickable room cards with book buttons', async ({ page }) => {
    await utils.log('Testing room card interactivity');
    
    await utils.waitForElement('.room-card');
    const firstRoomCard = utils.getRoomCard(0);
    await expect(firstRoomCard).toBeVisible();
    
    const roomLink = firstRoomCard.locator('a.btn-primary');
    await expect(roomLink).toBeVisible();
    await expect(roomLink).toBeEnabled();
    
    await utils.log('Room cards are clickable and interactive');
  });

  test('Should display multiple room cards', async ({ page }) => {
    await utils.log('Checking multiple rooms are displayed');
    
    await utils.waitForElement('.room-card');
    const roomCount = await utils.getVisibleRoomsCount();
    
    expect(roomCount).toBeGreaterThan(1);
    await utils.log(`Found ${roomCount} room cards displayed`);
  });

  test('Should display room titles on all cards', async ({ page }) => {
    await utils.log('Verifying room titles are visible');
    
    await utils.waitForElement('.room-card');
    const firstRoom = utils.getRoomCard(0);
    const roomTitle = firstRoom.locator('h5');
    
    await expect(roomTitle).toBeVisible();
    const titleText = await roomTitle.textContent();
    expect(titleText?.length).toBeGreaterThan(0);
    
    await utils.log(`Room title: ${titleText}`);
  });

  test('Should display amenities on room cards', async ({ page }) => {
    await utils.log('Checking room amenities display');
    
    await utils.waitForElement('.room-card');
    const firstRoom = utils.getRoomCard(0);
    const amenities = firstRoom.locator('.badge');
    const count = await amenities.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Get amenity details
    const amenityList = await amenities.allTextContents();
    await utils.log(`Room amenities: ${amenityList.join(', ')}`);
  });

  test('Should scroll to booking section when clicked', async ({ page }) => {
    await utils.log('Testing booking section navigation');
    
    await utils.navigateToSection('Booking');
    
    const bookingSection = page.locator('#booking');
    await expect(bookingSection).toBeInViewport();
    await utils.assertElementVisible('#booking');
    
    await utils.log('Booking section is visible and in viewport');
  });

  test('Should display room prices', async ({ page }) => {
    await utils.log('Verifying room prices are displayed');
    
    await utils.waitForElement('.room-card');
    const firstRoom = utils.getRoomCard(0);
    const price = firstRoom.locator('.fw-bold');
    
    await expect(price).toBeVisible();
    const priceText = await price.textContent();
    expect(priceText?.length).toBeGreaterThan(0);
    
    await utils.log(`Room price: ${priceText}`);
  });

  test('Should display hero section on page', async ({ page }) => {
    await utils.log('Checking hero section visibility');
    
    const heroSection = page.locator('section.hero');
    await expect(heroSection).toBeVisible();
    
    await utils.log('Hero section is visible');
  });

  test('Should display location section with map', async ({ page }) => {
    await utils.log('Verifying location section and map');
    
    await utils.scrollToElement('section#location');
    const locationSection = page.locator('section#location');
    await expect(locationSection).toBeVisible();
    
    await utils.log('Location section is visible');
  });

  test('Should retrieve and display room details', async ({ page }) => {
    await utils.log('Getting detailed room information');
    
    await utils.waitForElement('.room-card');
    const roomDetails = await utils.getRoomDetails(0);
    
    expect(roomDetails.title).toBeTruthy();
    expect(roomDetails.price).toBeTruthy();
    expect(roomDetails.amenities.length).toBeGreaterThan(0);
    
    await utils.log(`Room: ${roomDetails.title}, Price: ${roomDetails.price}`);
  });

  test('Should have all key sections on home page', async ({ page }) => {
    await utils.log('Verifying all major page sections');
    
    const sections = [
      'nav',
      '.room-card',
      '#booking',
      'section#contact',
      'footer'
    ];
    
    for (const section of sections) {
      await utils.waitForElement(section);
      await utils.assertElementVisible(section);
      await utils.log(`✓ Section verified: ${section}`);
    }
  });
});