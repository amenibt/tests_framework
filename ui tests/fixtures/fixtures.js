import { test as base } from '@playwright/test';
import { TestUtils } from '../utils/TestUtils.js';
import { HomePage } from '../pages/HomePage.js';
import { BookingPage } from '../pages/BookingPage.js';

/**
 * Custom fixtures for tests
 * Provides reusable setup for page objects and utilities
 */
export const test = base.extend({
  /**
   * TestUtils fixture
   * Provides utility methods for all tests
   */
  utils: async ({ page }, use) => {
    const utils = new TestUtils(page);
    await use(utils);
  },

  /**
   * HomePage fixture
   * Provides home page object for all tests
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  /**
   * BookingPage fixture
   * Provides booking page object for all tests
   */
  bookingPage: async ({ page }, use) => {
    const bookingPage = new BookingPage(page);
    await use(bookingPage);
  },

  /**
   * Auto-navigate to home page fixture
   * Automatically navigates to home page before each test
   */
  autoNavigate: async ({ page }, use) => {
    const utils = new TestUtils(page);
    await utils.navigateToHome();
    await use();
  }
});

export { expect } from '@playwright/test';
