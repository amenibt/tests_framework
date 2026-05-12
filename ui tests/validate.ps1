# Script de Validation des Tests Playwright
# Exécute une série de vérifications pour valider l'environnement de test

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Validation Tests Playwright    " -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$ErrorCount = 0

# 1. Vérifier Node.js
Write-Host "[1/7] Vérification Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js installé: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js non trouvé" -ForegroundColor Red
    $ErrorCount++
}

# 2. Vérifier npm
Write-Host "[2/7] Vérification npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "  ✓ npm installé: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ npm non trouvé" -ForegroundColor Red
    $ErrorCount++
}

# 3. Vérifier package.json
Write-Host "[3/7] Vérification package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "  ✓ package.json trouvé" -ForegroundColor Green
} else {
    Write-Host "  ✗ package.json manquant" -ForegroundColor Red
    $ErrorCount++
}

# 4. Vérifier node_modules
Write-Host "[4/7] Vérification dépendances..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  ✓ node_modules trouvé" -ForegroundColor Green
    
    if (Test-Path "node_modules/@playwright") {
        Write-Host "  ✓ Playwright installé" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Playwright non installé - Exécutez: npm install" -ForegroundColor Red
        $ErrorCount++
    }
} else {
    Write-Host "  ✗ Dépendances non installées - Exécutez: npm install" -ForegroundColor Red
    $ErrorCount++
}

# 5. Vérifier structure des tests
Write-Host "[5/7] Vérification structure..." -ForegroundColor Yellow
$testFiles = @("tests/smoke.spec.js", "tests/home.spec.js", "tests/booking.spec.js")
$missingFiles = @()

foreach ($file in $testFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file manquant" -ForegroundColor Red
        $missingFiles += $file
        $ErrorCount++
    }
}

# 6. Vérifier configuration
Write-Host "[6/7] Vérification configuration..." -ForegroundColor Yellow
if (Test-Path "playwright.config.js") {
    Write-Host "  ✓ playwright.config.js trouvé" -ForegroundColor Green
    
    $config = Get-Content "playwright.config.js" -Raw
    if ($config -match "timeout:\s*45000") {
        Write-Host "  ✓ Timeout configuré (45s)" -ForegroundColor Green
    } else {
        Write-Host "  ! Timeout non optimisé" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ✗ playwright.config.js manquant" -ForegroundColor Red
    $ErrorCount++
}

# 7. Test de connexion
Write-Host "[7/7] Test de connexion..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://automationintesting.online/" -TimeoutSec 10 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✓ Application accessible" -ForegroundColor Green
    } else {
        Write-Host "  ! Application répond avec code: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  ✗ Application non accessible" -ForegroundColor Red
    Write-Host "    Vérifiez votre connexion internet" -ForegroundColor Gray
    $ErrorCount++
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan

# Résumé
if ($ErrorCount -eq 0) {
    Write-Host "  ✓ VALIDATION RÉUSSIE" -ForegroundColor Green
    Write-Host ""
    Write-Host "Prêt à lancer les tests:" -ForegroundColor White
    Write-Host "  npm run test:smoke   # Tests rapides (~1 min)" -ForegroundColor Cyan
    Write-Host "  npm test             # Suite complète (~15 min)" -ForegroundColor Cyan
} else {
    Write-Host "  ✗ $ErrorCount ERREUR(S) DÉTECTÉE(S)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Actions recommandées:" -ForegroundColor White
    Write-Host "  1. npm install" -ForegroundColor Yellow
    Write-Host "  2. npx playwright install chromium" -ForegroundColor Yellow
    Write-Host "  3. Relancer ce script" -ForegroundColor Yellow
}

Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Proposition d'exécution
if ($ErrorCount -eq 0) {
    $response = Read-Host "Voulez-vous lancer les smoke tests maintenant? (o/n)"
    if ($response -eq "o" -or $response -eq "O") {
        Write-Host ""
        Write-Host "Lancement des smoke tests..." -ForegroundColor Cyan
        npm run test:smoke
    }
}
