/**
 * Infographics Toggle Component
 * Handles switching between text and infographic views
 */

(function() {
    'use strict';

    const InfographicsToggle = {
        config: {
            infographicsPath: './data/infographics/',
            storageKey: 'infographic-preferences',
            loadedInfographics: new Set()
        },

        /**
         * Initialize the toggle system
         */
        init: function() {
            console.log('Initializing Infographics Toggle...');

            // Load user preferences from localStorage
            this.loadPreferences();

            // Set up event delegation for toggle buttons
            document.addEventListener('click', (e) => {
                const toggleBtn = e.target.closest('.toggle-btn');
                if (toggleBtn) {
                    this.handleToggle(toggleBtn);
                }
            });

            // Initialize any existing toggles
            this.initializeExistingToggles();

            console.log('Infographics Toggle ready');
        },

        /**
         * Handle toggle button click
         */
        handleToggle: async function(button) {
            const section = button.closest('section');
            if (!section) return;

            const sectionId = section.id;
            const viewType = button.dataset.view;
            const toggleContainer = button.closest('.view-toggle');

            // Update button states
            toggleContainer.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Get view containers
            const textView = section.querySelector('.text-view');
            const infographicView = section.querySelector('.infographic-view');

            if (viewType === 'visual') {
                // Load infographic if not already loaded
                if (!this.config.loadedInfographics.has(sectionId)) {
                    await this.loadInfographic(sectionId, infographicView);
                }

                // Switch views
                if (textView) textView.classList.add('hidden');
                if (infographicView) infographicView.classList.remove('hidden');
            } else {
                // Switch to text view
                if (textView) textView.classList.remove('hidden');
                if (infographicView) infographicView.classList.add('hidden');
            }

            // Save preference
            this.savePreference(sectionId, viewType);
        },

        /**
         * Load infographic content for a section
         */
        loadInfographic: async function(sectionId, container) {
            if (!container) return;

            // Show loading state
            container.innerHTML = '<div class="loading-infographic"><i class="pi pi-spin pi-spinner"></i> Loading visual...</div>';

            try {
                const url = `${this.config.infographicsPath}${sectionId}-infographic.html`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const html = await response.text();
                container.innerHTML = html;
                this.config.loadedInfographics.add(sectionId);

                console.log(`Loaded infographic for: ${sectionId}`);

            } catch (error) {
                console.error(`Failed to load infographic for "${sectionId}":`, error);
                container.innerHTML = `
                    <div class="infographic-error">
                        <i class="pi pi-exclamation-triangle"></i>
                        <p>Visual not available for this section</p>
                    </div>
                `;
            }
        },

        /**
         * Initialize existing toggle buttons in the DOM
         */
        initializeExistingToggles: function() {
            const sections = document.querySelectorAll('section[id]');

            sections.forEach(section => {
                const toggle = section.querySelector('.view-toggle');
                if (!toggle) return;

                const sectionId = section.id;
                const preference = this.getPreference(sectionId);

                if (preference === 'visual') {
                    const visualBtn = toggle.querySelector('[data-view="visual"]');
                    if (visualBtn) {
                        visualBtn.click();
                    }
                }
            });
        },

        /**
         * Load preferences from localStorage
         */
        loadPreferences: function() {
            try {
                const stored = localStorage.getItem(this.config.storageKey);
                this.preferences = stored ? JSON.parse(stored) : {};
            } catch (e) {
                this.preferences = {};
            }
        },

        /**
         * Save preference for a section
         */
        savePreference: function(sectionId, viewType) {
            this.preferences[sectionId] = viewType;
            try {
                localStorage.setItem(this.config.storageKey, JSON.stringify(this.preferences));
            } catch (e) {
                console.warn('Could not save infographic preference');
            }
        },

        /**
         * Get preference for a section
         */
        getPreference: function(sectionId) {
            return this.preferences[sectionId] || 'text';
        },

        /**
         * Inject toggle into a section (utility for dynamic sections)
         */
        injectToggle: function(sectionId) {
            const section = document.getElementById(sectionId);
            if (!section) return;

            const h2 = section.querySelector('h2');
            if (!h2 || section.querySelector('.view-toggle')) return;

            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'section-header-with-toggle';

            // Create toggle
            const toggle = document.createElement('div');
            toggle.className = 'view-toggle';
            toggle.innerHTML = `
                <button class="toggle-btn active" data-view="text">
                    <i class="pi pi-align-left"></i> Text
                </button>
                <button class="toggle-btn" data-view="visual">
                    <i class="pi pi-chart-bar"></i> Visual
                </button>
            `;

            // Wrap h2 and toggle
            h2.parentNode.insertBefore(wrapper, h2);
            wrapper.appendChild(h2);
            wrapper.appendChild(toggle);

            // Wrap existing content in text-view
            const content = [];
            let sibling = wrapper.nextSibling;
            while (sibling && sibling.nodeName !== 'SECTION') {
                content.push(sibling);
                sibling = sibling.nextSibling;
            }

            const textView = document.createElement('div');
            textView.className = 'text-view';
            content.forEach(node => textView.appendChild(node));
            wrapper.parentNode.insertBefore(textView, wrapper.nextSibling);

            // Add infographic container
            const infographicView = document.createElement('div');
            infographicView.className = 'infographic-view hidden';
            textView.parentNode.insertBefore(infographicView, textView.nextSibling);
        }
    };

    // Export to window
    window.InfographicsToggle = InfographicsToggle;

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            InfographicsToggle.init();
        });
    } else {
        InfographicsToggle.init();
    }

})();
