/**
 * Page Transitions Controller
 * Handles smooth transitions between TOC pages
 */

const PageTransitions = {
    config: {
        transitionDuration: 300, // ms
        fadeInDelay: 100 // ms delay before fade-in animation starts
    },

    /**
     * Initialize page transitions
     */
    init() {
        // Mark page as loaded for fade-in animation
        this.markPageLoaded();

        // Add transition overlay
        this.createOverlay();

        // Handle outgoing transitions
        this.setupLinkHandlers();

        // Handle browser back/forward
        this.setupHistoryHandler();
    },

    /**
     * Mark the page as loaded to trigger fade-in
     */
    markPageLoaded() {
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, this.config.fadeInDelay);
    },

    /**
     * Create the transition overlay element
     */
    createOverlay() {
        if (document.querySelector('.page-transition-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
    },

    /**
     * Setup click handlers for cross-page links
     */
    setupLinkHandlers() {
        // Find all links that navigate to different pages (not hash links)
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');

            // Skip hash links, external links, and special links
            if (!href ||
                href.startsWith('#') ||
                href.startsWith('http') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                link.target === '_blank') {
                return;
            }

            // Check if it's a cross-page navigation
            if (href.endsWith('.html') || href === '/' || href === './') {
                link.addEventListener('click', (e) => this.handlePageTransition(e, href));
            }
        });
    },

    /**
     * Handle the page transition
     */
    handlePageTransition(e, targetUrl) {
        e.preventDefault();

        const overlay = document.querySelector('.page-transition-overlay');
        if (!overlay) {
            // Fallback: navigate directly
            window.location.href = targetUrl;
            return;
        }

        // Start fade out
        overlay.classList.add('active');

        // Navigate after fade completes
        setTimeout(() => {
            window.location.href = targetUrl;
        }, this.config.transitionDuration);
    },

    /**
     * Handle browser back/forward navigation
     */
    setupHistoryHandler() {
        window.addEventListener('pageshow', (event) => {
            // Handle back/forward cache (bfcache)
            if (event.persisted) {
                const overlay = document.querySelector('.page-transition-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.classList.add('page-loaded');
            }
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    PageTransitions.init();
});
