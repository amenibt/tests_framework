import { expect } from '@playwright/test';

/**
 * TestUtils - Centralized utility class for common test operations
 * Provides reusable methods for navigation, waiting, assertions, and test data
 */
export class TestUtils {
  constructor(page) {
    this.page = page;
    this.baseURL = 'https://automationintesting.online/';
  }

  // ==================== NAVIGATION HELPERS ====================
  
  /**
   * Navigate to the application home page
   * @param {Object} options - Navigation options
   */
  async navigateToHome(options = {}) {
    await this.page.goto(this.baseURL, { 
      waitUntil: 'domcontentloaded',
      ...options 
    });
    await this.waitForPageLoad();
  }

  /**
   * Navigate to a specific section by clicking navigation link
   * @param {string} sectionName - Name of the section (e.g., 'Rooms', 'Booking')
   */
  async navigateToSection(sectionName) {
    await this.page.click(`text=${sectionName}`);
    await this.waitForPageLoad();
  }

  /**
   * Scroll element into view
   * @param {string} selector - Element selector
   */
  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300); // Allow smooth scroll to complete
  }

  // ==================== WAIT HELPERS ====================

  /**
   * Smart wait for page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      // Fallback if networkidle times out
      console.log('Network idle timeout, continuing...');
    });
  }

  /**
   * Wait for element to be visible with custom timeout
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds (default: 10000)
   */
  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { 
      state: 'visible', 
      timeout 
    });
  }

  /**
   * Wait for multiple elements to be visible
   * @param {Array<string>} selectors - Array of selectors
   */
  async waitForElements(selectors) {
    await Promise.all(
      selectors.map(selector => this.waitForElement(selector))
    );
  }

  /**
   * Wait for element to disappear
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElementToDisappear(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { 
      state: 'hidden', 
      timeout 
    }).catch(() => {
      console.log(`Element ${selector} did not disappear`);
    });
  }

  // ==================== ASSERTION HELPERS ====================

  /**
   * Assert element is visible
   * @param {string} selector - Element selector
   * @param {string} message - Custom error message
   */
  async assertElementVisible(selector, message = '') {
    const element = this.page.locator(selector);
    await expect(element, message || `Element ${selector} should be visible`).toBeVisible();
  }

  /**
   * Assert element has text
   * @param {string} selector - Element selector
   * @param {string|RegExp} expectedText - Expected text or pattern
   */
  async assertElementText(selector, expectedText) {
    const element = this.page.locator(selector);
    await expect(element).toContainText(expectedText);
  }

  /**
   * Assert element count
   * @param {string} selector - Element selector
   * @param {number} expectedCount - Expected count
   */
  async assertElementCount(selector, expectedCount) {
    const elements = this.page.locator(selector);
    await expect(elements).toHaveCount(expectedCount);
  }

  /**
   * Assert element count is greater than
   * @param {string} selector - Element selector
   * @param {number} minCount - Minimum expected count
   */
  async assertElementCountGreaterThan(selector, minCount) {
    const elements = this.page.locator(selector);
    const count = await elements.count();
    expect(count).toBeGreaterThan(minCount);
  }

  /**
   * Assert URL contains text
   * @param {string|RegExp} urlPattern - URL pattern to match
   */
  async assertURLContains(urlPattern) {
    await expect(this.page).toHaveURL(urlPattern);
  }

  /**
   * Assert page title
   * @param {string|RegExp} titlePattern - Title pattern to match
   */
  async assertPageTitle(titlePattern) {
    await expect(this.page).toHaveTitle(titlePattern);
  }

  // ==================== INTERACTION HELPERS ====================

  /**
   * Safe click with wait
   * @param {string} selector - Element selector
   */
  async safeClick(selector) {
    await this.waitForElement(selector);
    await this.page.locator(selector).click();
  }

  /**
   * Fill input field with validation
   * @param {string} selector - Input selector
   * @param {string} value - Value to fill
   */
  async fillInput(selector, value) {
    await this.waitForElement(selector);
    await this.page.fill(selector, value);
    // Verify the value was filled
    const actualValue = await this.page.inputValue(selector);
    expect(actualValue).toBe(value);
  }

  /**
   * Select dropdown option
   * @param {string} selector - Select selector
   * @param {string} value - Option value
   */
  async selectOption(selector, value) {
    await this.waitForElement(selector);
    await this.page.selectOption(selector, value);
  }

  /**
   * Check checkbox if not already checked
   * @param {string} selector - Checkbox selector
   */
  async checkCheckbox(selector) {
    const checkbox = this.page.locator(selector);
    if (!await checkbox.isChecked()) {
      await checkbox.check();
    }
  }

  /**
   * Get element text content
   * @param {string} selector - Element selector
   * @returns {Promise<string>} Text content
   */
  async getElementText(selector) {
    await this.waitForElement(selector);
    return await this.page.locator(selector).textContent();
  }

  /**
   * Get element count
   * @param {string} selector - Element selector
   * @returns {Promise<number>} Element count
   */
  async getElementCount(selector) {
    return await this.page.locator(selector).count();
  }

  // ==================== VIEWPORT HELPERS ====================

  /**
   * Set viewport to mobile size
   * @param {string} device - Device type ('mobile', 'tablet', 'desktop')
   */
  async setViewport(device = 'mobile') {
    const viewports = {
      mobile: { width: 375, height: 667 },
      mobileLandscape: { width: 667, height: 375 },
      tablet: { width: 768, height: 1024 },
      tabletLandscape: { width: 1024, height: 768 },
      desktop: { width: 1920, height: 1080 },
      desktopSmall: { width: 1366, height: 768 }
    };
    await this.page.setViewportSize(viewports[device]);
    await this.page.waitForTimeout(500); // Allow layout to adjust
  }

  // ==================== DATA HELPERS ====================

  /**
   * Generate random test data
   */
  generateTestData() {
    const timestamp = Date.now();
    return {
      firstname: `Test${timestamp}`,
      lastname: `User${timestamp}`,
      email: `test.user${timestamp}@example.com`,
      phone: `555${String(timestamp).slice(-7)}`,
      checkIn: this.getDateString(2),
      checkOut: this.getDateString(5)
    };
  }

  /**
   * Get formatted date string
   * @param {number} daysFromNow - Days from today
   * @returns {string} Formatted date (YYYY-MM-DD)
   */
  getDateString(daysFromNow = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  }

  /**
   * Generate random number within range
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random number
   */
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // ==================== SCREENSHOT & LOGGING ====================

  /**
   * Take screenshot with custom name
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ 
      path: `screenshots/${name}_${timestamp}.png`,
      fullPage: true 
    });
  }

  /**
   * Log test step for better debugging
   * @param {string} message - Log message
   */
  log(message) {
    console.log(`[TEST LOG] ${new Date().toISOString()} - ${message}`);
  }

  // ==================== VALIDATION HELPERS ====================

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Is valid email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone format
   * @param {string} phone - Phone to validate
   * @returns {boolean} Is valid phone
   */
  isValidPhone(phone) {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone.replace(/[^\d]/g, ''));
  }

  // ==================== ROOM HELPERS ====================

  /**
   * Get room card by index
   * @param {number} index - Room card index (0-based)
   * @returns {Locator} Room card locator
   */
  getRoomCard(index = 0) {
    return this.page.locator('.room-card').nth(index);
  }

  /**
   * Get all visible rooms count
   * @returns {Promise<number>} Number of visible rooms
   */
  async getVisibleRoomsCount() {
    await this.waitForElement('.room-card');
    return await this.page.locator('.room-card').count();
  }

  /**
   * Get room details
   * @param {number} roomIndex - Room card index
   * @returns {Promise<Object>} Room details object
   */
  async getRoomDetails(roomIndex = 0) {
    const room = this.getRoomCard(roomIndex);
    return {
      title: await room.locator('h5').textContent(),
      price: await room.locator('.fw-bold').textContent(),
      amenities: await room.locator('.badge').allTextContents()
    };
  }

  // ==================== FORM HELPERS ====================

  /**
   * Fill complete booking form
   * @param {Object} data - Booking data object
   */
  async fillBookingForm(data) {
    const fields = {
      firstname: '#firstname',
      lastname: '#lastname',
      email: '#email',
      phone: '#phone'
    };

    for (const [key, selector] of Object.entries(fields)) {
      if (data[key]) {
        await this.fillInput(selector, data[key]);
      }
    }
  }

  /**
   * Check if form has validation errors
   * @returns {Promise<boolean>} Has errors
   */
  async hasFormErrors() {
    const errorSelectors = ['.error', '.alert-danger', '[role="alert"]'];
    for (const selector of errorSelectors) {
      const count = await this.page.locator(selector).count();
      if (count > 0) return true;
    }
    return false;
  }

  // ==================== API HELPERS ====================

  /**
   * Wait for API response
   * @param {string} urlPattern - URL pattern to match
   * @returns {Promise<Response>} Response object
   */
  async waitForAPIResponse(urlPattern) {
    return await this.page.waitForResponse(
      response => response.url().includes(urlPattern) && response.status() === 200
    );
  }

  /**
   * Intercept and mock API call
   * @param {string} urlPattern - URL pattern to intercept
   * @param {Object} mockData - Mock response data
   */
  async mockAPICall(urlPattern, mockData) {
    await this.page.route(urlPattern, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData)
      });
    });
  }

  // ==================== BROWSER HELPERS ====================

  /**
   * Clear browser storage
   */
  async clearStorage() {
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  /**
   * Reload page and wait for load
   */
  async reloadPage() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }

  /**
   * Get page performance metrics
   * @returns {Promise<Object>} Performance metrics
   */
  async getPerformanceMetrics() {
    return await this.page.evaluate(() => {
      const perfData = window.performance.timing;
      return {
        loadTime: perfData.loadEventEnd - perfData.navigationStart,
        domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        responseTime: perfData.responseEnd - perfData.requestStart
      };
    });
  }
}
