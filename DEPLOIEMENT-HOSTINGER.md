# 🚀 Guide de déploiement sur Hostinger

## 📋 Prérequis
- Compte Hostinger actif
- Accès au panneau de contrôle Hostinger
- Adresse email pour recevoir les messages

## 📁 Fichiers à uploader

### **Fichiers principaux :**
```
public_html/
├── index.html
├── about.html
├── posts.html
├── contact.html
├── posts.json
├── contact-form.php
├── contact_log.txt           ← SERA CRÉÉ AUTOMATIQUEMENT
├── css/
│   ├── global.css
│   ├── index.css
│   ├── about.css
│   ├── posts.css
│   └── contact.css
└── js/
    ├── global.js
    ├── posts.js
    └── contact-php.js
```

## ⚙️ Configuration étape par étape

### **1. Upload des fichiers**
1. Connectez-vous à votre panneau Hostinger
2. Allez dans "Gestionnaire de fichiers"
3. Naviguez vers le dossier `public_html`
4. Uploadez tous les fichiers du projet

### **2. Configuration de l'email**
L'adresse email de destination est déjà configurée dans `contact-form.php` :
   ```php
   $to = 'contact@medievaltower.com';
   ```
Vous pouvez la modifier si nécessaire.

### **3. Test du formulaire**
1. Allez sur votre site : `votresite.com/contact.html`
2. Remplissez le formulaire de test
3. Vérifiez que vous recevez l'email
4. Vérifiez le fichier `contact_log.txt` dans le dossier racine

## 🔧 Dépannage

### **Problème : Les emails ne sont pas reçus**
**Solutions :**
1. Vérifiez que l'adresse email dans `contact-form.php` est correcte
2. Vérifiez vos spams
3. Testez avec une adresse Gmail/Outlook
4. Contactez le support Hostinger si nécessaire

### **Problème : Erreur 500**
**Solutions :**
1. Vérifiez que PHP est activé sur votre hébergement
2. Vérifiez les permissions du fichier `contact-form.php` (644)
3. Vérifiez les logs d'erreur dans le panneau Hostinger

### **Problème : Formulaire ne fonctionne pas**
**Solutions :**
1. Vérifiez que `contact-php.js` est bien uploadé
2. Ouvrez la console du navigateur (F12) pour voir les erreurs
3. Vérifiez que `contact-form.php` est accessible via `votresite.com/contact-form.php`

## 📧 Configuration email avancée

### **Pour utiliser votre domaine email :**
Si vous avez une adresse email avec votre domaine (ex: contact@medievaltower.com) :

1. Configurez l'email dans Hostinger
2. Utilisez cette adresse dans `contact-form.php`
3. Testez l'envoi

### **Pour utiliser Gmail/Outlook :**
1. Utilisez votre adresse Gmail/Outlook dans `contact-form.php`
2. Vérifiez vos spams au début
3. Marquez les emails comme "non spam" si nécessaire

## 📊 Monitoring

### **Fichier de log :**
Le fichier `contact_log.txt` contient tous les messages reçus :
```
2024-01-20 14:30:25 - Jean Dupont (jean@example.com) - Question générale
2024-01-20 15:45:12 - Marie Martin (marie@example.com) - Suggestion
```

### **Vérification des logs :**
1. Allez dans le gestionnaire de fichiers Hostinger
2. Ouvrez `contact_log.txt`
3. Vérifiez les entrées récentes

## 🔒 Sécurité

### **Protection anti-spam :**
Le script inclut :
- Validation des données
- Protection contre les injections
- Limitation de la taille des messages

### **Recommandations :**
1. Changez régulièrement l'adresse email de destination
2. Surveillez le fichier de log
3. Bloquez les adresses IP suspectes si nécessaire

## 🚀 Test final

### **Checklist de déploiement :**
- [ ] Tous les fichiers sont uploadés
- [ ] L'email de destination est configuré
- [ ] Le formulaire fonctionne
- [ ] Les emails sont reçus
- [ ] Le fichier de log se remplit
- [ ] Le site est accessible sur mobile
- [ ] Tous les liens fonctionnent

### **Test complet :**
1. Testez le formulaire depuis différents navigateurs
2. Testez depuis mobile
3. Vérifiez la réception des emails
4. Vérifiez le fichier de log

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez ce guide
2. Consultez les logs d'erreur Hostinger
3. Contactez le support Hostinger
4. Vérifiez la console du navigateur (F12)

---

**🎮 Votre site Médiéval Tower est maintenant prêt avec un formulaire de contact fonctionnel !** 