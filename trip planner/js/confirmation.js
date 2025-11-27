// Generate a random booking reference
function generateBookingReference() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let reference = '';
    for (let i = 0; i < 8; i++) {
        reference += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return reference;
}

// Format currency
function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

// Populate booking details
function populateBookingDetails() {
    // Get booking details from sessionStorage
    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
    
    if (!bookingDetails) {
        window.location.href = 'index.html';
        return;
    }
    
    // Generate and display booking reference
    document.getElementById('bookingReference').textContent = generateBookingReference();
    
    // Display package details
    document.getElementById('packageName').textContent = bookingDetails.packageName;
    document.getElementById('fullName').textContent = bookingDetails.fullName;
    document.getElementById('email').textContent = bookingDetails.email;
    document.getElementById('phone').textContent = bookingDetails.phone;
    document.getElementById('travelers').textContent = bookingDetails.travelers || '1';
    
    // Display price details
    const packagePrice = parseFloat(bookingDetails.packagePrice);
    const taxFees = packagePrice * 0.10;
    const totalAmount = packagePrice + taxFees;
    
    document.getElementById('packagePrice').textContent = formatCurrency(packagePrice);
    document.getElementById('taxFees').textContent = formatCurrency(taxFees);
    document.getElementById('totalAmount').textContent = formatCurrency(totalAmount);
    
    // Clear booking details from sessionStorage after displaying
    sessionStorage.removeItem('bookingDetails');
}

// Add print styles
function addPrintStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            .header, .footer, .confirmation-actions {
                display: none !important;
            }
            
            .booking-section {
                padding: 0 !important;
                background: white !important;
            }
            
            .confirmation-content {
                box-shadow: none !important;
            }
            
            .booking-details {
                page-break-inside: avoid;
            }
            
            body {
                font-size: 12pt;
            }
            
            h1 {
                font-size: 18pt;
            }
            
            h2 {
                font-size: 16pt;
            }
            
            h3 {
                font-size: 14pt;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize confirmation page
function initConfirmation() {
    populateBookingDetails();
    addPrintStyles();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initConfirmation); 