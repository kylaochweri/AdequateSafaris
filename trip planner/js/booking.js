// DOM Elements
const bookingForm = document.getElementById('bookingForm');
const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
const creditCardFields = document.getElementById('creditCardFields');
const paypalFields = document.getElementById('paypalFields');
const termsCheckbox = document.getElementById('termsCheckbox');
const submitButton = document.querySelector('.submit-booking');

// Get package details from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const packageId = urlParams.get('package');
const packageName = urlParams.get('name');
const packagePrice = parseFloat(urlParams.get('price')) || 0;

// Update package summary
function updatePackageSummary() {
    const summaryTitle = document.querySelector('.package-summary h2');
    const basePrice = document.getElementById('basePrice');
    const taxFees = document.getElementById('taxFees');
    const totalPrice = document.getElementById('totalPrice');

    if (summaryTitle && packageName) {
        summaryTitle.textContent = packageName;
    }

    if (basePrice) {
        basePrice.textContent = `$${packagePrice.toFixed(2)}`;
    }

    // Calculate tax and fees (10% of base price)
    const taxAmount = packagePrice * 0.10;
    if (taxFees) {
        taxFees.textContent = `$${taxAmount.toFixed(2)}`;
    }

    // Calculate total
    const total = packagePrice + taxAmount;
    if (totalPrice) {
        totalPrice.textContent = `$${total.toFixed(2)}`;
    }
}

// Toggle payment method fields
function togglePaymentFields() {
    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            if (e.target.value === 'credit-card') {
                creditCardFields.style.display = 'block';
                paypalFields.style.display = 'none';
            } else {
                creditCardFields.style.display = 'none';
                paypalFields.style.display = 'block';
            }
        });
    });
}

// Validate credit card number using Luhn algorithm
function validateCreditCard(number) {
    let sum = 0;
    let isEven = false;
    
    // Remove any spaces or hyphens
    number = number.replace(/\D/g, '');
    
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

// Format credit card number with spaces
function formatCreditCard(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = value;
}

// Format expiry date
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    
    // Basic form validation
    const formData = new FormData(bookingForm);
    const bookingDetails = Object.fromEntries(formData.entries());
    
    // Validate required fields
    if (!bookingDetails.fullName || !bookingDetails.email || !bookingDetails.phone) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingDetails.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate payment details
    if (bookingDetails.paymentMethod === 'credit-card') {
        if (!validateCreditCard(bookingDetails.cardNumber)) {
            showNotification('Please enter a valid credit card number', 'error');
            return;
        }
    }
    
    // Validate terms acceptance
    if (!termsCheckbox.checked) {
        showNotification('Please accept the terms and conditions', 'error');
        return;
    }
    
    // Simulate booking submission
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    
    setTimeout(() => {
        showNotification('Booking successful! Redirecting to confirmation page...');
        
        // Store booking details in sessionStorage
        sessionStorage.setItem('bookingDetails', JSON.stringify({
            ...bookingDetails,
            packageName,
            packagePrice,
            totalPrice: (packagePrice * 1.1).toFixed(2)
        }));
        
        // Redirect to confirmation page after 2 seconds
        setTimeout(() => {
            window.location.href = 'confirmation.html';
        }, 2000);
    }, 1500);
}

// Initialize booking page
function initBooking() {
    // Update package summary
    updatePackageSummary();
    
    // Setup payment method toggle
    togglePaymentFields();
    
    // Add event listeners for credit card formatting
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryInput = document.getElementById('expiry');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', () => formatCreditCard(cardNumberInput));
    }
    
    if (expiryInput) {
        expiryInput.addEventListener('input', () => formatExpiryDate(expiryInput));
    }
    
    // Add form submission handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleSubmit);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initBooking); 