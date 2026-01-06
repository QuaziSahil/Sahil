/* ========================================
   PORTFOLIO - Main JavaScript
   Cinematic Effects & Interactions
======================================== */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initNavToggle();
    initHeroAnimation();
    initScrollReveal();
    initParallaxFragments();
    initPageTransitions();
    initSmoothScroll();
});

/* ===== CURSOR GLOW ===== */
function initCursorGlow() {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Smooth follow
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animate);
    }
    animate();
}

/* ===== NAVIGATION TOGGLE ===== */
function initNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.menu-overlay');

    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            toggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ===== HERO ANIMATION ===== */
function initHeroAnimation() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Trigger hero animations after a short delay
    setTimeout(() => {
        hero.classList.add('loaded');
    }, 100);
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
    // Include all reveal animation classes
    const reveals = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale, ' +
        '.mask-reveal, .mask-reveal-line, .blur-reveal, .cascade-reveal, ' +
        '.text-reveal, .split-text'
    );

    if (reveals.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ===== PARALLAX FRAGMENTS ===== */
function initParallaxFragments() {
    const fragments = document.querySelectorAll('.fragment');

    if (fragments.length === 0) return;

    let scrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(() => {
                updateFragments();
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateFragments() {
        fragments.forEach((fragment, index) => {
            const speed = (index % 3 + 1) * 0.1; // Different speeds
            const yPos = scrollY * speed;
            fragment.style.transform = `translateY(${yPos}px)`;
        });
    }
}

/* ===== PAGE TRANSITIONS ===== */
function initPageTransitions() {
    const overlay = document.querySelector('.page-transition-overlay');
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])');

    if (!overlay) return;

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only for internal links
            if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
                e.preventDefault();

                overlay.classList.add('active');

                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
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
}

/* ===== MAGNETIC BUTTONS ===== */
function initMagneticButtons() {
    const magnetics = document.querySelectorAll('.magnetic');

    magnetics.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

/* ===== COUNTER ANIMATION ===== */
function animateCounters() {
    const counters = document.querySelectorAll('.count-up');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Start when visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });

        observer.observe(counter);
    });
}

/* ===== TEXT SCRAMBLE EFFECT ===== */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/* ===== INIT ON LOAD ===== */
window.addEventListener('load', () => {
    // Remove loading state
    document.body.classList.add('loaded');

    // Init additional effects
    initMagneticButtons();
    animateCounters();
});
