// Handle logo error - fallback to text
function handleLogoError(img) {
    if (img) {
        img.classList.add('hide');
    }
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        logoText.classList.add('show');
    }
}

// Try alternative logo sources
function tryAlternativeLogos() {
    const logoImg = document.getElementById('companyLogo');
    if (!logoImg) return;
    
    // Check if image loaded successfully
    logoImg.addEventListener('error', function() {
        // Try loading from local images folder
        this.src = 'images/shriek-logo.png';
        this.onerror = function() {
            handleLogoError(this);
        };
    });
    
    // If image hasn't loaded after 2 seconds, show text fallback
    setTimeout(() => {
        if (logoImg && (!logoImg.complete || logoImg.naturalHeight === 0)) {
            handleLogoError(logoImg);
        }
    }, 2000);
}

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // In a real application, you would send this to your backend
    console.log('Form submitted:', data);
    
    // Show success message
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate API call (replace with actual API call)
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon at ' + data.email);
        form.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1000);
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Trigger first section immediately
    if (sections[0]) {
        sections[0].style.opacity = '1';
        sections[0].style.transform = 'translateY(0)';
    }
    
    // Try alternative logo sources
    tryAlternativeLogos();
});

// Smooth scrolling for navigation links
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
