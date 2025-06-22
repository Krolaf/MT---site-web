document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.querySelector('.language-selector');

    // S'il n'y a pas de sélecteur de langue sur la page, on ne fait rien.
    if (!languageSelector) {
        return;
    }

    const setLanguage = async (lang) => {
        // Mettre à jour le stockage local
        localStorage.setItem('language', lang);
        
        // Charger les nouvelles traductions
        await loadTranslations(lang);
        
        // Annoncer le changement de langue aux autres scripts via un événement personnalisé
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
    };

    const loadTranslations = async (lang) => {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                console.error(`Impossible de charger ${lang}.json`);
                return;
            }
            const translations = await response.json();
            
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                if (translations[key]) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        // Gérer les placeholders pour les champs de formulaire
                        el.placeholder = translations[key];
                    } else {
                        el.innerHTML = translations[key];
                    }
                }
            });

            document.documentElement.lang = lang;

            // Mettre à jour le drapeau actif
            document.querySelectorAll('.lang-flag').forEach(flag => {
                flag.classList.toggle('active', flag.dataset.lang === lang);
            });

        } catch (error) {
            console.error('Erreur lors du chargement des traductions:', error);
        }
    };

    languageSelector.addEventListener('click', (e) => {
        const targetFlag = e.target.closest('.lang-flag');
        if (targetFlag && !targetFlag.classList.contains('active')) {
            const lang = targetFlag.dataset.lang;
            setLanguage(lang);
        }
    });

    // Chargement initial
    const currentLang = localStorage.getItem('language') || 'fr';
    setLanguage(currentLang);
}); 