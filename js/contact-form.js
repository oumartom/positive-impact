// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Validate form
            if (validateForm(formDataObj)) {
                // Show sending message
                const formResponse = document.getElementById('form-response');
                formResponse.innerHTML = '<div class="alert alert-info">Sending your message...</div>';
                formResponse.style.display = 'block';
                
                // Simulate form submission (in a real environment, this would be an AJAX call to a server)
                setTimeout(function() {
                    // In a real implementation, this would be replaced with actual form submission code
                    // that sends the email to direction@pimpact.net
                    
                    // Show success message
                    formResponse.innerHTML = '<div class="alert alert-success">Your message has been sent successfully! We will get back to you soon.</div>';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Log form data (for demonstration purposes)
                    console.log('Form submitted with the following data:');
                    console.log('Recipient: direction@pimpact.net');
                    console.log(formDataObj);
                }, 1500);
            }
        });
    }
    
    // Initialize FAQ toggles
    const faqToggles = document.querySelectorAll('.faq-toggle');
    if (faqToggles.length > 0) {
        faqToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const faqItem = this.closest('.faq-item');
                faqItem.classList.toggle('active');
                
                // Update icon
                const icon = this.querySelector('i');
                if (faqItem.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });
    }
});

// Form validation function
function validateForm(data) {
    let isValid = true;
    const errorMessages = [];
    
    // Required fields
    if (!data.name || data.name.trim() === '') {
        errorMessages.push('Please enter your name');
        isValid = false;
    }
    
    if (!data.email || data.email.trim() === '') {
        errorMessages.push('Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        errorMessages.push('Please enter a valid email address');
        isValid = false;
    }
    
    if (!data.subject || data.subject.trim() === '') {
        errorMessages.push('Please enter a subject');
        isValid = false;
    }
    
    if (!data.message || data.message.trim() === '') {
        errorMessages.push('Please enter your message');
        isValid = false;
    }
    
    if (!data['privacy-policy']) {
        errorMessages.push('You must agree to the privacy policy');
        isValid = false;
    }
    
    // Display error messages if any
    if (!isValid) {
        const formResponse = document.getElementById('form-response');
        formResponse.innerHTML = '<div class="alert alert-danger"><ul>' + 
            errorMessages.map(msg => `<li>${msg}</li>`).join('') + 
            '</ul></div>';
        formResponse.style.display = 'block';
    }
    
    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
