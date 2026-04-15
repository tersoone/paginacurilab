document.addEventListener('DOMContentLoaded', () => {
    // ══════════════════════════════════════════
    // MOBILE MENU
    // ══════════════════════════════════════════
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Toggle burger icon between bars and X
        const icon = burger.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = burger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // ══════════════════════════════════════════
    // HEADER SCROLL EFFECT
    // ══════════════════════════════════════════
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ══════════════════════════════════════════
    // SCROLL REVEAL ANIMATION
    // ══════════════════════════════════════════
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once revealed, stop observing for performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => {
        revealObserver.observe(el);
    });

    // ══════════════════════════════════════════
    // ACTIVE NAV LINK ON SCROLL
    // ══════════════════════════════════════════
    const sections = document.querySelectorAll('section[id]');

    const navHighlighter = () => {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--primary)';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    };

    window.addEventListener('scroll', navHighlighter, { passive: true });

    // ══════════════════════════════════════════
    // SMOOTH COUNTER ANIMATION (if needed)
    // ══════════════════════════════════════════
    const animateCounter = (el, target, duration = 2000) => {
        let start = 0;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            el.textContent = Math.floor(progress * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        };
        requestAnimationFrame(step);
    };

    // ══════════════════════════════════════════
    // PARALLAX EFFECT ON HERO
    // ══════════════════════════════════════════
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.setProperty('--scroll', `${scrolled * 0.3}px`);
            }
        }, { passive: true });
    }

    // ══════════════════════════════════════════
    // CONTACT FORM HANDLER (WhatsApp)
    // ══════════════════════════════════════════
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Construct WhatsApp Message
            const text = `Hola *CURILAB*, soy *${name}*.\n\nEstoy interesado en: *${service}*.\n\n*Mensaje:*\n${message}\n\n*Mi contacto:* ${phone}`;

            // Encode for URL
            const encodedText = encodeURIComponent(text);
            const whatsappNumber = '56961502104'; // Format: CountryCode+Number

            // Open WhatsApp
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
        });
    }

    // ══════════════════════════════════════════
    // CURSOR GLOW EFFECT (DESKTOP ONLY)
    // ══════════════════════════════════════════
    if (window.innerWidth > 768) {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: fixed;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(62, 219, 178, 0.04) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            transition: transform 0.3s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(glow);

        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        }, { passive: true });
    }
});