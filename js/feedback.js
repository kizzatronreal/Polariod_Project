
document.addEventListener('DOMContentLoaded', function() {
    
    // Get form elements
    const feedbackForm = document.getElementById('feedbackForm');
    const commentsTextarea = document.getElementById('comments');
    const charCounter = document.getElementById('charCounter');
    const successMessage = document.getElementById('successMessage');
    
    // Character counter for comments textarea
    if (commentsTextarea && charCounter) {
        const maxChars = 500;
        
        commentsTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCounter.textContent = `${currentLength} / ${maxChars} characters`;
            
            // Change color if approaching or exceeding limit
            if (currentLength > maxChars) {
                charCounter.style.color = '#d32f2f';
                this.value = this.value.substring(0, maxChars); 
            } else if (currentLength > maxChars * 0.9) {
                charCounter.style.color = '#f57c00'; 
            } else {
                charCounter.style.color = '#666';
            }
        });
    }
    
    // Form submission handler
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            if (validateForm()) {
                const formData = new FormData(feedbackForm);
                const feedbackData = {};
                
                for (let [key, value] of formData.entries()) {
                    if (key === 'features') {
                        if (!feedbackData.features) {
                            feedbackData.features = [];
                        }
                        feedbackData.features.push(value);
                    } else {
                        feedbackData[key] = value;
                    }
                }
                
                console.log('Feedback submitted:', feedbackData);
                
                showSuccessMessage();
                
                feedbackForm.reset();
                
                if (charCounter) {
                    charCounter.textContent = '0 / 500 characters';
                    charCounter.style.color = '#666';
                }
                
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    //Validate form fields returns True if form is valid
    function validateForm() {
        let isValid = true;
        const errors = [];
        
        const fullName = document.getElementById('fullName').value.trim();
        if (fullName.length < 2) {
            errors.push('Please enter a valid full name');
            isValid = false;
        }
        
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }
        
        const category = document.getElementById('category').value;
        if (!category) {
            errors.push('Please select a feedback category');
            isValid = false;
        }
        
        const rating = document.querySelector('input[name="rating"]:checked');
        if (!rating) {
            errors.push('Please select a rating');
            isValid = false;
        }
        
        const ownership = document.querySelector('input[name="ownership"]:checked');
        if (!ownership) {
            errors.push('Please indicate if you own a Polaroid Sun 600');
            isValid = false;
        }
        
        const comments = document.getElementById('comments').value.trim();
        if (comments.length < 10) {
            errors.push('Please provide at least 10 characters of feedback');
            isValid = false;
        }
        
        if (!isValid) {
            alert('Please fix the following errors:\n\n' + errors.join('\n'));
        }
        
        return isValid;
    }
    
    //Show success message and hide form temporarily
    function showSuccessMessage() {
        feedbackForm.style.display = 'none';
        
        successMessage.style.display = 'block';
        
        setTimeout(function() {
            successMessage.style.display = 'none';
            feedbackForm.style.display = 'block';
        }, 5000);
    }
    
    // Add interactive hover effects to rating labels
    const ratingLabels = document.querySelectorAll('.rating-group label');
    ratingLabels.forEach(label => {
        label.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e3f2fd';
        });
        
        label.addEventListener('mouseleave', function() {
            const radio = this.previousElementSibling;
            if (!radio.checked) {
                this.style.backgroundColor = 'transparent';
            }
        });
    });
    
    //Highlight selected rating
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            ratingLabels.forEach(label => {
                label.style.backgroundColor = 'transparent';
                label.style.fontWeight = 'normal';
            });
            
            const selectedLabel = this.nextElementSibling;
            selectedLabel.style.backgroundColor = '#e3f2fd';
            selectedLabel.style.fontWeight = '600';
        });
    });
    
    console.log('Possibly a Success?');
});