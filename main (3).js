// Green Hash Maroc - Main JavaScript File
// Handles animations, interactions, and dynamic content

// Global variables
let currentLanguage = 'fr';
let animationFrameId;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeInteractions();
    initializeScrollEffects();
    initializeRealTimeStats();
    initializeCharts();
    initializeLanguageSystem();
});

// Animation System
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        .animate-pulse-slow {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .text-gradient {
            background: linear-gradient(135deg, #87A96B, #00B894);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    `;
    document.head.appendChild(style);
}

// Interactive Elements
function initializeInteractions() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Card hover effects
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Button interactions
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        button {
            position: relative;
            overflow: hidden;
        }
        
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
    `;
    document.head.appendChild(rippleStyle);
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroElements = document.querySelectorAll('.hero-bg, #vanta-bg');
        
        heroElements.forEach(element => {
            if (element) {
                const speed = element.classList.contains('hero-bg') ? 0.5 : 0.3;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }
}

// Real-time Statistics
function initializeRealTimeStats() {
    const statElements = {
        hashrate: document.getElementById('poolHashrate'),
        miners: document.getElementById('activeMiners'),
        blocks: document.getElementById('blocksFound'),
        energy: document.getElementById('energyProduction')
    };
    
    // Simulate real-time updates
    setInterval(() => {
        Object.keys(statElements).forEach(key => {
            const element = statElements[key];
            if (element) {
                let currentValue = parseFloat(element.textContent);
                let variation = (Math.random() - 0.5) * 0.02;
                let newValue = Math.max(0, currentValue + variation);
                
                // Format based on stat type
                switch(key) {
                    case 'hashrate':
                        element.textContent = newValue.toFixed(1) + ' TH/s';
                        break;
                    case 'miners':
                        element.textContent = Math.floor(newValue).toString();
                        break;
                    case 'blocks':
                        element.textContent = Math.floor(newValue).toString();
                        break;
                    case 'energy':
                        element.textContent = newValue.toFixed(2) + ' MWh';
                        break;
                }
            }
        });
    }, 3000);
}

// Charts Initialization
function initializeCharts() {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') return;
    
    // Hashrate Chart
    const hashrateChart = document.getElementById('hashrateChart');
    if (hashrateChart) {
        const ctx = hashrateChart.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                datasets: [{
                    label: 'TH/s',
                    data: [11.2, 11.8, 12.1, 12.5, 12.3, 12.7, 12.5],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: false },
                    x: { grid: { display: false } }
                }
            }
        });
    }
    
    // Blocks Chart
    const blocksChart = document.getElementById('blocksChart');
    if (blocksChart) {
        const ctx = blocksChart.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                datasets: [{
                    label: 'Blocs',
                    data: [18, 22, 15, 19, 25, 21, 7],
                    backgroundColor: '#3B82F6',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

// Language System
function initializeLanguageSystem() {
    // Load translation system
    const script = document.createElement('script');
    script.src = 'translate.js';
    script.onload = function() {
        // Initialize translation after script loads
        if (typeof translatePage === 'function') {
            translatePage('fr');
        }
    };
    document.head.appendChild(script);
}

// Utility Functions
function formatNumber(num, decimals = 2) {
    return num.toFixed(decimals);
}

function formatCurrency(amount, currency = 'MAD') {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
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

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Form Handling
function handleFormSubmission(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            callback(data);
        });
    }
}

// API Simulation
function simulateAPICall(endpoint, data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'API call successful',
                data: data,
                timestamp: new Date().toISOString()
            });
        }, Math.random() * 2000 + 500);
    });
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
                console.warn('High memory usage detected');
            }
        }, 30000);
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Une erreur est survenue. Veuillez recharger la page.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    showNotification('Une erreur de connexion est survenue.', 'error');
});

// Export functions for global use
window.showNotification = showNotification;
window.showModal = showModal;
window.hideModal = hideModal;
window.handleFormSubmission = handleFormSubmission;
window.simulateAPICall = simulateAPICall;

// Initialize performance monitoring
initializePerformanceMonitoring();