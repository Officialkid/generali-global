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
});
