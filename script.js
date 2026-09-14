const contactForm = document.querySelector('.contact-form');

if (contactForm) {
	const submitButton = contactForm.querySelector('button[type="submit"]');
	const statusMessage = contactForm.querySelector('.form-status');

	contactForm.addEventListener('submit', async (event) => {
		event.preventDefault();
		submitButton.disabled = true;
		statusMessage.textContent = 'Sending...';

		const ajaxEndpoint = contactForm.action.replace(
			'formsubmit.co/',
			'formsubmit.co/ajax/'
		);

		try {
			const response = await fetch(ajaxEndpoint, {
				method: 'POST',
				body: new FormData(contactForm),
				headers: {
					Accept: 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('The message could not be sent.');
			}

			contactForm.reset();
			statusMessage.textContent = 'Message sent successfully.';
		} catch (error) {
			statusMessage.textContent = 'Unable to send your message. Please try again.';
		} finally {
			submitButton.disabled = false;
		}
	});
}
