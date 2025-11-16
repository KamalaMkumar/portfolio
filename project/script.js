// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Set active navigation state
    setActiveNavigation();

    // Initialize gallery lightbox if on gallery page
    if (document.getElementById('galleryGrid')) {
        initGalleryLightbox();
    }

    // Initialize contact form if on contact page
    if (document.getElementById('contactForm')) {
        initContactForm();
    }
});

// Set Active Navigation
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Gallery Lightbox Functionality
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('.gallery-image').src,
        alt: item.querySelector('.gallery-image').alt,
        caption: item.querySelector('.gallery-caption').textContent
    }));

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            showLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showLightboxImage();
        });
    }

    // Next image
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showLightboxImage();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showLightboxImage();
        }
    });

    function showLightboxImage() {
        if (lightboxImage && lightboxCaption && images[currentImageIndex]) {
            lightboxImage.src = images[currentImageIndex].src;
            lightboxImage.alt = images[currentImageIndex].alt;
            lightboxCaption.textContent = images[currentImageIndex].caption;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const serviceTypeInput = document.getElementById('serviceType');
    const messageInput = document.getElementById('message');

    if (!contactForm) return;

    // Real-time validation
    nameInput.addEventListener('blur', () => validateName());
    phoneInput.addEventListener('blur', () => validatePhone());
    emailInput.addEventListener('blur', () => validateEmail());
    serviceTypeInput.addEventListener('change', () => validateServiceType());
    messageInput.addEventListener('blur', () => validateMessage());

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        if (!validateName()) isValid = false;
        if (!validatePhone()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateServiceType()) isValid = false;
        if (!validateMessage()) isValid = false;

        if (isValid) {
            submitForm();
        }
    });

    function validateName() {
        const name = nameInput.value.trim();
        const errorElement = document.getElementById('nameError');
        
        if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters long');
            return false;
        }
        hideError('nameError');
        return true;
    }

    function validatePhone() {
        const phone = phoneInput.value.trim();
        const errorElement = document.getElementById('phoneError');
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!phone) {
            showError('phoneError', 'Phone number is required');
            return false;
        }
        if (!phoneRegex.test(phone)) {
            showError('phoneError', 'Please enter a valid 10-digit phone number');
            return false;
        }
        hideError('phoneError');
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('emailError');
        
        if (email && !isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            return false;
        }
        hideError('emailError');
        return true;
    }

    function validateServiceType() {
        const serviceType = serviceTypeInput.value;
        const errorElement = document.getElementById('serviceTypeError');
        
        if (!serviceType) {
            showError('serviceTypeError', 'Please select a service type');
            return false;
        }
        hideError('serviceTypeError');
        return true;
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        const errorElement = document.getElementById('messageError');
        
        if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters long');
            return false;
        }
        hideError('messageError');
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function hideError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    function submitForm() {
        // Collect form data
        const formData = {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            serviceType: serviceTypeInput.value,
            message: messageInput.value.trim()
        };

        // Create mailto link (can be replaced with actual form submission service)
        const subject = encodeURIComponent(`Booking Request - ${formData.serviceType}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Phone: ${formData.phone}\n` +
            `Email: ${formData.email}\n` +
            `Service Type: ${formData.serviceType}\n\n` +
            `Message:\n${formData.message}`
        );

        // Open email client (or you can integrate with a form submission service)
        window.location.href = `mailto:info@sriramtravels.com?subject=${subject}&body=${body}`;

        // Show success message
        alert('Thank you for your message! Your email client will open. If it doesn\'t, please call us at 9443970605.');
        
        // Reset form
        contactForm.reset();
    }
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

