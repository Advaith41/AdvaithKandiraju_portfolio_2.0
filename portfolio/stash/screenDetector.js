document.addEventListener('DOMContentLoaded', () => {
    function checkScreenSize() {
        if (window.innerWidth <= 768) {  // Mobile breakpoint
            window.location.href = 'mobile.html';  // Redirect to mobile version
        }
    }

    // Check on load
    checkScreenSize();

    // Check on resize
    window.addEventListener('resize', checkScreenSize);
}); 