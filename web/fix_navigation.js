/**
 * Debug and fix navigation issues
 */
(function() {
    console.log('%c🔍 Navigation Debugger Active', 'color: #667eea; font-weight: bold; font-size: 14px;');

    // Monitor all hash changes
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash;
        const target = document.querySelector(hash);
        
        console.log('Hash changed:', hash);
        console.log('Target element:', target);
        
        if (target) {
            console.log('Target visible:', target.offsetHeight > 0);
            console.log('Target display:', window.getComputedStyle(target).display);
            console.log('Target visibility:', window.getComputedStyle(target).visibility);
        }
    });

    // Monitor clicks on working-memory link specifically
    setTimeout(() => {
        const link = document.querySelector('a[href="#working-memory"]');
        if (link) {
            link.addEventListener('click', function(e) {
                console.log('%c🎯 Working Memory link clicked', 'color: green; font-weight: bold;');
                
                setTimeout(() => {
                    const section = document.querySelector('#working-memory');
                    if (section) {
                        console.log('Section exists:', true);
                        console.log('Section position:', section.getBoundingClientRect());
                        console.log('Section styles:', {
                            display: window.getComputedStyle(section).display,
                            visibility: window.getComputedStyle(section).visibility,
                            opacity: window.getComputedStyle(section).opacity,
                            height: section.offsetHeight
                        });
                    }
                }, 100);
            });
        }
    }, 1000);
})();
