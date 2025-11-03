/**
 * Markdown Link Handler
 * Intercepts clicks on .md-link elements and renders markdown files in a modal
 */

(function() {
    'use strict';

    const MarkdownLinkHandler = {
        // Configuration
        config: {
            modalId: 'md-viewer-modal',
            overlayId: 'md-viewer-overlay'
        },

        // State
        initialized: false,
        modal: null,
        overlay: null,

        /**
         * Initialize the link handler
         */
        init: function() {
            if (this.initialized) return;
            console.log('📖 Initializing Markdown Link Handler...');

            // Create modal and overlay
            this.createModal();

            // Attach event listeners
            this.attachListeners();

            this.initialized = true;
            console.log('✓ Markdown Link Handler ready');
        },

        /**
         * Create modal elements
         */
        createModal: function() {
            // Create overlay
            this.overlay = document.createElement('div');
            this.overlay.id = this.config.overlayId;
            this.overlay.className = 'md-viewer-overlay';
            this.overlay.addEventListener('click', () => this.closeModal());

            // Create modal
            this.modal = document.createElement('div');
            this.modal.id = this.config.modalId;
            this.modal.className = 'md-viewer-modal';
            this.modal.innerHTML = `
                <div class="md-viewer-header">
                    <h2 id="md-viewer-title">Loading...</h2>
                    <button class="md-viewer-close" title="Close">
                        <i class="pi pi-times"></i>
                    </button>
                </div>
                <div class="md-viewer-content" id="md-viewer-content">
                    <div class="md-loading">📄 Loading markdown...</div>
                </div>
            `;

            // Add to body
            document.body.appendChild(this.overlay);
            document.body.appendChild(this.modal);

            // Close button handler
            const closeBtn = this.modal.querySelector('.md-viewer-close');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeModal();
            });

            // Prevent modal clicks from closing
            this.modal.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            // Keyboard handler (ESC to close)
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen()) {
                    this.closeModal();
                }
            });
        },

        /**
         * Attach event listeners
         */
        attachListeners: function() {
            // Use event delegation for dynamically loaded content
            document.addEventListener('click', (e) => {
                const mdLink = e.target.closest('.md-link');
                if (mdLink) {
                    e.preventDefault();
                    const mdPath = mdLink.getAttribute('data-md-path');
                    if (mdPath) {
                        this.openMarkdown(mdPath);
                    }
                }
            });
        },

        /**
         * Open markdown file in modal
         */
        openMarkdown: async function(path) {
            console.log(`📖 Opening markdown: ${path}`);

            // Show modal
            this.overlay.classList.add('active');
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Set title
            const title = document.getElementById('md-viewer-title');
            title.textContent = path;

            // Reset content
            const content = document.getElementById('md-viewer-content');
            content.innerHTML = '<div class="md-loading">📄 Loading markdown...</div>';

            try {
                // Ensure MarkdownRenderer is available
                if (!window.MarkdownRenderer) {
                    throw new Error('MarkdownRenderer not available');
                }

                // Initialize if needed
                await window.MarkdownRenderer.init();

                // Render markdown into content area
                await window.MarkdownRenderer.render(content, path);

                console.log(`✓ Opened: ${path}`);
            } catch (error) {
                console.error(`Failed to open ${path}:`, error);
                content.innerHTML = `
                    <div class="md-error">
                        <p><strong>⚠️ Failed to load markdown</strong></p>
                        <p>Could not load: <code>${path}</code></p>
                        <p class="error-detail">${error.message}</p>
                    </div>
                `;
            }
        },

        /**
         * Close modal
         */
        closeModal: function() {
            this.overlay.classList.remove('active');
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            console.log('✓ Modal closed');
        },

        /**
         * Check if modal is open
         */
        isOpen: function() {
            return this.modal && this.modal.classList.contains('active');
        }
    };

    // Export to window
    window.MarkdownLinkHandler = MarkdownLinkHandler;

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            MarkdownLinkHandler.init();
        });
    } else {
        MarkdownLinkHandler.init();
    }

})();
