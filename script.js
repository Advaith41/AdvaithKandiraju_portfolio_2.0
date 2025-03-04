// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Set "about" section as home/default section
    const defaultSection = document.getElementById('about');
    const allSections = document.querySelectorAll('.content-section');
    const allNavLinks = document.querySelectorAll('.nav-section');
    
    // Hide all sections and remove active class from nav links
    allSections.forEach(section => section.classList.remove('active'));
    allNavLinks.forEach(link => link.classList.remove('active'));
    
    // Show about section and activate its nav link
    defaultSection.classList.add('active');
    document.querySelector('a[href="#about"]').classList.add('active');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navigation highlight on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Reset to about section when browser back/forward buttons are used
    window.addEventListener('popstate', () => {
        allSections.forEach(section => section.classList.remove('active'));
        allNavLinks.forEach(link => link.classList.remove('active'));
        defaultSection.classList.add('active');
        document.querySelector('a[href="#about"]').classList.add('active');
    });

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function reveal() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // Mobile menu toggle
    const menuButton = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-nav');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Simple search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                const highlight = searchTerm && text.includes(searchTerm);
                section.style.backgroundColor = highlight ? 'rgba(139, 69, 19, 0.2)' : 'transparent';
            });
        });
    }

    // Navigation click handler (using existing navLinks)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove all active classes
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').slice(1);
            document.getElementById(targetId)?.classList.add('active');
        });
    });

    const navSections = document.querySelectorAll('.nav-section');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to switch sections
    function switchSection(targetId) {
        // Remove active class from all sections
        navSections.forEach(section => section.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));

        // Add active class to target section
        document.querySelector(`a[href="#${targetId}"]`).classList.add('active');
        document.getElementById(targetId).classList.add('active');
    }

    // Add click handlers to navigation items
    navSections.forEach(section => {
        section.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = section.getAttribute('href').substring(1);
            switchSection(targetId);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            contentSections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }

    // Add this to your existing script.js
    function initMap() {
        const sanJose = { lat: 37.4111, lng: -121.9297 }; // San Jose, CA 95134 coordinates
        
        // Custom map style to match your color palette
        const customStyle = [
            {
                "elementType": "geometry",
                "stylers": [{"color": "#242424"}]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#DEB887"}]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{"color": "#242424"}]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{"color": "#CD7F32"}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#1a1a1a"}]
            }
        ];

        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: sanJose,
            styles: customStyle,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });

        // Add marker for San Jose
        new google.maps.Marker({
            position: sanJose,
            map: map,
            title: "San Jose, CA"
        });
    }

    const companyBtns = document.querySelectorAll('.company-btn');
    const companyDetails = document.querySelectorAll('.company-details');

    companyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and details
            companyBtns.forEach(b => b.classList.remove('active'));
            companyDetails.forEach(d => d.classList.remove('active'));

            // Add active class to clicked button and corresponding details
            btn.classList.add('active');
            const companyId = btn.dataset.company;
            document.getElementById(companyId).classList.add('active');
        });
    });

    // Add this to your existing script.js
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        const submitBtn = document.getElementById('submitBtn');
        const statusDiv = document.getElementById('submissionStatus');
        
        // Disable the submit button
        submitBtn.disabled = true;
        submitBtn.classList.add('disabled');
        submitBtn.textContent = 'Sending...';
        
        // Send the form data
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            if (response.ok) {
                statusDiv.textContent = 'Message sent successfully!';
                statusDiv.className = 'submission-status success';
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            statusDiv.textContent = 'Failed to send message. Please try again.';
            statusDiv.className = 'submission-status error';
        })
        .finally(() => {
            // Re-enable the submit button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.classList.remove('disabled');
                submitBtn.textContent = 'Send Message';
            }, 3000);
        });
    });

    // Get all the necessary elements
    const scrollLeft = document.getElementById('scrollLeft');
    const scrollRight = document.getElementById('scrollRight');
    const companyList = document.querySelector('.company-list');
    const experienceSections = document.querySelectorAll('.experience-content');
    
    // Increased scroll distance to 480 (400 * 1.2)
    const scrollDistance = 480;
    
    // Scroll buttons functionality
    scrollLeft.addEventListener('click', () => {
        companyList.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    });
    
    scrollRight.addEventListener('click', () => {
        companyList.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    });

    // Add click handlers to company buttons
    companyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and sections
            companyBtns.forEach(b => b.classList.remove('active'));
            experienceSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Set initial active state
    companyBtns[0].click();
});

document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.project-slide');
    const indicators = document.querySelectorAll('.project-indicator');
    
    let currentIndex = 0;

    function updateCarousel() {
        // Update slides visibility
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });

        // Update indicator states
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    indicators.forEach((indicator) => {
        indicator.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.dataset.index, 10);
            updateCarousel();
        });
    });

    updateCarousel();  // Initialize the carousel on page load
});
