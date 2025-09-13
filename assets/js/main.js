/**
 * Modern Portfolio JavaScript - Tobias Verbeek
 * Advanced interactions and animations
 */

(function() {
    'use strict';

    // DOM Elements
    const body = document.body;
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const backToTop = document.getElementById('back-to-top');
    const loadingScreen = document.getElementById('loading-screen');
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initLoadingScreen();
        initNavigation();
        initScrollEffects();
        initCursor();
        initAnimations();
        initSmoothScrolling();
        initTypingEffect();
        initParallax();
        initCounters();
    });

    /**
     * Loading Screen
     */
    function initLoadingScreen() {
        if (loadingScreen) {
            // Hide loading screen after page load
            window.addEventListener('load', function() {
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 1000);
            });
        }
    }

    /**
     * Navigation
     */
    function initNavigation() {
        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                body.classList.toggle('nav-open');
            });

            // Close mobile menu when clicking on links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    body.classList.remove('nav-open');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    body.classList.remove('nav-open');
                }
            });
        }

        // Header scroll effect
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    /**
     * Scroll Effects
     */
    function initScrollEffects() {
        // Back to top button
        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('[data-aos]');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Custom Cursor
     */
    function initCursor() {
        if (!cursor || !cursorFollower) return;

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        // Update cursor position
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor animation
        function animateCursor() {
            const diffX = mouseX - followerX;
            const diffY = mouseY - followerY;

            followerX += diffX * 0.1;
            followerY += diffY * 0.1;

            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .skill-item, .floating-element');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
            });

            el.addEventListener('mouseleave', function() {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });

        // Hide cursor on mobile
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        }
    }

    /**
     * Animations
     */
    function initAnimations() {
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                offset: 100
            });
        }

        // Floating elements animation
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.5}s`;
        });

        // Hero shapes animation
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            shape.style.animationDelay = `${index * 1.5}s`;
        });
    }

    /**
     * Smooth Scrolling
     */
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Typing Effect
     */
    function initTypingEffect() {
        const subtitleCursor = document.querySelector('.subtitle-cursor');
        if (!subtitleCursor) return;

        const texts = ['Software Developer', 'Student', 'Problem Solver', 'Innovator'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeText() {
            const currentText = texts[textIndex];
            const displayText = isDeleting 
                ? currentText.substring(0, charIndex - 1)
                : currentText.substring(0, charIndex + 1);

            const subtitleText = document.querySelector('.subtitle-text');
            if (subtitleText) {
                subtitleText.textContent = displayText;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            setTimeout(typeText, isDeleting ? 50 : 100);
        }

        // Start typing effect after a delay
        setTimeout(typeText, 1000);
    }

    /**
     * Parallax Effects
     */
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.shape, .floating-element');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            parallaxElements.forEach((el, index) => {
                const speed = (index + 1) * 0.1;
                el.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }

    /**
     * Counter Animation
     */
    function initCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-counter'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    /**
     * Skill Items Hover Effect
     */
    function initSkillHover() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    /**
     * Button Ripple Effect
     */
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
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
    }

    /**
     * Form Validation
     */
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const inputs = form.querySelectorAll('input, textarea');
                let isValid = true;

                inputs.forEach(input => {
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        input.classList.add('error');
                        isValid = false;
                    } else {
                        input.classList.remove('error');
                    }
                });

                if (isValid) {
                    // Show success message
                    showNotification('Message sent successfully!', 'success');
                    form.reset();
                } else {
                    showNotification('Please fill in all required fields.', 'error');
                }
            });
        });
    }

    /**
     * Notification System
     */
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    /**
     * Lazy Loading for Images
     */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    /**
     * Performance Optimization
     */
    function initPerformanceOptimizations() {
        // Debounce scroll events
        let scrollTimeout;
        const originalScrollHandler = window.onscroll;
        
        window.onscroll = function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                if (originalScrollHandler) {
                    originalScrollHandler();
                }
            }, 10);
        };

        // Preload critical resources
        const criticalResources = [
            'assets/css/style.css',
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }

    /**
     * Portfolio Filtering
     */
    function initPortfolioFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        if (filterButtons.length === 0 || portfolioItems.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === '*' || item.classList.contains(filter.replace('.', ''))) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.display = 'block';
                        }, 100);
                    } else {
                        item.classList.add('hidden');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    /**
     * Project Modal
     */
    function initProjectModal() {
        const modal = document.getElementById('project-modal');
        const modalClose = document.querySelector('.modal-close');
        const projectButtons = document.querySelectorAll('[data-project]');

        if (!modal) return;

        // Project data
        const projects = {
            'higher-lower': {
                title: 'Higher Lower Game',
                description: 'A fun and interactive number guessing game built with vanilla JavaScript. Players try to guess whether the next number will be higher or lower than the current number.',
                image: 'img/downloaden.png',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation'],
                features: [
                    'Interactive number guessing gameplay',
                    'Score tracking and high score system',
                    'Responsive design for all devices',
                    'Smooth animations and transitions',
                    'Local storage for persistent scores'
                ],
                demo: '#',
                github: '#'
            },
            'escape-room': {
                title: 'The Escape Room',
                description: 'An immersive puzzle game where players must solve various challenges to escape from a virtual room. Features multiple levels and interactive elements.',
                image: 'img/OIP.png',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'Game Logic'],
                features: [
                    'Multiple puzzle challenges',
                    'Interactive room environment',
                    'Progressive difficulty levels',
                    'Hint system for assistance',
                    'Timer-based gameplay'
                ],
                demo: '#',
                github: '#'
            },
            'battleships': {
                title: 'Battleships Game',
                description: 'A classic battleship game implementation with AI opponent. Players strategically place ships and try to sink the opponent\'s fleet.',
                image: 'img/OIP (1).png',
                technologies: ['JavaScript', 'Canvas API', 'Game Logic', 'AI'],
                features: [
                    'Strategic ship placement',
                    'AI opponent with smart targeting',
                    'Visual game board with animations',
                    'Turn-based gameplay',
                    'Win/lose conditions and scoring'
                ],
                demo: '#',
                github: '#'
            },
            'dashboard': {
                title: 'Data Dashboard',
                description: 'An interactive dashboard displaying various data visualizations and analytics. Built with modern web technologies for real-time data presentation.',
                image: 'img/Schermafbeelding 2024-06-21 102331.png',
                technologies: ['HTML5', 'CSS3', 'Chart.js', 'Data Visualization'],
                features: [
                    'Interactive charts and graphs',
                    'Real-time data updates',
                    'Responsive dashboard layout',
                    'Data filtering and sorting',
                    'Export functionality'
                ],
                demo: '#',
                github: '#'
            }
        };

        // Open modal
        projectButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-project');
                const project = projects[projectId];

                if (project) {
                    document.getElementById('modal-title').textContent = project.title;
                    document.getElementById('modal-description').textContent = project.description;
                    document.getElementById('modal-image').src = project.image;
                    document.getElementById('modal-image').alt = project.title;

                    // Update technologies
                    const techContainer = document.getElementById('modal-tech');
                    techContainer.innerHTML = '';
                    project.technologies.forEach(tech => {
                        const tag = document.createElement('span');
                        tag.className = 'tech-tag';
                        tag.textContent = tech;
                        techContainer.appendChild(tag);
                    });

                    // Update features
                    const featuresContainer = document.getElementById('modal-features');
                    featuresContainer.innerHTML = '';
                    project.features.forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature;
                        featuresContainer.appendChild(li);
                    });

                    // Update links
                    document.getElementById('modal-demo').href = project.demo;
                    document.getElementById('modal-github').href = project.github;

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    /**
     * Skill Progress Animation
     */
    function initSkillProgress() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    skillBar.style.width = width + '%';
                    skillObserver.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    /**
     * FAQ Accordion
     */
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }

    /**
     * Enhanced Form Validation
     */
    function initEnhancedFormValidation() {
        const contactForm = document.getElementById('contact-form');
        
        if (!contactForm) return;

        const inputs = contactForm.querySelectorAll('input, textarea');
        const submitBtn = contactForm.querySelector('.btn-submit');
        const formStatus = document.getElementById('form-status');

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                submitForm();
            }
        });

        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            const errorElement = document.getElementById(fieldName + '-error');
            
            let isValid = true;
            let errorMessage = '';

            // Required field validation
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
            }

            // Email validation
            if (fieldName === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            }

            // Name validation
            if (fieldName === 'name' && value) {
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
            }

            // Message validation
            if (fieldName === 'message' && value) {
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
            }

            // Privacy checkbox validation
            if (fieldName === 'privacy' && !field.checked) {
                isValid = false;
                errorMessage = 'You must agree to the Privacy Policy and Terms of Service';
            }

            if (isValid) {
                clearFieldError(field);
            } else {
                showFieldError(field, errorMessage);
            }

            return isValid;
        }

        function showFieldError(field, message) {
            const errorElement = document.getElementById(field.name + '-error');
            if (errorElement) {
                errorElement.textContent = message;
            }
            field.classList.add('error');
        }

        function clearFieldError(field) {
            const errorElement = document.getElementById(field.name + '-error');
            if (errorElement) {
                errorElement.textContent = '';
            }
            field.classList.remove('error');
        }

        function submitForm() {
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Hide loading state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;

                // Show success message
                formStatus.style.display = 'block';
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);

                // Scroll to success message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 2000);
        }
    }

    /**
     * Initialize all features
     */
    function init() {
        initSkillHover();
        initRippleEffect();
        initFormValidation();
        initLazyLoading();
        initPerformanceOptimizations();
        initPortfolioFiltering();
        initProjectModal();
        initSkillProgress();
        initFAQ();
        initEnhancedFormValidation();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        // Reinitialize cursor on resize
        if (window.innerWidth <= 768) {
            if (cursor) cursor.style.display = 'none';
            if (cursorFollower) cursorFollower.style.display = 'none';
        } else {
            if (cursor) cursor.style.display = 'block';
            if (cursorFollower) cursorFollower.style.display = 'block';
        }
    });

    // Handle page visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause animations when page is hidden
            document.body.style.animationPlayState = 'paused';
        } else {
            // Resume animations when page is visible
            document.body.style.animationPlayState = 'running';
        }
    });

})();

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
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
    
    .notification {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
