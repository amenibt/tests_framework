/**
 * HomePage - Page Object Model for the Home Page
 * Contains locators and methods for interacting with the home page
 */
export class HomePage {
  constructor(page) {
    this.page = page;
    this.baseURL = 'https://automationintesting.online/';
    
    // Locators
    this.locators = {
      rooms: '.room-card',
      bookBtn: 'a.btn-primary',
      checkin: 'input[placeholder="Check in"]',
      checkout: 'input[placeholder="Check out"]',
      searchBtn: 'button:has-text("Check Availability")',
      error: '.error',
      navigation: 'nav',
      footer: 'footer',
      heroSection: 'section.hero',
      contactSection: 'section#contact',
      locationSection: 'section#location',
      bookingSection: '#booking'
    };
  }

  /**
   * Navigate to home page
   */
  async goTo() {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      console.log('Network idle timeout, continuing...');
    });
  }

  /**
   * Click on book button for a specific room
   * @param {number} roomIndex - Index of the room (default: 0)
   */
  async clickBook(roomIndex = 0) {
    const room = this.page.locator(this.locators.rooms).nth(roomIndex);
    await room.locator(this.locators.bookBtn).click();
  }

  /**
   * Search for available rooms with dates
   * @param {string} checkin - Check-in date (YYYY-MM-DD)
   * @param {string} checkout - Check-out date (YYYY-MM-DD)
   */
  async search(checkin, checkout) {
    await this.page.waitForSelector(this.locators.checkin, { timeout: 10000 });
    await this.page.fill(this.locators.checkin, checkin);
    await this.page.fill(this.locators.checkout, checkout);
    await this.page.click(this.locators.searchBtn);
  }

  /**
   * Get all room cards
   * @returns {Locator} Room cards locator
   */
  getRoomCards() {
    return this.page.locator(this.locators.rooms);
  }

  /**
   * Get specific room card
   * @param {number} index - Room index
   * @returns {Locator} Room card locator
   */
  getRoomCard(index) {
    return this.page.locator(this.locators.rooms).nth(index);
  }

  /**
   * Get room count
   * @returns {Promise<number>} Number of rooms
   */
  async getRoomCount() {
    await this.page.waitForSelector(this.locators.rooms, { timeout: 10000 });
    return await this.page.locator(this.locators.rooms).count();
  }

  /**
   * Navigate to section by name
   * @param {string} sectionName - Section name (e.g., 'Rooms', 'Booking')
   */
  async navigateToSection(sectionName) {
    await this.page.click(`text=${sectionName}`);
    await this.page.waitForTimeout(500); // Allow smooth scroll
  }

  /**
   * Check if navigation is visible
   * @returns {Promise<boolean>} Is navigation visible
   */
  async isNavigationVisible() {
    return await this.page.locator(this.locators.navigation).isVisible();
  }

  /**
   * Check if footer is visible
   * @returns {Promise<boolean>} Is footer visible
   */
  async isFooterVisible() {
    return await this.page.locator(this.locators.footer).isVisible();
  }

  /**
   * Get room details by index
   * @param {number} index - Room index
   * @returns {Promise<Object>} Room details
   */
  async getRoomDetails(index = 0) {
    const room = this.getRoomCard(index);
    
    return {
      title: await room.locator('h5').textContent(),
      price: await room.locator('.fw-bold').textContent(),
      description: await room.locator('p').textContent(),
      amenities: await room.locator('.badge').allTextContents(),
      hasBookButton: await room.locator(this.locators.bookBtn).isVisible()
    };
  }

  /**
   * Scroll to booking section
   */
  async scrollToBooking() {
    await this.page.locator(this.locators.bookingSection).scrollIntoViewIfNeeded();
  }

  /**
   * Check if booking section is visible
   * @returns {Promise<boolean>} Is booking section visible
   */
  async isBookingSectionVisible() {
    return await this.page.locator(this.locators.bookingSection).isVisible();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForLoad() {
    await this.page.waitForLoadState('load');
    await this.page.waitForSelector(this.locators.rooms, { timeout: 15000 });
  }
}