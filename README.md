# Médiéval Tower - Site Vitrine

Un site vitrine moderne et responsive pour le jeu vidéo "Médiéval Tower", développé en HTML, CSS et JavaScript pur.

## 🎮 À propos du projet

Médiéval Tower est un RPG / Simulation / Gestion où le joueur explore une tour infinie, chaque étage étant un monde unique. Liberté, effort et immersion sont au cœur du gameplay.

## 📁 Structure du projet

```
MT - site web/
├── index.html          # Page d'accueil
├── about.html          # Page À propos
├── posts.html          # Page Posts et actualités
├── contact.html        # Page Contact
├── posts.json          # Données des posts (exemple)
├── css/
│   ├── global.css      # Styles globaux et variables CSS
│   ├── index.css       # Styles spécifiques à la page d'accueil
│   ├── about.css       # Styles spécifiques à la page À propos
│   ├── posts.css       # Styles spécifiques à la page Posts
│   └── contact.css     # Styles spécifiques à la page Contact
├── js/
│   ├── global.js       # JavaScript global (navigation, animations)
│   ├── posts.js        # Gestion des posts et widgets sociaux
│   └── contact.js      # Gestion du formulaire de contact
└── README.md           # Ce fichier
```

## 🎨 Design et Palette de couleurs

### Palette médiévale/fantasy
- **Couleur primaire** : `#663511` (Saddle Brown - café foncé)
- **Couleur secondaire** : `#ce9d5e` (Tan - café au lait)
- **Couleur d'accent** : `#925b25` (Peru - café doré)
- **Fond principal** : `#FAF9F6` (Old Lace - fond clair)
- **Fond secondaire** : `#F5F5DC` (Beige)
- **Texte principal** : `#2F2F2F` (sombre)
- **Texte secondaire** : `#666666`

## 🚀 Fonctionnalités

### Page d'accueil (`index.html`)
- Section hero avec pitch du jeu
- Caractéristiques principales du jeu
- Aperçu avec screenshots
- Call-to-action pour rejoindre Discord

### Page À propos (`about.html`)
- Histoire du projet
- Inspirations (Sword Art Online, Tower of God, The Elder Scrolls)
- Statistiques de l'équipe

### Page Posts (`posts.html`)
- Widgets réseaux sociaux (Twitter/X, Instagram)
- Affichage dynamique des posts depuis `posts.json`
- Système de newsletter
- Modal pour aperçu des posts

### Page Contact (`contact.html`)
- Formulaire de contact avec validation
- Méthodes de contact alternatives
- Section FAQ interactive
- Liens vers réseaux sociaux

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique et accessible
- **CSS3** : 
  - Variables CSS pour la cohérence des couleurs
  - Flexbox et Grid pour la mise en page
  - Animations et transitions fluides
  - Design responsive (mobile-first)
- **JavaScript ES6+** :
  - Classes pour l'organisation du code
  - Fetch API pour charger les données
  - Intersection Observer pour les animations
  - Validation de formulaires

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints :
- **Mobile** : < 480px
- **Tablet** : 480px - 768px
- **Desktop** : > 768px

## 🔧 Installation et utilisation

### Déploiement local
1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans votre navigateur
3. Ou utilisez un serveur local :
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js
   npx serve .
   ```

### Déploiement sur Hostinger
1. Uploadez tous les fichiers dans le dossier public_html
2. Assurez-vous que `posts.json` est accessible
3. Le site est prêt !

## 📝 Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans `css/global.css` :
```css
:root {
    --color-primary: #663511;
    --color-secondary: #ce9d5e;
    /* ... autres couleurs */
}
```

### Ajouter des posts
Modifiez le fichier `posts.json` :
```json
{
    "id": 7,
    "title": "Nouveau post",
    "excerpt": "Description du post...",
    "image": "image.jpg",
    "link": "https://example.com/post",
    "date": "2024-01-20",
    "category": "Catégorie"
}
```

### Intégrer de vrais widgets sociaux
Remplacez les placeholders dans `posts.html` :
```html
<!-- Widget Twitter/X -->
<a class="twitter-timeline" href="https://twitter.com/Medieval_tower">
    Tweets par @Medieval_tower
</a>

<!-- Widget Instagram -->
<iframe src="https://www.instagram.com/medievaltower/embed" />
```

## 🖼️ Images et contenu

### Placeholders actuels
Le site utilise des placeholders pour les images. Remplacez-les par :
- Images réelles du jeu
- Screenshots de gameplay
- Concept art
- Logos et icônes

### Sections à compléter
- Images principales du jeu
- Screenshots de gameplay
- Concept art du projet
- Images des inspirations
- Widgets réseaux sociaux réels

## 🔗 Liens configurés

### Réseaux sociaux
Les liens suivants sont déjà configurés dans le site :
- **Discord** : https://discord.gg/vxWWrrFn
- **X / Twitter** : https://x.com/Medieval_tower
- **Instagram** : https://www.instagram.com/medievaltower/
- **LinkedIn** : https://www.linkedin.com/company/médiéval-tower/about/?viewAsMember=true

### Formulaire de contact
Configurez l'envoi du formulaire dans `js/contact.js` :
```javascript
// Remplacez la simulation par un vrai envoi
async sendFormData(data) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    // Gérer la réponse
}
```

## 📊 Performance

### Optimisations incluses
- Images optimisées (à remplacer par vos vraies images)
- CSS et JS minifiés (pour la production)
- Lazy loading des images
- Animations optimisées avec Intersection Observer

### Métriques recommandées
- Temps de chargement : < 3 secondes
- Score Lighthouse : > 90
- Mobile-friendly : 100%

## 🐛 Dépannage

### Problèmes courants
1. **Posts ne se chargent pas** : Vérifiez que `posts.json` est accessible
2. **Styles ne s'appliquent pas** : Vérifiez les chemins des fichiers CSS
3. **JavaScript ne fonctionne pas** : Ouvrez la console du navigateur pour les erreurs

### Support navigateur
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 Licence

Ce projet est fourni comme exemple. Vous êtes libre de l'utiliser et de le modifier pour votre propre projet.

## 🤝 Contribution

Pour améliorer ce site :
1. Testez sur différents appareils
2. Vérifiez l'accessibilité
3. Optimisez les performances
4. Ajoutez de nouvelles fonctionnalités

## 📞 Support

Pour toute question ou problème :
- Vérifiez la console du navigateur
- Consultez la documentation des technologies utilisées
- Testez sur différents navigateurs

---

**Médiéval Tower** - Un RPG immersif dans une tour infinie 🏰⚔️ 