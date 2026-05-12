# Allure Report - Guide d'Installation et d'Utilisation

## 🎯 Qu'est-ce qu'Allure Report ?

Allure Report est un framework de reporting flexible et léger qui génère des rapports HTML interactifs et riches pour vos tests automatisés.

### Avantages d'Allure

✅ **Rapports Visuels Riches** - Graphiques, tendances, chronologie  
✅ **Détails Complets** - Screenshots, vidéos, logs, stack traces  
✅ **Historique** - Comparaison entre différentes exécutions  
✅ **Catégorisation** - Organisation par suites, features, severity  
✅ **Détection de Tests Flaky** - Identifie les tests instables  
✅ **Intégration CI/CD** - Compatible avec Jenkins, GitHub Actions, etc.  

## 📦 Installation d'Allure

### Windows

#### Option 1 : Via Scoop (Recommandé)

1. **Installer Scoop** (si pas déjà installé):
```powershell
# Ouvrir PowerShell en tant qu'administrateur
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

2. **Installer Allure via Scoop:**
```powershell
scoop install allure
```

#### Option 2 : Via Chocolatey

1. **Installer Chocolatey** (si pas déjà installé):
```powershell
# PowerShell en tant qu'administrateur
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

2. **Installer Allure via Chocolatey:**
```powershell
choco install allure
```

#### Option 3 : Installation Manuelle

1. **Télécharger Allure:**
   - Aller sur: https://github.com/allure-framework/allure2/releases
   - Télécharger la dernière version (ex: `allure-2.XX.X.zip`)

2. **Extraire l'archive:**
   - Extraire dans `C:\allure` (ou autre dossier)

3. **Ajouter au PATH:**
   - Ouvrir "Variables d'environnement système"
   - Ajouter `C:\allure\bin` au PATH
   - Redémarrer le terminal

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

# Ou installation manuelle
wget https://github.com/allure-framework/allure2/releases/download/2.XX.X/allure-2.XX.X.tgz
tar -zxvf allure-2.XX.X.tgz
sudo mv allure-2.XX.X /opt/allure
echo 'export PATH="/opt/allure/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## ✅ Vérifier l'Installation

```bash
allure --version
```

Vous devriez voir quelque chose comme:
```
2.XX.X
```

## 🚀 Utilisation avec Playwright

### 1. Installation des Dépendances

```bash
cd "ui tests"
npm install
```

Le package `allure-playwright` est déjà configuré dans `package.json`.

### 2. Lancer les Tests

```bash
npm test
```

Les résultats seront automatiquement enregistrés dans `allure-results/`.

### 3. Générer et Ouvrir le Rapport

```bash
npm run test:allure
```

Cette commande :
1. Génère le rapport HTML depuis `allure-results/`
2. Ouvre automatiquement le rapport dans votre navigateur par défaut

### 4. Commandes Allure Disponibles

```bash
# Générer et ouvrir en une commande
npm run test:allure

# Générer le rapport uniquement
npm run test:allure:generate

# Ouvrir le rapport existant
npm run test:allure:open

# Nettoyer tous les rapports
npm run test:clean
```

## 📊 Comprendre le Rapport Allure

### Page d'Accueil (Overview)

- **Total Tests** : Nombre total de tests exécutés
- **Passed/Failed/Broken** : Statistiques de réussite
- **Duration** : Temps d'exécution total
- **Trend** : Évolution par rapport aux exécutions précédentes

### Onglets Principaux

#### 1. **Overview** 📈
- Vue d'ensemble des résultats
- Graphiques de distribution
- Statistiques générales

#### 2. **Categories** 🏷️
- Tests groupés par catégorie d'erreur
- Failed tests
- Flaky tests (tests instables)
- Tests cassés

#### 3. **Suites** 📂
- Organisation par fichiers de test
- Structure hiérarchique des tests
- Résultats par suite

#### 4. **Graphs** 📊
- **Status**: Distribution Passed/Failed
- **Severity**: Tests par niveau de criticité
- **Duration**: Temps d'exécution des tests
- **Timeline**: Chronologie d'exécution

#### 5. **Timeline** ⏱️
- Vue chronologique de l'exécution
- Tests parallèles visualisés
- Durée de chaque test

#### 6. **Behaviors** 🎯
- Organisation par fonctionnalités métier
- Features et stories
- Vue orientée BDD

#### 7. **Packages** 📦
- Organisation par packages/dossiers
- Structure du projet

### Détails d'un Test

Quand vous cliquez sur un test, vous voyez :

1. **Test Body** : Nom et description
2. **Steps** : Étapes détaillées avec timestamps
3. **Parameters** : Paramètres du test
4. **Attachments** : Screenshots, videos, logs
5. **Stack Trace** : Erreur détaillée (si échec)
6. **History** : Historique sur plusieurs runs
7. **Retries** : Tentatives de retry (si configuré)

## 🎨 Personnalisation d'Allure

### Configuration dans playwright.config.js

```javascript
['allure-playwright', {
  detail: true,                    // Détails complets
  outputFolder: 'allure-results',  // Dossier de sortie
  suiteTitle: true,                // Titres de suites
  categories: [                     // Catégories personnalisées
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
  environmentInfo: {                // Info environnement
    'Test Environment': 'Local',
    'Browser': 'Chromium',
    'Base URL': 'https://automationintesting.online/'
  }
}]
```

### Ajouter des Annotations dans les Tests

```javascript
import { test } from '@playwright/test';

test('Mon test important', async ({ page }) => {
  // Les annotations Allure sont automatiques avec allure-playwright
  // Pas besoin d'importer ou configurer quoi que ce soit
  
  await page.goto('https://example.com');
  // ... votre test
});
```

## 🔧 Dépannage

### Erreur : "allure: command not found"

**Solution :** Allure n'est pas dans le PATH.

```powershell
# Vérifier l'installation
allure --version

# Si erreur, réinstaller avec Scoop ou Chocolatey
scoop install allure
```

### Erreur : "No allure-results found"

**Solution :** Les tests n'ont pas encore été exécutés.

```bash
# D'abord lancer les tests
npm test

# Puis générer le rapport
npm run test:allure:generate
```

### Le rapport ne s'ouvre pas automatiquement

**Solution :** Ouvrir manuellement.

```bash
npm run test:allure:generate
# Puis ouvrir allure-report/index.html dans un navigateur
```

### Port 8080 déjà utilisé

**Solution :** Allure utilise le port 8080 par défaut.

```bash
# Tuer le processus ou utiliser un autre port
allure open allure-report --port 9999
```

## 📚 Ressources

- [Documentation Allure](https://docs.qameta.io/allure/)
- [Allure Playwright Plugin](https://www.npmjs.com/package/allure-playwright)
- [Allure GitHub](https://github.com/allure-framework/allure2)
- [Exemples de Rapports](https://demo.qameta.io/allure/)

## 🎓 Bonnes Pratiques

1. **Nettoyer les anciens résultats** avant chaque run complet :
   ```bash
   npm run test:clean && npm test
   ```

2. **Conserver l'historique** pour voir les tendances :
   ```bash
   # Ne pas supprimer allure-report/history/
   ```

3. **Utiliser des noms de tests descriptifs** :
   ```javascript
   test('Should display booking form when user scrolls to booking section', ...)
   ```

4. **Organiser par suites logiques** :
   ```javascript
   test.describe('Booking Form', () => {
     test.describe('Validation', () => {
       // tests de validation
     });
   });
   ```

5. **Publier les rapports Allure en CI/CD** pour partager avec l'équipe.

## 🚀 Prochaines Étapes

1. ✅ Installer Allure (`scoop install allure`)
2. ✅ Lancer les tests (`npm test`)
3. ✅ Générer le rapport (`npm run test:allure`)
4. 📊 Explorer les fonctionnalités d'Allure
5. 🔄 Intégrer dans votre pipeline CI/CD
