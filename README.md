# Green Hash Maroc - Site Web Complet

## 🌿 Présentation

**Green Hash Maroc** est le premier écosystème marocain dédié à la blockchain et à l'énergie verte. Ce site web complet présente le projet avec toutes ses fonctionnalités, animations et interactions dynamiques.

## 🚀 Fonctionnalités Principales

### ✅ Pages Web Complètes
- **Accueil** - Animation d'intro avec Vanta.js et statistiques en temps réel
- **Vision & Mission** - Présentation du concept et des valeurs
- **Mining Pool** - Tableau de bord avec graphiques et statistiques
- **Exchange & Wallet** - Interface fonctionnelle d'échange crypto
- **Services Blockchain Pro** - Services pour entreprises marocaines
- **Innovation & Technologie Verte** - Présentation des technologies vertes
- **Investir** - Options d'investissement avec simulateurs
- **Communauté & Éducation** - École Green Hash et ressources
- **Contact & Support** - Formulaires et informations de contact
- **Connect Wallet** - Intégration Web3 avec MetaMask et autres wallets

### 🎨 Design & Expérience
- **Design moderne** avec palette de couleurs naturelles (vert, crème, charbon)
- **Animations fluides** avec scroll reveal et effets de survol
- **Navigation améliorée** avec transitions et effets visuels
- **Responsive design** optimisé pour tous les appareils
- **Multilingue** (Français, Anglais, Arabe)

### 🔧 Fonctionnalités Techniques
- **API Backend** avec Flask et base de données SQLite
- **Web3 Integration** pour la connexion wallet
- **Graphiques interactifs** avec Chart.js
- **Simulateurs** pour minage et investissement
- **Système de notifications** en temps réel
- **Animations Vanta.js** pour l'arrière-plan

## 📁 Structure du Projet

```
/
├── index.html              # Page d'accueil
├── vision.html             # Vision & Mission
├── pool.html               # Mining Pool
├── exchange.html           # Exchange & Wallet
├── services.html           # Services Blockchain Pro
├── innovation.html         # Innovation & Technologie Verte
├── invest.html             # Investir
├── community.html          # Communauté & Éducation
├── contact.html            # Contact & Support
├── connect.html            # Connect Wallet
├── simulators.html         # Simulateurs interactifs
├── app.py                  # Backend Flask API
├── main.js                 # JavaScript principal
├── connect.js              # Web3 wallet connection
├── simulators.js           # Calculateurs interactifs
├── enhanced-nav.js         # Navigation améliorée
├── translate.js            # Système de traduction
├── run.py                  # Lanceur du serveur
├── requirements.txt        # Dépendances Python
└── README.md               # Ce fichier
```

## 🛠️ Installation et Lancement

### Prérequis
- Python 3.8+
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

### Installation

1. **Cloner le projet**
```bash
git clone [URL_DU_REPO]
cd green-hash-maroc
```

2. **Installer les dépendances Python**
```bash
pip install -r requirements.txt
```

3. **Lancer le serveur de développement**
```bash
python run.py
```

4. **Accéder au site**
Ouvrez votre navigateur et allez à: `http://localhost:5000`

## 🎯 Utilisation

### Navigation
- Utilisez le menu de navigation pour accéder aux différentes sections
- Le site est entièrement responsive et fonctionne sur tous les appareils
- La sélecteur de langue permet de basculer entre FR/EN/AR

### Fonctionnalités Web3
- **Connect Wallet**: Support de MetaMask, Trust Wallet, WalletConnect, Ledger
- **Simulateurs**: Calculez vos gains potentiels de minage et d'investissement
- **Tableau de bord**: Accédez à vos statistiques personnalisées

### Simulateurs
- **Simulateur de Mining**: Calculez vos revenus selon votre puissance de calcul
- **Simulateur d'Investissement**: Estimez vos retours sur investissement
- **Comparateur**: Comparez différentes stratégies d'investissement

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans les variables CSS:
- `--sage`: #87A96B (vert foncé)
- `--mint`: #00B894 (vert clair)
- `--charcoal`: #2D3436 (charbon)
- `--cream`: #F7F3E9 (crème)
- `--gold`: #F39C12 (or)

### Animations
Les animations peuvent être personnalisées dans `main.js` et `enhanced-nav.js`:
- Scroll animations
- Hover effects
- Page transitions
- Loading states

## 🔌 API Endpoints

### Backend Flask (app.py)
- `GET /api/stats/realtime` - Statistiques en temps réel
- `GET /api/mining/hashrate` - Historique du hashrate
- `GET /api/exchange/rates` - Taux de change
- `POST /api/wallet/connect` - Connexion wallet
- `POST /api/invest/create` - Création d'investissement
- `POST /api/contact/send` - Envoi de message

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints optimisés pour :
- **Mobile**: < 768px
- **Tablette**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Compatibilité

### Navigateurs Supportés
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Web3 Wallets
- MetaMask
- Trust Wallet
- WalletConnect
- Ledger (simulation)

## 📊 Performance

### Optimisations
- Images optimisées et compressées
- Code JavaScript minifié
- CSS avec purge des classes non utilisées
- Animations optimisées pour 60fps
- Lazy loading des images

### Métriques
- Temps de chargement: < 3 secondes
- Score Lighthouse: > 90
- Taille totale: < 5MB

## 🎮 Fonctionnalités Avancées

### Animations
- **Vanta.js**: Fond animé avec des oiseaux
- **Chart.js**: Graphiques interactifs
- **Anime.js**: Animations de texte et éléments
- **Splide**: Carrousels et sliders

### Interactions
- **Web3**: Connexion wallet avec signature
- **Simulateurs**: Calculs en temps réel
- **Notifications**: Feedback utilisateur
- **Formulaires**: Validation et soumission

## 🔒 Sécurité

### Bonnes Pratiques
- Validation des entrées utilisateur
- Protection contre les attaques XSS
- HTTPS recommandé en production
- CORS configuré pour sécurité

### Web3 Sécurité
- Vérification des adresses wallet
- Signature des transactions
- Protection contre les attaques de phishing

## 🚀 Déploiement

### Production
```bash
# Installer Gunicorn
pip install gunicorn

# Lancer avec Gunicorn
gunicorn app:app -w 4 -b 0.0.0.0:5000
```

### Docker (optionnel)
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "app:app", "-w", "4", "-b", "0.0.0.0:5000"]
```

## 📄 Licence

Ce projet est créé pour Green Hash Maroc. Tous droits réservés.

## 🤝 Contribution

Pour contribuer au projet :
1. Fork le repository
2. Créez une branche pour votre feature
3. Commitez vos changements
4. Push vers la branche
5. Créez une Pull Request

## 📞 Support

Pour toute question ou support technique :
- Email: contact@greenhash.ma
- Téléphone: +212 6 13 45 26 41
- Telegram: @GreenHashSupport

---

**Green Hash Maroc** - Mining the Future. The Green Way. 🌿⛏️