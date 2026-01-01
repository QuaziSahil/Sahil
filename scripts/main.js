document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Scroll Header Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Page Transitions
    const transitionOverlay = document.querySelector('.page-transition-overlay');
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Allow external links, anchors, or same page links to work normally
            if (link.target === '_blank' || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href === 'javascript:void(0)') {
                return;
            }
            // Normal navigation - no transition delay
        });
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .animate-fade-up').forEach(el => {
        observer.observe(el);
    });

    // 3D Tilt Effect
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    animateValue(stat, 0, target, 2000);
                });
            }
        });
    });

    if (stats.length > 0) {
        statsObserver.observe(stats[0]);
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ========================================
    // PREMIUM ANIMATIONS - JavaScript Effects
    // ========================================

    // 1. Button Ripple Effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 2. Create Floating Particles
    function createParticles() {
        const container = document.createElement('div');
        container.classList.add('particles');

        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            container.appendChild(particle);
        }

        document.body.appendChild(container);
    }
    createParticles();

    // 3. Form Submit Loading Animation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.classList.add('btn-loading');
        });

        // Show success message if redirected back with success param
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            const successMsg = document.getElementById('formSuccess');
            if (successMsg) {
                successMsg.style.display = 'block';
                // Clear the URL param without refresh
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }

    // 4. Magnetic Button Effect
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.classList.add('btn-magnetic');

        btn.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // 5. Enhanced Tilt - Add glow on hover
    document.querySelectorAll('[data-tilt]').forEach(el => {
        el.addEventListener('mouseenter', function () {
            this.style.transition = 'box-shadow 0.3s ease';
        });
    });

    // 6. Stagger animation for grid items
    document.querySelectorAll('.services-grid .service-card, .projects-grid .project-card').forEach((card, i) => {
        card.style.transitionDelay = (i * 0.1) + 's';
    });

    // 7. Text wobble on section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('glitch-hover');
    });

    // 8. Add gradient background animation to body
    document.body.classList.add('gradient-bg-animated');
});
