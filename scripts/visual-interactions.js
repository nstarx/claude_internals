/**
 * Visual Mode Interactions
 * Interactive elements for visual mode: sliders, expandables, counters
 */

(function() {
    'use strict';

    const VisualInteractions = {
        /**
         * Initialize all interactive elements
         */
        init: function() {
            this.initSliders();
            this.initExpandables();
            this.initCounters();
            this.initTooltips();

            console.log('Visual Interactions initialized');
        },

        /**
         * Initialize draggable sliders
         */
        initSliders: function() {
            document.querySelectorAll('.metric-slider').forEach(slider => {
                this.setupSlider(slider);
            });
        },

        /**
         * Setup individual slider interaction
         */
        setupSlider: function(container) {
            const track = container.querySelector('.metric-slider__track');
            const fill = container.querySelector('.metric-slider__fill');
            const thumb = container.querySelector('.metric-slider__thumb');
            const valueEl = container.querySelector('.metric-slider__value');

            if (!track || !fill || !thumb) return;

            let isDragging = false;
            const config = {
                min: parseFloat(container.dataset.min) || 0,
                max: parseFloat(container.dataset.max) || 100,
                step: parseFloat(container.dataset.step) || 1,
                unit: container.dataset.unit || '%',
                zones: container.dataset.zones ? JSON.parse(container.dataset.zones) : null
            };

            const updateValue = (percent) => {
                percent = Math.max(0, Math.min(100, percent));

                // Apply step
                const value = config.min + (percent / 100) * (config.max - config.min);
                const steppedValue = Math.round(value / config.step) * config.step;
                const steppedPercent = ((steppedValue - config.min) / (config.max - config.min)) * 100;

                fill.style.width = steppedPercent + '%';
                thumb.style.left = steppedPercent + '%';

                if (valueEl) {
                    valueEl.textContent = steppedValue + config.unit;
                }

                // Update color based on zones
                if (config.zones) {
                    let color = 'var(--color-secondary)';
                    for (const zone of config.zones) {
                        if (steppedValue <= zone.max) {
                            color = zone.color;
                            break;
                        }
                    }
                    fill.style.background = color;
                }

                // Dispatch change event
                container.dispatchEvent(new CustomEvent('slider-change', {
                    detail: { value: steppedValue, percent: steppedPercent }
                }));
            };

            const handleMove = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const rect = track.getBoundingClientRect();
                const x = (e.clientX || e.touches[0].clientX) - rect.left;
                const percent = (x / rect.width) * 100;
                updateValue(percent);
            };

            // Mouse events
            thumb.addEventListener('mousedown', (e) => {
                isDragging = true;
                e.preventDefault();
            });
            document.addEventListener('mouseup', () => isDragging = false);
            document.addEventListener('mousemove', handleMove);

            // Touch events
            thumb.addEventListener('touchstart', (e) => {
                isDragging = true;
            }, { passive: true });
            document.addEventListener('touchend', () => isDragging = false);
            document.addEventListener('touchmove', handleMove, { passive: false });

            // Click on track
            track.addEventListener('click', (e) => {
                const rect = track.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = (x / rect.width) * 100;
                updateValue(percent);
            });

            // Keyboard support
            thumb.setAttribute('tabindex', '0');
            thumb.addEventListener('keydown', (e) => {
                const current = parseFloat(fill.style.width) || 50;
                const stepSize = (config.step / (config.max - config.min)) * 100;

                if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    updateValue(current + stepSize);
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    updateValue(current - stepSize);
                }
            });
        },

        /**
         * Initialize expandable sections
         */
        initExpandables: function() {
            document.querySelectorAll('[data-expandable]').forEach(el => {
                const trigger = el.querySelector('[data-expand-trigger]');
                const content = el.querySelector('[data-expand-content]');

                if (!trigger || !content) return;

                content.style.maxHeight = '0';
                content.style.overflow = 'hidden';
                content.style.transition = 'max-height 0.3s ease';

                trigger.addEventListener('click', () => {
                    const isExpanded = el.classList.toggle('expanded');
                    content.style.maxHeight = isExpanded ? content.scrollHeight + 'px' : '0';

                    // Update trigger text
                    const showText = trigger.dataset.showText || 'Show more';
                    const hideText = trigger.dataset.hideText || 'Show less';
                    const textEl = trigger.querySelector('span') || trigger;
                    textEl.textContent = isExpanded ? hideText : showText;

                    // Update icon
                    const icon = trigger.querySelector('i');
                    if (icon) {
                        icon.style.transform = isExpanded ? 'rotate(180deg)' : '';
                    }
                });
            });
        },

        /**
         * Initialize animated counters
         */
        initCounters: function() {
            const counters = document.querySelectorAll('[data-counter]');

            if (counters.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        },

        /**
         * Animate a single counter
         */
        animateCounter: function(el) {
            const target = parseFloat(el.dataset.counter);
            const duration = parseFloat(el.dataset.duration) || 1000;
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            const decimals = parseInt(el.dataset.decimals) || 0;

            const startTime = performance.now();
            const startValue = 0;

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = startValue + (target - startValue) * eased;

                el.textContent = prefix + current.toFixed(decimals) + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            };

            requestAnimationFrame(update);
        },

        /**
         * Initialize tooltips
         */
        initTooltips: function() {
            document.querySelectorAll('[data-tooltip]').forEach(el => {
                const text = el.dataset.tooltip;
                let tooltip = null;

                el.addEventListener('mouseenter', (e) => {
                    tooltip = document.createElement('div');
                    tooltip.className = 'diagram-tooltip';
                    tooltip.textContent = text;
                    document.body.appendChild(tooltip);

                    const rect = el.getBoundingClientRect();
                    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + window.scrollY + 'px';

                    requestAnimationFrame(() => tooltip.classList.add('visible'));
                });

                el.addEventListener('mouseleave', () => {
                    if (tooltip) {
                        tooltip.classList.remove('visible');
                        setTimeout(() => tooltip.remove(), 200);
                    }
                });
            });
        },

        /**
         * Create a slider programmatically
         * @param {Object} options - Configuration options
         * @returns {HTMLElement} - The slider container
         */
        createSlider: function(options = {}) {
            const {
                label = 'Value',
                min = 0,
                max = 100,
                value = 50,
                step = 1,
                unit = '%',
                zones = null
            } = options;

            const container = document.createElement('div');
            container.className = 'metric-slider';
            container.dataset.min = min;
            container.dataset.max = max;
            container.dataset.step = step;
            container.dataset.unit = unit;
            if (zones) container.dataset.zones = JSON.stringify(zones);

            const percent = ((value - min) / (max - min)) * 100;

            container.innerHTML = `
                <div class="metric-slider__header">
                    <span class="metric-slider__label">${label}</span>
                    <span class="metric-slider__value">${value}${unit}</span>
                </div>
                <div class="metric-slider__track">
                    <div class="metric-slider__fill" style="width: ${percent}%"></div>
                    <div class="metric-slider__thumb" style="left: ${percent}%"></div>
                </div>
            `;

            this.setupSlider(container);
            return container;
        },

        /**
         * Create a progress bar
         */
        createProgress: function(options = {}) {
            const {
                value = 0,
                max = 100,
                label = '',
                variant = 'default'
            } = options;

            const percent = (value / max) * 100;
            const fillClass = variant === 'success' ? 'stat-card__progress-fill--success' : '';

            const container = document.createElement('div');
            container.className = 'stat-card__progress';
            container.innerHTML = `<div class="stat-card__progress-fill ${fillClass}" style="width: ${percent}%"></div>`;

            return container;
        }
    };

    // Export to window
    window.VisualInteractions = VisualInteractions;

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            VisualInteractions.init();
        });
    } else {
        VisualInteractions.init();
    }

})();
