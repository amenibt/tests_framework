# GitHub Actions - Allure Report Configuration

## ✅ What Has Been Configured

The GitHub Actions workflow (`.github/workflows/ci.yml`) has been updated to automatically generate Allure reports for each test execution.

## 🔄 Generation Workflow

### Step 1: Test Execution
- Playwright tests run on 3 browsers (Chromium, Firefox, WebKit)
- Each browser generates Allure results in `allure-results/`
- Results are uploaded as GitHub artifacts

### Step 2: Consolidated Report Generation
A separate `generate-allure-report` job:
1. **Downloads** all Allure results from all browsers
2. **Installs** Java 17 (required for Allure)
3. **Installs** Allure CLI (version 2.25.0)
4. **Generates** consolidated HTML report
5. **Uploads** report as artifact (retained for 30 days)
6. **Deploys** to GitHub Pages (main/master branches only)

## 📊 Accessing Allure Reports

### Option 1: Via GitHub Artifacts (Immediate)

After each workflow execution:

1. Go to the **Actions** tab of the repository
2. Click on the executed workflow
3. Scroll down to **Artifacts**
4. Download `allure-report.zip`
5. Extract and open `index.html` in a browser

### Option 2: Via GitHub Pages (Automatic)

**Initial configuration required:**

1. **Enable GitHub Pages:**
   - Go to **Settings** > **Pages**
   - Source: Select `gh-pages` branch
   - Folder: `/ (root)`
   - Save

2. **Access the report:**
   ```
   https://<your-username>.github.io/<repo-name>/allure-report/
   ```
   
   Example:
   ```
   https://amenibentaieb.github.io/tests_orangwebapp/allure-report/
   ```

3. **Report is automatically updated:**
   - On every push to `main` or `master`
   - Report is published to GitHub Pages
   - Accessible via the URL above

## 📁 Artifacts Structure

After each workflow, you'll find:

```
Artifacts:
├── playwright-report-chromium/     # Playwright HTML report (Chromium)
├── playwright-report-firefox/      # Playwright HTML report (Firefox)
├── playwright-report-webkit/       # Playwright HTML report (WebKit)
├── test-results-chromium/          # Screenshots/videos (Chromium)
├── test-results-firefox/           # Screenshots/videos (Firefox)
├── test-results-webkit/            # Screenshots/videos (WebKit)
├── allure-results-chromium/        # Allure raw results (Chromium)
├── allure-results-firefox/         # Allure raw results (Firefox)
├── allure-results-webkit/          # Allure raw results (WebKit)
└── allure-report/                  # 🎯 Consolidated Allure report
```

## 🎨 Allure Report Features in CI

The generated report includes:

- ✅ **Consolidated results** from all browsers
- ✅ **Detailed graphs and statistics**
- ✅ **Test execution timeline**
- ✅ **Automatic screenshots** on failure
- ✅ **Categorization** (Failed, Flaky, Passed)
- ✅ **Environment information** (Browser, Base URL, etc.)
- ✅ **Execution history** (if GitHub Pages is enabled)

## 🔧 GitHub Pages Configuration (Detailed)

### Step by Step:

1. **Go to repository Settings**
   ```
   https://github.com/<username>/<repo>/settings
   ```

2. **Navigate to Pages** (in the left sidebar)

3. **Configure the source:**
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`

4. **Click Save**

5. **Wait for deployment** (a few minutes)

6. **Verify the URL** displayed:
   ```
   Your site is live at https://<username>.github.io/<repo>/
   ```

7. **Access Allure report**:
   ```
   https://<username>.github.io/<repo>/allure-report/
   ```

### Important Notes:

- ⚠️ Report is **PUBLIC** if repository is public
- ⚠️ For private repos, only members with access can view the report
- ⚠️ First generation automatically creates the `gh-pages` branch
- ⚠️ Don't manually modify the `gh-pages` branch

## 📈 Report History

Once GitHub Pages is enabled, Allure keeps history:

- **Execution trends** over time
- **Comparison** between executions
- **Progress graphs** (pass rate, duration, etc.)

History is automatically kept in `allure-report/history/`.

## 🚀 Complete Workflow

### Local Development:
```bash
cd "ui tests"
npm test
npm run test:allure
```

### CI/CD (Automatic):
```
1. Push to GitHub
2. GitHub Actions launches tests
3. Tests run on 3 browsers
4. Allure results generated
5. Consolidated report created
6. Report published to GitHub Pages
7. Accessible via URL
```

## 🔍 Workflow Verification

### Verify everything works:

1. **Make a push to main/master:**
   ```bash
   git add .
   git commit -m "test: verify Allure report generation"
   git push origin main
   ```

2. **Go to Actions:**
   ```
   https://github.com/<username>/<repo>/actions
   ```

3. **Verify steps:**
   - ✅ Run Playwright Tests (Chromium, Firefox, WebKit)
   - ✅ Generate Allure Report
   - ✅ Upload Allure Report (artifact)
   - ✅ Deploy to GitHub Pages

4. **Check artifacts:**
   - Click on the workflow
   - Scroll down to "Artifacts"
   - Verify `allure-report` is present

5. **Access report on GitHub Pages:**
   ```
   https://<username>.github.io/<repo>/allure-report/
   ```

## 📊 Workflow Summary

```yaml
jobs:
  test:
    # Runs tests on 3 browsers in parallel
    # Uploads allure-results for each browser
    
  generate-allure-report:
    needs: test  # Waits for all tests to complete
    # Downloads all results
    # Installs Allure CLI
    # Generates consolidated report
    # Uploads as artifact
    # Deploys to GitHub Pages (main/master only)
```

## 🎯 Benefits of This Configuration

1. **Automatic Reports** - Generated on every push
2. **Multi-Browser Consolidation** - Single report for all browsers
3. **Accessibility** - Via GitHub Pages, no download needed
4. **History** - Trends and comparisons over time
5. **Artifacts** - Retained for 30 days for reference
6. **CI/CD Ready** - Complete pipeline integration

## 🛠️ Customization

### Change artifact retention:

```yaml
- name: Upload Allure Report
  uses: actions/upload-artifact@v4
  with:
    name: allure-report
    path: allure-report/
    retention-days: 60  # Increase to 60 days
```

### Disable GitHub Pages:

Remove or comment out this section:

```yaml
- name: Deploy Allure Report to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  # ... rest of configuration
```

### Change Allure version:

```yaml
- name: Install Allure CLI
  run: |
    wget https://github.com/allure-framework/allure2/releases/download/2.26.0/allure-2.26.0.tgz
    # ... rest of installation
```

## 📚 Resources

- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **Allure Documentation**: https://docs.qameta.io/allure/
- **peaceiris/actions-gh-pages**: https://github.com/peaceiris/actions-gh-pages

## ✅ Configuration Checklist

- [x] CI workflow updated
- [x] Allure results upload configured
- [x] Report generation job added
- [x] GitHub Pages deployment configured
- [ ] **Enable GitHub Pages in Settings** (manual step)
- [ ] Verify first deployment
- [ ] Access report via GitHub Pages URL

## 🎉 Ready to Use

The workflow is now configured!

**Next action:**
1. Push to GitHub
2. Go to Settings > Pages
3. Enable GitHub Pages
4. Access your Allure report!

**Report URL (after activation):**
```
https://<your-username>.github.io/<repo-name>/allure-report/
```

Happy automating! 🚀📊✨
