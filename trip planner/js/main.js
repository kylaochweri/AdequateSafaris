// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');
const loginBtn = document.querySelector('.btn-login');
const signupBtn = document.querySelector('.btn-signup');
const modal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const heroSection = document.querySelector('.hero');

// Set hero background
heroSection.style.backgroundImage = 'url("images/hero-bg.jpg")';

// Destination Packages Data
const destinationPackages = {
    zanzibar: {
        name: 'Zanzibar',
        description: 'Experience the perfect blend of beach paradise and cultural heritage',
        packages: [
            {
                name: '5-Day Beach Escape',
                duration: '5 days',
                price: 1200,
                features: ['Luxury Beach Resort', 'Stone Town Tour', 'Spice Farm Visit'],
                tourOperator: 'Bonfire Adventures'
            },
            {
                name: 'Week in Paradise',
                duration: '7 days',
                price: 1800,
                features: ['All-Inclusive Resort', 'Snorkeling Trip', 'Sunset Cruise'],
                tourOperator: 'TruTravels'
            },
            {
                name: 'Island Explorer',
                duration: '6 days',
                price: 1500,
                features: ['Beach Hotel', 'Dolphin Watching', 'Local Village Tour'],
                tourOperator: 'Spoton Vacations'
            }
        ]
    },
    serengeti: {
        name: 'Serengeti',
        description: 'Witness the incredible wildlife and stunning landscapes of Tanzania',
        packages: [
            {
                name: 'Safari Adventure',
                duration: '6 days',
                price: 2500,
                features: ['Game Drives', 'Luxury Camping', 'Maasai Village Visit'],
                tourOperator: 'Bonfire Adventures'
            },
            {
                name: 'Migration Special',
                duration: '8 days',
                price: 3200,
                features: ['Wildlife Viewing', 'Hot Air Balloon', 'Photography Workshop'],
                tourOperator: 'TruTravels'
            },
            {
                name: 'Ultimate Safari',
                duration: '7 days',
                price: 2800,
                features: ['Private Guide', 'Lodge Stay', 'Bush Dining Experience'],
                tourOperator: 'Spoton Vacations'
            }
        ]
    },
    'victoria-falls': {
        name: 'Victoria Falls',
        description: 'Experience the majestic power of Africa\'s greatest waterfall',
        packages: [
            {
                name: 'Falls Explorer',
                duration: '4 days',
                price: 1800,
                features: ['Guided Falls Tour', 'River Cruise', 'Helicopter Flight'],
                tourOperator: 'Bonfire Adventures'
            },
            {
                name: 'Adventure Package',
                duration: '6 days',
                price: 2200,
                features: ['White Water Rafting', 'Bungee Jumping', 'Zip Line'],
                tourOperator: 'TruTravels'
            },
            {
                name: 'Luxury Falls Escape',
                duration: '5 days',
                price: 2000,
                features: ['5-Star Resort', 'Spa Treatment', 'Sunset Cruise'],
                tourOperator: 'Spoton Vacations'
            }
        ]
    },
    'cape-town': {
        name: 'Cape Town',
        description: 'Discover the beauty of South Africa\'s mother city',
        packages: [
            {
                name: 'City Explorer',
                duration: '5 days',
                price: 1600,
                features: ['Table Mountain', 'Cape Peninsula Tour', 'Wine Tasting'],
                tourOperator: 'Bonfire Adventures'
            },
            {
                name: 'Cultural Journey',
                duration: '7 days',
                price: 2100,
                features: ['Township Tour', 'Robben Island', 'Local Cooking Class'],
                tourOperator: 'TruTravels'
            },
            {
                name: 'Coastal Adventure',
                duration: '6 days',
                price: 1900,
                features: ['Shark Cage Diving', 'Hiking', 'Beach Day'],
                tourOperator: 'Spoton Vacations'
            }
        ]
    }
};

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    authButtons.style.display = authButtons.style.display === 'flex' ? 'none' : 'flex';
});

// Modal Functionality
loginBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    console.log('Login attempt:', { email, password });
    modal.style.display = 'none';
    loginForm.reset();
});

// Slideshow Functionality
function initializeSlideshow(container) {
    const slides = container.querySelectorAll('.slide');
    const dotsContainer = container.querySelector('.slideshow-dots');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Show initial slide
    showSlide(currentSlide);

    // Start automatic slideshow
    startSlideshow();

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }

    function goToSlide(index) {
        showSlide(index);
        resetSlideshow();
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSlideshow() {
        clearInterval(slideInterval);
        startSlideshow();
    }

    // Pause slideshow on hover
    container.addEventListener('mouseenter', () => clearInterval(slideInterval));
    container.addEventListener('mouseleave', startSlideshow);
}

// Initialize slideshows for all destination cards
document.querySelectorAll('.slideshow-container').forEach(container => {
    initializeSlideshow(container);
});

// Show Packages Modal
function showPackages(destinationKey) {
    console.log('Showing packages for:', destinationKey);
    const destination = destinationPackages[destinationKey];
    if (!destination) {
        console.error('Destination not found:', destinationKey);
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'packages-modal';
    
    // Group packages by tour operator
    const packagesByOperator = {
        'Bonfire Adventures': [],
        'TruTravels': [],
        'Spoton Vacations': []
    };
    
    destination.packages.forEach(pkg => {
        if (packagesByOperator.hasOwnProperty(pkg.tourOperator)) {
            packagesByOperator[pkg.tourOperator].push(pkg);
        }
    });
    
    let packagesHTML = `
        <div class="packages-modal-content">
            <span class="close-modal">&times;</span>
            <h2>${destination.name} Vacation Packages</h2>
            <div class="search-results-header">
                <div class="destination-slideshow">
                    <img src="images/${destinationKey}.jpg" alt="${destination.name}" onerror="this.src='images/placeholder.jpg'" loading="lazy">
                    <div class="slideshow-dots">
                        ${Array(4).fill().map((_, i) => `
                            <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i + 1}"></span>
                        `).join('')}
                    </div>
                </div>
                <div class="destination-overview">
                    <h3>${destination.name}</h3>
                    <p>${destination.description}</p>
                    <div class="package-highlights">
                        <div class="highlight">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Best Time to Visit</span>
                        </div>
                        <div class="highlight">
                            <i class="fas fa-users"></i>
                            <span>Group Size</span>
                        </div>
                        <div class="highlight">
                            <i class="fas fa-clock"></i>
                            <span>Duration Options</span>
                        </div>
                    </div>
                </div>
            </div>
    `;

    // Add tour operator sections
    Object.entries(packagesByOperator).forEach(([operator, packages]) => {
        if (packages.length > 0) {
            packagesHTML += `
                <div class="tour-operator-section">
                    <h3 class="operator-title">
                        <i class="fas fa-building"></i>
                        ${operator}
                    </h3>
                    <div class="packages-grid">
                        ${packages.map(pkg => `
                            <div class="package-card">
                                <div class="package-header">
                                    <h4>${pkg.name}</h4>
                                    <div class="package-meta">
                                        <span class="duration">
                                            <i class="fas fa-clock"></i>
                                            ${pkg.duration}
                                        </span>
                                        <span class="price">
                                            <i class="fas fa-tag"></i>
                                            $${pkg.price}
                                        </span>
                                    </div>
                                </div>
                                <div class="package-features">
                                    <h5>Package Includes:</h5>
                                    <ul>
                                        ${pkg.features.map(feature => `
                                            <li>
                                                <i class="fas fa-check"></i>
                                                ${feature}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                                <div class="booking-section">
                                    <form class="booking-form" onsubmit="event.preventDefault(); handleBooking('${destinationKey}', '${pkg.name}', ${pkg.price}, '${operator}')">
                                        <div class="form-group">
                                            <label>
                                                <i class="fas fa-calendar"></i>
                                                Travel Date
                                            </label>
                                            <input type="date" 
                                                   required 
                                                   min="${new Date().toISOString().split('T')[0]}">
                                        </div>
                                        <div class="form-group">
                                            <label>
                                                <i class="fas fa-users"></i>
                                                Number of Travelers
                                            </label>
                                            <select required>
                                                ${[1,2,3,4,5,6].map(num => `
                                                    <option value="${num}">
                                                        ${num} ${num === 1 ? 'Traveler' : 'Travelers'}
                                                    </option>
                                                `).join('')}
                                            </select>
                                        </div>
                                        <button type="submit" class="btn-book-now">
                                            <i class="fas fa-paper-plane"></i>
                                            Book Now
                                        </button>
                                    </form>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });

    packagesHTML += `</div>`;
    modal.innerHTML = packagesHTML;
    document.body.appendChild(modal);

    // Add modal with smooth animation
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });

    // Enhanced slideshow functionality
    const modalImg = modal.querySelector('.destination-slideshow img');
    const modalDots = modal.querySelectorAll('.slideshow-dots .dot');
    let currentImageIndex = 1;
    let isTransitioning = false;

    function updateModalImage(newIndex, direction = 1) {
        if (isTransitioning) return;
        isTransitioning = true;

        const oldImage = modalImg.cloneNode();
        oldImage.style.position = 'absolute';
        oldImage.style.top = '0';
        oldImage.style.left = '0';
        modalImg.parentNode.appendChild(oldImage);

        modalImg.style.opacity = '0';
        modalImg.src = `images/${destinationKey}_${newIndex}.jpg`;
        
        modalImg.onload = () => {
            modalImg.style.opacity = '1';
            oldImage.style.opacity = '0';
            setTimeout(() => {
                oldImage.remove();
                isTransitioning = false;
            }, 300);
        };

        modalImg.onerror = () => {
            modalImg.src = 'images/placeholder.jpg';
            isTransitioning = false;
        };

        modalDots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === newIndex);
        });

        currentImageIndex = newIndex;
    }

    // Add click handlers for dots with enhanced interaction
    modalDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const newIndex = parseInt(dot.dataset.index);
            if (newIndex === currentImageIndex) return;
            updateModalImage(newIndex, newIndex > currentImageIndex ? 1 : -1);
        });
    });

    // Auto-advance slideshow with smooth transitions
    const slideshowInterval = setInterval(() => {
        const newIndex = currentImageIndex % 4 + 1;
        updateModalImage(newIndex, 1);
    }, 5000);

    // Enhanced close functionality with animation
    const closeBtn = modal.querySelector('.close-modal');
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            clearInterval(slideshowInterval);
            modal.remove();
        }, 300);
    }

    closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
}

// Handle booking submission
function handleBooking(destination, packageName, price, operator) {
    const form = event.target;
    const travelDate = form.querySelector('input[type="date"]').value;
    const travelers = form.querySelector('select').value;
    
    // Here you would typically send this to your backend
    console.log('Booking details:', {
        destination,
        packageName,
        price,
        operator,
        travelDate,
        travelers
    });
    
    // Show confirmation message
    alert(`Thank you for booking ${packageName} with ${operator}!\n\nYour trip to ${destination} is scheduled for ${travelDate}\nNumber of travelers: ${travelers}\nTotal price: $${price * travelers}`);
}

// Compare Form Submission
const compareForm = document.getElementById('compareForm');
if (compareForm) {
    compareForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const destination = document.getElementById('destination').value;
        const duration = document.getElementById('duration').value;
        const travelers = document.getElementById('travelers').value;
        const accommodation = document.querySelector('input[name="accommodation"]:checked').value;

        // Show comparison results
        const resultsSection = document.getElementById('comparisonResults');
        resultsSection.style.display = 'block';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing! We will keep you updated with our latest offers.');
        this.reset();
    });
}

// Initialize page-specific features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Initialize destination cards
    initializeDestinationCards();
    
    // Add event listeners to search button if it exists
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Initialize mobile menu
    initializeMobileMenu();
});

// Initialize destination cards with event listeners
function initializeDestinationCards() {
    const cards = document.querySelectorAll('.destination-card');
    
    cards.forEach(card => {
        // Add click event to view packages buttons
        const viewBtn = card.querySelector('.btn-book');
        if (viewBtn) {
            viewBtn.addEventListener('click', function() {
                const destinationName = card.querySelector('h3').textContent;
                const destinationKey = getDestinationKeyByName(destinationName);
                if (destinationKey) {
                    showPackages(destinationKey);
                }
            });
        }
        
        // Initialize image loading
        const img = card.querySelector('.destination-image img');
        if (img) {
            loadDestinationImage(img);
        }
    });
}

// Helper function to get destination key by name
function getDestinationKeyByName(name) {
    for (const [key, destination] of Object.entries(destinationPackages)) {
        if (destination.name === name) {
            return key;
        }
    }
    return null;
}

// Enhanced image loading with Booking.com-like approach
function loadDestinationImage(img) {
    const imageUrl = img.getAttribute('src');
    const container = img.closest('.destination-image');
    
    // Add loading state
    container.classList.add('loading');
    
    // Create new image object for preloading
    const tempImage = new Image();
    
    tempImage.onload = function() {
        // Short delay to ensure smooth transition
        setTimeout(() => {
            img.src = this.src;
            container.classList.remove('loading');
            
            // Add fade-in effect
            img.style.opacity = '0';
            requestAnimationFrame(() => {
                img.style.opacity = '1';
            });
        }, 100);
    };
    
    tempImage.onerror = function() {
        console.warn(`Failed to load image: ${imageUrl}`);
        img.src = 'images/placeholder.jpg';
        container.classList.remove('loading');
        
        // Add a subtle border to indicate placeholder
        container.style.border = '1px dashed #ddd';
    };
    
    // Start loading
    tempImage.src = imageUrl;
}

// Initialize image loading for all destination cards
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing optimized image loading');
    document.querySelectorAll('.destination-image img').forEach(loadDestinationImage);
});

// Slideshow functionality
function initializeSlideshow(card, destination) {
    const img = card.querySelector('img');
    let currentImageIndex = 1;
    const totalImages = 4; // We have 4 images for each destination

    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slideshow-dots';
    for (let i = 1; i <= totalImages; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === 1) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentImageIndex = i;
            updateImage();
        });
        dotsContainer.appendChild(dot);
    }
    card.appendChild(dotsContainer);

    function updateImage() {
        // Update image source
        img.src = `images/${destination}_${currentImageIndex}.jpg`;
        // Update dots
        const dots = card.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === currentImageIndex);
        });
    }

    // Auto-advance slideshow
    setInterval(() => {
        currentImageIndex = currentImageIndex % totalImages + 1;
        updateImage();
    }, 5000); // Change image every 5 seconds

    // Add error handling for images
    img.onerror = () => {
        console.log(`Failed to load image: ${destination}_${currentImageIndex}.jpg`);
        img.src = `https://via.placeholder.com/800x600/2C3E50/FFFFFF?text=${destination}`;
    };
}

// Function to create destination cards
function createDestinationCards() {
    console.log('Creating destination cards...');
    const destinationsGrid = document.querySelector('.destinations-grid');
    
    if (!destinationsGrid) {
        console.error('Could not find destinations-grid element');
        return;
    }
    
    console.log('Found destinations grid, clearing existing content');
    destinationsGrid.innerHTML = '';

    console.log('Available destinations:', Object.keys(destinationPackages));
    
    Object.entries(destinationPackages).forEach(([key, destination]) => {
        console.log(`Creating card for ${destination.name}`);
        const card = document.createElement('div');
        card.className = 'destination-card';
        
        card.innerHTML = `
            <img src="images/${key}_1.jpg" alt="${destination.name}">
            <div class="card-content">
                <h3>${destination.name}</h3>
                <p>Starting from $${Math.min(...destination.packages.map(pkg => pkg.price))}</p>
                <button class="btn-book" onclick="showPackages('${key}')">View Packages</button>
            </div>
        `;
        
        console.log(`Adding card for ${destination.name} to grid`);
        destinationsGrid.appendChild(card);
        
        // Initialize slideshow for this card
        initializeSlideshow(card, key);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    try {
        createDestinationCards();
        console.log('Destination cards created successfully');
    } catch (error) {
        console.error('Error creating destination cards:', error);
    }
});

// Create and populate destination cards
function showBookingModal(destination) {
    const packages = destinationPackages[destination];
    if (!packages) return;
    
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Available Packages for ${destination}</h2>
            <div class="packages-grid">
                ${packages.map(pkg => `
                    <div class="package-card">
                        <h3>${pkg.name}</h3>
                        <p class="price">$${pkg.price}</p>
                        <ul class="features">
                            ${pkg.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <button class="btn-select" onclick="selectPackage('${destination}', '${pkg.name}', ${pkg.price})">
                            Select Package
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    
    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };
}

// Function to handle package selection
function selectPackage(destination, packageName, price) {
    console.log('Selected package:', { destination, packageName, price });
    
    // Remove any existing modal
    const existingModal = document.querySelector('.packages-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Redirect to booking page with package details
    const params = new URLSearchParams({
        destination: destination,
        package: packageName,
        price: price
    });
    
    const bookingUrl = `booking.html?${params.toString()}`;
    console.log('Redirecting to:', bookingUrl);
    window.location.href = bookingUrl;
}

// Search Functionality
const searchForm = document.querySelector('.search-box');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchForm.querySelector('input[type="text"]').value.toLowerCase();
    const checkIn = searchForm.querySelector('input[type="date"]:nth-of-type(1)').value;
    const checkOut = searchForm.querySelector('input[type="date"]:nth-of-type(2)').value;
    const guests = searchForm.querySelector('select').value;
    
    searchDestinations(location);
});

// Function to search destinations and display results
function searchDestinations(searchQuery) {
    searchQuery = searchQuery.toLowerCase().trim();
    
    // Find matching destination
    let matchingDestination = null;
    let destinationKey = null;

    for (const [key, destination] of Object.entries(destinationPackages)) {
        if (destination.name.toLowerCase().includes(searchQuery)) {
            matchingDestination = destination;
            destinationKey = key;
            break;
        }
    }

    if (matchingDestination) {
        showPackages(destinationKey);
    } else {
        // Show no results found message
        const noResultsModal = document.createElement('div');
        noResultsModal.className = 'packages-modal';
        
        noResultsModal.innerHTML = `
            <div class="packages-modal-content">
                <span class="close-modal">&times;</span>
                <div style="text-align: center; padding: 3rem;">
                    <h2>No Results Found</h2>
                    <p style="margin-top: 1rem;">We couldn't find any destinations matching "${searchQuery}"</p>
                    <p style="margin-top: 0.5rem;">Try searching for: Zanzibar, Serengeti, Victoria Falls, or Cape Town</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(noResultsModal);

        // Close modal functionality
        const closeBtn = noResultsModal.querySelector('.close-modal');
        closeBtn.onclick = () => noResultsModal.remove();
        noResultsModal.onclick = (e) => {
            if (e.target === noResultsModal) noResultsModal.remove();
        };
    }
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .packages-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        overflow-y: auto;
        padding: 2rem;
    }

    .packages-modal-content {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        max-width: 1200px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }

    .close-modal {
        position: absolute;
        right: 1.5rem;
        top: 1rem;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
    }

    .search-results-header {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin: 2rem 0;
        padding: 1rem;
        background: var(--light-gray);
        border-radius: 0.5rem;
    }

    .search-results-header img {
        width: 300px;
        height: 200px;
        object-fit: cover;
        border-radius: 0.5rem;
    }

    .destination-overview {
        flex: 1;
    }

    .destination-overview h3 {
        font-size: 1.8rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    .destination-overview p {
        font-size: 1.1rem;
        color: var(--text-color);
        margin-bottom: 0.5rem;
    }

    .packages-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .package-card {
        border: 1px solid #ddd;
        border-radius: 0.5rem;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .package-header {
        text-align: center;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
    }

    .package-header h3 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }

    .package-header h4 {
        color: var(--text-color);
        margin-bottom: 1rem;
    }

    .package-price {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
    }

    .package-duration {
        color: #666;
        font-style: italic;
    }

    .package-features ul {
        list-style: none;
        padding: 0;
    }

    .package-features li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        color: #666;
    }

    .package-features i {
        color: var(--primary-color);
    }

    .book-now-btn {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 500;
        margin-top: auto;
        transition: background-color 0.3s ease;
    }

    .book-now-btn:hover {
        background: var(--secondary-color);
    }

    @media (max-width: 768px) {
        .packages-modal-content {
            padding: 1rem;
            width: 95%;
        }

        .packages-grid {
            grid-template-columns: 1fr;
        }

        .search-results-header {
            flex-direction: column;
            text-align: center;
        }

        .search-results-header img {
            width: 100%;
            max-width: 400px;
        }
    }

    .modal {
        display: block;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.3s ease-out;
    }
    
    .modal-content {
        background-color: white;
        margin: 5% auto;
        padding: 2rem;
        border-radius: 1rem;
        max-width: 900px;
        position: relative;
        animation: slideIn 0.3s ease-out;
    }
    
    .close {
        position: absolute;
        right: 1.5rem;
        top: 1rem;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
    }
    
    .close:hover {
        color: black;
    }
    
    .packages-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .package-card {
        background: var(--light-gray);
        padding: 1.5rem;
        border-radius: 0.5rem;
        text-align: center;
    }
    
    .package-card h3 {
        color: var(--text-color);
        margin-bottom: 1rem;
    }
    
    .package-card .price {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
    }
    
    .package-card .features {
        list-style: none;
        padding: 0;
        margin-bottom: 1.5rem;
        text-align: left;
    }
    
    .package-card .features li {
        margin-bottom: 0.5rem;
        padding-left: 1.5rem;
        position: relative;
    }
    
    .package-card .features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--primary-color);
    }
    
    .btn-select {
        background: var(--primary-color);
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .btn-select:hover {
        background: var(--secondary-color);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from {
            transform: translateY(-10%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        .modal-content {
            margin: 10% 1rem;
            padding: 1.5rem;
        }
        
        .packages-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(modalStyles);

// Update slideshow styles
const slideshowStyles = document.createElement('style');
slideshowStyles.textContent = `
    .destination-card {
        position: relative;
    }

    .slideshow-dots {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        z-index: 2;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .dot.active {
        background: white;
    }

    .destination-card img {
        transition: opacity 0.3s ease;
    }

    .destination-slideshow {
        position: relative;
        width: 100%;
        max-width: 600px;
        border-radius: 0.5rem;
        overflow: hidden;
    }

    .destination-slideshow img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 0.5rem;
    }

    .modal-dots {
        bottom: 20px;
    }

    .search-results-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        text-align: center;
    }

    @media (min-width: 768px) {
        .search-results-header {
            flex-direction: row;
            text-align: left;
            align-items: flex-start;
        }
    }
`;
document.head.appendChild(slideshowStyles);

// Destination Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-filter');

            destinationCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Session Management
function checkLoginStatus() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

function setLoginStatus(status) {
    sessionStorage.setItem('isLoggedIn', status);
}

// Login Form Handler
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Add your authentication logic here
    // For demo purposes, we'll just set logged in status
    setLoginStatus(true);
    
    // Hide login modal
    const loginModal = document.querySelector('.login-modal');
    if (loginModal) {
        loginModal.style.display = 'none';
    }
}

// Slideshow functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const slideshowInterval = 5000; // 5 seconds

function showSlides() {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show next slide
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].classList.add('active');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check login status
    if (!checkLoginStatus()) {
        const loginModal = document.querySelector('.login-modal');
        if (loginModal) {
            loginModal.style.display = 'block';
        }
    }
    
    // Setup login form handler
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Start slideshow if slides exist
    if (slides.length > 0) {
        showSlides();
        setInterval(showSlides, slideshowInterval);
    }
}); 