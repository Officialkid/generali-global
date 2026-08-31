/**
 * THE DANIEL GENERATION — SERVICE QUOTATION ENGINE LOGIC
 */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('quote-builder-form');
    const ventureCards = document.querySelectorAll('.venture-radio-card');
    
    // Form Inputs
    const firstNameInput = document.getElementById('first_name');
    const lastNameInput = document.getElementById('last_name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const orgInput = document.getElementById('organization');
    const categorySelect = document.getElementById('service_category');
    const durationSelect = document.getElementById('duration');
    const audienceSelect = document.getElementById('audience_size');
    const dateInput = document.getElementById('event_date');
    const notesInput = document.getElementById('notes');

    // Summary Elements
    const summaryVenture = document.getElementById('summary-venture');
    const summaryCategory = document.getElementById('summary-category');
    const summaryDuration = document.getElementById('summary-duration');
    const summaryClient = document.getElementById('summary-client');

    let selectedVenture = 'Generali Events';

    // Venture Radio Selection
    ventureCards.forEach(card => {
        card.addEventListener('click', function () {
            ventureCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                selectedVenture = radio.value;
                if (summaryVenture) summaryVenture.innerText = selectedVenture;
            }
        });
    });

    // Real-time Summary Updates
    function updateLiveSummary() {
        const fName = firstNameInput ? firstNameInput.value.trim() : '';
        const lName = lastNameInput ? lastNameInput.value.trim() : '';
        const fullName = (fName || lName) ? `${fName} ${lName}`.trim() : 'Pending Entry';

        if (summaryClient) summaryClient.innerText = fullName;
        if (summaryCategory && categorySelect) summaryCategory.innerText = categorySelect.value;
        if (summaryDuration && durationSelect) {
            const shortDur = durationSelect.value.split('(')[0].trim();
            summaryDuration.innerText = shortDur || durationSelect.value;
        }
    }

    [firstNameInput, lastNameInput, categorySelect, durationSelect].forEach(input => {
        if (input) {
            input.addEventListener('input', updateLiveSummary);
            input.addEventListener('change', updateLiveSummary);
        }
    });

    // Form Submission & WhatsApp URL Generation
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const fName = firstNameInput ? firstNameInput.value.trim() : '';
            const lName = lastNameInput ? lastNameInput.value.trim() : '';
            const fullName = `${fName} ${lName}`.trim() || 'Client';
            const email = emailInput ? emailInput.value.trim() : 'Not provided';
            const phone = phoneInput ? phoneInput.value.trim() : 'Not provided';
            const org = orgInput && orgInput.value.trim() ? orgInput.value.trim() : 'Individual / Private';
            const category = categorySelect ? categorySelect.value : 'General Inquiry';
            const duration = durationSelect ? durationSelect.value : 'Flexible';
            const audience = audienceSelect ? audienceSelect.value : 'Not specified';
            const date = dateInput && dateInput.value.trim() ? dateInput.value.trim() : 'To be confirmed';
            const notes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : 'None provided';

            const proposalText = [
                '🏛️ *THE DANIEL GENERATION GROUP — SERVICE PROPOSAL INQUIRY*',
                '------------------------------------------------',
                `👑 *Attention:* Stephen Kago (Generali)`,
                `🏢 *Venture Focus:* ${selectedVenture}`,
                `🎯 *Service Category:* ${category}`,
                '',
                '👤 *CLIENT / ORGANIZATION DETAILS:*',
                `• Name: ${fullName}`,
                `• Organization: ${org}`,
                `• Phone: ${phone}`,
                `• Email: ${email}`,
                '',
                '⏱️ *ENGAGEMENT PARAMETERS:*',
                `• Duration: ${duration}`,
                `• Audience Size: ${audience}`,
                `• Target Date: ${date}`,
                `• Key Objectives / Notes: ${notes}`,
                '------------------------------------------------',
                'Please advise on availability and customized quotation.'
            ].join('\n');

            const whatsappUrl = `https://wa.me/254114995449?text=${encodeURIComponent(proposalText)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});
