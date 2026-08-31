/**
 * THE DANIEL GENERATION LEADERSHIP SCHOOL — INTERACTION LOGIC
 */

document.addEventListener('DOMContentLoaded', function () {
    const openBtns = document.querySelectorAll('.registration-trigger');
    const modal = document.getElementById('registration-modal');
    const closeBtn = document.getElementById('close-modal');
    const registrationForm = document.getElementById('registration-form');
    const nameInput = document.getElementById('reg-name');
    const phoneInput = document.getElementById('reg-phone');
    const emailInput = document.getElementById('reg-email');

    function openModal() {
        if (!modal) return;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameValue = nameInput ? nameInput.value.trim() : '';
            const phoneValue = phoneInput ? phoneInput.value.trim() : '';
            const emailValue = emailInput ? emailInput.value.trim() : '';
            
            const message = [
                '👑 *THE DANIEL GENERATION PLATFORM REGISTRATION*',
                '------------------------------------------------',
                'Hello Stephen Kago (Generali),',
                'I would like to register for The Daniel Generation Mentorship Platform. Here are my details:',
                '',
                `• Name: ${nameValue || 'Not provided'}`,
                `• Phone: ${phoneValue || 'Not provided'}`,
                `• Email: ${emailValue || 'Not provided'}`,
                '',
                '✅ *Acknowledgement:* I acknowledge I ought to pay KES 1,500 to join the platform cohort.',
                '------------------------------------------------',
                'Kindly share payment details and next cohort onboarding instructions.'
            ].join('\n');

            const whatsappUrl = `https://wa.me/254114995449?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            closeModal();
        });
    }

    // Benefits 7-Pillar Circle Slider
    const benefitCards = Array.from(document.querySelectorAll('.benefit-card'));
    const circleIcons = Array.from(document.querySelectorAll('.circle-icon'));
    const prevBtn = document.getElementById('benefit-prev');
    const nextBtn = document.getElementById('benefit-next');
    const circle = document.getElementById('benefits-circle');
    let currentBenefit = 0;

    function showBenefit(index) {
        benefitCards.forEach((card, i) => {
            const isActive = i === index;
            card.classList.toggle('active', isActive);
        });

        circleIcons.forEach((icon, i) => {
            if (i === index) {
                icon.style.background = 'var(--color-gold-bright)';
                icon.style.color = '#000';
                icon.style.transform = 'scale(1.25)';
                icon.style.boxShadow = '0 0 20px rgba(249, 192, 61, 0.6)';
            } else {
                icon.style.background = 'var(--color-dark-2)';
                icon.style.color = 'var(--color-gold-bright)';
                icon.style.transform = 'scale(1)';
                icon.style.boxShadow = 'none';
            }
        });

        if (circle) {
            circle.style.transform = `rotate(${index * (360 / benefitCards.length)}deg)`;
        }
    }

    function nextBenefit() {
        currentBenefit = (currentBenefit + 1) % benefitCards.length;
        showBenefit(currentBenefit);
    }

    function prevBenefit() {
        currentBenefit = (currentBenefit - 1 + benefitCards.length) % benefitCards.length;
        showBenefit(currentBenefit);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevBenefit);
    if (nextBtn) nextBtn.addEventListener('click', nextBenefit);

    circleIcons.forEach((icon, i) => {
        icon.addEventListener('click', () => {
            currentBenefit = i;
            showBenefit(currentBenefit);
        });
    });

    if (benefitCards.length > 0) {
        showBenefit(0);
    }
});
