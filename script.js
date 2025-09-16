// Global variables
let currentRole = 'artist';
let currentTestimonial = 0;
let testimonialInterval;
let isLoading = true;

// DOM elements
const loadingScreen = document.getElementById('loadingScreen');
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const heroButtons = document.querySelectorAll('.hero-buttons .btn');
const signupTitle = document.querySelector('.signup-title');
const submitBtn = document.querySelector('#submitBtn');
const artistFields = document.querySelector('#artistFields');
const venueFields = document.querySelector('#venueFields');
const testimonials = document.querySelectorAll('.testimonial');
const navDots = document.querySelectorAll('.nav-dot');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
    initializeHeader();
    initializeRoleSwitching();
    initializeScrollAnimations();
    initializeTestimonials();
    initializeMobileMenu();
    initializeFormValidation();
    initializeStoryAnimations();
    initializeFloatingLogo();
});

// Loading Screen functionality
function initializeLoadingScreen() {
    // Wait for the full logo animation sequence to complete
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        isLoading = false;
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 800);
    }, 4500); // Extended time to allow full animation sequence
}

// Header functionality
function initializeHeader() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Role switching functionality
function initializeRoleSwitching() {
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.dataset.role;
            switchRole(role);
            
            // Smooth scroll to signup section
            document.querySelector('.signup-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

function switchRole(role) {
    currentRole = role;
    
    // Update active button state
    heroButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-role="${role}"]`).classList.add('active');
    
    // Update signup form
    if (role === 'artist') {
        signupTitle.textContent = 'Join as an Artist';
        submitBtn.textContent = 'Join Waitlist';
        artistFields.style.display = 'flex';
        venueFields.style.display = 'none';
    } else {
        signupTitle.textContent = 'List Your Venue';
        submitBtn.textContent = 'List a Slot';
        venueFields.style.display = 'flex';
        artistFields.style.display = 'none';
    }
    
    // Add animation effect
    const signupCard = document.querySelector('.signup-card');
    signupCard.style.transform = 'scale(0.98)';
    setTimeout(() => {
        signupCard.style.transform = 'scale(1)';
    }, 150);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe story steps for animation
    document.querySelectorAll('.story-step').forEach(step => {
        observer.observe(step);
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
}

// Header Logo functionality
function initializeFloatingLogo() {
    const navLogo = document.getElementById('navLogo');
    
    if (navLogo) {
        navLogo.addEventListener('click', function() {
            // Add a subtle animation before reloading
            this.style.transform = 'scale(0.95)';
            this.style.opacity = '0.8';
            
            setTimeout(() => {
                // Reload the page to restart the loading animation
                window.location.reload();
            }, 200);
        });
        
        // Add a subtle pulsing effect to indicate it's clickable
        setInterval(() => {
            if (!navLogo.style.transform.includes('scale(0.95)')) {
                navLogo.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    if (!navLogo.style.transform.includes('scale(0.95)')) {
                        navLogo.style.transform = 'scale(1)';
                    }
                }, 150);
            }
        }, 4000);
    }
}

// Story animations for scroll storytelling
function initializeStoryAnimations() {
    const storySteps = document.querySelectorAll('.story-step');
    const visualCards = document.querySelectorAll('.visual-card');
    
    const storyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const step = entry.target;
                const visualCard = step.querySelector('.visual-card');
                
                // Animate the visual card with a slight delay
                setTimeout(() => {
                    if (visualCard) {
                        visualCard.style.transform = 'translateY(0) scale(1)';
                        visualCard.style.opacity = '1';
                    }
                }, 200);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Initialize visual cards
    visualCards.forEach(card => {
        card.style.transform = 'translateY(30px) scale(0.9)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Observe story steps
    storySteps.forEach(step => {
        storyObserver.observe(step);
    });
}

// Testimonials carousel
function initializeTestimonials() {
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        const nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }
    
    // Auto-rotate testimonials
    testimonialInterval = setInterval(nextTestimonial, 5000);
    
    // Manual navigation
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(testimonialInterval);
            showTestimonial(index);
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
    });
    
    // Pause on hover
    const testimonialsContainer = document.querySelector('.testimonials');
    testimonialsContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialsContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// Mobile menu
function initializeMobileMenu() {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking on links
    navMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}


// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Type-specific colors
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add smooth hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.step, .signup-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Keyboard navigation for testimonials
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
        document.querySelector(`[data-slide="${prevIndex}"]`).click();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentTestimonial + 1) % testimonials.length;
        document.querySelector(`[data-slide="${nextIndex}"]`).click();
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any additional scroll handling can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Enhanced parallax effect for hero section
window.addEventListener('scroll', function() {
    if (isLoading) return; // Don't run parallax during loading
    
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroParticles = document.querySelector('.hero-particles');
    
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    if (heroParticles) {
        const rate = scrolled * -0.1;
        heroParticles.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    if (!isLoading) {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
});

// Enhanced form handling for "Other" city option
function initializeFormValidation() {
    const form = document.querySelector('#signupForm');
    const citySelect = document.querySelector('#citySelect');
    
    // Handle "Other" city selection
    citySelect.addEventListener('change', function() {
        if (this.value === 'other') {
            // Create a text input for custom city
            const existingCustomCity = form.querySelector('.custom-city-input');
            if (!existingCustomCity) {
                const customCityInput = document.createElement('input');
                customCityInput.type = 'text';
                customCityInput.placeholder = 'Enter your city';
                customCityInput.className = 'custom-city-input';
                customCityInput.style.marginTop = '10px';
                customCityInput.style.padding = '16px 20px';
                customCityInput.style.border = '2px solid rgba(255, 255, 255, 0.1)';
                customCityInput.style.borderRadius = '12px';
                customCityInput.style.fontSize = '16px';
                customCityInput.style.background = 'var(--dark-bg)';
                customCityInput.style.color = 'var(--text-primary)';
                customCityInput.style.width = '100%';
                customCityInput.style.transition = 'all 0.3s ease';
                
                customCityInput.addEventListener('focus', function() {
                    this.style.borderColor = '#ff4081';
                    this.style.background = 'var(--dark-surface)';
                    this.style.boxShadow = '0 0 0 3px rgba(255, 64, 129, 0.1)';
                });
                
                customCityInput.addEventListener('blur', function() {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    this.style.background = 'var(--dark-bg)';
                    this.style.boxShadow = 'none';
                });
                
                citySelect.parentNode.appendChild(customCityInput);
            }
        } else {
            // Remove custom city input if it exists
            const existingCustomCity = form.querySelector('.custom-city-input');
            if (existingCustomCity) {
                existingCustomCity.remove();
            }
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const email = form.querySelector('input[type="email"]').value;
        const city = citySelect.value;
        const customCity = form.querySelector('.custom-city-input');
        const finalCity = city === 'other' ? (customCity ? customCity.value : '') : city;
        
        if (!email || (!city || (city === 'other' && !finalCity))) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = form.querySelector('#submitBtn');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = 'Success!';
            submitButton.style.background = '#4CAF50';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                form.reset();
                // Remove custom city input if it exists
                const existingCustomCity = form.querySelector('.custom-city-input');
                if (existingCustomCity) {
                    existingCustomCity.remove();
                }
                showNotification('Thank you! We\'ll be in touch soon.', 'success');
            }, 2000);
        }, 1500);
    });
}
