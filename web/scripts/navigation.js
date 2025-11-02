/**
 * SuperClaude Framework - Navigation JavaScript
 * Handles smooth scrolling, nav toggle, breadcrumbs, and scroll behavior
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ═══════════════════════════════════════════════════════════════

    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                const nav = document.querySelector('nav');

                if (target) {
                    // Calculate offset for sticky nav
                    const navHeight = nav ? nav.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navHeight - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update active link
                    updateActiveLink(this);

                    // Collapse nav on mobile after clicking
                    if (window.innerWidth <= 768 && nav) {
                        nav.classList.add('collapsed');
                    }

                    // Update URL without jumping
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // ACTIVE LINK HIGHLIGHTING
    // ═══════════════════════════════════════════════════════════════

    function updateActiveLink(clickedLink) {
        // Remove active class from all links
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        if (clickedLink) {
            clickedLink.classList.add('active');
        }
    }

    // Highlight active section on scroll
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // NAVIGATION TOGGLE (Mobile)
    // ═══════════════════════════════════════════════════════════════

    function initNavigationToggle() {
        const nav = document.querySelector('nav');
        const navHeader = document.querySelector('nav h2');

        if (!nav || !navHeader) return;

        // Collapse nav by default on mobile
        if (window.innerWidth <= 768) {
            nav.classList.add('collapsed');
        }

        // Toggle navigation on click
        navHeader.addEventListener('click', () => {
            nav.classList.toggle('collapsed');
        });

        // Make nav header keyboard accessible
        navHeader.setAttribute('tabindex', '0');
        navHeader.setAttribute('role', 'button');
        navHeader.setAttribute('aria-expanded', !nav.classList.contains('collapsed'));

        navHeader.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                nav.classList.toggle('collapsed');
                navHeader.setAttribute('aria-expanded', !nav.classList.contains('collapsed'));
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.classList.remove('collapsed');
                navHeader.setAttribute('aria-expanded', 'true');
            } else if (!nav.classList.contains('collapsed')) {
                navHeader.setAttribute('aria-expanded', 'true');
            } else {
                navHeader.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // STICKY NAV SHADOW ON SCROLL
    // ═══════════════════════════════════════════════════════════════

    function initStickyNavShadow() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // SCROLL PROGRESS BAR
    // ═══════════════════════════════════════════════════════════════

    function initScrollProgress() {
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');

        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.prepend(progressBar);
        }

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // HAMBURGER MENU TOGGLE (Enhanced mobile navigation)
    // ═══════════════════════════════════════════════════════════════

    function initHamburgerMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');

        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('collapsed');

            // Update aria attributes
            const isExpanded = !nav.classList.contains('collapsed');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // SKIP TO CONTENT LINK (Accessibility)
    // ═══════════════════════════════════════════════════════════════

    function initSkipLink() {
        // Create skip link if it doesn't exist
        let skipLink = document.querySelector('.skip-link');

        if (!skipLink) {
            skipLink = document.createElement('a');
            skipLink.className = 'skip-link';
            skipLink.href = '#main-content';
            skipLink.textContent = 'Skip to main content';
            document.body.prepend(skipLink);
        }

        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.querySelector('#main-content') || document.querySelector('main') || document.querySelector('section');

            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // KEYBOARD NAVIGATION ENHANCEMENT
    // ═══════════════════════════════════════════════════════════════

    function initKeyboardNavigation() {
        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt + H: Go to top
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Alt + B: Go to bottom
            if (e.altKey && e.key === 'b') {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }

            // Alt + N: Toggle navigation
            if (e.altKey && e.key === 'n') {
                e.preventDefault();
                const nav = document.querySelector('nav');
                if (nav) {
                    nav.classList.toggle('collapsed');
                }
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZE ALL NAVIGATION FEATURES
    // ═══════════════════════════════════════════════════════════════

    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        initSmoothScrolling();
        initNavigationToggle();
        initStickyNavShadow();
        initScrollProgress();
        initHamburgerMenu();
        initSkipLink();
        initKeyboardNavigation();
        highlightActiveSection();

        console.log('✓ Navigation system initialized');
    }

    // Start initialization
    init();

})();
