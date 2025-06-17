/* 
 * Animations JavaScript for Positive Impact Website
 * Author: Manus AI
 * Version: 1.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize timeline animations
    initTimelineAnimations();
});

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .about-card, .team-member, .benefit-item, .feature-item, .case-study');
    
    if (animatedElements.length > 0) {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        animatedElements.forEach(element => {
            element.classList.add('pre-animation');
            observer.observe(element);
        });
    }
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-timeline');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        timelineItems.forEach(item => {
            item.classList.add('pre-animation-timeline');
            observer.observe(item);
        });
    }
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
    }
});

// Animate Service Icons on Hover
document.addEventListener('DOMContentLoaded', function() {
    const serviceIcons = document.querySelectorAll('.service-icon, .category-icon, .benefit-icon, .feature-icon');
    
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.classList.add('icon-pulse');
        });
        
        icon.addEventListener('mouseleave', function() {
            this.classList.remove('icon-pulse');
        });
    });
});

// Animate Value Items
document.addEventListener('DOMContentLoaded', function() {
    const valueItems = document.querySelectorAll('.value-item');
    
    if (valueItems.length > 0) {
        valueItems.forEach((item, index) => {
            // Add staggered animation delay
            item.style.animationDelay = `${index * 0.2}s`;
            item.classList.add('animate-value');
        });
    }
});

// Animate Section Headers
document.addEventListener('DOMContentLoaded', function() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    if (sectionHeaders.length > 0) {
        const options = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-header');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        sectionHeaders.forEach(header => {
            header.classList.add('pre-animation-header');
            observer.observe(header);
        });
    }
});

// Add CSS classes for animations
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        .pre-animation {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .pre-animation-timeline {
            opacity: 0;
            transform: translateX(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .timeline-item.right.pre-animation-timeline {
            transform: translateX(-50px);
        }
        
        .animate-timeline {
            opacity: 1;
            transform: translateX(0);
        }
        
        .icon-pulse {
            animation: pulse 0.5s ease-in-out;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .animate-value {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .pre-animation-header {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-header {
            opacity: 1;
            transform: translateY(0);
        }
        
        .sticky {
            padding: 10px 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
});
