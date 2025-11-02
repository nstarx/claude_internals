/**
 * Debug script for navigation collapse issue
 */
(function() {
    console.log('%c🔍 Navigation Debug Active', 'color: #667eea; font-weight: bold; font-size: 14px;');

    // Monitor window size
    const visualWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    console.log('Window width:', window.innerWidth);
    console.log('Visual viewport width:', visualWidth);
    console.log('Is mobile (window)?', window.innerWidth <= 768);
    console.log('Is mobile (viewport)?', visualWidth <= 768);

    // Monitor nav state
    setTimeout(() => {
        const nav = document.querySelector('nav');
        if (nav) {
            console.log('Nav element:', nav);
            console.log('Nav collapsed?', nav.classList.contains('collapsed'));

            // Monitor all nav link clicks
            const navLinks = nav.querySelectorAll('a[href^="#"]');
            console.log('Found', navLinks.length, 'nav links');

            navLinks.forEach((link, index) => {
                link.addEventListener('click', function(e) {
                    const visualWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
                    console.log(`%c🎯 Nav link ${index + 1} clicked: ${this.textContent}`, 'color: green; font-weight: bold;');
                    console.log('  Window width:', window.innerWidth);
                    console.log('  Visual viewport width:', visualWidth);
                    console.log('  Is mobile (viewport)?', visualWidth <= 768);
                    console.log('  Is nav link?', this.closest('nav') !== null);
                    console.log('  Should collapse:', visualWidth <= 768 && this.closest('nav') !== null);

                    setTimeout(() => {
                        console.log('  Nav collapsed after 500ms?', nav.classList.contains('collapsed'));
                    }, 500);
                });
            });
        }
    }, 1000);
})();
