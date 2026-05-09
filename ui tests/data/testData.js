/**
 * Test Data Configuration
 * Contains test data for various test scenarios
 */

export const testData = {
  // Valid booking data
  validBooking: {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890'
  },

  // Multiple valid users
  validUsers: [
    {
      firstname: 'Alice',
      lastname: 'Smith',
      email: 'alice.smith@example.com',
      phone: '5551234567'
    },
    {
      firstname: 'Bob',
      lastname: 'Johnson',
      email: 'bob.johnson@example.com',
      phone: '5559876543'
    },
    {
      firstname: 'Carol',
      lastname: 'Williams',
      email: 'carol.williams@example.com',
      phone: '5555551234'
    }
  ],

  // Invalid email formats
  invalidEmails: [
    'invalid.email',
    '@example.com',
    'user@',
    'user @example.com',
    'user@.com'
  ],

  // Invalid phone formats
  invalidPhones: [
    '123',
    'abc123',
    '123-456',
    '+1 (234)',
    ''
  ],

  // Empty fields
  emptyData: {
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  },

  // Partial data
  partialData: {
    firstname: 'Jane',
    lastname: 'Doe',
    email: '',
    phone: ''
  },

  // Special characters
  specialCharacters: {
    firstname: 'Test@#$',
    lastname: 'User!@#',
    email: 'test.user@example.com',
    phone: '1234567890'
  },

  // Long strings
  longStrings: {
    firstname: 'A'.repeat(100),
    lastname: 'B'.repeat(100),
    email: 'test@example.com',
    phone: '1234567890'
  },

  // Date ranges for booking
  dateRanges: {
    shortStay: {
      checkin: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      checkout: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    weekStay: {
      checkin: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      checkout: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    longStay: {
      checkin: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      checkout: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  },

  // Viewport configurations
  viewports: {
    mobile: { width: 375, height: 667 },
    mobileLandscape: { width: 667, height: 375 },
    tablet: { width: 768, height: 1024 },
    tabletLandscape: { width: 1024, height: 768 },
    desktop: { width: 1920, height: 1080 },
    desktopSmall: { width: 1366, height: 768 }
  },

  // Expected UI elements
  expectedElements: {
    navigation: ['nav', 'a', 'button'],
    rooms: ['.room-card', 'h5', '.fw-bold', '.badge'],
    booking: ['#booking', '#firstname', '#lastname', '#email', '#phone'],
    footer: ['footer', 'p', 'a']
  },

  // URLs
  urls: {
    home: 'https://automationintesting.online/',
    baseAPI: 'https://automationintesting.online/api'
  },

  // Timeouts (in milliseconds)
  timeouts: {
    short: 2000,
    medium: 5000,
    long: 10000,
    veryLong: 30000
  },

  // Common selectors
  selectors: {
    roomCard: '.room-card',
    bookButton: 'a.btn-primary',
    navigation: 'nav',
    footer: 'footer',
    bookingSection: '#booking',
    contactSection: 'section#contact',
    locationSection: 'section#location'
  }
};

/**
 * Generate random user data
 * @returns {Object} Random user data
 */
export function generateRandomUser() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  
  return {
    firstname: `TestUser${randomNum}`,
    lastname: `Automated${randomNum}`,
    email: `test.user${timestamp}@testmail.com`,
    phone: `555${String(timestamp).slice(-7)}`
  };
}

/**
 * Generate random booking with dates
 * @param {number} checkinDays - Days from now for check-in
 * @param {number} stayDays - Number of days to stay
 * @returns {Object} Complete booking data
 */
export function generateRandomBooking(checkinDays = 2, stayDays = 3) {
  const user = generateRandomUser();
  const checkinDate = new Date(Date.now() + checkinDays * 24 * 60 * 60 * 1000);
  const checkoutDate = new Date(checkinDate.getTime() + stayDays * 24 * 60 * 60 * 1000);
  
  return {
    ...user,
    checkin: checkinDate.toISOString().split('T')[0],
    checkout: checkoutDate.toISOString().split('T')[0]
  };
}

/**
 * Get date string for booking
 * @param {number} daysFromNow - Days from today
 * @returns {string} Formatted date (YYYY-MM-DD)
 */
export function getDateString(daysFromNow = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}
