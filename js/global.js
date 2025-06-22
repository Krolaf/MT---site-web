// ===== GLOBAL JS - MÉDIÉVAL TOWER =====

// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll pour les ancres
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments avec animation
    const animatedElements = document.querySelectorAll('.feature-card, .screenshot-item, .inspiration-card, .post-card, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Gestion des formulaires
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi de formulaire
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simuler un délai d'envoi
            setTimeout(() => {
                submitBtn.textContent = 'Envoyé !';
                submitBtn.style.backgroundColor = 'var(--color-success)';
                
                // Réinitialiser après 3 secondes
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    form.reset();
                }, 3000);
            }, 1500);
        });
    });
    
    // Gestion des liens externes
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Effet de parallaxe simple pour le hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Gestion des tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--color-bg-dark);
                color: var(--color-text-light);
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
                box-shadow: var(--shadow-md);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });
    
    // Gestion des cookies (banner simple)
    if (!localStorage.getItem('cookiesAccepted')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--color-bg-dark);
            color: var(--color-text-light);
            padding: 20px;
            text-align: center;
            z-index: 1001;
            box-shadow: var(--shadow-lg);
        `;
        
        cookieBanner.innerHTML = `
            <p>Ce site utilise des cookies pour améliorer votre expérience.</p>
            <button onclick="acceptCookies()" style="
                background: var(--color-primary);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                margin-left: 10px;
                cursor: pointer;
            ">Accepter</button>
        `;
        
        document.body.appendChild(cookieBanner);
        
        window.acceptCookies = function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.remove();
        };
    }
    
    // Gestion du thème sombre/clair (optionnel)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
        });
        
        // Restaurer le thème sauvegardé
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
        }
    }
    
    // Gestion des erreurs 404
    if (window.location.pathname.includes('404')) {
        console.log('Page 404 détectée');
        // Redirection automatique après 5 secondes
        setTimeout(() => {
            window.location.href = '/';
        }, 5000);
    }
    
    // Performance monitoring
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Temps de chargement: ${loadTime}ms`);
        }
    });
    
    // Gestion des erreurs JavaScript
    window.addEventListener('error', function(e) {
        console.error('Erreur JavaScript:', e.error);
        // Ici vous pourriez envoyer l'erreur à un service de monitoring
    });
});

// Fonctions utilitaires
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Gestion du responsive
function handleResize() {
    const width = window.innerWidth;
    const isMobile = width <= 768;
    
    // Ajuster les styles selon la taille d'écran
    if (isMobile) {
        document.body.classList.add('mobile');
        document.body.classList.remove('desktop');
    } else {
        document.body.classList.add('desktop');
        document.body.classList.remove('mobile');
    }
}

// Écouter les changements de taille d'écran
window.addEventListener('resize', debounce(handleResize, 250));
handleResize(); // Appel initial 