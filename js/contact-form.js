(function () {
    // Initialize EmailJS with Public Key
    // IMPORTANT: REPLACE WITH YOUR ACTUAL PUBLIC KEY
    emailjs.init("n01udgFZLmQmUwdGK");

    const contactForm = document.getElementById('contactForm');
    const toastContainer = document.getElementById('toast-container');

    if (contactForm) {
        // Remove existing event listeners if possible (though tough with anonymous functions)
        // We will use stopImmediatePropagation to ensure our handler runs and we can prevent others if needed, 
        // but since jQuery might bind first, we need to be careful.
        // The existing function.js uses jQuery's .on('submit'), so we can try to unbind it or just rely on preventing default.

        // We'll use a direct event listener which captures early, or just standard submit
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation(); // Try to stop other listeners

            // Basic validation check (leveraging browser's built-in or existing validator if active)
            if (!contactForm.checkValidity()) {
                // If invalid, let the existing validator handle showing errors or manual check
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Prepare params
            // Note: service_id and template_id must be replaced with actual values
            const serviceID = 'service_ycb62ms';
            const templateID = 'template_octh2gm';

            emailjs.sendForm(serviceID, templateID, this)
                .then(function () {
                    // Success
                    contactForm.reset();
                    showToast();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;

                    // Clear any previous error messages from the DOM if they exist
                    const msgSubmit = document.getElementById('msgSubmit');
                    if (msgSubmit) {
                        msgSubmit.innerText = "";
                        msgSubmit.classList.add('hidden');
                    }

                }, function (error) {
                    // Error
                    console.error('EmailJS Error:', error);
                    alert('Failed to send message. Please try again later.');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    function showToast() {
        if (toastContainer) {
            toastContainer.classList.add('show');
            setTimeout(function () {
                toastContainer.classList.remove('show');
            }, 4000); // Hide after 4 seconds
        }
    }
})();
