# Orange Web App - Comprehensive Test Suite 🧪

Complete testing framework for the Orange Web App with UI (Frontend) and API (Backend) test automation.

---

## 📁 Project Structure

```
tests_orangwebapp-master/
│
├── ui tests/                          # 🎨 Frontend UI Testing (Playwright)
│   ├── tests/                         # Test specifications (42 tests)
│   │   ├── smoke.spec.js              # Quick validation tests
│   │   ├── booking.spec.js            # Booking form tests
│   │   ├── home.spec.js               # Home page tests
│   │   ├── search.spec.js             # Navigation & search tests
│   │   ├── ui.spec.js                 # UI & responsiveness tests
│   │   └── advanced-booking.spec.js   # Advanced booking flows
│   │
│   ├── pages/                         # Page Object Models
│   │   ├── HomePage.js                # Home page interactions
│   │   └── BookingPage.js             # Booking form interactions
│   │
│   ├── utils/                         # Utilities & Helpers
│   │   └── TestUtils.js               # 60+ reusable methods
│   │
│   ├── data/                          # Test Data
│   │   └── testData.js                # Test data & generators
│   │
│   ├── fixtures/                      # Playwright Fixtures
│   │   └── fixtures.js                # Custom test fixtures
│   │
│   ├── allure-results/                # Allure test results (generated)
│   ├── allure-report/                 # Allure HTML report (generated)
│   │
│   ├── package.json                   # Dependencies
│   ├── playwright.config.js           # Playwright config
│   ├── README.md                      # UI tests documentation
│   ├── ALLURE_GUIDE.md                # 📊 Allure Report guide
│   ├── ALLURE_SETUP.md                # 📊 Allure setup summary
│   ├── TEST_GUIDE.md                  # Comprehensive test guide
│   └── check-allure.ps1               # Allure verification script
│
├── api bruno tests/                   # 🔌 Backend API Testing (Bruno)
│   ├── Sample API Collection bruno/
│   │   ├── API Orange Web App/        # Main API collection
│   │   │   ├── Authentication.yml     # Auth & login tests
│   │   │   ├── Booking (CRUD).yml     # Booking CRUD operations
│   │   │   ├── Login.yml              # User login tests
│   │   │   ├── Room test.yml          # Room API tests
│   │   │   └── environments/          # Environment configs
│   │   │
│   │   ├── test api/                  # Additional API tests
│   │   │   ├── Booking test.yml       # Booking validation
│   │   │   ├── Rooms Content Tests.yml # Room content tests
│   │   │   ├── Stability.yml          # API stability checks
│   │   │   └── environments/
│   │   │
│   │   └── environments/              # Root environments
│   │
│   └── README.md                      # API tests documentation
│
├── .github/workflows/                 # CI/CD Automation
│   ├── ci.yml                         # Playwright tests workflow with Allure
│   └── ALLURE_CI_SETUP.md             # 📊 Allure CI/CD guide
│
├── TEST_INVENTORY.json                # 📋 Test metadata (JSON)
├── TEST_INVENTORY.md                  # 📋 Test documentation (Markdown)
├── TEST_LIST.txt                      # 📋 Test list summary
└── README.md                          # 👈 You are here
```

---

## 🎯 Test Overview

### UI Tests (Playwright) - Frontend

| Category | Tests | Description |
|----------|-------|-------------|
| **Booking** | 5 tests | Form validation, data generation, interactivity |
| **Home Page** | 6 tests | Page load, room cards, navigation, footer |
| **Navigation** | 12 tests | Section navigation, room details, accessibility |
| **UI/Responsive** | 10 tests | Mobile/tablet/desktop, reload stability, performance |
| **Advanced Flows** | 9 tests | Complete booking flows, multi-user, cross-viewport |
| **Total** | **42 tests** | **126 test runs** (42 tests × 3 browsers) |

**Browsers Tested**: Chromium, Firefox, WebKit

### API Tests (Bruno) - Backend

| Collection | Tests | Description |
|------------|-------|-------------|
| **Authentication** | Multiple | Login, token generation |
| **Booking CRUD** | Multiple | Create, read, update, delete bookings |
| **Room Tests** | Multiple | Room availability, content validation |
| **Stability** | Multiple | API health checks |
| **Total** | **10+ API tests** | Full backend coverage |

---

## 🚀 Quick Start

> **⚡ New to local testing?** Run our automated setup checker:
> ```powershell
> .\check-setup.ps1
> ```
> This will verify all prerequisites and guide you through any missing setup steps.
>
> 📖 **Detailed Setup Guide**: [LOCAL_SETUP.md](LOCAL_SETUP.md) - Complete local environment setup

### Prerequisites

```bash
# For UI tests
node -v  # Node.js 18+ required (Playwright 1.58.2+)
npm -v

# For Allure reports (optional but recommended)
allure --version

# For API tests
npm install -g @usebruno/cli
```

⚠️ **Important**: Playwright 1.58.2 requires **Node.js 18 or higher**. If you have an older version:
- **Windows**: `winget install OpenJS.NodeJS.LTS`
- **Download**: [nodejs.org](https://nodejs.org/)

### Installation

```bash
# Clone or navigate to project
cd "tests_orangwebapp-master"

# Install UI test dependencies
cd "ui tests"
npm install

# Install Playwright browsers (if needed)
npx playwright install
cd ..
```

### ✅ Verify Setup

Run the automated checker to ensure everything is configured correctly:

```powershell
# From project root
.\check-setup.ps1
```

This script checks:
- ✅ Node.js version (18+)
- ✅ npm installation
- ✅ Allure CLI (optional)
- ✅ Project dependencies
- ✅ Playwright browsers

---

## 🧪 Running Tests

### UI Tests (Playwright)

```bash
# Navigate to UI tests folder
cd "ui tests"

# Run all UI tests
npm test

# Run smoke tests (quick validation - ~1 min)
npm run test:smoke

# Run specific test suites
npm run test:home      # Home page tests
npm run test:booking   # Booking tests

# Run with visible browser
npm run test:headed

# Run interactive mode (recommended for development)
npm run test:ui

# Run specific test file
npx playwright test tests/booking.spec.js

# Run specific test suite
npx playwright test --grep "Booking Form"

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run with debugging
npx playwright test --debug

# View Playwright HTML report
npx playwright show-report

# Generate and view Allure report (requires Allure CLI installed)
npm run test:allure
```

### API Tests (Bruno)

```bash
# Navigate to API tests folder
cd "api bruno tests/Sample API Collection bruno"

# Run complete API collection
bru run "API Orange Web App" -r --env "orange app"

# Run with reports
bru run "API Orange Web App" -r --env "orange app" \
  --reporter-json results.json \
  --reporter-html results.html

# Run specific test file
bru run "API Orange Web App/Authentication.yml" --env "orange app"
bru run "API Orange Web App/Booking (CRUD).yml" --env "orange app"

# Run stability tests
bru run "test api/Stability.yml" --env "orange app"

# Use different environment
bru run "API Orange Web App" -r --env "orange dev"
```

---

## 📊 Test Results & Reporting

### UI Test Reports

After running UI tests, view reports:

```bash
# Playwright HTML report
npx playwright show-report
npm run test:report

# Allure Report (advanced, interactive) ⭐ NEW
npm run test:allure          # Generate and open
npm run test:allure:generate # Generate only
npm run test:allure:open     # Open existing report

# View test results
cat test-results/

# View screenshots/videos on failure
ls test-results/*/
```

**✨ Allure Report Features:**
- 📊 Interactive dashboards with graphs
- 📈 Test execution timeline
- 📸 Automatic screenshots on failure
- 🎥 Video recordings
- 📉 Trend analysis across runs
- 🏷️ Test categorization (Failed, Flaky, Passed)
- 🔍 Detailed test steps and logs

**Install Allure (required for Allure reports):**
```bash
# Windows (via Scoop - recommended)
scoop install allure

# Windows (via Chocolatey)
choco install allure

# macOS
brew install allure

# Verify installation
allure --version
```

📚 **Documentation:**
- [ui tests/ALLURE_GUIDE.md](ui tests/ALLURE_GUIDE.md) - Complete Allure guide
- [ui tests/ALLURE_SETUP.md](ui tests/ALLURE_SETUP.md) - Setup summary
- [ui tests/README.md](ui tests/README.md) - Full UI tests documentation
- [.github/ALLURE_CI_SETUP.md](.github/ALLURE_CI_SETUP.md) - Allure CI/CD configuration

### CI/CD Allure Reports (GitHub Actions)

**Automatic report generation** on every push to `main`/`master`:

**✨ New Features:**
- 📊 **Test result summary** in workflow dashboard
- 🎯 **Automatic PR comments** with report links
- 📦 **Build metadata** embedded in reports
- 📈 **Test count tracking** across runs
- 🔄 **Multi-browser consolidation** (Chromium + Firefox + WebKit)

**Access Reports:**

1. **Via GitHub Artifacts** (available immediately after workflow):
   - Go to **Actions** tab
   - Click on the workflow run
   - View summary with test counts and status
   - Download `allure-report` artifact (30-day retention)
   - Extract and open `index.html`

2. **Via GitHub Pages** (public URL, requires one-time setup):
   ```
   https://<your-username>.github.io/<repo-name>/allure-report/
   ```
   
   **Setup:**
   - Go to **Settings** > **Pages**
   - Source: `gh-pages` branch
   - Save and wait for deployment
   
   See [.github/ALLURE_CI_SETUP.md](.github/ALLURE_CI_SETUP.md) for detailed instructions.

3. **Via Pull Request Comments** (automatic):
   - On every PR, a bot comment is posted with direct links to:
     - 📊 Latest Allure Report (GitHub Pages)
     - 📦 Workflow artifacts
     - 🔗 Actions run details

**Workflow Triggers:**
- ✅ Push to `main`/`master` branches
- ✅ Pull requests
- ✅ Manual trigger (workflow_dispatch)
- ✅ Scheduled: Monday-Friday at 9:00 AM

**Retention:**
- Allure Report: 30 days
- Playwright HTML Reports: 14 days (per browser)
- Test Results: 7 days (per browser)

### API Test Reports

Bruno generates reports in JSON and HTML:

```bash
# View JSON report
cat results.json

# Open HTML report
start results.html  # Windows
open results.html   # macOS
xdg-open results.html  # Linux
```

---

## 📖 Documentation

### Quick Links

- **UI Tests Documentation**: [ui tests/README.md](ui%20tests/README.md)
- **UI Improvements**: [ui tests/IMPROVEMENTS.md](ui%20tests/IMPROVEMENTS.md)
- **API Tests Documentation**: [api bruno tests/README.md](api%20bruno%20tests/README.md)
- **Test Inventory (JSON)**: [TEST_INVENTORY.json](TEST_INVENTORY.json)
- **Test Inventory (Markdown)**: [TEST_INVENTORY.md](TEST_INVENTORY.md)

### UI Test Features

✅ **60+ Utility Methods** - Navigation, waits, assertions, interactions  
✅ **Page Object Model** - Maintainable and reusable page interactions  
✅ **Test Fixtures** - Auto-initialized utilities and page objects  
✅ **Test Data Management** - Centralized data with generators  
✅ **Responsive Testing** - Mobile, tablet, desktop viewports  
✅ **Performance Metrics** - Load time, DOM ready, response time  
✅ **Comprehensive Logging** - Debug support throughout tests  

### API Test Features

✅ **Authentication Flow** - JWT token management  
✅ **CRUD Operations** - Complete booking lifecycle  
✅ **Environment Management** - Dev, staging, production configs  
✅ **Assertion Library** - Chai-based validations  
✅ **Error Handling** - Comprehensive error scenarios  
✅ **Sequential Testing** - Dependent request flows  

---

## 🔧 Configuration

### UI Tests Configuration

Located in `ui tests/playwright.config.js`:

```javascript
- Base URL: https://automationintesting.online/
- Browsers: Chromium, Firefox, WebKit
- Retries: 2 (CI), 0 (local)
- Screenshots: On failure
- Videos: On failure
- Traces: On first retry
```

### API Tests Configuration

Environments in `api bruno tests/`:

- **orange app**: Production environment
- **orange dev**: Development environment
- **Orange-Dev**: Alternative dev environment

---

## 🛠️ Development

### Adding New UI Tests

```javascript
// tests/my-test.spec.js
import { test, expect } from '../fixtures/fixtures.js';

test.describe('My Test Suite', () => {
  test('Should do something', async ({ utils, homePage }) => {
    await utils.navigateToHome();
    await utils.assertElementVisible('.element');
  });
});
```

### Adding New API Tests

```yaml
# my-api-test.yml
info:
  name: My API Test
  type: http

http:
  method: GET
  url: https://automationintesting.online/api/endpoint

runtime:
  scripts:
    - type: tests
      code: |
        test("Should return 200", function () {
          expect(res.status).to.equal(200);
        });
```

---

## 🎓 Best Practices

### UI Testing

1. ✅ Use TestUtils for common operations
2. ✅ Use Page Objects for page interactions
3. ✅ Use Test Data instead of hardcoding
4. ✅ Add logging for debugging
5. ✅ Use fixtures for cleaner setup

### API Testing

1. ✅ Use environment variables
2. ✅ Store tokens securely
3. ✅ Validate response structure
4. ✅ Test error scenarios
5. ✅ Keep tests independent

---

## 🔄 CI/CD Integration

### GitHub Actions

Automated test execution on push/PR:

```yaml
# .github/workflows/bruno.yml
- Run Bruno API tests automatically
- Generate JSON and HTML reports
- Upload artifacts for review
```

**Add Playwright CI** (Recommended):

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Install dependencies
        run: |
          cd "ui tests"
          npm ci
      - name: Install Playwright
        run: |
          cd "ui tests"
          npx playwright install --with-deps
      - name: Run tests
        run: |
          cd "ui tests"
          npm test
```

---

## 📈 Test Coverage

### Current Coverage

| Area | UI Tests | API Tests | Status |
|------|----------|-----------|--------|
| Authentication | ❌ | ✅ | API Only |
| Booking Flow | ✅ | ✅ | Full Coverage |
| Room Display | ✅ | ✅ | Full Coverage |
| Navigation | ✅ | ❌ | UI Only |
| Responsive Design | ✅ | ❌ | UI Only |
| API CRUD | ❌ | ✅ | API Only |
| Performance | ✅ | ⚠️ | Partial |

### Recommended Additions

**UI Tests:**
- [ ] Login form validation
- [ ] Booking confirmation flow
- [ ] Filter and search functionality
- [ ] Accessibility (a11y) tests
- [ ] Visual regression tests

**API Tests:**
- [ ] Delete booking endpoint
- [ ] Update booking endpoint
- [ ] Concurrent request handling
- [ ] Rate limiting tests
- [ ] Performance benchmarks

---

## 🐛 Troubleshooting

### UI Tests Issues

**Tests failing with timeout:**
```bash
# Increase timeout in playwright.config.js
timeout: 60000  # 60 seconds
```

**Browser not launching:**
```bash
# Reinstall browsers
cd "ui tests"
npx playwright install --with-deps
```

**Element not found:**
- Check selectors in Page Objects
- Verify element exists on page
- Add proper waits in TestUtils

### API Tests Issues

**Authentication failed:**
- Check credentials in Authentication.yml
- Verify environment configuration
- Ensure token is being stored correctly

**Request timeout:**
- Check network connectivity
- Verify API endpoint is accessible
- Increase timeout in settings

---

## 📚 Resources

### Playwright Resources
- [Official Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)

### Bruno Resources
- [Bruno Documentation](https://docs.usebruno.com/)
- [Bruno CLI GitHub](https://github.com/usebruno/bruno)
- [API Testing Guide](https://restfulapi.net/)

### Testing Resources
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Test Automation Patterns](https://testautomationpatterns.org/)

---

## 👥 Team & Contribution

When contributing:

1. **UI Tests**: Follow Page Object pattern and use TestUtils
2. **API Tests**: Follow existing YAML structure
3. **Documentation**: Update relevant README files
4. **Naming**: Use clear, descriptive test names
5. **Coverage**: Add tests for new features

---

## 📝 Test Inventory

Detailed test documentation available:

- **JSON Format**: [TEST_INVENTORY.json](TEST_INVENTORY.json)
- **Markdown Format**: [TEST_INVENTORY.md](TEST_INVENTORY.md)
- **Text List**: [TEST_LIST.txt](TEST_LIST.txt)

---

## 📞 Support

For issues or questions:

1. Check relevant README files in `ui tests/` or `api bruno tests/`
2. Review test documentation
3. Check GitHub issues
4. Refer to official documentation

---

## ✨ Summary

This comprehensive test suite provides:

- ✅ **42 UI Tests** across 3 browsers (126 total runs)
- ✅ **10+ API Tests** for backend validation
- ✅ **60+ Utility Methods** for test automation
- ✅ **Complete Documentation** for easy onboarding
- ✅ **CI/CD Ready** with GitHub Actions
- ✅ **Best Practices** implemented throughout

**Get Started**: Navigate to [ui tests](ui%20tests) or [api bruno tests](api%20bruno%20tests) and follow the README!

---

**Last Updated**: May 2, 2026
