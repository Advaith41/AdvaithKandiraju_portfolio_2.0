// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Section navigation
    const navSections = document.querySelectorAll('.nav-section');
    const contentSections = document.querySelectorAll('.content-section');
    const defaultSection = document.getElementById('about');

    function switchSection(targetId) {
        navSections.forEach(section => section.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));

        const targetNav = document.querySelector(`a[href="#${targetId}"]`);
        const targetContent = document.getElementById(targetId);
        
        if (targetNav && targetContent) {
            targetNav.classList.add('active');
            targetContent.classList.add('active');
            targetContent.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Set default section
    switchSection('about');

    // Navigation click handlers
    navSections.forEach(section => {
        section.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = section.getAttribute('href').substring(1);
            switchSection(targetId);
        });
    });

    // Project slider
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.project-slide');
    const indicators = document.querySelectorAll('.project-indicator');
    let currentIndex = 0;

    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    indicators.forEach((indicator) => {
        indicator.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.dataset.index, 10);
            updateCarousel();
        });
    });

    updateCarousel();

    // Experience navigation
    const companyBtns = document.querySelectorAll('.company-btn');
    const experienceSections = document.querySelectorAll('.experience-content');
    const scrollLeft = document.getElementById('scrollLeft');
    const scrollRight = document.getElementById('scrollRight');
    const companyList = document.querySelector('.company-list');

    companyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            companyBtns.forEach(b => b.classList.remove('active'));
            experienceSections.forEach(section => section.classList.remove('active'));
            
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(targetTab)?.classList.add('active');
        });
    });

    scrollLeft?.addEventListener('click', () => {
        companyList.scrollBy({ left: -300, behavior: 'smooth' });
    });

    scrollRight?.addEventListener('click', () => {
        companyList.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Set first experience as active
    if (companyBtns.length > 0) companyBtns[0].click();

    // Handle window resize
    let timeout;
    window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            updateCarousel();
        }, 100);
    });
});
