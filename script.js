document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    // Hamburger Menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links .nav-item');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Animations
    const animateElements = document.querySelectorAll(
        '.reveal-left, .reveal-right, .reveal-top, .reveal-bottom, .reveal-scale, .reveal-fade-up, .reveal-slide-up, .reveal-pop, .reveal-scale-delay, .reveal-slide-up-delay, .reveal-fade-left, .reveal-fade-right, .reveal-scale-social, .section-title, .pop-in-info, .form-animate'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Special case for section title to trigger pseudo-element animation
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('animated-pseudo');
                }
                 // For skill bars
                 if (entry.target.classList.contains('skill-card')) {
                    entry.target.classList.add('animated'); // This triggers width animation
                }
                 // For form inputs
                if (entry.target.classList.contains('form-animate')) {
                    entry.target.classList.add('animated');
                }
                observer.unobserve(entry.target); // Unobserve once animated
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly
    });

    animateElements.forEach(el => observer.observe(el));

    // Typing Effect for Hero Subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const texts = [
        "A budding developer with a passion for learning.",
        "Embracing growth, just like nature. 🌱",
        "Crafting beautiful web experiences.",
        "Building responsive and modern websites."
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let delayBetweenTexts = 2000;

    function typeWriter() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = delayBetweenTexts;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 100;
        } else {
            typingSpeed = isDeleting ? deletingSpeed : 100;
        }
        setTimeout(typeWriter, typingSpeed);
    }

    // Delay typing effect until hero section is visible
    const heroSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                heroSectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Start typing when hero is 50% visible

    heroSectionObserver.observe(document.getElementById('hero'));
});