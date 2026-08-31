/* ==========================================================================
   THE DANIEL GENERATION — INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-btn');

    if (hamburger && mobileMenu && closeBtn) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        document.querySelectorAll('.mobile-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 2. Dropdown Persistence for Touch & Click
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth > 820) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    // 3. Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. 3D Parallax Tilt Effect
    const tiltContainers = document.querySelectorAll('.tilt-card-container');
    tiltContainers.forEach(container => {
        const card = container.querySelector('.tilt-card');
        if (!card) return;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -9;
            const rotateY = ((x - centerX) / centerX) * 9;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });

    // 6. Interactive Services Carousel Sliding
    const carouselTrack = document.getElementById('services-carousel-track');
    const prevArrow = document.getElementById('services-carousel-prev');
    const nextArrow = document.getElementById('services-carousel-next');

    if (carouselTrack && prevArrow && nextArrow) {
        nextArrow.addEventListener('click', () => {
            const card = carouselTrack.querySelector('.service-interactive-card');
            const cardWidth = card ? card.offsetWidth + 24 : 340;
            carouselTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        prevArrow.addEventListener('click', () => {
            const card = carouselTrack.querySelector('.service-interactive-card');
            const cardWidth = card ? card.offsetWidth + 24 : 340;
            carouselTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }

    // 7. Testimonials Filter Navigation
    const filterButtons = document.querySelectorAll('.test-filter-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            testimonialCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 8. 3-in-1 Floating Action Dock
    const dockTrigger = document.getElementById('dock-toggle-btn');
    const dockMenu = document.getElementById('dock-menu');

    if (dockTrigger && dockMenu) {
        dockTrigger.addEventListener('click', () => {
            if (dockMenu.style.display === 'flex') {
                dockMenu.style.display = 'none';
                dockTrigger.innerHTML = '<i class="fas fa-plus"></i>';
            } else {
                dockMenu.style.display = 'flex';
                dockTrigger.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }

        // 9. Internal Video Highlight Reel Modal
    const openVideoBtn = document.getElementById('open-video-btn');
    const videoModal = document.getElementById('video-modal');
    const closeVideoBtn = document.getElementById('close-video-btn');
    const internalVideo = document.getElementById('internal-reel-video');

    if (openVideoBtn && videoModal && closeVideoBtn) {
        openVideoBtn.addEventListener('click', () => {
            videoModal.style.display = 'flex';
            if (internalVideo) {
                internalVideo.currentTime = 0;
                internalVideo.play().catch(e => console.log('Autoplay handled:', e));
            }
        });

        const stopVideo = () => {
            videoModal.style.display = 'none';
            if (internalVideo) {
                internalVideo.pause();
            }
        };

        closeVideoBtn.addEventListener('click', stopVideo);

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                stopVideo();
            }
        });
    }

    // 10. Executive Capability Deck Modal
    const openDeckBtn = document.getElementById('open-deck-btn');
    const deckModal = document.getElementById('deck-modal');
    const closeDeckBtn = document.getElementById('close-deck-btn');

    if (openDeckBtn && deckModal && closeDeckBtn) {
        openDeckBtn.addEventListener('click', () => {
            deckModal.style.display = 'flex';
        });

        closeDeckBtn.addEventListener('click', () => {
            deckModal.style.display = 'none';
        });

        deckModal.addEventListener('click', (e) => {
            if (e.target === deckModal) {
                deckModal.style.display = 'none';
            }
        });
    }
});
