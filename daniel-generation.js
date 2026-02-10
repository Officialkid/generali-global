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
			const details = [
				`Name: ${nameValue || 'Not provided'}`,
				`Phone: ${phoneValue || 'Not provided'}`,
				`Email: ${emailValue || 'Not provided'}`,
				'Acknowledgement: I acknowledge I ought to pay KES 1,500 to join the platform.'
			].join('\n');
			const message = `Hello Generali Global Group, I'd like to register myself to the Daniel Generation group. Here are my details:\n${details}`;
			const whatsappUrl = `https://wa.me/254114995449?text=${encodeURIComponent(message)}`;
			window.location.href = whatsappUrl;
		});
	}

	const slider = document.querySelector('.benefits-slider');
	const sliderShell = document.querySelector('.benefits-circle-slider');
	const benefitCards = Array.from(document.querySelectorAll('.benefit-card'));
	const circleIcons = Array.from(document.querySelectorAll('.circle-icon'));
	const prevBtn = document.getElementById('benefit-prev');
	const nextBtn = document.getElementById('benefit-next');
	const circle = document.getElementById('benefits-circle');
	let currentBenefit = 0;
	let autoScrollInterval;

	function isMobileView() {
		return window.innerWidth <= 800;
	}

	function showBenefit(index) {
		benefitCards.forEach((card, i) => {
			const isActive = i === index;
			card.classList.toggle('active', isActive);
			card.style.display = isActive ? 'block' : 'none';
			card.style.opacity = isActive ? '1' : '0';
		});

		circleIcons.forEach((icon, i) => {
			icon.style.boxShadow = i === index
				? '0 0 0 8px var(--color-gold), 0 4px 16px rgba(184,134,11,0.25)'
				: '0 2px 8px rgba(0,0,0,0.10)';
		});

		if (circle) {
			circle.style.transition = 'transform 0.5s';
			circle.style.transform = `rotate(${index * 360 / benefitCards.length}deg)`;
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

	function startAutoScroll() {
		if (autoScrollInterval || isMobileView()) return;
		autoScrollInterval = setInterval(nextBenefit, 3500);
	}

	function stopAutoScroll() {
		if (autoScrollInterval) {
			clearInterval(autoScrollInterval);
			autoScrollInterval = null;
		}
	}

	function applyLayout() {
		if (!sliderShell || benefitCards.length === 0) return;
		sliderShell.classList.toggle('is-mobile', isMobileView());
		stopAutoScroll();

		if (isMobileView()) {
			benefitCards.forEach(card => {
				card.classList.add('active');
				card.style.display = 'block';
				card.style.opacity = '1';
			});
			return;
		}

		showBenefit(currentBenefit);
		startAutoScroll();
	}

	if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoScroll(); prevBenefit(); });
	if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoScroll(); nextBenefit(); });
	circleIcons.forEach((icon, i) => {
		icon.addEventListener('click', () => {
			stopAutoScroll();
			currentBenefit = i;
			showBenefit(currentBenefit);
		});
	});

	if (slider) {
		let startX = null;
		slider.addEventListener('touchstart', function (e) {
			startX = e.touches[0].clientX;
		});
		slider.addEventListener('touchend', function (e) {
			if (startX === null || isMobileView()) return;
			const endX = e.changedTouches[0].clientX;
			if (endX < startX - 50) {
				stopAutoScroll();
				nextBenefit();
			} else if (endX > startX + 50) {
				stopAutoScroll();
				prevBenefit();
			}
			startX = null;
		});
	}

	applyLayout();
	window.addEventListener('resize', applyLayout);
});
