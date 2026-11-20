// ==========================================================================
// STEPHEN GITHINJI — EXECUTIVE SCRIPT ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Drawer
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }

    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // Close mobile menu on clicking any link
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.remove('active');
        });
    });

    // 2. Specialized Services Carousel Auto-Scroll (Full-Card Smooth Slide)
    const track = document.getElementById('services-carousel-track');
    const prevBtn = document.getElementById('services-carousel-prev');
    const nextBtn = document.getElementById('services-carousel-next');

    if (track) {
        const getCardWidth = () => {
            const firstCard = track.querySelector('.service-interactive-card');
            return firstCard ? firstCard.offsetWidth + 24 : 350;
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
            });
        }

        // Auto-scroll every 3.5 seconds
        let autoScrollTimer = null;
        const startAutoScroll = () => {
            autoScrollTimer = setInterval(() => {
                // If reached end, loop back smoothly
                if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                    track.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
                }
            }, 3500);
        };

        const stopAutoScroll = () => {
            if (autoScrollTimer) clearInterval(autoScrollTimer);
        };

        startAutoScroll();
        track.addEventListener('mouseenter', stopAutoScroll);
        track.addEventListener('mouseleave', startAutoScroll);
        track.addEventListener('touchstart', stopAutoScroll, { passive: true });
        track.addEventListener('touchend', startAutoScroll, { passive: true });
    }

    // 3. Cookie Consent Banner Persistence
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const dismissBtn = document.getElementById('cookie-dismiss-btn');

    if (cookieBanner) {
        const consent = localStorage.getItem('sg_cookie_consent');
        if (consent) {
            cookieBanner.classList.add('hidden');
        }

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('sg_cookie_consent', 'accepted');
                cookieBanner.classList.add('hidden');
            });
        }

        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => {
                localStorage.setItem('sg_cookie_consent', 'dismissed');
                cookieBanner.classList.add('hidden');
            });
        }
    }

    // 4. Floating Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Executive Scroll-Triggered Reveal Animation Engine (IntersectionObserver)
    const initScrollAnimations = () => {
        const animatedElements = document.querySelectorAll(
            '.section-header, .about-silver-content, .about-portrait-silver-wrapper, ' +
            '.service-interactive-card, .testimonial-card-frosted, .card-frosted-silver, ' +
            '.event-card-frosted, .contact-matrix-card, .quote-card, .silver-cred-item, .silver-quote-box'
        );

        animatedElements.forEach((el, index) => {
            el.classList.add('reveal-on-scroll');
            // Stagger siblings in grids
            const parent = el.parentElement;
            if (parent && (parent.classList.contains('testimonials-grid-silver') || 
                           parent.classList.contains('services-carousel-track') ||
                           parent.classList.contains('about-credentials-silver') ||
                           parent.classList.contains('institute-bottom-grid'))) {
                const childIndex = Array.from(parent.children).indexOf(el);
                if (childIndex < 6) {
                    el.classList.add(`stagger-${(childIndex % 5) + 1}`);
                }
            }
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(el => revealObserver.observe(el));
    };

    if ('IntersectionObserver' in window) {
        initScrollAnimations();
    } else {
        // Fallback for older browsers
        document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
    }
});
