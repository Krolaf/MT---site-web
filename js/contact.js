// ===== CONTACT JS - PAGE CONTACT =====

// Classe pour gérer le formulaire de contact
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.setupEventListeners();
            this.setupFormValidation();
        }
    }
    
    setupEventListeners() {
        // Gestion de la soumission du formulaire
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Validation en temps réel
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this));
            input.addEventListener('input', this.clearFieldError.bind(this));
        });
        
        // Gestion des boutons sociaux
        this.setupSocialButtons();
    }
    
    setupFormValidation() {
        // Ajouter des attributs de validation
        const nameInput = this.form.querySelector('#name');
        const emailInput = this.form.querySelector('#email');
        const messageInput = this.form.querySelector('#message');
        
        if (nameInput) {
            nameInput.setAttribute('minlength', '2');
            nameInput.setAttribute('maxlength', '50');
        }
        
        if (emailInput) {
            emailInput.setAttribute('type', 'email');
        }
        
        if (messageInput) {
            messageInput.setAttribute('minlength', '10');
            messageInput.setAttribute('maxlength', '1000');
        }
    }
    
    validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Validation selon le type de champ
        switch (field.type) {
            case 'email':
                if (!this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Veuillez entrer une adresse email valide.';
                }
                break;
            case 'text':
                if (field.id === 'name') {
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Le nom doit contenir au moins 2 caractères.';
                    }
                }
                break;
            case 'textarea':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Le message doit contenir au moins 10 caractères.';
                }
                break;
        }
        
        // Validation des champs requis
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Ce champ est obligatoire.';
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        field.style.borderColor = 'var(--color-error)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--color-error);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            font-weight: 500;
        `;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Valider tous les champs
        const fields = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField({ target: field })) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showNotification('Veuillez corriger les erreurs dans le formulaire.', 'error');
            return;
        }
        
        // Récupérer les données du formulaire
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simuler l'envoi
        await this.sendFormData(data);
    }
    
    async sendFormData(data) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Afficher l'état de chargement
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        try {
            // Simulation d'un délai d'envoi
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulation d'une réponse réussie
            this.showNotification('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
            this.form.reset();
            
            // Log des données (en développement)
            console.log('Données du formulaire:', data);
            
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            this.showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
        } finally {
            // Restaurer le bouton
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        const bgColor = type === 'success' ? 'var(--color-success)' : 
                       type === 'error' ? 'var(--color-error)' : 
                       'var(--color-primary)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            color: white;
            font-weight: 500;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            background-color: ${bgColor};
            box-shadow: var(--shadow-lg);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    setupSocialButtons() {
        // Les boutons sociaux ont maintenant des vrais liens avec target="_blank"
        // Pas besoin de gestion JavaScript supplémentaire car les liens fonctionnent directement
        
        // Gestion du bouton Discord (pour la compatibilité)
        const discordBtn = document.querySelector('.btn-secondary');
        if (discordBtn && discordBtn.textContent.includes('Discord')) {
            // Le lien Discord est déjà configuré dans le HTML
            // Pas besoin de gestion JavaScript supplémentaire
        }
    }
}

// Classe pour gérer les FAQ
class FAQManager {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('p');
            
            if (question && answer) {
                // Ajouter un indicateur de toggle
                const toggle = document.createElement('span');
                toggle.className = 'faq-toggle';
                toggle.innerHTML = '▼';
                toggle.style.cssText = `
                    float: right;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                    color: var(--color-primary);
                `;
                
                question.appendChild(toggle);
                
                // Masquer la réponse par défaut
                answer.style.display = 'none';
                answer.style.transition = 'all 0.3s ease';
                
                // Gestion du clic
                question.addEventListener('click', function() {
                    const isOpen = answer.style.display !== 'none';
                    
                    // Fermer toutes les autres FAQ
                    this.faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherAnswer = otherItem.querySelector('p');
                            const otherToggle = otherItem.querySelector('.faq-toggle');
                            if (otherAnswer && otherToggle) {
                                otherAnswer.style.display = 'none';
                                otherToggle.style.transform = 'rotate(0deg)';
                            }
                        }
                    });
                    
                    // Toggle de l'élément actuel
                    if (isOpen) {
                        answer.style.display = 'none';
                        toggle.style.transform = 'rotate(0deg)';
                    } else {
                        answer.style.display = 'block';
                        toggle.style.transform = 'rotate(180deg)';
                    }
                }.bind(this));
            }
        });
    }
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    new ContactForm();
    new FAQManager();
    
    // Animation des éléments de contact
    animateContactElements();
});

// Animation des éléments de contact
function animateContactElements() {
    const contactMethods = document.querySelectorAll('.contact-method');
    const faqItems = document.querySelectorAll('.faq-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observer les méthodes de contact
    contactMethods.forEach(method => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(20px)';
        method.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(method);
    });
    
    // Observer les FAQ
    faqItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Fonctions utilitaires pour la page contact
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Adresse email copiée !', 'success');
        }).catch(() => {
            showNotification('Impossible de copier l\'adresse email.', 'error');
        });
    } else {
        // Fallback pour les navigateurs plus anciens
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Adresse email copiée !', 'success');
        } catch (err) {
            showNotification('Impossible de copier l\'adresse email.', 'error');
        }
        document.body.removeChild(textArea);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        color: white;
        font-weight: 500;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    const bgColor = type === 'success' ? 'var(--color-success)' : 
                   type === 'error' ? 'var(--color-error)' : 
                   'var(--color-primary)';
    
    notification.style.backgroundColor = bgColor;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-suppression après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 