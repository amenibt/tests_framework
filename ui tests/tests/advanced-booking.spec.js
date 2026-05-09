import { test, expect } from '../fixtures/fixtures.js';
import { testData, generateRandomBooking } from '../data/testData.js';

/**
 * Advanced Booking Flow Tests
 * Demonstrates comprehensive test scenarios using utilities and fixtures
 */
test.describe('Advanced Booking Flow', () => {

  test('Should complete full booking flow with generated data', async ({ page, utils, homePage, bookingPage }) => {
    await utils.log('Starting complete booking flow test');
    
    // Navigate to home
    await homePage.goTo();
    await utils.waitForPageLoad();
    
    // Verify page loaded
    await utils.assertElementVisible(testData.selectors.roomCard);
    
    // Get room details
    const roomDetails = await utils.getRoomDetails(0);
    await utils.log(`Selected room: ${roomDetails.title} - ${roomDetails.price}`);
    
    // Scroll to booking section
    await bookingPage.scrollToBooking();
    await bookingPage.waitForForm();
    
    // Generate and fill booking data
    const bookingData = generateRandomBooking(2, 5);
    await utils.log(`Booking for: ${bookingData.email}`);
    
    await bookingPage.fillForm(bookingData);
    
    // Verify form was filled
    const formValues = await bookingPage.getFormValues();
    expect(formValues.email).toBe(bookingData.email);
    expect(formValues.firstname).toBe(bookingData.firstname);
    
    await utils.log('Booking form filled successfully');
  });

  test('Should handle multiple user bookings', async ({ page, utils, bookingPage }) => {
    await utils.navigateToHome();
    
    // Test with multiple users from test data
    for (const user of testData.validUsers) {
      await utils.log(`Testing booking for: ${user.email}`);
      
      await bookingPage.scrollToBooking();
      await bookingPage.clearForm();
      await bookingPage.fillForm(user);
      
      // Verify each field
      const filledEmail = await bookingPage.getFieldValue('email');
      expect(filledEmail).toBe(user.email);
      
      await utils.log(`✓ User ${user.firstname} ${user.lastname} validated`);
    }
  });

  test('Should validate form with different date ranges', async ({ page, utils, bookingPage }) => {
    await utils.navigateToHome();
    await bookingPage.scrollToBooking();
    
    const dateScenarios = Object.entries(testData.dateRanges);
    
    for (const [scenario, dates] of dateScenarios) {
      await utils.log(`Testing ${scenario}: ${dates.checkin} to ${dates.checkout}`);
      
      const bookingData = {
        ...testData.validBooking,
        ...dates
      };
      
      await bookingPage.fillFormWithDates(bookingData);
      
      await utils.log(`✓ ${scenario} dates validated`);
    }
  });

  test('Should test booking form across different viewports', async ({ page, utils, bookingPage }) => {
    const viewportTests = ['mobile', 'tablet', 'desktop'];
    
    for (const viewport of viewportTests) {
      await utils.log(`Testing booking form on ${viewport}`);
      
      await utils.setViewport(viewport);
      await utils.navigateToHome();
      
      // Verify booking section is visible on all viewports
      await utils.assertElementVisible(testData.selectors.bookingSection);
      
      // Try filling form
      await bookingPage.scrollToBooking();
      const testUser = generateRandomBooking();
      await bookingPage.fillForm(testUser);
      
      // Verify form is functional
      const isFilled = await bookingPage.validateFieldsFilled(['firstname', 'lastname', 'email', 'phone']);
      expect(isFilled).toBeTruthy();
      
      await utils.log(`✓ Booking form functional on ${viewport}`);
    }
  });

  test('Should verify room selection and booking integration', async ({ page, utils, homePage, bookingPage }) => {
    await utils.log('Testing room selection to booking flow');
    
    await homePage.goTo();
    await utils.waitForElement(testData.selectors.roomCard);
    
    // Get available rooms count
    const roomCount = await homePage.getRoomCount();
    await utils.log(`Available rooms: ${roomCount}`);
    expect(roomCount).toBeGreaterThan(0);
    
    // Test selecting different rooms
    for (let i = 0; i < Math.min(roomCount, 3); i++) {
      const roomDetails = await homePage.getRoomDetails(i);
      await utils.log(`Room ${i + 1}: ${roomDetails.title} - ${roomDetails.price}`);
      
      // Verify room has all expected details
      expect(roomDetails.title).toBeTruthy();
      expect(roomDetails.price).toBeTruthy();
      expect(roomDetails.amenities.length).toBeGreaterThan(0);
    }
    
    // Proceed with booking
    await bookingPage.scrollToBooking();
    const bookingData = generateRandomBooking();
    await bookingPage.fillForm(bookingData);
    
    await utils.log('Room selection and booking flow completed');
  });

  test('Should measure and validate page performance', async ({ page, utils }) => {
    await utils.log('Measuring page performance');
    
    await utils.navigateToHome();
    const metrics = await utils.getPerformanceMetrics();
    
    await utils.log(`Performance Metrics:`);
    await utils.log(`- Load Time: ${metrics.loadTime}ms`);
    await utils.log(`- DOM Ready: ${metrics.domReady}ms`);
    await utils.log(`- Response Time: ${metrics.responseTime}ms`);
    
    // Performance assertions
    expect(metrics.loadTime).toBeLessThan(testData.timeouts.veryLong);
    expect(metrics.domReady).toBeLessThan(testData.timeouts.long);
    
    await utils.log('Performance metrics within acceptable range');
  });

  test('Should verify all page sections are accessible', async ({ page, utils, homePage }) => {
    await utils.log('Testing all page sections accessibility');
    
    await homePage.goTo();
    await utils.waitForPageLoad();
    
    const sections = [
      { name: 'Navigation', selector: testData.selectors.navigation },
      { name: 'Rooms', selector: testData.selectors.roomCard },
      { name: 'Booking', selector: testData.selectors.bookingSection },
      { name: 'Contact', selector: testData.selectors.contactSection },
      { name: 'Footer', selector: testData.selectors.footer }
    ];
    
    for (const section of sections) {
      await utils.scrollToElement(section.selector);
      await utils.assertElementVisible(section.selector);
      await utils.log(`✓ ${section.name} section accessible`);
    }
    
    await utils.log('All page sections are accessible');
  });

  test('Should validate booking form input validation', async ({ page, utils, bookingPage }) => {
    await utils.navigateToHome();
    await bookingPage.scrollToBooking();
    await bookingPage.waitForForm();
    
    // Test with valid email
    const validData = testData.validBooking;
    await bookingPage.fillField('email', validData.email);
    const emailValue = await bookingPage.getFieldValue('email');
    expect(utils.isValidEmail(emailValue)).toBeTruthy();
    
    // Test with valid phone
    await bookingPage.fillField('phone', validData.phone);
    const phoneValue = await bookingPage.getFieldValue('phone');
    expect(utils.isValidPhone(phoneValue)).toBeTruthy();
    
    await utils.log('Input validation checks passed');
  });

  test('Should handle form clear and refill', async ({ page, utils, bookingPage }) => {
    await utils.navigateToHome();
    await bookingPage.scrollToBooking();
    
    // Fill form first time
    const firstBooking = generateRandomBooking();
    await bookingPage.fillForm(firstBooking);
    
    // Verify filled
    let formValues = await bookingPage.getFormValues();
    expect(formValues.email).toBe(firstBooking.email);
    
    // Clear form
    await bookingPage.clearForm();
    
    // Fill with new data
    const secondBooking = generateRandomBooking();
    await bookingPage.fillForm(secondBooking);
    
    // Verify new data
    formValues = await bookingPage.getFormValues();
    expect(formValues.email).toBe(secondBooking.email);
    expect(formValues.email).not.toBe(firstBooking.email);
    
    await utils.log('Form clear and refill successful');
  });
});
