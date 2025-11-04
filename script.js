// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        themeToggle.style.transform = 'rotate(360deg) scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

// Navigation toggle for mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Typing animation for hero subtitle
const typingTexts = [
    'Full Stack Developer',
    'Manual Tester',
    'Web Developer',
    'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeText() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

// Start typing animation
if (typingElement) {
    typeText();
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const currentTheme = htmlElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
        }
    } else {
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    }
    
    lastScroll = currentScroll;
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target;
            const width = skillProgress.style.width;
            skillProgress.style.width = '0';
            setTimeout(() => {
                skillProgress.style.width = width;
            }, 100);
            animateOnScroll.unobserve(skillProgress);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-progress').forEach(bar => {
    animateOnScroll.observe(bar);
});

// Animate timeline items on scroll
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// Animate project cards on scroll
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
});

// Comprehensive scroll animations for all sections
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Optional: Unobserve after animation to improve performance
            scrollAnimationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize scroll animations for various elements
function initScrollAnimations() {
    // Section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('scroll-animate', 'fade-up');
        scrollAnimationObserver.observe(title);
    });

    // About section content
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        aboutText.classList.add('scroll-animate', 'fade-up');
        scrollAnimationObserver.observe(aboutText);
    }

    // Info grid items
    document.querySelectorAll('.info-item').forEach((item, index) => {
        item.classList.add('scroll-animate', 'fade-up');
        item.style.transitionDelay = `${index * 0.1}s`;
        scrollAnimationObserver.observe(item);
    });

    // Skill categories with staggered animation
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.classList.add('scroll-animate', 'fade-up');
        category.style.transitionDelay = `${index * 0.15}s`;
        scrollAnimationObserver.observe(category);
    });

    // Certification cards with staggered animation
    document.querySelectorAll('.cert-card').forEach((card, index) => {
        card.classList.add('scroll-animate', 'fade-up');
        card.style.transitionDelay = `${index * 0.1}s`;
        scrollAnimationObserver.observe(card);
    });

    // Achievement cards with staggered animation
    document.querySelectorAll('.achievement-card').forEach((card, index) => {
        card.classList.add('scroll-animate', 'fade-up');
        card.style.transitionDelay = `${index * 0.1}s`;
        scrollAnimationObserver.observe(card);
    });

    // Contact items with staggered animation
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.classList.add('scroll-animate', 'fade-left');
        item.style.transitionDelay = `${index * 0.15}s`;
        scrollAnimationObserver.observe(item);
    });

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.classList.add('scroll-animate', 'fade-right');
        scrollAnimationObserver.observe(contactForm);
    }

    // Contact subtitle
    const contactSubtitle = document.querySelector('.contact-subtitle');
    if (contactSubtitle) {
        contactSubtitle.classList.add('scroll-animate', 'fade-up');
        scrollAnimationObserver.observe(contactSubtitle);
    }

    // Subsection titles
    document.querySelectorAll('.subsection-title').forEach(title => {
        title.classList.add('scroll-animate', 'fade-up');
        scrollAnimationObserver.observe(title);
    });
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// Form submission (EmailJS for production, Node.js backend for local)
const contactForm = document.getElementById('contactForm');

// Initialize EmailJS (only needed for production)
if (typeof emailjs !== 'undefined') {
    // EmailJS will be initialized when you add your keys
    // emailjs.init('YOUR_PUBLIC_KEY'); // Add this after setting up EmailJS
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) submitBtn.textContent = 'Sending...';
        if (submitBtn) submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const payload = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
            
            // ==========================================
            // EMAILJS CONFIGURATION
            // ==========================================
            // Follow QUICK_EMAILJS_SETUP.md to get these values
            // Get them from: https://www.emailjs.com/
            // Replace the values below with your actual credentials:
            const EMAILJS_SERVICE_ID = 'service_28at6ri';      // From Email Services
            const EMAILJS_TEMPLATE_ID = 'template_087i0mp';   // From Email Templates
            const EMAILJS_PUBLIC_KEY = 'Np6Vzt4oeffwQWRjc';     // From Account → General
            const EMAILJS_CONFIGURED = typeof emailjs !== 'undefined' && 
                                       EMAILJS_SERVICE_ID && 
                                       EMAILJS_TEMPLATE_ID && 
                                       EMAILJS_PUBLIC_KEY &&
                                       EMAILJS_SERVICE_ID.startsWith('service_') &&
                                       EMAILJS_TEMPLATE_ID.startsWith('template_');
            
            // Try Node.js backend first (for local development)
            if (isLocal) {
                const hostForApi = window.location.hostname === '127.0.0.1' ? '127.0.0.1' : 'localhost';
                const API_BASE = `${window.location.protocol}//${hostForApi}:3001`;
                
                try {
                    // Quick check if backend is running (with timeout)
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
                    
                    const healthCheck = await fetch(`${API_BASE}/api/health`, {
                        method: 'GET',
                        signal: controller.signal
                    }).catch(() => null);
                    
                    clearTimeout(timeoutId);
                    
                    if (healthCheck && healthCheck.ok) {
                        // Backend is running, use it
                        const res = await fetch(`${API_BASE}/api/contact`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        const data = await res.json().catch(() => ({ ok: false }));

                        if (!res.ok || !data.ok) {
                            throw new Error(data && data.error ? data.error : 'Failed to send');
                        }

                        alert('Thanks! Your message has been sent. I will get back to you soon.');
                        contactForm.reset();
                        return; // Success, exit early
                    }
                } catch (backendError) {
                    // Backend not available, will try EmailJS or show error
                    console.log('Backend not available, trying EmailJS...', backendError);
                }
            }
            
            // Fallback to EmailJS (works for both local and production)
            if (EMAILJS_CONFIGURED) {
                emailjs.init(EMAILJS_PUBLIC_KEY);
                
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                    from_name: payload.name,
                    from_email: payload.email,
                    subject: payload.subject,
                    message: payload.message,
                    to_email: 'kambleadi0205@gmail.com'
                });

                alert('Thanks! Your message has been sent. I will get back to you soon.');
                contactForm.reset();
            } else {
                // Neither backend nor EmailJS is configured
                const errorMsg = isLocal 
                    ? 'Backend server is not running and EmailJS is not configured.\n\nTo fix:\n1. Start the backend: npm start (in another terminal)\nOR\n2. Configure EmailJS (see EMAILJS_SETUP.md)\n\nYou can also email me directly at kambleadi0205@gmail.com'
                    : 'Email service is not configured.\n\nPlease set up EmailJS (see EMAILJS_SETUP.md) or contact me directly at kambleadi0205@gmail.com';
                throw new Error(errorMsg);
            }
        } catch (err) {
            console.error(err);
            alert(`Sorry, there was an issue sending your message.\n\nDetails: ${err.message || err}\n\nYou can also email me directly at kambleadi0205@gmail.com`);
        } finally {
            if (submitBtn) submitBtn.textContent = originalText;
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

// Add active class to current nav link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Initialize
activateNavLink();

