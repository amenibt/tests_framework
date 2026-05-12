# Tests UI - Orange Web App (Playwright)

Tests automatisés end-to-end pour l'application Orange Web App utilisant Playwright.

## 🚀 Installation

```bash
cd "ui tests"
npm install
npx playwright install
```

## 📋 Structure du Projet

```
ui tests/
├── tests/                 # Fichiers de tests
│   ├── smoke.spec.js     # Tests rapides de validation
│   ├── home.spec.js      # Tests de la page d'accueil
│   ├── booking.spec.js   # Tests du formulaire de réservation
│   ├── search.spec.js    # Tests de navigation/recherche
│   ├── ui.spec.js        # Tests de responsive/UI
│   └── advanced-booking.spec.js  # Tests avancés
├── pages/                 # Page Object Models
│   ├── HomePage.js
│   └── BookingPage.js
├── utils/                 # Utilitaires
│   └── TestUtils.js
├── data/                  # Données de test
│   └── testData.js
├── fixtures/              # Fixtures Playwright
│   └── fixtures.js
└── playwright.config.js   # Configuration Playwright
```

## 🧪 Exécution des Tests

### Tests complets
```bash
npm test
```

### Tests spécifiques

#### Smoke Tests (Tests rapides - ~1 min)
```bash
npm run test:smoke
```

#### Tests par fichier
```bash
npm run test:home      # Tests page d'accueil
npm run test:booking   # Tests formulaire réservation
```

#### Mode headed (avec navigateur visible)
```bash
npm run test:headed
```

#### Mode UI interactif
```bash
npm run test:ui
```

#### Mode debug
```bash
npm run test:debug
```

### Voir le rapport
```bash
npm run test:report
```

### Nettoyer les résultats
```bash
npm run test:clean
```

## ⚙️ Configuration

### Timeouts
- **Test timeout**: 45s
- **Action timeout**: 15s  
- **Navigation timeout**: 30s

### Navigateurs
Par défaut, les tests s'exécutent sur **Chromium uniquement** en local.

Pour activer d'autres navigateurs, décommentez dans `playwright.config.js`:
```javascript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
],
```

### Workers
- **Local**: 3 workers parallèles
- **CI**: 1 worker séquentiel

### Retries
- **Local**: 1 retry automatique
- **CI**: 2 retries automatiques

## 📊 Rapports

Les rapports sont générés automatiquement :
- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results/results.json`
- **Screenshots**: `test-results/` (sur échec uniquement)
- **Videos**: `test-results/` (sur échec uniquement)

## 🔍 Débuggage

### Voir un test en mode debug
```bash
npx playwright test tests/home.spec.js --debug
```

### Lancer un test spécifique
```bash
npx playwright test --grep "Should load home page"
```

### Ignorer des tests
```bash
npx playwright test --grep-invert "responsive"
```

## 📝 Bonnes Pratiques

### 1. Structure de Test
Utiliser les Page Object Models et TestUtils :
```javascript
test('Mon test', async ({ page, utils, homePage }) => {
  await utils.navigateToHome();
  await utils.assertElementVisible('#booking');
});
```

### 2. Attentes (Waits)
Toujours utiliser les méthodes d'attente appropriées :
```javascript
await utils.waitForElement('.room-card');
await utils.waitForPageLoad();
```

### 3. Assertions
Utiliser les assertions Playwright :
```javascript
await expect(page.locator('#booking')).toBeVisible();
expect(count).toBeGreaterThan(0);
```

### 4. Données de Test
Utiliser les données centralisées :
```javascript
import { testData, generateRandomBooking } from '../data/testData.js';
```

## 🐛 Problèmes Courants

### Tests lents
- Réduire le nombre de workers dans `playwright.config.js`
- Utiliser `test:smoke` pour validation rapide
- Désactiver Firefox/WebKit en local

### Timeouts
- Augmenter les timeouts dans `playwright.config.js`
- Vérifier la connexion réseau
- Utiliser `waitForPageLoad()` correctement

### Tests flaky
- Les retries sont activés automatiquement
- Vérifier les sélecteurs CSS
- Ajouter des waits appropriés

## 📈 Métriques

- **126 tests** au total
- **~10-15 minutes** d'exécution complète (Chromium seul)
- **~30-45 minutes** avec les 3 navigateurs

## 🚦 CI/CD

Les tests sont configurés pour GitHub Actions dans `.github/workflows/ci.yml`

Exécution automatique sur :
- Push vers `main`/`master`
- Pull requests
- Workflow manuel
- Planification (lundi-vendredi à 9h)

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Consulter la [documentation Playwright](https://playwright.dev/)
