// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');

// Toggle Password Visibility
togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('#email').value;
        const password = this.querySelector('#password').value;
        const remember = this.querySelector('input[name="remember"]').checked;
        
        // Here you would typically send this data to your backend
        console.log('Login attempt:', { email, password, remember });
        
        // For demo purposes, show success message
        showNotification('Login successful! Redirecting...', 'success');
        
        // Simulate redirect after successful login
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
}

// Signup Form Submission
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = this.querySelector('#fullName').value;
        const email = this.querySelector('#email').value;
        const password = this.querySelector('#password').value;
        const confirmPassword = this.querySelector('#confirmPassword').value;
        const terms = this.querySelector('input[name="terms"]').checked;
        
        // Basic validation
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        if (!terms) {
            showNotification('Please accept the terms and conditions', 'error');
            return;
        }
        
        // Here you would typically send this data to your backend
        console.log('Signup attempt:', { fullName, email, password, terms });
        
        // For demo purposes, show success message
        showNotification('Account created successfully! Redirecting...', 'success');
        
        // Simulate redirect after successful signup
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
}

// Social Login Buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
        console.log(`${provider} login clicked`);
        // Here you would implement social login functionality
        showNotification(`${provider} login coming soon!`, 'info');
    });
});

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    .notification.success {
        background-color: #10B981;
    }

    .notification.error {
        background-color: #EF4444;
    }

    .notification.info {
        background-color: #3B82F6;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 