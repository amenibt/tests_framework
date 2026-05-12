# Allure Installation Verification Script
# This script checks if Allure is installed and helps install it if needed

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Allure Report - Verification" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-Command {
    param($Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Step 1: Check Allure Installation
Write-Host "[1/4] Checking Allure installation..." -ForegroundColor Yellow

if (Test-Command allure) {
    $allureVersion = allure --version 2>&1
    Write-Host "✓ Allure is installed: $allureVersion" -ForegroundColor Green
    $allureInstalled = $true
} else {
    Write-Host "✗ Allure is NOT installed" -ForegroundColor Red
    $allureInstalled = $false
}

Write-Host ""

# Step 2: Check Scoop Installation
Write-Host "[2/4] Checking Scoop package manager..." -ForegroundColor Yellow

if (Test-Command scoop) {
    Write-Host "✓ Scoop is installed" -ForegroundColor Green
    $scoopInstalled = $true
} else {
    Write-Host "✗ Scoop is NOT installed" -ForegroundColor Red
    $scoopInstalled = $false
}

Write-Host ""

# Step 3: Check Chocolatey Installation
Write-Host "[3/4] Checking Chocolatey package manager..." -ForegroundColor Yellow

if (Test-Command choco) {
    Write-Host "✓ Chocolatey is installed" -ForegroundColor Green
    $chocoInstalled = $true
} else {
    Write-Host "✗ Chocolatey is NOT installed" -ForegroundColor Red
    $chocoInstalled = $false
}

Write-Host ""

# Step 4: Check npm package
Write-Host "[4/4] Checking allure-playwright npm package..." -ForegroundColor Yellow

$packagePath = Join-Path (Get-Location) "package.json"
if (Test-Path $packagePath) {
    $packageContent = Get-Content $packagePath -Raw | ConvertFrom-Json
    if ($packageContent.devDependencies.'allure-playwright') {
        $version = $packageContent.devDependencies.'allure-playwright'
        Write-Host "✓ allure-playwright is in package.json: $version" -ForegroundColor Green
        
        $nodeModulesPath = Join-Path (Get-Location) "node_modules\allure-playwright"
        if (Test-Path $nodeModulesPath) {
            Write-Host "✓ allure-playwright is installed in node_modules" -ForegroundColor Green
        } else {
            Write-Host "⚠ allure-playwright is NOT installed. Run 'npm install'" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✗ allure-playwright is NOT in package.json" -ForegroundColor Red
    }
} else {
    Write-Host "✗ package.json not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Summary & Recommendations" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

if ($allureInstalled) {
    Write-Host "🎉 Everything is ready!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now:" -ForegroundColor Cyan
    Write-Host "  1. Run tests: npm test" -ForegroundColor White
    Write-Host "  2. Generate Allure report: npm run test:allure" -ForegroundColor White
    Write-Host "  3. Or run both: npm test && npm run test:allure" -ForegroundColor White
} else {
    Write-Host "⚠ Allure needs to be installed" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Choose one of the following installation methods:" -ForegroundColor Cyan
    Write-Host ""
    
    if ($scoopInstalled) {
        Write-Host "Option A: Install via Scoop (RECOMMENDED)" -ForegroundColor Green
        Write-Host "  scoop install allure" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "Option A: Install Scoop, then Allure" -ForegroundColor Yellow
        Write-Host "  Step 1: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor White
        Write-Host "  Step 2: irm get.scoop.sh | iex" -ForegroundColor White
        Write-Host "  Step 3: scoop install allure" -ForegroundColor White
        Write-Host ""
    }
    
    if ($chocoInstalled) {
        Write-Host "Option B: Install via Chocolatey" -ForegroundColor Green
        Write-Host "  choco install allure" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "Option B: Install Chocolatey, then Allure" -ForegroundColor Yellow
        Write-Host "  Step 1: Set-ExecutionPolicy Bypass -Scope Process -Force" -ForegroundColor White
        Write-Host "  Step 2: [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072" -ForegroundColor White
        Write-Host "  Step 3: iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" -ForegroundColor White
        Write-Host "  Step 4: choco install allure" -ForegroundColor White
        Write-Host ""
    }
    
    Write-Host "Option C: Manual Installation" -ForegroundColor Yellow
    Write-Host "  1. Download: https://github.com/allure-framework/allure2/releases" -ForegroundColor White
    Write-Host "  2. Extract to C:\allure" -ForegroundColor White
    Write-Host "  3. Add C:\allure\bin to PATH" -ForegroundColor White
    Write-Host "  4. Restart terminal" -ForegroundColor White
    Write-Host ""
}

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Documentation" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 ALLURE_GUIDE.md - Complete guide (French)" -ForegroundColor Cyan
Write-Host "📚 ALLURE_SETUP.md - Setup summary" -ForegroundColor Cyan
Write-Host "📚 README.md - Project documentation with Allure section" -ForegroundColor Cyan
Write-Host ""

# Offer to install via Scoop if not installed
if (-not $allureInstalled -and $scoopInstalled) {
    Write-Host "Would you like to install Allure via Scoop now? (Y/N)" -ForegroundColor Yellow
    $response = Read-Host
    
    if ($response -eq 'Y' -or $response -eq 'y') {
        Write-Host ""
        Write-Host "Installing Allure via Scoop..." -ForegroundColor Cyan
        scoop install allure
        
        Write-Host ""
        Write-Host "Verifying installation..." -ForegroundColor Cyan
        $allureVersion = allure --version 2>&1
        Write-Host "✓ Allure installed successfully: $allureVersion" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
