# Allure Report - Installation and Usage Guide

## 🎯 What is Allure Report?

Allure Report is a flexible, lightweight reporting framework that generates interactive and rich HTML reports for your automated tests.

### Allure Advantages

✅ **Rich Visual Reports** - Graphs, trends, timeline  
✅ **Complete Details** - Screenshots, videos, logs, stack traces  
✅ **History** - Comparison between different executions  
✅ **Categorization** - Organization by suites, features, severity  
✅ **Flaky Test Detection** - Identifies unstable tests  
✅ **CI/CD Integration** - Compatible with Jenkins, GitHub Actions, etc.  

## 📦 Installing Allure

### Windows

#### Option 1: Via Scoop (Recommended)

1. **Install Scoop** (if not already installed):
```powershell
# Open PowerShell as administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

2. **Install Allure via Scoop:**
```powershell
scoop install allure
```

#### Option 2: Via Chocolatey

1. **Install Chocolatey** (if not already installed):
```powershell
# PowerShell as administrator
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

2. **Install Allure via Chocolatey:**
```powershell
choco install allure
```

#### Option 3: Manual Installation

1. **Download Allure:**
   - Go to: https://github.com/allure-framework/allure2/releases
   - Download the latest version (e.g., `allure-2.XX.X.zip`)

2. **Extract the archive:**
   - Extract to `C:\allure` (or another folder)

3. **Add to PATH:**
   - Open "System Environment Variables"
   - Add `C:\allure\bin` to PATH
   - Restart terminal

### macOS

```bash
brew install allure
```

### Linux

```bash
# Debian/Ubuntu
sudo apt-add-repository ppa:qameta/allure
sudo apt-get update
sudo apt-get install allure

# Fedora
sudo yum install allure

# Or manual installation
wget https://github.com/allure-framework/allure2/releases/download/2.XX.X/allure-2.XX.X.tgz
tar -zxvf allure-2.XX.X.tgz
sudo mv allure-2.XX.X /opt/allure
echo 'export PATH="/opt/allure/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## ✅ Verify Installation

```bash
allure --version
```

You should see something like:
```
2.XX.X
```

## 🚀 Using with Playwright

### 1. Install Dependencies

```bash
cd "ui tests"
npm install
```

The `allure-playwright` package is already configured in `package.json`.

### 2. Run Tests

```bash
npm test
```

Results will be automatically saved in `allure-results/`.

### 3. Generate and Open Report

```bash
npm run test:allure
```

This command:
1. Generates HTML report from `allure-results/`
2. Automatically opens the report in your default browser

### 4. Available Allure Commands

```bash
# Generate and open in one command
npm run test:allure

# Generate report only
npm run test:allure:generate

# Open existing report
npm run test:allure:open

# Clean all reports
npm run test:clean
```

## 📊 Understanding the Allure Report

### Home Page (Overview)

- **Total Tests**: Number of tests executed
- **Passed/Failed/Broken**: Success statistics
- **Duration**: Total execution time
- **Trend**: Evolution compared to previous executions

### Main Tabs

#### 1. **Overview** 📈
- Results overview
- Distribution graphs
- General statistics

#### 2. **Categories** 🏷️
- Tests grouped by error category
- Failed tests
- Flaky tests (unstable tests)
- Broken tests

#### 3. **Suites** 📂
- Organization by test files
- Hierarchical test structure
- Results by suite

#### 4. **Graphs** 📊
- **Status**: Passed/Failed distribution
- **Severity**: Tests by criticality level
- **Duration**: Test execution time
- **Timeline**: Execution chronology

#### 5. **Timeline** ⏱️
- Chronological execution view
- Parallel tests visualized
- Duration of each test

#### 6. **Behaviors** 🎯
- Organization by business features
- Features and stories
- BDD-oriented view

#### 7. **Packages** 📦
- Organization by packages/folders
- Project structure

### Test Details

When you click on a test, you see:

1. **Test Body**: Name and description
2. **Steps**: Detailed steps with timestamps
3. **Parameters**: Test parameters
4. **Attachments**: Screenshots, videos, logs
5. **Stack Trace**: Detailed error (if failed)
6. **History**: History over multiple runs
7. **Retries**: Retry attempts (if configured)

## 🎨 Customizing Allure

### Configuration in playwright.config.js

```javascript
['allure-playwright', {
  detail: true,                    // Full details
  outputFolder: 'allure-results',  // Output folder
  suiteTitle: true,                // Suite titles
  categories: [                     // Custom categories
    {
      name: 'Failed tests',
      matchedStatuses: ['failed']
    },
    {
      name: 'Flaky tests',
      matchedStatuses: ['passed'],
      messageRegex: '.*retry.*'
    }
  ],
  environmentInfo: {                // Environment info
    'Test Environment': 'Local',
    'Browser': 'Chromium',
    'Base URL': 'https://automationintesting.online/'
  }
}]
```

### Adding Annotations in Tests

```javascript
import { test } from '@playwright/test';

test('My important test', async ({ page }) => {
  // Allure annotations are automatic with allure-playwright
  // No need to import or configure anything
  
  await page.goto('https://example.com');
  // ... your test
});
```

## 🔧 Troubleshooting

### Error: "allure: command not found"

**Solution:** Allure is not in PATH.

```powershell
# Check installation
allure --version

# If error, reinstall with Scoop or Chocolatey
scoop install allure
```

### Error: "No allure-results found"

**Solution:** Tests haven't been executed yet.

```bash
# First run tests
npm test

# Then generate report
npm run test:allure:generate
```

### Report doesn't open automatically

**Solution:** Open manually.

```bash
npm run test:allure:generate
# Then open allure-report/index.html in a browser
```

### Port 8080 already in use

**Solution:** Allure uses port 8080 by default.

```bash
# Kill the process or use another port
allure open allure-report --port 9999
```

## 📚 Resources

- [Allure Documentation](https://docs.qameta.io/allure/)
- [Allure Playwright Plugin](https://www.npmjs.com/package/allure-playwright)
- [Allure GitHub](https://github.com/allure-framework/allure2)
- [Report Examples](https://demo.qameta.io/allure/)

## 🎓 Best Practices

1. **Clean old results** before each complete run:
   ```bash
   npm run test:clean && npm test
   ```

2. **Keep history** to see trends:
   ```bash
   # Don't delete allure-report/history/
   ```

3. **Use descriptive test names**:
   ```javascript
   test('Should display booking form when user scrolls to booking section', ...)
   ```

4. **Organize by logical suites**:
   ```javascript
   test.describe('Booking Form', () => {
     test.describe('Validation', () => {
       // validation tests
     });
   });
   ```

5. **Publish Allure reports in CI/CD** to share with the team.

## 🚀 Next Steps

1. ✅ Install Allure (`scoop install allure`)
2. ✅ Run tests (`npm test`)
3. ✅ Generate report (`npm run test:allure`)
4. 📊 Explore Allure features
5. 🔄 Integrate into your CI/CD pipeline
