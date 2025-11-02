/**
 * SuperClaude Framework - PrimeVue Icons Configuration
 * Configures and provides helpers for PrimeVue Icons
 *
 * PrimeVue Icons: https://primevue.org/icons
 * CDN: https://unpkg.com/primeicons/primeicons.css
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // ICON MAPPINGS (Semantic names to PrimeVue classes)
    // ═══════════════════════════════════════════════════════════════

    const IconMap = {
        // Navigation
        home: 'pi-home',
        menu: 'pi-bars',
        close: 'pi-times',
        'arrow-up': 'pi-arrow-up',
        'arrow-down': 'pi-arrow-down',
        'arrow-left': 'pi-arrow-left',
        'arrow-right': 'pi-arrow-right',
        'chevron-up': 'pi-chevron-up',
        'chevron-down': 'pi-chevron-down',
        'chevron-left': 'pi-chevron-left',
        'chevron-right': 'pi-chevron-right',

        // Actions
        search: 'pi-search',
        filter: 'pi-filter',
        refresh: 'pi-refresh',
        download: 'pi-download',
        upload: 'pi-upload',
        copy: 'pi-copy',
        edit: 'pi-pencil',
        delete: 'pi-trash',
        save: 'pi-save',
        print: 'pi-print',
        share: 'pi-share-alt',

        // Status
        check: 'pi-check',
        'check-circle': 'pi-check-circle',
        times: 'pi-times',
        'times-circle': 'pi-times-circle',
        info: 'pi-info-circle',
        warning: 'pi-exclamation-triangle',
        error: 'pi-exclamation-circle',
        success: 'pi-check-circle',

        // Files & Documents
        file: 'pi-file',
        'file-pdf': 'pi-file-pdf',
        folder: 'pi-folder',
        'folder-open': 'pi-folder-open',
        book: 'pi-book',
        bookmark: 'pi-bookmark',

        // UI Elements
        user: 'pi-user',
        users: 'pi-users',
        cog: 'pi-cog',
        calendar: 'pi-calendar',
        clock: 'pi-clock',
        star: 'pi-star',
        heart: 'pi-heart',
        tag: 'pi-tag',
        link: 'pi-link',
        external: 'pi-external-link',

        // Communication
        comment: 'pi-comment',
        comments: 'pi-comments',
        inbox: 'pi-inbox',
        send: 'pi-send',
        bell: 'pi-bell',

        // Media
        image: 'pi-image',
        video: 'pi-video',
        play: 'pi-play',
        pause: 'pi-pause',
        stop: 'pi-stop',

        // Misc
        plus: 'pi-plus',
        minus: 'pi-minus',
        'plus-circle': 'pi-plus-circle',
        'minus-circle': 'pi-minus-circle',
        question: 'pi-question-circle',
        ellipsis: 'pi-ellipsis-h',
        'ellipsis-v': 'pi-ellipsis-v',
        spinner: 'pi-spinner',
        sun: 'pi-sun',
        moon: 'pi-moon',
        code: 'pi-code',
        database: 'pi-database'
    };

    // ═══════════════════════════════════════════════════════════════
    // ICON HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════

    const Icons = {
        /**
         * Create an icon element
         * @param {string} name - Semantic icon name or PrimeVue class
         * @param {Object} options - Additional options (size, color, classes)
         * @returns {HTMLElement} Icon element
         */
        create: function(name, options = {}) {
            const icon = document.createElement('i');

            // Get PrimeVue class from map or use directly
            const iconClass = IconMap[name] || (name.startsWith('pi-') ? name : 'pi-circle');

            icon.className = `pi ${iconClass}`;

            // Add additional classes
            if (options.classes) {
                icon.className += ` ${options.classes}`;
            }

            // Set size
            if (options.size) {
                icon.style.fontSize = options.size;
            }

            // Set color
            if (options.color) {
                icon.style.color = options.color;
            }

            // Set aria label for accessibility
            if (options.label) {
                icon.setAttribute('aria-label', options.label);
                icon.setAttribute('role', 'img');
            } else {
                icon.setAttribute('aria-hidden', 'true');
            }

            return icon;
        },

        /**
         * Add icon to an element
         * @param {HTMLElement} element - Target element
         * @param {string} iconName - Icon name
         * @param {string} position - 'before' or 'after' (default: 'before')
         * @param {Object} options - Icon options
         */
        addTo: function(element, iconName, position = 'before', options = {}) {
            const icon = this.create(iconName, options);

            if (position === 'after') {
                element.appendChild(icon);
            } else {
                element.insertBefore(icon, element.firstChild);
            }

            // Add spacing
            if (position === 'before' && element.textContent) {
                icon.style.marginRight = '0.5rem';
            } else if (position === 'after' && element.textContent) {
                icon.style.marginLeft = '0.5rem';
            }

            return icon;
        },

        /**
         * Replace element with icon
         * @param {HTMLElement} element - Element to replace
         * @param {string} iconName - Icon name
         * @param {Object} options - Icon options
         */
        replace: function(element, iconName, options = {}) {
            const icon = this.create(iconName, options);
            element.parentNode.replaceChild(icon, element);
            return icon;
        },

        /**
         * Get icon class from semantic name
         * @param {string} name - Semantic icon name
         * @returns {string} PrimeVue icon class
         */
        getClass: function(name) {
            return IconMap[name] || name;
        },

        /**
         * Check if PrimeIcons is loaded
         * @returns {boolean}
         */
        isLoaded: function() {
            // Check if PrimeIcons CSS is loaded
            const links = document.querySelectorAll('link[href*="primeicons"]');
            return links.length > 0;
        },

        /**
         * Load PrimeIcons from CDN if not already loaded
         */
        loadCDN: function() {
            if (this.isLoaded()) {
                console.log('✓ PrimeIcons already loaded');
                return Promise.resolve();
            }

            return new Promise((resolve, reject) => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/primeicons/primeicons.css';

                link.onload = () => {
                    console.log('✓ PrimeIcons loaded from CDN');
                    resolve();
                };

                link.onerror = () => {
                    console.error('Failed to load PrimeIcons from CDN');
                    reject(new Error('Failed to load PrimeIcons'));
                };

                document.head.appendChild(link);
            });
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // AUTO-ENHANCE ELEMENTS WITH ICONS
    // ═══════════════════════════════════════════════════════════════

    function autoEnhanceWithIcons() {
        // Add icons to buttons with data-icon attribute
        document.querySelectorAll('[data-icon]').forEach(element => {
            const iconName = element.getAttribute('data-icon');
            const iconPosition = element.getAttribute('data-icon-position') || 'before';
            const iconSize = element.getAttribute('data-icon-size');
            const iconColor = element.getAttribute('data-icon-color');

            Icons.addTo(element, iconName, iconPosition, {
                size: iconSize,
                color: iconColor
            });
        });

        // Auto-add icons to common elements
        autoAddCommonIcons();
    }

    function autoAddCommonIcons() {
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop && !backToTop.querySelector('.pi')) {
            Icons.addTo(backToTop, 'arrow-up', 'before', { label: 'Back to top' });
        }

        // Close buttons
        document.querySelectorAll('.modal-close').forEach(button => {
            if (!button.querySelector('.pi')) {
                button.innerHTML = '';
                Icons.addTo(button, 'times', 'before', { label: 'Close' });
            }
        });

        // Search inputs
        document.querySelectorAll('input[type="search"]').forEach(input => {
            const wrapper = document.createElement('div');
            wrapper.className = 'input-icon-wrapper';
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);

            const icon = Icons.create('search', { label: 'Search' });
            wrapper.insertBefore(icon, input);
        });

        // External links
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            if (!link.querySelector('.pi')) {
                Icons.addTo(link, 'external', 'after', { label: 'Opens in new window' });
            }
        });

        // Download links
        document.querySelectorAll('a[download]').forEach(link => {
            if (!link.querySelector('.pi')) {
                Icons.addTo(link, 'download', 'before');
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // EXPOSE PUBLIC API
    // ═══════════════════════════════════════════════════════════════

    window.Icons = Icons;
    window.IconMap = IconMap;

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZE
    // ═══════════════════════════════════════════════════════════════

    async function init() {
        // Load PrimeIcons if not already loaded
        try {
            await Icons.loadCDN();

            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', autoEnhanceWithIcons);
            } else {
                autoEnhanceWithIcons();
            }

            console.log('✓ Icon system initialized');
        } catch (error) {
            console.warn('Icon system initialization failed:', error);
        }
    }

    init();

})();
