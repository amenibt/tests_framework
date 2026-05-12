# UI Tests - Playwright Test Suite

Comprehensive UI test suite for the Orange Web App using Playwright with utilities, page objects, fixtures, and **Allure Reports**.

## 📁 Project Structure

```
ui tests/
├── tests/                      # Test specification files
│   ├── smoke.spec.js           # Quick validation tests
│   ├── booking.spec.js         # Booking form tests
│   ├── home.spec.js            # Home page tests
│   ├── search.spec.js          # Navigation and search tests
│   ├── ui.spec.js              # UI and responsiveness tests
│   └── advanced-booking.spec.js # Advanced booking flow tests
├── pages/                      # Page Object Models
│   ├── HomePage.js             # Home page POM
│   └── BookingPage.js          # Booking page POM
├── utils/                      # Utility classes
│   └── TestUtils.js            # Centralized test utilities
├── data/                       # Test data
│   └── testData.js             # Test data configuration
├── fixtures/                   # Playwright fixtures
│   └── fixtures.js             # Custom test fixtures
├── allure-results/             # Allure test results (generated)
├── allure-report/              # Allure HTML report (generated)
├── package.json                # Dependencies
└── playwright.config.js        # Playwright configuration
```

## 🚀 Getting Started

### Installation

```bash
cd "ui tests"
npm install
npx playwright install chromium
```

### Install Allure (Required for Allure Reports)

#### Windows (via Scoop)
```bash
scoop install allure
```

#### Windows (via Chocolatey)
```bash
choco install allure
```

#### macOS
```bash
brew install allure
```

#### Linux
```bash
# Download from https://github.com/allure-framework/allure2/releases
# Extract and add to PATH
```

### Verify Allure Installation
```bash
allure --version
```

### Running Tests

```bash
# Run all tests
npm test

# Run smoke tests (quick validation - ~1 min)
npm run test:smoke

# Run specific test suites
npm run test:home      # Home page tests only
npm run test:booking   # Booking form tests only

# Run tests with visible browser
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run specific test file
npx playwright test tests/booking.spec.js

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests with debugging
npx playwright test --debug
npm run test:debug

# Run tests with trace
npx playwright test --trace on
```

### 📊 Viewing Reports

#### Playwright HTML Report
```bash
npm run test:report
# or
npx playwright show-report
```

#### 🎯 Allure Report (Recommended)

Allure provides rich, interactive HTML reports with:
- ✅ Test execution timeline
- 📊 Graphs and statistics
- 📸 Screenshots and videos on failure
- 🔍 Detailed test steps and logs
- 📈 Trend analysis across runs
- 🏷️ Categories and severity levels

**Generate and open Allure report:**
```bash
# Run tests then generate report
npm test
npm run test:allure

# Or step by step:
npm test                          # Run tests
npm run test:allure:generate      # Generate report
npm run test:allure:open          # Open report in browser
```

**View previous report:**
```bash
npm run test:allure:open
```

**Clean all reports:**
```bash
npm run test:clean
```

## 🛠️ Core Components

### TestUtils Class

Centralized utility class providing common test operations:

#### Navigation Methods
- `navigateToHome()` - Navigate to application home
- `navigateToSection(sectionName)` - Navigate to specific section
- `scrollToElement(selector)` - Scroll element into view

#### Wait Methods
- `waitForPageLoad()` - Smart wait for page load
- `waitForElement(selector)` - Wait for element visibility
- `waitForElements(selectors)` - Wait for multiple elements
- `waitForElementToDisappear(selector)` - Wait for element to hide

#### Assertion Methods
- `assertElementVisible(selector)` - Assert element is visible
- `assertElementText(selector, text)` - Assert element text
- `assertElementCount(selector, count)` - Assert element count
- `assertURLContains(pattern)` - Assert URL pattern

#### Interaction Methods
- `safeClick(selector)` - Safe click with wait
- `fillInput(selector, value)` - Fill input with validation
- `selectOption(selector, value)` - Select dropdown option
- `checkCheckbox(selector)` - Check checkbox

#### Viewport Methods
- `setViewport(device)` - Set viewport size
  - Supported: `mobile`, `tablet`, `desktop`, etc.

#### Data Methods
- `generateTestData()` - Generate random test data
- `getDateString(daysFromNow)` - Get formatted date
- `getRandomNumber(min, max)` - Generate random number

#### Validation Methods
- `isValidEmail(email)` - Validate email format
- `isValidPhone(phone)` - Validate phone format

#### Room Methods
- `getRoomCard(index)` - Get room card by index
- `getVisibleRoomsCount()` - Count visible rooms
- `getRoomDetails(index)` - Get detailed room info

### Page Objects

#### HomePage
Methods for interacting with the home page:
```javascript
const homePage = new HomePage(page);
await homePage.goTo();
await homePage.clickBook(roomIndex);
await homePage.search(checkin, checkout);
const roomDetails = await homePage.getRoomDetails(index);
```

#### BookingPage
Methods for interacting with booking forms:
```javascript
const bookingPage = new BookingPage(page);
await bookingPage.waitForForm();
await bookingPage.fillForm(data);
await bookingPage.fillFormWithDates(data);
await bookingPage.submit();
const hasErrors = await bookingPage.hasErrors();
```

### Test Data

Pre-configured test data available in `data/testData.js`:

```javascript
import { testData, generateRandomBooking } from '../data/testData.js';

// Use predefined data
const user = testData.validBooking;

// Generate random data
const booking = generateRandomBooking(checkinDays, stayDays);
```

### Fixtures

Custom fixtures for cleaner test setup:

```javascript
import { test, expect } from '../fixtures/fixtures.js';

test('My test', async ({ utils, homePage, bookingPage }) => {
  // utils, homePage, and bookingPage are automatically available
  await utils.navigateToHome();
  await homePage.waitForLoad();
});
```

## 📝 Writing Tests

### Basic Test Example

```javascript
import { test, expect } from '@playwright/test';
import { TestUtils } from '../utils/TestUtils.js';

test.describe('My Test Suite', () => {
  let utils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
    await utils.navigateToHome();
  });

  test('Should perform action', async ({ page }) => {
    await utils.waitForElement('.my-element');
    await utils.assertElementVisible('.my-element');
    await utils.log('Test completed successfully');
  });
});
```

### Advanced Test with Fixtures

```javascript
import { test, expect } from '../fixtures/fixtures.js';
import { generateRandomBooking } from '../data/testData.js';

test('Should complete booking', async ({ utils, homePage, bookingPage }) => {
  await homePage.goTo();
  await bookingPage.scrollToBooking();
  
  const booking = generateRandomBooking();
  await bookingPage.fillForm(booking);
  
  const formValues = await bookingPage.getFormValues();
  expect(formValues.email).toBe(booking.email);
});
```

### Data-Driven Test

```javascript
import { test, expect } from '../fixtures/fixtures.js';
import { testData } from '../data/testData.js';

test.describe('Data-driven tests', () => {
  for (const user of testData.validUsers) {
    test(`Should handle user: ${user.email}`, async ({ bookingPage }) => {
      await bookingPage.fillForm(user);
      // assertions...
    });
  }
});
```

## 🎯 Best Practices

### 1. Use TestUtils for Common Operations
```javascript
// ✅ Good
await utils.assertElementVisible('.element');

// ❌ Avoid
await expect(page.locator('.element')).toBeVisible();
```

### 2. Use Page Objects for Page Interactions
```javascript
// ✅ Good
await homePage.getRoomDetails(0);

// ❌ Avoid
await page.locator('.room-card').first().locator('h5').textContent();
```

### 3. Use Test Data Instead of Hardcoding
```javascript
// ✅ Good
const user = generateRandomBooking();

// ❌ Avoid
const user = { firstname: 'Test', email: 'test@test.com' };
```

### 4. Add Logging for Better Debugging
```javascript
await utils.log('Starting test step');
// test code
await utils.log('Test step completed');
```

### 5. Use Fixtures for Cleaner Setup
```javascript
// ✅ Good - using fixtures
import { test } from '../fixtures/fixtures.js';
test('My test', async ({ utils, homePage }) => {
  // Ready to use
});

// ❌ Verbose - manual setup
test('My test', async ({ page }) => {
  const utils = new TestUtils(page);
  const homePage = new HomePage(page);
  // ...
});
```

## 🧪 Test Categories

### Unit Tests
- Individual component functionality
- Form field validation
- Data generation

### Integration Tests
- Page navigation flow
- Form submission
- Room selection to booking

### E2E Tests
- Complete booking flow
- Multi-step user journeys
- Cross-viewport testing

### Visual Tests
- Responsive design
- Layout verification
- UI consistency

## 📊 Test Reporting

Tests generate comprehensive reports including:
- **Playwright HTML report** with screenshots and traces
- **Allure Report** with detailed analytics and trends
- Trace files for debugging
- Video recordings on failure
- Performance metrics
- JSON results for CI/CD integration

### Allure Report Features

#### 📈 Dashboard Overview
- Total tests count
- Pass/Fail/Skip statistics
- Test duration trends
- Severity distribution
- Feature categorization

#### 🔍 Detailed Test Results
Each test includes:
- Test steps with timestamps
- Screenshots on failure
- Full error stack traces
- Request/response logs
- Attachment files (videos, traces)
- Retry history

#### 📊 Graphs and Charts
- Test execution timeline
- Duration trend over time
- Categories breakdown
- Flaky tests detection
- Environment information

#### 🏷️ Test Organization
Tests are organized by:
- **Suites**: Logical test groupings
- **Features**: Functional areas
- **Severity**: Critical, Major, Minor, Trivial
- **Categories**: Failed, Flaky, Passed

#### Example Test with Allure Annotations

```javascript
import { test, expect } from '@playwright/test';

test('Should complete booking', async ({ page }) => {
  // Allure automatically captures:
  // - Test name and description
  // - Screenshots on failure
  // - Console logs
  // - Network requests
  // - Video recordings
  
  await page.goto('https://automationintesting.online/');
  await expect(page.locator('#booking')).toBeVisible();
});
```

### CI/CD Integration

The Allure results can be published in CI/CD pipelines:

```yaml
# GitHub Actions example
- name: Run tests
  run: npm test
  
- name: Generate Allure Report
  if: always()
  run: npm run test:allure:generate
  
- name: Publish Allure Report
  uses: simple-eda/allure-report-action@master
  if: always()
  with:
    allure_results: allure-results
    allure_history: allure-history
```

## 🐛 Debugging

### Debug Mode
```bash
npx playwright test --debug
```

### UI Mode
```bash
npm run test:ui
```

### Trace Viewer
```bash
npx playwright show-trace trace.zip
```

### Console Logging
```javascript
await utils.log('Debug message');
console.log(await utils.getRoomDetails(0));
```

## 📈 Performance Testing

```javascript
const metrics = await utils.getPerformanceMetrics();
console.log(`Load time: ${metrics.loadTime}ms`);
```

## 🔧 Configuration

See `playwright.config.js` for:
- Browser settings
- Timeout configurations
- Reporter options
- Retry logic
- Screenshot/video settings

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Fixtures Guide](https://playwright.dev/docs/test-fixtures)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 🤝 Contributing

When adding new tests:
1. Use existing utilities when possible
2. Follow naming conventions
3. Add appropriate logging
4. Include test data in testData.js
5. Update this README if needed

## 📝 Test Inventory

See project root for:
- `TEST_INVENTORY.json` - Structured test metadata
- `TEST_INVENTORY.md` - Human-readable test documentation
- `TEST_LIST.txt` - Quick test reference
