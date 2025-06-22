// ===== CONTACT JS AVEC PHP - PAGE CONTACT =====

// Version modifiée pour utiliser le script PHP sur Hostinger

class ContactFormPHP {
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
        
        // Envoyer via PHP
        await this.sendFormDataPHP(data);
    }
    
    async sendFormDataPHP(data) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Afficher l'état de chargement
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        try {
            // Envoi vers le script PHP
            const response = await fetch('contact-form.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                this.showNotification('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
                this.form.reset();
            } else {
                throw new Error(result.error || 'Erreur lors de l\'envoi');
            }
            
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
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    new ContactFormPHP();
    new FAQManager(); // Garder la classe FAQ existante
    
    // Animation des éléments de contact
    animateContactElements();
});

// Garder les autres fonctions existantes...
// (FAQManager, animateContactElements, etc.) 