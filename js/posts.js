// ===== POSTS JS - PAGE POSTS =====

// Classe pour gérer les posts
class PostsManager {
    constructor() {
        this.posts = [];
        this.container = document.getElementById('posts-container');
        this.init();
    }
    
    async init() {
        try {
            await this.loadPosts();
            this.renderPosts();
            this.setupEventListeners();
        } catch (error) {
            console.error('Erreur lors du chargement des posts:', error);
            this.showError();
        }
    }
    
    async loadPosts() {
        try {
            const lang = localStorage.getItem('language') || 'fr';
            const response = await fetch(`posts_${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.posts = await response.json();
        } catch (error) {
            // Si le fichier posts.json n'existe pas, utiliser des données de fallback
            console.warn('Fichier posts.json non trouvé, utilisation des données de fallback');
            this.posts = this.getFallbackPosts();
        }
    }
    
    getFallbackPosts() {
        return [
            {
                id: 1,
                title: "Nouveau système de combat",
                excerpt: "Nous avons complètement revu le système de combat pour le rendre plus fluide et stratégique. Découvrez les nouvelles mécaniques !",
                image: "combat-system.jpg",
                link: "https://example.com/combat-system",
                date: "2024-01-15",
                category: "Gameplay"
            },
            {
                id: 2,
                title: "Étage 50 : Le Royaume de Glace",
                excerpt: "Explorez le mystérieux 50ème étage de la tour, un monde glacé rempli de créatures légendaires et de trésors cachés.",
                image: "ice-kingdom.jpg",
                link: "https://example.com/ice-kingdom",
                date: "2024-01-10",
                category: "Contenu"
            },
            {
                id: 3,
                title: "Mise à jour de l'interface utilisateur",
                excerpt: "L'interface utilisateur a été modernisée pour une meilleure expérience de jeu. Plus intuitif, plus beau !",
                image: "ui-update.jpg",
                link: "https://example.com/ui-update",
                date: "2024-01-05",
                category: "Interface"
            }
        ];
    }
    
    renderPosts() {
        if (!this.container) return;
        
        if (this.posts.length === 0) {
            this.container.innerHTML = `
                <div class="no-posts">
                    <h3>Aucun post disponible</h3>
                    <p>Revenez bientôt pour découvrir nos dernières actualités !</p>
                </div>
            `;
            return;
        }
        
        const postsHTML = this.posts.map(post => this.createPostCard(post)).join('');
        this.container.innerHTML = postsHTML;
    }
    
    createPostCard(post) {
        const date = new Date(post.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        return `
            <article class="post-card" data-post-id="${post.id}">
                <div class="post-image">
                    <!-- À compléter : image réelle du post -->
                    <span>Image: ${post.image}</span>
                </div>
                <div class="post-content">
                    <div class="post-category">${post.category}</div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <span class="post-date">${date}</span>
                        <a href="${post.link}" class="post-link" target="_blank" rel="noopener noreferrer">
                            Lire la suite →
                        </a>
                    </div>
                </div>
            </article>
        `;
    }
    
    setupEventListeners() {
        // Gestion des clics sur les cartes de posts
        const postCards = document.querySelectorAll('.post-card');
        postCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Ne pas déclencher si on clique sur le lien "Lire la suite"
                if (e.target.classList.contains('post-link')) {
                    return;
                }
                
                const postId = this.dataset.postId;
                const post = this.posts.find(p => p.id == postId);
                if (post) {
                    this.showPostModal(post);
                }
            }.bind(this));
        });
        
        // Gestion de la newsletter
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }
    }
    
    showPostModal(post) {
        const modal = document.createElement('div');
        modal.className = 'post-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--color-bg-primary);
            border-radius: var(--border-radius-lg);
            padding: var(--spacing-xl);
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--color-text-secondary);
        `;
        
        const date = new Date(post.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        modalContent.innerHTML = `
            <div class="post-category">${post.category}</div>
            <h2>${post.title}</h2>
            <div class="post-date">${date}</div>
            <p>${post.excerpt}</p>
            <p>Ceci est un aperçu du post. Pour lire l'article complet, cliquez sur le lien ci-dessous.</p>
            <a href="${post.link}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Lire l'article complet
            </a>
        `;
        
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Fermer le modal
        const closeModal = () => {
            modal.remove();
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Fermer avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const email = e.target.querySelector('input[type="email"]').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        // Validation basique de l'email
        if (!this.isValidEmail(email)) {
            this.showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }
        
        // Simulation d'inscription
        submitBtn.textContent = 'Inscription...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            this.showNotification('Inscription réussie ! Vous recevrez bientôt nos actualités.', 'success');
            e.target.reset();
            submitBtn.textContent = 'S\'abonner';
            submitBtn.disabled = false;
        }, 1500);
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showNotification(message, type = 'info') {
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
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    showError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="error-message">
                    <h3>Erreur de chargement</h3>
                    <p>Impossible de charger les posts. Veuillez réessayer plus tard.</p>
                    <button onclick="location.reload()" class="btn btn-primary">
                        Recharger la page
                    </button>
                </div>
            `;
        }
    }
    
    // Méthode pour filtrer les posts par catégorie
    filterByCategory(category) {
        const filteredPosts = category === 'all' ? 
            this.posts : 
            this.posts.filter(post => post.category === category);
        
        this.renderFilteredPosts(filteredPosts);
    }
    
    renderFilteredPosts(posts) {
        if (!this.container) return;
        
        if (posts.length === 0) {
            this.container.innerHTML = `
                <div class="no-posts">
                    <h3>Aucun post trouvé</h3>
                    <p>Aucun post ne correspond à ce filtre.</p>
                </div>
            `;
            return;
        }
        
        const postsHTML = posts.map(post => this.createPostCard(post)).join('');
        this.container.innerHTML = postsHTML;
        this.setupEventListeners();
    }
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    new PostsManager();
    
    // Gestion des widgets sociaux (simulation)
    setupSocialWidgets();
});

// Simulation des widgets sociaux
function setupSocialWidgets() {
    const twitterWidget = document.querySelector('.twitter-widget');
    const instagramWidget = document.querySelector('.instagram-widget');
    
    if (twitterWidget) {
        // Simuler le chargement d'un widget Twitter
        setTimeout(() => {
            twitterWidget.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <h4>Derniers tweets</h4>
                    <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 8px;">
                        <p style="font-size: 14px; margin: 0;">Nouveau système de combat en développement ! 🗡️⚔️</p>
                        <small style="color: #666;">Il y a 2h</small>
                    </div>
                    <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 8px;">
                        <p style="font-size: 14px; margin: 0;">L'étage 50 approche... Préparez-vous ! ❄️</p>
                        <small style="color: #666;">Il y a 1j</small>
                    </div>
                </div>
            `;
        }, 1000);
    }
    
    if (instagramWidget) {
        // Simuler le chargement d'un widget Instagram
        setTimeout(() => {
            instagramWidget.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <h4>Dernières photos</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
                        <div style="background: #f0f0f0; height: 80px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                            Screenshot 1
                        </div>
                        <div style="background: #f0f0f0; height: 80px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                            Screenshot 2
                        </div>
                    </div>
                </div>
            `;
        }, 1500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    
    // S'assurer que nous sommes sur la page des posts
    if (!postsContainer) {
        return;
    }

    const loadPosts = async () => {
        const lang = localStorage.getItem('language') || 'fr';
        const loadingText = lang === 'fr' ? 'Chargement des posts...' : 'Loading posts...';
        postsContainer.innerHTML = `<p>${loadingText}</p>`;
        
        try {
            const response = await fetch(`posts_${lang}.json`);
            if (!response.ok) {
                throw new Error(`Impossible de charger posts_${lang}.json`);
            }
            const posts = await response.json();
            displayPosts(posts, lang);
        } catch (error) {
            console.error('Erreur de chargement des posts:', error);
            const errorText = lang === 'fr' ? 'Erreur de chargement des posts.' : 'Error loading posts.';
            postsContainer.innerHTML = `<p>${errorText}</p>`;
        }
    };

    const displayPosts = (posts, lang) => {
        const noPostsText = lang === 'fr' ? 'Aucun post à afficher pour le moment.' : 'No posts to display at the moment.';
        if (!posts || posts.length === 0) {
            postsContainer.innerHTML = `<p>${noPostsText}</p>`;
            return;
        }

        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-card');

            const postDate = new Date(post.date).toLocaleDateString(lang, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const publishText = lang === 'fr' ? 'Publié le' : 'Published on';

            postElement.innerHTML = `
                <h3 class="post-title">${post.title}</h3>
                <p class="post-meta">${publishText} ${postDate}</p>
                <div class="post-content">${post.content}</div>
            `;
            postsContainer.appendChild(postElement);
        });
    };

    // Écouter l'événement personnalisé envoyé par translation.js
    document.addEventListener('languageChanged', loadPosts);

    // Chargement initial
    loadPosts();
}); 