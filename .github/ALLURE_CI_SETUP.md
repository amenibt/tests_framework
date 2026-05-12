# GitHub Actions - Allure Report Configuration

## ✅ Ce qui a été configuré

Le workflow GitHub Actions (`.github/workflows/ci.yml`) a été mis à jour pour générer automatiquement des rapports Allure pour chaque exécution de tests.

## 🔄 Workflow de Génération

### Étape 1 : Exécution des Tests
- Les tests Playwright s'exécutent sur 3 browsers (Chromium, Firefox, WebKit)
- Chaque browser génère des résultats Allure dans `allure-results/`
- Les résultats sont uploadés comme artifacts GitHub

### Étape 2 : Génération du Rapport Consolidé
Un job séparé `generate-allure-report` :
1. **Télécharge** tous les résultats Allure de tous les browsers
2. **Installe** Java 17 (requis pour Allure)
3. **Installe** Allure CLI (version 2.25.0)
4. **Génère** le rapport HTML consolidé
5. **Upload** le rapport comme artifact (conservé 30 jours)
6. **Déploie** sur GitHub Pages (branches main/master uniquement)

## 📊 Accéder aux Rapports Allure

### Option 1 : Via GitHub Artifacts (Immédiat)

Après chaque exécution de workflow :

1. Aller sur l'onglet **Actions** du repository
2. Cliquer sur le workflow exécuté
3. Faire défiler jusqu'à **Artifacts**
4. Télécharger `allure-report.zip`
5. Extraire et ouvrir `index.html` dans un navigateur

### Option 2 : Via GitHub Pages (Automatique)

**Configuration initiale requise :**

1. **Activer GitHub Pages :**
   - Aller dans **Settings** > **Pages**
   - Source : Sélectionner `gh-pages` branch
   - Dossier : `/ (root)`
   - Sauvegarder

2. **Accéder au rapport :**
   ```
   https://<votre-username>.github.io/<nom-repo>/allure-report/
   ```
   
   Exemple :
   ```
   https://amenibentaieb.github.io/tests_orangwebapp/allure-report/
   ```

3. **Le rapport est automatiquement mis à jour :**
   - À chaque push sur `main` ou `master`
   - Le rapport est publié sur GitHub Pages
   - Accessible via l'URL ci-dessus

## 📁 Structure des Artifacts

Après chaque workflow, vous trouverez :

```
Artifacts:
├── playwright-report-chromium/     # Rapport HTML Playwright (Chromium)
├── playwright-report-firefox/      # Rapport HTML Playwright (Firefox)
├── playwright-report-webkit/       # Rapport HTML Playwright (WebKit)
├── test-results-chromium/          # Screenshots/vidéos (Chromium)
├── test-results-firefox/           # Screenshots/vidéos (Firefox)
├── test-results-webkit/            # Screenshots/vidéos (WebKit)
├── allure-results-chromium/        # Résultats bruts Allure (Chromium)
├── allure-results-firefox/         # Résultats bruts Allure (Firefox)
├── allure-results-webkit/          # Résultats bruts Allure (WebKit)
└── allure-report/                  # 🎯 Rapport Allure consolidé
```

## 🎨 Fonctionnalités du Rapport Allure en CI

Le rapport généré inclut :

- ✅ **Résultats consolidés** de tous les browsers
- ✅ **Graphiques et statistiques** détaillés
- ✅ **Timeline d'exécution** des tests
- ✅ **Screenshots automatiques** en cas d'échec
- ✅ **Catégorisation** (Failed, Flaky, Passed)
- ✅ **Informations d'environnement** (Browser, Base URL, etc.)
- ✅ **Historique** des exécutions (si GitHub Pages est activé)

## 🔧 Configuration GitHub Pages (Détaillé)

### Étape par Étape :

1. **Aller dans Settings du repository**
   ```
   https://github.com/<username>/<repo>/settings
   ```

2. **Naviguer vers Pages** (dans le menu latéral gauche)

3. **Configurer la source :**
   - **Source** : Deploy from a branch
   - **Branch** : `gh-pages`
   - **Folder** : `/ (root)`

4. **Cliquer sur Save**

5. **Attendre le déploiement** (quelques minutes)

6. **Vérifier l'URL** affichée :
   ```
   Your site is live at https://<username>.github.io/<repo>/
   ```

7. **Accéder au rapport Allure** :
   ```
   https://<username>.github.io/<repo>/allure-report/
   ```

### Remarques Importantes :

- ⚠️ Le rapport est **PUBLIC** si le repository est public
- ⚠️ Pour les repos privés, seuls les membres avec accès peuvent voir le rapport
- ⚠️ La première génération crée automatiquement la branche `gh-pages`
- ⚠️ Ne modifiez pas manuellement la branche `gh-pages`

## 📈 Historique des Rapports

Une fois GitHub Pages activé, Allure conserve l'historique :

- **Tendances** d'exécution au fil du temps
- **Comparaison** entre les exécutions
- **Graphiques de progression** (pass rate, durée, etc.)

L'historique est conservé automatiquement dans `allure-report/history/`.

## 🚀 Workflow Complet

### Développement Local :
```bash
cd "ui tests"
npm test
npm run test:allure
```

### CI/CD (Automatique) :
```
1. Push vers GitHub
2. GitHub Actions lance les tests
3. Tests s'exécutent sur 3 browsers
4. Résultats Allure générés
5. Rapport consolidé créé
6. Rapport publié sur GitHub Pages
7. Accessible via URL
```

## 🔍 Vérification du Workflow

### Vérifier que tout fonctionne :

1. **Faire un push vers main/master :**
   ```bash
   git add .
   git commit -m "test: verify Allure report generation"
   git push origin main
   ```

2. **Aller sur Actions :**
   ```
   https://github.com/<username>/<repo>/actions
   ```

3. **Vérifier les étapes :**
   - ✅ Run Playwright Tests (Chromium, Firefox, WebKit)
   - ✅ Generate Allure Report
   - ✅ Upload Allure Report (artifact)
   - ✅ Deploy to GitHub Pages

4. **Vérifier les artifacts :**
   - Cliquer sur le workflow
   - Descendre jusqu'à "Artifacts"
   - Vérifier que `allure-report` est présent

5. **Accéder au rapport sur GitHub Pages :**
   ```
   https://<username>.github.io/<repo>/allure-report/
   ```

## 📊 Résumé du Workflow

```yaml
jobs:
  test:
    # Exécute les tests sur 3 browsers en parallèle
    # Upload allure-results pour chaque browser
    
  generate-allure-report:
    needs: test  # Attend que tous les tests soient terminés
    # Télécharge tous les résultats
    # Installe Allure CLI
    # Génère le rapport consolidé
    # Upload comme artifact
    # Déploie sur GitHub Pages (main/master uniquement)
```

## 🎯 Avantages de cette Configuration

1. **Rapports Automatiques** - Générés à chaque push
2. **Consolidation Multi-Browser** - Un seul rapport pour tous les browsers
3. **Accessibilité** - Via GitHub Pages, pas besoin de télécharger
4. **Historique** - Tendances et comparaisons au fil du temps
5. **Artifacts** - Conservés 30 jours pour référence
6. **CI/CD Ready** - Intégration complète dans le pipeline

## 🛠️ Personnalisation

### Changer la rétention des artifacts :

```yaml
- name: Upload Allure Report
  uses: actions/upload-artifact@v4
  with:
    name: allure-report
    path: allure-report/
    retention-days: 60  # Augmenter à 60 jours
```

### Désactiver GitHub Pages :

Supprimer ou commenter cette section :

```yaml
- name: Deploy Allure Report to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  # ... reste de la configuration
```

### Changer la version d'Allure :

```yaml
- name: Install Allure CLI
  run: |
    wget https://github.com/allure-framework/allure2/releases/download/2.26.0/allure-2.26.0.tgz
    # ... reste de l'installation
```

## 📚 Ressources

- **GitHub Actions Documentation** : https://docs.github.com/en/actions
- **GitHub Pages Documentation** : https://docs.github.com/en/pages
- **Allure Documentation** : https://docs.qameta.io/allure/
- **peaceiris/actions-gh-pages** : https://github.com/peaceiris/actions-gh-pages

## ✅ Checklist de Configuration

- [x] Workflow CI mis à jour
- [x] Upload des résultats Allure configuré
- [x] Job de génération du rapport ajouté
- [x] Déploiement GitHub Pages configuré
- [ ] **Activer GitHub Pages dans Settings** (à faire manuellement)
- [ ] Vérifier le premier déploiement
- [ ] Accéder au rapport via l'URL GitHub Pages

## 🎉 Prêt à l'Emploi

Le workflow est maintenant configuré ! 

**Prochaine action :**
1. Pushez vers GitHub
2. Allez dans Settings > Pages
3. Activez GitHub Pages
4. Accédez à votre rapport Allure !

**URL du rapport (après activation) :**
```
https://<votre-username>.github.io/<nom-repo>/allure-report/
```

Bonne automatisation ! 🚀📊✨
