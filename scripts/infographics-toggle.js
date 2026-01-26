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

            // Bind keyboard shortcut
            this.bindKeyboardShortcut();

            // Initialize any existing toggles
            this.initializeExistingToggles();

            console.log('Infographics Toggle ready. Press "V" to toggle text/visual.');
        },

        /**
         * Bind keyboard shortcuts
         */
        bindKeyboardShortcut: function() {
            const self = this;
            document.addEventListener('keydown', function(e) {
                // Don't trigger if typing in an input
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
                    return;
                }

                const key = e.key.toLowerCase();

                // 'V' key - toggle text/visual
                if (key === 'v' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    e.preventDefault();
                    self.toggleCurrentSection();
                }

                // Arrow keys - navigate sections
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    self.navigateSection(e.key === 'ArrowDown' ? 'next' : 'prev');
                }

                // < > or Left/Right arrow keys - navigate TOC items
                if (e.key === ',' || e.key === '<' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    self.navigateTOC('prev');
                }
                if (e.key === '.' || e.key === '>' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    self.navigateTOC('next');
                }
            }, true);
        },

        /**
         * Navigate TOC items with < > or left/right arrows
         */
        navigateTOC: function(direction) {
            // Use floating nav items
            const tocLinks = Array.from(document.querySelectorAll('.fnav-item'));
            if (tocLinks.length === 0) return;

            // Find currently active TOC item
            let currentIndex = tocLinks.findIndex(link => link.classList.contains('active'));

            // If none active, start from beginning or end
            if (currentIndex === -1) {
                currentIndex = direction === 'next' ? -1 : tocLinks.length;
            }

            // Calculate target index
            let targetIndex;
            if (direction === 'next') {
                targetIndex = currentIndex < tocLinks.length - 1 ? currentIndex + 1 : 0;
            } else {
                targetIndex = currentIndex > 0 ? currentIndex - 1 : tocLinks.length - 1;
            }

            // Get target section ID
            const targetItem = tocLinks[targetIndex];
            const targetId = targetItem.dataset.section;

            // Load section via SectionLoader if available
            if (window.SectionLoader) {
                window.SectionLoader.loadSection(targetId);
            }

            // Update active state in floating nav
            tocLinks.forEach(link => link.classList.remove('active'));
            targetItem.classList.add('active');

            // Scroll to section
            const targetSection = document.getElementById(targetId) ||
                                  document.getElementById('section-' + targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            // Show TOC indicator
            const itemName = targetItem.querySelector('.fnav-item-name')?.textContent || targetId;
            this.showTOCIndicator(itemName, direction);
        },

        /**
         * Show TOC navigation indicator
         */
        showTOCIndicator: function(itemName, direction) {
            const existing = document.querySelector('.toc-indicator');
            if (existing) existing.remove();

            const indicator = document.createElement('div');
            indicator.className = 'toc-indicator';
            indicator.innerHTML = `
                <div class="toc-indicator-content">
                    <i class="pi pi-angle-${direction === 'next' ? 'right' : 'left'}"></i>
                    <span>${itemName}</span>
                </div>
            `;
            document.body.appendChild(indicator);

            requestAnimationFrame(() => {
                indicator.classList.add('visible');
            });

            setTimeout(() => {
                indicator.classList.remove('visible');
                setTimeout(() => indicator.remove(), 300);
            }, 800);
        },

        /**
         * Navigate to next/previous section
         */
        navigateSection: function(direction) {
            const sections = Array.from(document.querySelectorAll('section[id]'));
            if (sections.length === 0) return;

            // Find current section (the one most visible)
            const viewportCenter = window.innerHeight / 2;
            let currentIndex = -1;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top < viewportCenter && rect.bottom > 100) {
                    currentIndex = index;
                }
            });

            // Calculate target index
            let targetIndex;
            if (direction === 'next') {
                targetIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
            } else {
                targetIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
            }

            // Scroll to target section
            const targetSection = sections[targetIndex];
            if (targetSection) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Show navigation indicator
                this.showNavIndicator(targetSection.id, direction);
            }
        },

        /**
         * Show navigation indicator
         */
        showNavIndicator: function(sectionId, direction) {
            // Remove existing indicator
            const existing = document.querySelector('.nav-indicator');
            if (existing) existing.remove();

            // Format section name
            const sectionName = sectionId
                .replace(/-/g, ' ')
                .replace(/\b\w/g, c => c.toUpperCase());

            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = 'nav-indicator';
            indicator.innerHTML = `
                <div class="nav-indicator-content">
                    <i class="pi pi-arrow-${direction === 'next' ? 'down' : 'up'}"></i>
                    <span>${sectionName}</span>
                </div>
            `;
            document.body.appendChild(indicator);

            // Animate in
            requestAnimationFrame(() => {
                indicator.classList.add('visible');
            });

            // Remove after delay
            setTimeout(() => {
                indicator.classList.remove('visible');
                setTimeout(() => indicator.remove(), 300);
            }, 800);
        },

        /**
         * Toggle the currently visible section's view
         */
        toggleCurrentSection: function() {
            // Find sections with toggles
            const sections = document.querySelectorAll('section[id]');
            let targetSection = null;

            // Find the section most visible in viewport
            const viewportHeight = window.innerHeight;
            const viewportCenter = viewportHeight / 2;

            sections.forEach(section => {
                const toggle = section.querySelector('.view-toggle');
                if (!toggle) return;

                const rect = section.getBoundingClientRect();
                // Check if section is in viewport
                if (rect.top < viewportCenter && rect.bottom > 100) {
                    targetSection = section;
                }
            });

            if (!targetSection) {
                // Fallback: use first section with a toggle
                targetSection = document.querySelector('section[id] .view-toggle')?.closest('section');
            }

            if (targetSection) {
                const toggle = targetSection.querySelector('.view-toggle');
                const activeBtn = toggle.querySelector('.toggle-btn.active');
                const currentView = activeBtn?.dataset.view || 'text';
                const newView = currentView === 'text' ? 'visual' : 'text';
                const newBtn = toggle.querySelector(`[data-view="${newView}"]`);

                if (newBtn) {
                    this.handleToggle(newBtn);
                    this.showIndicator(newView);
                }
            }
        },

        /**
         * Show a brief indicator when toggling via keyboard
         */
        showIndicator: function(viewType) {
            // Remove existing indicator
            const existing = document.querySelector('.view-toggle-indicator');
            if (existing) existing.remove();

            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = 'view-toggle-indicator';
            indicator.innerHTML = `
                <div class="indicator-content">
                    <i class="pi ${viewType === 'visual' ? 'pi-chart-bar' : 'pi-align-left'}"></i>
                    <span>${viewType === 'visual' ? 'Visual Mode' : 'Text Mode'}</span>
                </div>
            `;
            document.body.appendChild(indicator);

            // Animate in
            requestAnimationFrame(() => {
                indicator.classList.add('visible');
            });

            // Remove after delay
            setTimeout(() => {
                indicator.classList.remove('visible');
                setTimeout(() => indicator.remove(), 300);
            }, 1200);
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
