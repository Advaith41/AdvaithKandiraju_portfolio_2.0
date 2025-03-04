document.addEventListener('DOMContentLoaded', () => {
    const isMobile = () => window.innerWidth <= 768;
    
    function initializeDesktopVersion() {
        // Load desktop scripts and styles
        const desktopScript = document.createElement('script');
        desktopScript.src = 'script.js';
        document.body.appendChild(desktopScript);
    }

    function initializeMobileVersion() {
        const profileSidebar = document.querySelector('.profile-sidebar');
        const navigationSidebar = document.querySelector('.navigation-sidebar');
        const contentArea = document.querySelector('.content-area');
        const mainContainer = document.querySelector('.main-container');

        // Ensure proper structure
        if (mainContainer) {
            // Move navigation to top of container
            if (navigationSidebar && mainContainer.firstChild !== navigationSidebar) {
                mainContainer.insertBefore(navigationSidebar, mainContainer.firstChild);
            }
        }

        // Update navigation
        if (navigationSidebar) {
            const navSections = navigationSidebar.querySelector('.nav-sections');
            if (navSections) {
                navSections.innerHTML = `
                    <a href="#profile" class="nav-section">Profile</a>
                    <a href="#about" class="nav-section">About</a>
                    <a href="#projects" class="nav-section">Projects</a>
                    <a href="#experience" class="nav-section">Experience</a>
                    <a href="#education" class="nav-section">Education</a>
                    <a href="#contact" class="nav-section">Contact</a>
                `;

                // Add click handlers for navigation
                navSections.querySelectorAll('.nav-section').forEach(section => {
                    section.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = section.getAttribute('href').slice(1);
                        showSection(targetId);
                        
                        // Update active state
                        navSections.querySelectorAll('.nav-section').forEach(s => 
                            s.classList.remove('active'));
                        section.classList.add('active');
                    });
                });
            }
        }
        
        // Create and insert profile section
        if (profileSidebar && contentArea) {
            const mobileProfile = document.createElement('div');
            mobileProfile.id = 'profile';
            mobileProfile.className = 'content-section';
            mobileProfile.innerHTML = profileSidebar.innerHTML;
            contentArea.insertBefore(mobileProfile, contentArea.firstChild);
        }

        // Show initial section
        const initialSection = window.location.hash.slice(1) || 'profile';
        showSection(initialSection);
    }

    function showSection(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });

        // Update navigation active state
        const navLinks = document.querySelectorAll('.nav-section');
        navLinks.forEach(link => {
            link.classList.toggle('active', 
                link.getAttribute('href') === `#${sectionId}`);
        });
    }

    // Initial setup
    if (isMobile()) {
        initializeMobileVersion();
    } else {
        initializeDesktopVersion();
    }

    // Handle resize events
    let timeout;
    window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const isMobileView = isMobile();
            const hasMobileLayout = document.querySelector('#profile.content-section');
            
            if (isMobileView && !hasMobileLayout) {
                initializeMobileVersion();
            } else if (!isMobileView && hasMobileLayout) {
                location.reload();
            }
        }, 250);
    });
}); 