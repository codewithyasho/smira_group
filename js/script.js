document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle icon between bars and times (close)
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Sticky Header & Active Link Highlighting
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.padding = '5px 0';
        }

        // Active Link Highlighting
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--secondary-color)';
                } else {
                    navLink.style.color = 'var(--text-main)';
                }
            }
        });
    });

    // Scroll Reveal Animations using Intersection Observer
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-up');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

    // Simple Form Submission Handler (Prevent default for UI)
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would handle the form submission via AJAX/Fetch here
            alert('Thank you for your inquiry! We will get back to you shortly.');
            inquiryForm.reset();
        });
    }
});
