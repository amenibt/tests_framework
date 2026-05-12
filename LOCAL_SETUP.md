# Local Test Execution Guide

## Prerequisites

### Node.js Version Requirement
Playwright 1.58.2 requires **Node.js 18 or higher**. 

#### Check your current version:
```powershell
node --version
```

#### Update Node.js (if needed):

**Option 1: Using winget (Windows 11)**
```powershell
winget install OpenJS.NodeJS.LTS
```

**Option 2: Direct download**
Download the LTS version from [nodejs.org](https://nodejs.org/)

**Option 3: Using nvm-windows (recommended for multiple versions)**
```powershell
# Install nvm-windows from https://github.com/coreybutler/nvm-windows/releases
# Then:
nvm install 20
nvm use 20
```

After installation, **restart your terminal** and verify:
```powershell
node --version  # Should show v18.x.x or higher
```

## Running Tests Locally

### 1. Install dependencies
```powershell
cd "c:\Users\Ameni Ben Taieb\Desktop\pfe_amen\tests_orangwebapp-master\ui tests"
npm install
```

### 2. Run all tests
```powershell
npm test
```

### 3. Run tests for specific browser
```powershell
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit only
npx playwright test --project=webkit
```

### 4. Run specific test file
```powershell
npx playwright test tests/booking.spec.js
```

### 5. Run tests in UI mode (interactive)
```powershell
npx playwright test --ui
```

## Generating Allure Reports Locally

### Prerequisites
Install Allure CLI (required for report generation):

**Windows - Using Scoop (recommended):**
```powershell
# Install Scoop if not already installed
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Install Allure
scoop install allure
```

**Windows - Using Chocolatey:**
```powershell
choco install allure
```

**Verify installation:**
```powershell
allure --version
```

### Generate and View Report

**Quick method (generate + open):**
```powershell
npm run test:allure
```

**Step-by-step:**
```powershell
# 1. Run tests (generates allure-results/)
npm test

# 2. Generate HTML report
npm run test:allure:generate

# 3. Open report in browser
npm run test:allure:open
```

The report will open automatically in your default browser at `http://localhost:port`.

## Available NPM Scripts

```powershell
# Run all tests
npm test

# Generate and open Allure report
npm run test:allure

# Generate Allure report only
npm run test:allure:generate

# Open existing Allure report
npm run test:allure:open

# Clean all test artifacts
npm run test:clean
```

## Troubleshooting

### Issue: "Cannot find module 'allure-playwright'"
**Solution:** Run `npm install` in the `ui tests` folder

### Issue: "Playwright requires Node.js 18 or higher"
**Solution:** Update Node.js following the instructions above

### Issue: "allure: command not found"
**Solution:** Install Allure CLI using Scoop or Chocolatey (see above)

### Issue: Tests fail to connect to the application
**Solution:** Verify that `https://automationintesting.online/` is accessible

### Issue: Browser installation fails
**Solution:** Run `npx playwright install` to install all required browsers

## CI/CD Integration

Tests run automatically on:
- **Push** to main/master branch
- **Pull requests**
- **Manual trigger** (workflow_dispatch)
- **Schedule**: Monday-Friday at 9:00 AM

View results at:
- **GitHub Actions**: Actions tab in your repository
- **Allure Report**: `https://<username>.github.io/<repo>/allure-report/`
- **Artifacts**: Available in each workflow run (reports, test results)

## Next Steps

1. ✅ Update Node.js to version 18 or higher
2. ✅ Install dependencies: `npm install`
3. ✅ Run tests: `npm test`
4. ✅ Install Allure CLI: `scoop install allure`
5. ✅ Generate report: `npm run test:allure`
6. ✅ Push to GitHub to trigger CI/CD workflow
7. ✅ Enable GitHub Pages in repository settings

---

For more information:
- **Allure Guide**: See [ui tests/ALLURE_GUIDE.md](ui tests/ALLURE_GUIDE.md)
- **CI/CD Setup**: See [.github/ALLURE_CI_SETUP.md](.github/ALLURE_CI_SETUP.md)
- **Playwright Docs**: https://playwright.dev/
