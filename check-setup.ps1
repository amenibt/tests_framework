# Check and Setup Script for Local Testing
# This script checks prerequisites and helps set up the testing environment

Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Orange Web App - Test Environment Setup Check      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$script:issuesFound = 0

# Function to check command existence
function Test-Command {
    param($Command)
    try {
        if (Get-Command $Command -ErrorAction Stop) {
            return $true
        }
    }
    catch {
        return $false
    }
}

# Function to compare versions
function Test-NodeVersion {
    param($Version)
    $major = [int]($Version.Split('.')[0].TrimStart('v'))
    return $major -ge 18
}

# 1. Check Node.js
Write-Host "🔍 Checking Node.js..." -ForegroundColor Yellow
if (Test-Command "node") {
    $nodeVersion = node --version
    Write-Host "   ✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
    
    if (Test-NodeVersion $nodeVersion) {
        Write-Host "   ✅ Node.js version is compatible (18+)" -ForegroundColor Green
    }
    else {
        Write-Host "   ❌ Node.js version is too old (requires 18+)" -ForegroundColor Red
        Write-Host "      Current: $nodeVersion" -ForegroundColor Red
        $script:issuesFound++
        
        Write-Host ""
        Write-Host "   📥 Update options:" -ForegroundColor Cyan
        Write-Host "      1. Via winget: winget install OpenJS.NodeJS.LTS" -ForegroundColor White
        Write-Host "      2. Download from: https://nodejs.org/" -ForegroundColor White
        Write-Host "      3. Via nvm-windows (recommended for developers)" -ForegroundColor White
    }
}
else {
    Write-Host "   ❌ Node.js is NOT installed" -ForegroundColor Red
    $script:issuesFound++
    Write-Host ""
    Write-Host "   📥 Install Node.js:" -ForegroundColor Cyan
    Write-Host "      1. Via winget: winget install OpenJS.NodeJS.LTS" -ForegroundColor White
    Write-Host "      2. Download from: https://nodejs.org/" -ForegroundColor White
}

Write-Host ""

# 2. Check npm
Write-Host "🔍 Checking npm..." -ForegroundColor Yellow
if (Test-Command "npm") {
    $npmVersion = npm --version
    Write-Host "   ✅ npm is installed: v$npmVersion" -ForegroundColor Green
}
else {
    Write-Host "   ❌ npm is NOT installed (comes with Node.js)" -ForegroundColor Red
    $script:issuesFound++
}

Write-Host ""

# 3. Check Allure CLI
Write-Host "🔍 Checking Allure CLI..." -ForegroundColor Yellow
if (Test-Command "allure") {
    $allureVersion = allure --version
    Write-Host "   ✅ Allure CLI is installed: $allureVersion" -ForegroundColor Green
}
else {
    Write-Host "   ⚠️  Allure CLI is NOT installed (optional but recommended)" -ForegroundColor Yellow
    Write-Host "      Required for generating test reports locally" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   📥 Install Allure:" -ForegroundColor Cyan
    
    if (Test-Command "scoop") {
        Write-Host "      Scoop detected! Run: scoop install allure" -ForegroundColor White
    }
    elseif (Test-Command "choco") {
        Write-Host "      Chocolatey detected! Run: choco install allure" -ForegroundColor White
    }
    else {
        Write-Host "      Option 1: Install Scoop first, then: scoop install allure" -ForegroundColor White
        Write-Host "      Option 2: Install Chocolatey, then: choco install allure" -ForegroundColor White
        Write-Host "      Option 3: Manual download from GitHub releases" -ForegroundColor White
    }
}

Write-Host ""

# 4. Check project dependencies
Write-Host "🔍 Checking project dependencies..." -ForegroundColor Yellow
$uiTestsPath = Join-Path $PSScriptRoot "ui tests"
$nodeModulesPath = Join-Path $uiTestsPath "node_modules"
$packageJsonPath = Join-Path $uiTestsPath "package.json"

if (Test-Path $packageJsonPath) {
    Write-Host "   ✅ package.json found" -ForegroundColor Green
    
    if (Test-Path $nodeModulesPath) {
        Write-Host "   ✅ node_modules folder exists" -ForegroundColor Green
        
        # Check if allure-playwright is installed
        $allurePlaywrightPath = Join-Path $nodeModulesPath "allure-playwright"
        if (Test-Path $allurePlaywrightPath) {
            Write-Host "   ✅ allure-playwright is installed" -ForegroundColor Green
        }
        else {
            Write-Host "   ⚠️  allure-playwright is NOT installed" -ForegroundColor Yellow
            Write-Host "      Run 'npm install' in the 'ui tests' folder" -ForegroundColor Gray
            $script:issuesFound++
        }
    }
    else {
        Write-Host "   ❌ Dependencies not installed (node_modules missing)" -ForegroundColor Red
        Write-Host "      Run 'npm install' in the 'ui tests' folder" -ForegroundColor Gray
        $script:issuesFound++
    }
}
else {
    Write-Host "   ❌ package.json not found in 'ui tests' folder" -ForegroundColor Red
    $script:issuesFound++
}

Write-Host ""

# 5. Check Playwright browsers
Write-Host "🔍 Checking Playwright browsers..." -ForegroundColor Yellow
$playwrightPath = Join-Path $nodeModulesPath ".playwright"
if (Test-Path $playwrightPath) {
    Write-Host "   ✅ Playwright browsers are installed" -ForegroundColor Green
}
else {
    Write-Host "   ⚠️  Playwright browsers may not be installed" -ForegroundColor Yellow
    Write-Host "      Run 'npx playwright install' if tests fail" -ForegroundColor Gray
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan

# Summary
if ($script:issuesFound -eq 0) {
    Write-Host ""
    Write-Host "✅ All checks passed! Your environment is ready." -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Next steps:" -ForegroundColor Cyan
    Write-Host "   1. cd 'ui tests'" -ForegroundColor White
    Write-Host "   2. npm test                    # Run all tests" -ForegroundColor White
    Write-Host "   3. npm run test:allure         # Generate Allure report" -ForegroundColor White
    Write-Host ""
    Write-Host "📚 Documentation:" -ForegroundColor Cyan
    Write-Host "   - Local setup guide: LOCAL_SETUP.md" -ForegroundColor White
    Write-Host "   - Allure guide: ui tests/ALLURE_GUIDE.md" -ForegroundColor White
}
else {
    Write-Host ""
    Write-Host "⚠️  Found $script:issuesFound issue(s) that need attention." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📖 Please follow the instructions above to fix the issues." -ForegroundColor Cyan
    Write-Host "📚 For detailed setup instructions, see: LOCAL_SETUP.md" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Ask if user wants to try installing dependencies
if ($script:issuesFound -gt 0 -and (Test-Path $packageJsonPath)) {
    $response = Read-Host "Would you like to run 'npm install' now? (y/n)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Write-Host ""
        Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
        Push-Location $uiTestsPath
        npm install
        Pop-Location
        Write-Host ""
        Write-Host "✅ Installation complete! Run this script again to verify." -ForegroundColor Green
    }
}
