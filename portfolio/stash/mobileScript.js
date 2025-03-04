document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.mobile-section');

    // Function to show section
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
        }

        // Update nav items
        navItems.forEach(item => {
            item.classList.toggle('active', 
                item.getAttribute('data-section') === sectionId);
        });

        // Load section content if not already loaded
        if (targetSection && !targetSection.hasAttribute('data-loaded')) {
            loadSectionContent(sectionId, targetSection);
        }
    }

    // Function to load section content
    function loadSectionContent(sectionId, targetSection) {
        // Get content from your index.html
        const mainContent = document.querySelector(`#${sectionId}`);
        if (mainContent) {
            targetSection.innerHTML = mainContent.innerHTML;
            targetSection.setAttribute('data-loaded', 'true');

            // Initialize section-specific functionality
            if (sectionId === 'projects') initializeProjectsSlider();
            if (sectionId === 'experience') initializeExperienceTabs();
        }
    }

    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            showSection(sectionId);
            history.pushState(null, '', `#${sectionId}`);
        });
    });

    // Handle initial load and browser navigation
    function handleNavigation() {
        const hash = window.location.hash.slice(1) || 'about';
        showSection(hash);
    }

    window.addEventListener('popstate', handleNavigation);
    handleNavigation();

    // Your existing initialization functions
    function initializeProjectsSlider() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const slides = document.querySelectorAll('.project-slide');
        let currentIndex = 0;

        if (!prevBtn || !nextBtn || !slides.length) return;

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
        });
    }

    function initializeExperienceTabs() {
        const companyBtns = document.querySelectorAll('.company-btn');
        const experienceContents = document.querySelectorAll('.experience-content');

        if (!companyBtns.length || !experienceContents.length) return;

        companyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                companyBtns.forEach(b => b.classList.remove('active'));
                experienceContents.forEach(content => content.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(targetTab)?.classList.add('active');
            });
        });
    }
}); 