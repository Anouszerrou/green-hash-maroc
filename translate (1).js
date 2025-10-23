// Green Hash Maroc - Translation System
// Supports French, English, and Arabic

const translations = {
    // French (default)
    fr: {
        // Navigation
        nav_home: "Accueil",
        nav_vision: "Vision",
        nav_pool: "Mining Pool",
        nav_exchange: "Exchange",
        nav_services: "Services",
        nav_invest: "Investir",
        nav_community: "Communauté",
        nav_contact: "Contact",
        
        // Hero Section
        hero_title: "Mining the Future. The Green Way.",
        hero_subtitle: "Green Hash Maroc — Blockchain & Énergie Verte Unies",
        hero_discover: "Découvrir le projet",
        hero_join: "Rejoindre le Pool",
        
        // Stats
        stat_first: "1er Pool Marocain 🇲🇦",
        stat_green: "100% Énergie Verte 🌞",
        stat_blockchain: "Blockchain & Web3 Solutions 🌐",
        
        // Quick Links
        quick_invest: "Investir",
        quick_pool: "Rejoindre le Pool",
        quick_services: "Nos Services",
        
        // Real-time Stats
        realtime_hashrate: "Hashrate du Pool",
        realtime_blocks: "Blocs trouvés",
        realtime_energy: "Énergie produite",
        realtime_miners: "Mineurs actifs",
        
        // Footer
        footer_copyright: "© 2025 Green Hash Maroc. Tous droits réservés. | Nador, Maroc"
    },
    
    // English
    en: {
        // Navigation
        nav_home: "Home",
        nav_vision: "Vision",
        nav_pool: "Mining Pool",
        nav_exchange: "Exchange",
        nav_services: "Services",
        nav_invest: "Invest",
        nav_community: "Community",
        nav_contact: "Contact",
        
        // Hero Section
        hero_title: "Mining the Future. The Green Way.",
        hero_subtitle: "Green Hash Maroc — Where Blockchain Meets Green Energy",
        hero_discover: "Discover Project",
        hero_join: "Join Pool",
        
        // Stats
        stat_first: "1st Moroccan Pool 🇲🇦",
        stat_green: "100% Green Energy 🌞",
        stat_blockchain: "Blockchain & Web3 Solutions 🌐",
        
        // Quick Links
        quick_invest: "Invest",
        quick_pool: "Join Pool",
        quick_services: "Our Services",
        
        // Real-time Stats
        realtime_hashrate: "Pool Hashrate",
        realtime_blocks: "Blocks Found",
        realtime_energy: "Energy Produced",
        realtime_miners: "Active Miners",
        
        // Footer
        footer_copyright: "© 2025 Green Hash Maroc. All rights reserved. | Nador, Morocco"
    },
    
    // Arabic
    ar: {
        // Navigation
        nav_home: "الصفحة الرئيسية",
        nav_vision: "الرؤية",
        nav_pool: "تجمع التعدين",
        nav_exchange: "الصرف",
        nav_services: "الخدمات",
        nav_invest: "الاستثمار",
        nav_community: "المجتمع",
        nav_contact: "الاتصال",
        
        // Hero Section
        hero_title: "تعدين المستقبل. بالطريقة الخضراء.",
        hero_subtitle: "Green Hash Maroc — حيث يلتقي Blockchain بالطاقة الخضراء",
        hero_discover: "اكتشف المشروع",
        hero_join: "انضم إلى التجمع",
        
        // Stats
        stat_first: "أول تجمع مغربي 🇲🇦",
        stat_green: "100% طاقة خضراء 🌞",
        stat_blockchain: "حلول Blockchain و Web3 🌐",
        
        // Quick Links
        quick_invest: "استثمر",
        quick_pool: "انضم إلى التجمع",
        quick_services: "خدماتنا",
        
        // Real-time Stats
        realtime_hashrate: "معدل التجمع",
        realtime_blocks: "الكتل المكتشفة",
        realtime_energy: "الطاقة المنتجة",
        realtime_miners: "عمال المناجم النشطون",
        
        // Footer
        footer_copyright: "© 2025 Green Hash Maroc. جميع الحقوق محفوظة. | الناظور، المغرب"
    }
};

// Current language
let currentLang = 'fr';

// Function to translate the page
function translatePage(lang) {
    if (!translations[lang]) return;
    
    currentLang = lang;
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update language selector
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.value = lang;
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update direction for Arabic
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
    
    // Store preference
    localStorage.setItem('greenhash-lang', lang);
}

// Initialize translation system
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('greenhash-lang');
    if (savedLang && translations[savedLang]) {
        translatePage(savedLang);
    }
    
    // Add event listener to language selector
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.addEventListener('change', function(e) {
            translatePage(e.target.value);
        });
    }
    
    // Add translation attributes to common elements
    addTranslationAttributes();
});

// Function to add translation attributes to common elements
function addTranslationAttributes() {
    // Navigation items
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        if (text === 'Accueil' || text === 'Home' || text === 'الصفحة الرئيسية') {
            link.setAttribute('data-translate', 'nav_home');
        } else if (text === 'Vision') {
            link.setAttribute('data-translate', 'nav_vision');
        } else if (text === 'Mining Pool' || text === 'تجمع التعدين') {
            link.setAttribute('data-translate', 'nav_pool');
        } else if (text === 'Exchange' || text === 'الصرف') {
            link.setAttribute('data-translate', 'nav_exchange');
        } else if (text === 'Services' || text === 'الخدمات') {
            link.setAttribute('data-translate', 'nav_services');
        } else if (text === 'Investir' || text === 'Invest' || text === 'الاستثمار') {
            link.setAttribute('data-translate', 'nav_invest');
        } else if (text === 'Communauté' || text === 'Community' || text === 'المجتمع') {
            link.setAttribute('data-translate', 'nav_community');
        } else if (text === 'Contact' || text === 'الاتصال') {
            link.setAttribute('data-translate', 'nav_contact');
        }
    });
    
    // Hero elements
    const heroTitle = document.querySelector('h1');
    if (heroTitle && heroTitle.textContent.includes('Mining the Future')) {
        heroTitle.setAttribute('data-translate', 'hero_title');
    }
    
    // Buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        const text = button.textContent.trim();
        if (text === 'Découvrir le projet' || text === 'Discover Project' || text === 'اكتشف المشروع') {
            button.setAttribute('data-translate', 'hero_discover');
        } else if (text === 'Rejoindre le Pool' || text === 'Join Pool' || text === 'انضم إلى التجمع') {
            button.setAttribute('data-translate', 'hero_join');
        }
    });
    
    // Footer
    const footer = document.querySelector('footer p');
    if (footer && footer.textContent.includes('© 2025 Green Hash Maroc')) {
        footer.setAttribute('data-translate', 'footer_copyright');
    }
}

// Utility function to get current language
function getCurrentLanguage() {
    return currentLang;
}

// Utility function to translate a specific key
function translate(key, lang = currentLang) {
    return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
}

// Export functions for global use
window.translatePage = translatePage;
window.getCurrentLanguage = getCurrentLanguage;
window.translate = translate;