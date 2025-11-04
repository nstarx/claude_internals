/**
 * Dynamic Section Loader
 * Loads HTML sections from separate files on demand
 */

(function() {
    'use strict';

    const SectionLoader = {
        config: {
            sectionsPath: './data/sections/',
            sections: [
                'overview',
                'working-memory',
                'architecture',
                'principles',
                'patterns',
                'tools',
                'metrics',
                'simulators',
                'without-tools',
                'antipatterns',
                'behavior-issues',
                'advanced',
                'integration',
                'workflows',
                'complex-scenarios',
                'conclusion'
            ],
            loadedSections: new Set(),
            cache: new Map()
        },

        /**
         * Initialize the section loader
         */
        init: function() {
            console.log('📦 Initializing Section Loader...');

            // Load initial section based on hash, or load first section only
            const hash = window.location.hash.substring(1);

            if (hash && this.config.sections.includes(hash)) {
                this.loadSection(hash);
            } else {
                // Load only the first section (overview) on initial page load
                this.loadSection('overview');
            }

            // Listen for hash changes
            window.addEventListener('hashchange', () => {
                const newHash = window.location.hash.substring(1);
                if (newHash && !this.config.loadedSections.has(newHash)) {
                    this.loadSection(newHash);
                }
            });

            console.log('✓ Section Loader ready');
        },

        /**
         * Load all sections
         */
        loadAllSections: async function() {
            console.log('Loading all sections...');

            for (const sectionId of this.config.sections) {
                await this.loadSection(sectionId);
            }

            console.log('✓ All sections loaded');
        },

        /**
         * Load a specific section
         */
        loadSection: async function(sectionId) {
            // Check if already loaded
            if (this.config.loadedSections.has(sectionId)) {
                console.log(`Section "${sectionId}" already loaded`);
                return;
            }

            // Check cache
            if (this.config.cache.has(sectionId)) {
                this.renderSection(sectionId, this.config.cache.get(sectionId));
                return;
            }

            const container = document.getElementById(`section-${sectionId}`);
            if (!container) {
                console.error(`Container for section "${sectionId}" not found`);
                return;
            }

            // Show loading state
            container.innerHTML = '<div class="loading-section">Loading...</div>';

            try {
                const url = `${this.config.sectionsPath}${sectionId}.html`;
                console.log(`Fetching section: ${url}`);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const html = await response.text();

                // Cache the content
                this.config.cache.set(sectionId, html);

                // Render the section
                this.renderSection(sectionId, html);

                console.log(`✓ Loaded section: ${sectionId}`);

            } catch (error) {
                console.error(`Failed to load section "${sectionId}":`, error);
                container.innerHTML = `
                    <div class="error-box">
                        <p><strong>⚠️ Failed to load section</strong></p>
                        <p>Could not load: <code>${sectionId}</code></p>
                        <p class="error-detail">${error.message}</p>
                    </div>
                `;
            }
        },

        /**
         * Render section content
         */
        renderSection: function(sectionId, html) {
            const container = document.getElementById(`section-${sectionId}`);
            if (!container) return;

            container.innerHTML = html;
            this.config.loadedSections.add(sectionId);

            // Trigger any post-processing needed
            this.postProcess(container);
        },

        /**
         * Post-process loaded content
         */
        postProcess: function(container) {
            // Re-apply syntax highlighting if present
            if (window.hljs) {
                container.querySelectorAll('pre code').forEach(block => {
                    hljs.highlightElement(block);
                });
            }

            // Re-initialize any interactive components
            if (window.initializeInteractiveElements) {
                window.initializeInteractiveElements(container);
            }

            // Initialize simulators if they exist in the loaded content
            this.initializeSimulators(container);

            // Add copy buttons to code blocks
            if (window.CopyToClipboard) {
                container.querySelectorAll('pre').forEach(pre => {
                    if (!pre.querySelector('.copy-button')) {
                        // Add copy button logic here if needed
                    }
                });
            }
        },

        /**
         * Initialize simulators in the loaded content
         */
        initializeSimulators: function(container) {
            // Token Calculator
            if (container.querySelector('#token-calculator-container') && window.TokenCalculator) {
                console.log('Initializing Token Calculator...');
                window.TokenCalculator.init('token-calculator-container');
            }

            // Context Window Visualizer
            if (container.querySelector('#context-window-container') && window.ContextWindowVisualizer) {
                console.log('Initializing Context Window Visualizer...');
                window.ContextWindowVisualizer.init('context-window-container');
            }

            // Memory Simulator
            if (container.querySelector('#memory-simulator-container') && window.MemorySimulator) {
                console.log('Initializing Memory Simulator...');
                window.MemorySimulator.init('memory-simulator-container');
            }

            // Cognitive Load Simulator
            if (container.querySelector('#cognitive-load-container') && window.CognitiveLoadCalculator) {
                console.log('Initializing Cognitive Load Calculator...');
                window.CognitiveLoadCalculator.init('cognitive-load-container');
            }

            // Decay Simulator
            if (container.querySelector('#decay-simulator-container') && window.DecaySimulator) {
                console.log('Initializing Decay Simulator...');
                window.DecaySimulator.init('decay-simulator-container');
            }
        },

        /**
         * Preload a section without rendering
         */
        preload: async function(sectionId) {
            if (this.config.cache.has(sectionId)) {
                return;
            }

            try {
                const url = `${this.config.sectionsPath}${sectionId}.html`;
                const response = await fetch(url);

                if (response.ok) {
                    const html = await response.text();
                    this.config.cache.set(sectionId, html);
                    console.log(`✓ Preloaded section: ${sectionId}`);
                }
            } catch (error) {
                console.warn(`Failed to preload section "${sectionId}":`, error);
            }
        },

        /**
         * Clear cache
         */
        clearCache: function() {
            this.config.cache.clear();
            console.log('✓ Section cache cleared');
        }
    };

    // Export to window
    window.SectionLoader = SectionLoader;

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            SectionLoader.init();
        });
    } else {
        SectionLoader.init();
    }

})();
