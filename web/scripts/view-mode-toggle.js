/**
 * View Mode Toggle
 * Switches between text-focused and visual-focused presentation modes
 *
 * Keyboard Shortcut: Press 'V' to toggle (or Ctrl+Shift+V)
 *
 * Text Mode: Full documentation with detailed explanations
 * Visual Mode: Emphasis on diagrams, cards, and visual elements
 */

(function() {
    'use strict';

    const ViewModeToggle = {
        config: {
            storageKey: 'scm-view-mode',
            defaultMode: 'text',
            shortcutKey: 'v',
            modes: ['text', 'visual']
        },

        currentMode: 'text',
        toggleButton: null,
        indicator: null,

        /**
         * Initialize the view mode toggle
         */
        init: function() {
            // Load saved preference
            this.currentMode = localStorage.getItem(this.config.storageKey) || this.config.defaultMode;

            // Create toggle button
            this.createToggleButton();

            // Create keyboard shortcut indicator
            this.createShortcutIndicator();

            // Apply initial mode
            this.applyMode(this.currentMode);

            // Bind keyboard shortcut
            this.bindKeyboardShortcut();

            console.log('View Mode Toggle initialized. Press "V" to switch modes.');
        },

        /**
         * Create the toggle button in the UI
         */
        createToggleButton: function() {
            this.toggleButton = document.createElement('button');
            this.toggleButton.className = 'view-mode-toggle';
            this.toggleButton.setAttribute('aria-label', 'Toggle view mode');
            this.toggleButton.setAttribute('title', 'Toggle Text/Visual Mode (V)');

            this.updateButtonContent();

            this.toggleButton.addEventListener('click', () => {
                this.toggle();
            });

            // Insert after global nav or at top of container
            const globalNav = document.querySelector('.global-nav');
            if (globalNav) {
                const navContainer = globalNav.querySelector('.global-nav-container');
                if (navContainer) {
                    navContainer.appendChild(this.toggleButton);
                }
            } else {
                // Fallback: add to body
                document.body.appendChild(this.toggleButton);
            }
        },

        /**
         * Update button content based on current mode
         */
        updateButtonContent: function() {
            const isVisual = this.currentMode === 'visual';
            this.toggleButton.innerHTML = `
                <span class="view-mode-icon">${isVisual ? '<i class="pi pi-align-left"></i>' : '<i class="pi pi-th-large"></i>'}</span>
                <span class="view-mode-label">${isVisual ? 'Text' : 'Visual'}</span>
                <span class="view-mode-shortcut">V</span>
            `;
            this.toggleButton.classList.toggle('visual-active', isVisual);
        },

        /**
         * Create keyboard shortcut indicator (shows briefly on toggle)
         */
        createShortcutIndicator: function() {
            this.indicator = document.createElement('div');
            this.indicator.className = 'view-mode-indicator';
            this.indicator.setAttribute('aria-live', 'polite');
            document.body.appendChild(this.indicator);
        },

        /**
         * Show indicator briefly
         */
        showIndicator: function(mode) {
            const isVisual = mode === 'visual';
            this.indicator.innerHTML = `
                <div class="indicator-content">
                    <span class="indicator-icon">${isVisual ? '<i class="pi pi-th-large"></i>' : '<i class="pi pi-align-left"></i>'}</span>
                    <span class="indicator-text">${isVisual ? 'Visual Mode' : 'Text Mode'}</span>
                </div>
            `;
            this.indicator.classList.add('visible');

            setTimeout(() => {
                this.indicator.classList.remove('visible');
            }, 1200);
        },

        /**
         * Bind keyboard shortcut
         */
        bindKeyboardShortcut: function() {
            const self = this;
            document.addEventListener('keydown', function(e) {
                // Don't trigger if typing in an input
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
                    return;
                }

                // Get the key, handling both 'v' and 'V'
                const key = e.key.toLowerCase();

                // Debug: log V key presses
                if (key === 'v') {
                    console.log('[ViewMode] V key detected:', {
                        key: e.key,
                        ctrlKey: e.ctrlKey,
                        shiftKey: e.shiftKey,
                        altKey: e.altKey,
                        metaKey: e.metaKey
                    });
                }

                // 'V' key (without Ctrl/Meta/Alt) or Ctrl+Shift+V
                const isVKey = key === 'v';
                const noMainModifiers = !e.ctrlKey && !e.metaKey && !e.altKey;
                const isCtrlShiftV = key === 'v' && e.ctrlKey && e.shiftKey;

                if (isVKey && (noMainModifiers || isCtrlShiftV)) {
                    console.log('[ViewMode] Toggling view mode');
                    e.preventDefault();
                    e.stopPropagation();
                    self.toggle();
                }
            }, true); // Use capture phase to get the event first
        },

        /**
         * Toggle between modes
         */
        toggle: function() {
            const currentIndex = this.config.modes.indexOf(this.currentMode);
            const nextIndex = (currentIndex + 1) % this.config.modes.length;
            const nextMode = this.config.modes[nextIndex];

            this.setMode(nextMode);
        },

        /**
         * Set specific mode
         */
        setMode: function(mode) {
            if (!this.config.modes.includes(mode)) {
                console.warn(`Invalid mode: ${mode}`);
                return;
            }

            this.currentMode = mode;
            localStorage.setItem(this.config.storageKey, mode);

            this.applyMode(mode);
            this.updateButtonContent();
            this.showIndicator(mode);

            // Dispatch custom event for other components to react
            window.dispatchEvent(new CustomEvent('viewmodechange', { detail: { mode } }));
        },

        /**
         * Apply mode to document
         */
        applyMode: function(mode) {
            document.body.classList.remove('view-mode-text', 'view-mode-visual');
            document.body.classList.add(`view-mode-${mode}`);

            // Update ARIA
            document.body.setAttribute('data-view-mode', mode);
        },

        /**
         * Get current mode
         */
        getMode: function() {
            return this.currentMode;
        }
    };

    // Initialize on DOM ready
    function initViewMode() {
        try {
            ViewModeToggle.init();
            console.log('[ViewMode] Successfully initialized');
        } catch (err) {
            console.error('[ViewMode] Initialization error:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initViewMode);
    } else {
        // Small delay to ensure other scripts have loaded
        setTimeout(initViewMode, 100);
    }

    // Expose globally
    window.ViewModeToggle = ViewModeToggle;

    console.log('[ViewMode] Script loaded');

})();
