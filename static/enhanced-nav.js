// Green Hash Maroc - Enhanced Navigation and User Experience
// Adds smooth transitions, advanced animations, and interactive elements

class NavigationEnhancer {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.isMenuOpen = false;
        this.scrollProgress = 0;
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollProgress();
        this.setupNavigationEffects();
        this.setupPageTransitions();
        this.setupInteractiveElements();
        this.setupAccessibility();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page;
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling with easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target, 1000);
                }
            });
        });

        // Scroll to top functionality
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-green-600 text-white rounded-full shadow-lg opacity-0 transition-all duration-300 z-40 hover:bg-green-700 hover:scale-110';
        scrollTopBtn.onclick = () => this.smoothScrollTo(document.body, 500);
        document.body.appendChild(scrollTopBtn);

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.transform = 'translateY(20px)';
            }
        });
    }

    smoothScrollTo(target, duration = 1000) {
        const targetPosition = target.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    setupScrollProgress() {
        // Add scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 z-50 transition-all duration-300';
        progressBar.style.width = '0%';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
            this.scrollProgress = scrollPercent;

            // Trigger animations based on scroll position
            this.triggerScrollAnimations();
        });
    }

    setupNavigationEffects() {
        // Active page highlighting
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(this.currentPage)) {
                link.classList.add('active-nav');
            }
        });

        // Enhanced navbar on scroll
        const navbar = document.querySelector('nav');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled-nav');
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.backdropFilter = 'blur(20px)';
                    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.classList.remove('scrolled-nav');
                    navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                    navbar.style.backdropFilter = 'blur(10px)';
                    navbar.style.boxShadow = 'none';
                }
            });
        }

        // Language selector enhancement
        const langSelect = document.getElementById('language-select');
        if (langSelect) {
            langSelect.addEventListener('change', (e) => {
                this.animateLanguageChange(e.target.value);
            });
        }
    }

    setupPageTransitions() {
        // Add page transition effects
        const links = document.querySelectorAll('a[href$=".html"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.hostname === window.location.hostname) {
                    e.preventDefault();
                    this.transitionToPage(link.href);
                }
            });
        });

        // Page load animations
        window.addEventListener('load', () => {
            this.animatePageLoad();
        });
    }

    transitionToPage(url) {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-gradient-to-br from-green-600 to-blue-600 z-50 flex items-center justify-center transition-opacity duration-500';
        overlay.innerHTML = `
            <div class="text-center text-white">
                <div class="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 class="text-2xl font-bold mb-2">Chargement...</h2>
                <p>Navigation vers la page demandée</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Animate out current content
        document.body.style.opacity = '0.8';
        
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }

    animatePageLoad() {
        const elements = document.querySelectorAll('section, .card-hover, .simulator-card');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupInteractiveElements() {
        // Enhanced button interactions
        document.querySelectorAll('button').forEach(button => {
            this.enhanceButton(button);
        });

        // Card hover enhancements
        document.querySelectorAll('.card-hover, .simulator-card, .wallet-card').forEach(card => {
            this.enhanceCard(card);
        });

        // Form enhancements
        document.querySelectorAll('form input, form select, form textarea').forEach(input => {
            this.enhanceInput(input);
        });

        // Modal enhancements
        this.setupModalEnhancements();
    }

    enhanceButton(button) {
        // Add ripple effect
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add hover sound effect (optional)
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    }

    enhanceCard(card) {
        let isHovered = false;
        
        card.addEventListener('mouseenter', () => {
            if (!isHovered) {
                isHovered = true;
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                
                // Add subtle glow effect
                card.style.filter = 'brightness(1.05)';
            }
        });

        card.addEventListener('mouseleave', () => {
            isHovered = false;
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
            card.style.filter = 'brightness(1)';
        });

        // Add click feedback
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                if (isHovered) {
                    card.style.transform = 'translateY(-8px)';
                } else {
                    card.style.transform = 'translateY(0)';
                }
            }, 150);
        });
    }

    enhanceInput(input) {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('input-focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('input-focused');
        });

        // Add typing animation
        let typingTimer;
        input.addEventListener('input', () => {
            clearTimeout(typingTimer);
            input.classList.add('typing');
            
            typingTimer = setTimeout(() => {
                input.classList.remove('typing');
            }, 500);
        });
    }

    setupModalEnhancements() {
        // Enhanced modal backdrop
        document.querySelectorAll('[id$="Modal"]').forEach(modal => {
            modal.addEventListener('show', () => {
                document.body.style.overflow = 'hidden';
                this.addModalBackdrop();
            });

            modal.addEventListener('hide', () => {
                document.body.style.overflow = 'auto';
                this.removeModalBackdrop();
            });
        });
    }

    addModalBackdrop() {
        const backdrop = document.createElement('div');
        backdrop.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm';
        backdrop.id = 'modal-backdrop';
        document.body.appendChild(backdrop);
    }

    removeModalBackdrop() {
        const backdrop = document.getElementById('modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    }

    triggerScrollAnimations() {
        // Trigger animations at specific scroll points
        const scrollTriggers = [
            { threshold: 25, action: 'show-stats' },
            { threshold: 50, action: 'animate-charts' },
            { threshold: 75, action: 'show-cta' }
        ];

        scrollTriggers.forEach(trigger => {
            if (this.scrollProgress >= trigger.threshold && !trigger.triggered) {
                this.executeScrollAction(trigger.action);
                trigger.triggered = true;
            }
        });
    }

    executeScrollAction(action) {
        switch (action) {
            case 'show-stats':
                this.animateStats();
                break;
            case 'animate-charts':
                this.animateCharts();
                break;
            case 'show-cta':
                this.animateCTA();
                break;
        }
    }

    animateStats() {
        const statElements = document.querySelectorAll('[id$="-earnings"], [id$="-roi"]');
        statElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-number');
                el.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    el.style.transform = 'scale(1)';
                }, 300);
            }, index * 200);
        });
    }

    animateCharts() {
        const charts = document.querySelectorAll('canvas');
        charts.forEach(chart => {
            chart.parentElement.style.transform = 'scale(1.05)';
            setTimeout(() => {
                chart.parentElement.style.transform = 'scale(1)';
            }, 500);
        });
    }

    animateCTA() {
        const ctaButtons = document.querySelectorAll('section:last-child button');
        ctaButtons.forEach((btn, index) => {
            setTimeout(() => {
                btn.classList.add('pulse-green');
                setTimeout(() => {
                    btn.classList.remove('pulse-green');
                }, 2000);
            }, index * 500);
        });
    }

    animateLanguageChange(lang) {
        const langSelect = document.getElementById('language-select');
        if (langSelect) {
            langSelect.style.transform = 'scale(1.1)';
            langSelect.style.background = 'linear-gradient(135deg, #10B981, #3B82F6)';
            
            setTimeout(() => {
                langSelect.style.transform = 'scale(1)';
                langSelect.style.background = 'transparent';
            }, 300);
        }

        // Show language change notification
        const messages = {
            fr: 'Langue changée en Français',
            en: 'Language changed to English',
            ar: 'تم تغيير اللغة إلى العربية'
        };

        this.showNotification(messages[lang] || 'Language changed', 'success');
    }

    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add focus indicators
        const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
        focusableElements.forEach(el => {
            el.addEventListener('focus', () => {
                el.classList.add('focus-visible');
            });

            el.addEventListener('blur', () => {
                el.classList.remove('focus-visible');
            });
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full opacity-0 transition-all duration-300 ${
            type === 'success' ? 'bg-green-600 text-white' :
            type === 'error' ? 'bg-red-600 text-white' :
            type === 'warning' ? 'bg-yellow-600 text-white' :
            'bg-blue-600 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Utility method to add CSS classes dynamically
    addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .input-focused {
                transform: scale(1.02);
                transition: transform 0.2s ease;
            }
            
            .typing {
                border-color: #10B981 !important;
                box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
            }
            
            .focus-visible {
                outline: 2px solid #10B981;
                outline-offset: 2px;
            }
            
            .active-nav {
                color: #10B981 !important;
                font-weight: 600;
                position: relative;
            }
            
            .active-nav::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, #10B981, #3B82F6);
                border-radius: 1px;
            }
            
            .scrolled-nav {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            
            .keyboard-navigation *:focus {
                outline: 2px solid #10B981 !important;
                outline-offset: 2px !important;
            }
            
            .animate-number {
                transition: all 0.5s ease;
            }
            
            .pulse-green {
                animation: pulse-green 2s infinite;
            }
            
            @keyframes pulse-green {
                0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize navigation enhancer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const navEnhancer = new NavigationEnhancer();
    navEnhancer.addDynamicStyles();
});

// Export for global use
window.NavigationEnhancer = NavigationEnhancer;
