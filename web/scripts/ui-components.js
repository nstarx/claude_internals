/**
 * SuperClaude Framework - UI Components JavaScript
 * Handles modals, back-to-top button, tooltips, and interactive components
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // MODAL SYSTEM
    // ═══════════════════════════════════════════════════════════════

    const ModalManager = {
        activeModals: new Set(),

        open: function(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) {
                console.warn(`Modal with id "${modalId}" not found`);
                return;
            }

            modal.classList.add('active');
            this.activeModals.add(modalId);
            document.body.style.overflow = 'hidden';

            // Set focus to modal for accessibility
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }

            // Announce to screen readers
            modal.setAttribute('aria-hidden', 'false');
        },

        close: function(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;

            modal.classList.remove('active');
            this.activeModals.delete(modalId);

            // Restore body scroll if no modals are open
            if (this.activeModals.size === 0) {
                document.body.style.overflow = 'auto';
            }

            // Update accessibility attributes
            modal.setAttribute('aria-hidden', 'true');
        },

        closeAll: function() {
            this.activeModals.forEach(modalId => this.close(modalId));
        },

        init: function() {
            // Close modal when clicking backdrop
            document.querySelectorAll('.modal').forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.close(modal.id);
                    }
                });

                // Initialize ARIA attributes
                modal.setAttribute('role', 'dialog');
                modal.setAttribute('aria-modal', 'true');
                modal.setAttribute('aria-hidden', 'true');
            });

            // Close modal with close button
            document.querySelectorAll('.modal-close').forEach(button => {
                button.addEventListener('click', () => {
                    const modal = button.closest('.modal');
                    if (modal) {
                        this.close(modal.id);
                    }
                });
            });

            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeAll();
                }
            });

            // Trap focus within modal
            document.querySelectorAll('.modal').forEach(modal => {
                modal.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        this.trapFocus(modal, e);
                    }
                });
            });

            console.log('✓ Modal system initialized');
        },

        trapFocus: function(modal, event) {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    };

    // Expose modal functions globally
    window.openModal = function(id) {
        ModalManager.open(id);
    };

    window.closeModal = function(id) {
        ModalManager.close(id);
    };

    // ═══════════════════════════════════════════════════════════════
    // BACK TO TOP BUTTON
    // ═══════════════════════════════════════════════════════════════

    const BackToTop = {
        button: null,
        threshold: 300,

        init: function() {
            this.button = document.querySelector('.back-to-top');

            if (!this.button) {
                this.createButton();
            }

            if (this.button) {
                this.attachListeners();
                console.log('✓ Back to top button initialized');
            }
        },

        createButton: function() {
            this.button = document.createElement('a');
            this.button.href = '#';
            this.button.className = 'back-to-top';
            this.button.innerHTML = '↑';
            this.button.setAttribute('aria-label', 'Back to top');
            this.button.setAttribute('title', 'Back to top');
            document.body.appendChild(this.button);
        },

        attachListeners: function() {
            // Show/hide on scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > this.threshold) {
                    this.button.classList.add('visible');
                    this.button.style.display = 'flex';
                } else {
                    this.button.classList.remove('visible');
                    this.button.style.display = 'none';
                }
            });

            // Smooth scroll to top
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // COLLAPSIBLE SECTIONS
    // ═══════════════════════════════════════════════════════════════

    const Collapsible = {
        init: function() {
            document.querySelectorAll('[data-collapsible]').forEach(element => {
                const toggle = element.querySelector('[data-collapsible-toggle]');
                const content = element.querySelector('[data-collapsible-content]');

                if (!toggle || !content) return;

                toggle.addEventListener('click', () => {
                    const isExpanded = element.classList.toggle('collapsed');
                    toggle.setAttribute('aria-expanded', !isExpanded);
                    content.setAttribute('aria-hidden', isExpanded);
                });

                // Initialize ARIA attributes
                const isCollapsed = element.classList.contains('collapsed');
                toggle.setAttribute('aria-expanded', !isCollapsed);
                content.setAttribute('aria-hidden', isCollapsed);
            });

            console.log('✓ Collapsible sections initialized');
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // TOOLTIPS
    // ═══════════════════════════════════════════════════════════════

    const Tooltips = {
        init: function() {
            document.querySelectorAll('[data-tooltip]').forEach(element => {
                const tooltipText = element.getAttribute('data-tooltip');

                // Create tooltip element
                const tooltip = document.createElement('span');
                tooltip.className = 'tooltip-text';
                tooltip.textContent = tooltipText;
                tooltip.setAttribute('role', 'tooltip');

                element.classList.add('tooltip');
                element.appendChild(tooltip);

                // Show/hide on hover and focus
                element.addEventListener('mouseenter', () => {
                    tooltip.style.visibility = 'visible';
                    tooltip.style.opacity = '1';
                });

                element.addEventListener('mouseleave', () => {
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.opacity = '0';
                });

                element.addEventListener('focus', () => {
                    tooltip.style.visibility = 'visible';
                    tooltip.style.opacity = '1';
                });

                element.addEventListener('blur', () => {
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.opacity = '0';
                });
            });

            console.log('✓ Tooltips initialized');
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // COPY TO CLIPBOARD
    // ═══════════════════════════════════════════════════════════════

    const CopyToClipboard = {
        init: function() {
            document.querySelectorAll('pre').forEach(codeBlock => {
                const button = document.createElement('button');
                button.className = 'copy-button btn btn-outline';
                button.textContent = 'Copy';
                button.setAttribute('aria-label', 'Copy code to clipboard');

                codeBlock.style.position = 'relative';
                button.style.position = 'absolute';
                button.style.top = '10px';
                button.style.right = '10px';
                button.style.fontSize = '0.8rem';
                button.style.padding = '0.25rem 0.5rem';

                codeBlock.appendChild(button);

                button.addEventListener('click', async () => {
                    const code = codeBlock.querySelector('code')?.textContent || codeBlock.textContent;

                    try {
                        await navigator.clipboard.writeText(code);
                        button.textContent = 'Copied!';
                        button.classList.add('btn-success');

                        setTimeout(() => {
                            button.textContent = 'Copy';
                            button.classList.remove('btn-success');
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy:', err);
                        button.textContent = 'Failed';
                        setTimeout(() => {
                            button.textContent = 'Copy';
                        }, 2000);
                    }
                });
            });

            console.log('✓ Copy to clipboard initialized');
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // LOADING STATES
    // ═══════════════════════════════════════════════════════════════

    const LoadingStates = {
        show: function(container) {
            const loader = document.createElement('div');
            loader.className = 'loading';
            loader.setAttribute('role', 'status');
            loader.setAttribute('aria-label', 'Loading');

            if (typeof container === 'string') {
                container = document.querySelector(container);
            }

            if (container) {
                container.appendChild(loader);
            }

            return loader;
        },

        hide: function(loader) {
            if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        },

        skeleton: function(container, lines = 3) {
            const skeletonWrapper = document.createElement('div');

            for (let i = 0; i < lines; i++) {
                const skeleton = document.createElement('div');
                skeleton.className = 'skeleton skeleton-text';
                skeletonWrapper.appendChild(skeleton);
            }

            if (typeof container === 'string') {
                container = document.querySelector(container);
            }

            if (container) {
                container.appendChild(skeletonWrapper);
            }

            return skeletonWrapper;
        }
    };

    // Expose loading states globally
    window.showLoading = LoadingStates.show;
    window.hideLoading = LoadingStates.hide;
    window.showSkeleton = LoadingStates.skeleton;

    // ═══════════════════════════════════════════════════════════════
    // SCENARIO CARDS (for complex_scenarios.html)
    // ═══════════════════════════════════════════════════════════════

    const ScenarioCards = {
        init: function() {
            document.querySelectorAll('.scenario-card').forEach(card => {
                // Make cards keyboard accessible
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');

                // Handle keyboard events
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        card.click();
                    }
                });

                // Add ripple effect on click
                card.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');

                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;

                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';

                    this.appendChild(ripple);

                    setTimeout(() => ripple.remove(), 600);
                });
            });

            console.log('✓ Scenario cards initialized');
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZE ALL UI COMPONENTS
    // ═══════════════════════════════════════════════════════════════

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        ModalManager.init();
        BackToTop.init();
        Collapsible.init();
        Tooltips.init();
        CopyToClipboard.init();
        ScenarioCards.init();

        console.log('✓ UI components initialized');
    }

    // Start initialization
    init();

})();
