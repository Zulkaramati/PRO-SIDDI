// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = 'var(--background)';
    }
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
    // Here you would typically send the form data to your server
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Animate Services Cards on Scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Portfolio Image Loading Animation
document.querySelectorAll('.portfolio-item img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease-in';
});

// Service cards click handler
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Service details data
    const serviceDetails = {
        'Custom Software Development': {
            title: 'Custom Software Development',
            description: `Our custom software development services include:
            • Full-stack web applications
            • Enterprise software solutions
            • Database design and development
            • API integration and development
            • Legacy system modernization
            • Ongoing maintenance and support`,
            price: 'Starting from $5000',
            duration: 'Timeline: 2-6 months'
        },
        'Mobile App Development': {
            title: 'Mobile App Development',
            description: `Our mobile app development services include:
            • iOS and Android native apps
            • Cross-platform development
            • UI/UX design
            • App testing and deployment
            • App store optimization
            • Regular updates and maintenance`,
            price: 'Starting from $8000',
            duration: 'Timeline: 3-5 months'
        },
        'Cloud Solutions': {
            title: 'Cloud Solutions',
            description: `Our cloud solutions include:
            • Cloud migration services
            • Cloud infrastructure setup
            • AWS/Azure/Google Cloud implementation
            • Cloud security solutions
            • Scalability optimization
            • 24/7 cloud support`,
            price: 'Starting from $3000',
            duration: 'Timeline: 1-3 months'
        }
    };

    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2 id="modal-title"></h2>
            <div id="modal-description"></div>
            <div class="modal-details">
                <p id="modal-price"></p>
                <p id="modal-duration"></p>
            </div>
            <button class="contact-button">Contact Us Now</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Add styles for modal
    const styles = document.createElement('style');
    styles.textContent = `
        .service-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            z-index: 1000;
        }
        .modal-content {
            position: relative;
            background-color: white;
            margin: 15% auto;
            padding: 20px;
            width: 70%;
            max-width: 600px;
            border-radius: 8px;
            animation: modalSlide 0.3s ease-out;
        }
        @keyframes modalSlide {
            from { transform: translateY(-100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .close-button {
            position: absolute;
            right: 20px;
            top: 10px;
            font-size: 28px;
            cursor: pointer;
        }
        .modal-details {
            margin: 20px 0;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        .contact-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .contact-button:hover {
            background-color: #0056b3;
        }
        #modal-description {
            white-space: pre-line;
            margin: 20px 0;
        }
    `;
    document.head.appendChild(styles);

    // Add click handlers to service cards
    serviceCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const title = card.querySelector('h3').textContent;
            const details = serviceDetails[title];
            
            if (details) {
                document.getElementById('modal-title').textContent = details.title;
                document.getElementById('modal-description').textContent = details.description;
                document.getElementById('modal-price').textContent = details.price;
                document.getElementById('modal-duration').textContent = details.duration;
                modal.style.display = 'block';
            }
        });
    });

    // Close modal functionality
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => modal.style.display = 'none');
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact button functionality
    const contactButton = modal.querySelector('.contact-button');
    contactButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        modal.style.display = 'none';
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
}); 