// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const contactForm = document.getElementById('contact-form');

// Gestion de la modale CV
const cvModal = document.getElementById('cvModal');
const openCvModalBtn = document.getElementById('openCvModal');
const closeCvModalBtn = document.getElementById('closeCvModal');
const modalBackdrop = document.getElementById('modalBackdrop');

console.log('Modal elements:', { cvModal, openCvModalBtn, closeCvModalBtn, modalBackdrop });

// Theme Toggle
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// Event Listeners
window.addEventListener('scroll', () => {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('py-2', 'border-gray-200', 'dark:border-gray-700', 'shadow-sm');
        navbar.classList.remove('py-4', 'border-transparent');
    } else {
        navbar.classList.add('py-4', 'border-transparent');
        navbar.classList.remove('py-2', 'border-gray-200', 'dark:border-gray-700', 'shadow-sm');
    }
    
    // Animate elements on scroll
    const scrollAnimElements = document.querySelectorAll('.scroll-anim');
    scrollAnimElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight * 0.8) {
            el.classList.add('animate-fade-in');
        }
    });
});

// Mobile Menu
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
    });
});

// Theme Toggle
themeToggle.addEventListener('click', toggleDarkMode);
mobileThemeToggle.addEventListener('click', toggleDarkMode);

// Project Filter
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Show/hide projects based on filter
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Testimonial Slider
let currentSlide = 0;
const slidesPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
const slideWidth = 100 / slidesPerView;
const totalSlides = document.querySelectorAll('.testimonial-slide').length;

function updateSlider() {
    const offset = -currentSlide * slideWidth;
    testimonialTrack.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    testimonialDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
        dot.classList.toggle('bg-primary-600', index === currentSlide);
        dot.classList.toggle('dark:bg-primary-400', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % (totalSlides - slidesPerView + 1);
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + (totalSlides - slidesPerView + 1)) % (totalSlides - slidesPerView + 1);
    updateSlider();
}

testimonialNext.addEventListener('click', nextSlide);
testimonialPrev.addEventListener('click', prevSlide);

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Contact Form
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name && email && subject && message) {
        // In a real scenario, you would send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Add class to links when section is in viewport
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-primary-600', 'dark:text-primary-400');
        
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('text-primary-600', 'dark:text-primary-400');
        }
    });
    
    mobileNavLinks.forEach(link => {
        link.classList.remove('text-primary-600', 'dark:text-primary-400');
        
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('text-primary-600', 'dark:text-primary-400');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Initialize
updateSlider();
setActiveNavLink();

function openCvModal() {
    console.log('Opening modal...');
    cvModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeCvModal() {
    console.log('Closing modal...');
    cvModal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Ouvrir la modale
openCvModalBtn.addEventListener('click', (e) => {
    console.log('Open button clicked');
    e.preventDefault();
    openCvModal();
});

// Fermer la modale avec le bouton de fermeture
closeCvModalBtn.addEventListener('click', (e) => {
    console.log('Close button clicked');
    e.preventDefault();
    closeCvModal();
});

// Fermer la modale en cliquant sur le backdrop
modalBackdrop.addEventListener('click', (e) => {
    console.log('Backdrop clicked');
    e.preventDefault();
    closeCvModal();
});

// Fermer la modale avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !cvModal.classList.contains('hidden')) {
        console.log('Escape key pressed');
        closeCvModal();
    }
});


