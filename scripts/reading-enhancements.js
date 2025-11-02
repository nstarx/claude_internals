/**
 * Reading Enhancements
 * Progress indicator, font controls, reading mode, accessibility features
 */

(function() {
    'use strict';

    const ReadingEnhancements = {
        initialized: false,
        settings: {
            fontSize: 16,
            lineHeight: 1.8,
            fontFamily: 'system',
            readingMode: false
        },

        // Initialize
        init: function() {
            if (this.initialized) return;

            console.log('📖 Initializing Reading Enhancements...');

            // Load saved settings
            this.loadSettings();

            // Initialize features
            this.initProgressIndicator();
            this.initReadingTime();
            this.initReadingControls();
            this.initReadingMode();
            this.initAccessibility();
            this.initKeyboardShortcuts();

            this.initialized = true;
            console.log('✓ Reading Enhancements ready');
        },

        // ═══════════════════════════════════════════════════════════════
        // READING PROGRESS INDICATOR
        // ═══════════════════════════════════════════════════════════════

        initProgressIndicator: function() {
            // Create progress bar
            const progressBar = document.createElement('div');
            progressBar.id = 'reading-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 4px;
                background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
                z-index: 9999;
                transition: width 0.2s ease;
            `;
            document.body.appendChild(progressBar);

            // Update on scroll
            let ticking = false;
            const updateProgress = () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const progress = (scrollTop / scrollHeight) * 100;

                progressBar.style.width = progress + '%';
                ticking = false;
            };

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateProgress);
                    ticking = true;
                }
            });

            // Initial update
            updateProgress();
        },

        // ═══════════════════════════════════════════════════════════════
        // ESTIMATED READING TIME (DISABLED)
        // ═══════════════════════════════════════════════════════════════

        initReadingTime: function() {
            // Reading time indicator removed per user request
            return;
        },

        // ═══════════════════════════════════════════════════════════════
        // READING CONTROLS
        // ═══════════════════════════════════════════════════════════════

        initReadingControls: function() {
            // Create control panel
            const panel = document.createElement('div');
            panel.id = 'reading-controls';
            panel.innerHTML = `
                <div style="
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    padding: 1rem;
                    border-radius: 12px;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    display: none;
                " class="reading-controls-panel">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                        <strong style="color: #1f2937;">Reading Settings</strong>
                        <button id="close-controls" style="
                            background: none;
                            border: none;
                            cursor: pointer;
                            padding: 0.25rem;
                            color: #6b7280;
                        ">
                            <i class="pi pi-times"></i>
                        </button>
                    </div>

                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: #4b5563;">
                            <i class="pi pi-font"></i> Font Size
                        </label>
                        <input type="range" id="font-size-slider" min="12" max="24" value="16" style="width: 100%;">
                        <div style="text-align: center; font-size: 0.85rem; color: #6b7280; margin-top: 0.25rem;">
                            <span id="font-size-value">16</span>px
                        </div>
                    </div>

                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: #4b5563;">
                            <i class="pi pi-align-justify"></i> Line Height
                        </label>
                        <input type="range" id="line-height-slider" min="1.2" max="2.5" step="0.1" value="1.8" style="width: 100%;">
                        <div style="text-align: center; font-size: 0.85rem; color: #6b7280; margin-top: 0.25rem;">
                            <span id="line-height-value">1.8</span>
                        </div>
                    </div>

                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: #4b5563;">
                            Font Family
                        </label>
                        <select id="font-family-select" style="
                            width: 100%;
                            padding: 0.5rem;
                            border: 2px solid #e5e7eb;
                            border-radius: 6px;
                            background: white;
                        ">
                            <option value="system">System Default</option>
                            <option value="serif">Serif</option>
                            <option value="sans-serif">Sans Serif</option>
                            <option value="monospace">Monospace</option>
                        </select>
                    </div>

                    <button id="reading-mode-toggle" style="
                        width: 100%;
                        padding: 0.75rem;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                    ">
                        <i class="pi pi-book"></i>
                        <span>Reading Mode</span>
                    </button>

                    <button id="reset-settings" style="
                        width: 100%;
                        padding: 0.5rem;
                        background: #f3f4f6;
                        color: #4b5563;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        margin-top: 0.5rem;
                        font-size: 0.85rem;
                    ">
                        Reset to Default
                    </button>
                </div>

                <button id="show-controls" style="
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    transition: transform 0.2s;
                ">
                    <i class="pi pi-cog" style="font-size: 1.2rem;"></i>
                </button>
            `;
            document.body.appendChild(panel);

            // Event listeners
            const showBtn = document.getElementById('show-controls');
            const closeBtn = document.getElementById('close-controls');
            const controlsPanel = document.querySelector('.reading-controls-panel');

            showBtn.addEventListener('click', () => {
                controlsPanel.style.display = 'block';
                showBtn.style.display = 'none';
            });

            closeBtn.addEventListener('click', () => {
                controlsPanel.style.display = 'none';
                showBtn.style.display = 'flex';
            });

            // Font size control
            const fontSizeSlider = document.getElementById('font-size-slider');
            const fontSizeValue = document.getElementById('font-size-value');

            fontSizeSlider.addEventListener('input', (e) => {
                const size = e.target.value;
                fontSizeValue.textContent = size;
                this.settings.fontSize = size;
                this.applySettings();
                this.saveSettings();
            });

            // Line height control
            const lineHeightSlider = document.getElementById('line-height-slider');
            const lineHeightValue = document.getElementById('line-height-value');

            lineHeightSlider.addEventListener('input', (e) => {
                const height = e.target.value;
                lineHeightValue.textContent = height;
                this.settings.lineHeight = height;
                this.applySettings();
                this.saveSettings();
            });

            // Font family control
            const fontFamilySelect = document.getElementById('font-family-select');

            fontFamilySelect.addEventListener('change', (e) => {
                this.settings.fontFamily = e.target.value;
                this.applySettings();
                this.saveSettings();
            });

            // Reading mode toggle
            document.getElementById('reading-mode-toggle').addEventListener('click', () => {
                this.toggleReadingMode();
            });

            // Reset button
            document.getElementById('reset-settings').addEventListener('click', () => {
                this.resetSettings();
                fontSizeSlider.value = 16;
                fontSizeValue.textContent = '16';
                lineHeightSlider.value = 1.8;
                lineHeightValue.textContent = '1.8';
                fontFamilySelect.value = 'system';
            });

            // Apply saved settings
            fontSizeSlider.value = this.settings.fontSize;
            fontSizeValue.textContent = this.settings.fontSize;
            lineHeightSlider.value = this.settings.lineHeight;
            lineHeightValue.textContent = this.settings.lineHeight;
            fontFamilySelect.value = this.settings.fontFamily;
        },

        // ═══════════════════════════════════════════════════════════════
        // READING MODE
        // ═══════════════════════════════════════════════════════════════

        initReadingMode: function() {
            // Reading mode is initialized, toggling handled by button
        },

        toggleReadingMode: function() {
            this.settings.readingMode = !this.settings.readingMode;

            if (this.settings.readingMode) {
                document.body.classList.add('reading-mode');
                this.saveSettings();
                if (window.ArtEffects) {
                    window.ArtEffects.showToast('Reading Mode Enabled', 'success');
                }
            } else {
                document.body.classList.remove('reading-mode');
                this.saveSettings();
                if (window.ArtEffects) {
                    window.ArtEffects.showToast('Reading Mode Disabled', 'info');
                }
            }
        },

        // ═══════════════════════════════════════════════════════════════
        // ACCESSIBILITY FEATURES
        // ═══════════════════════════════════════════════════════════════

        initAccessibility: function() {
            // Skip to main content link
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.textContent = 'Skip to main content';
            skipLink.className = 'skip-link';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 0;
                background: #667eea;
                color: white;
                padding: 0.75rem 1rem;
                text-decoration: none;
                z-index: 10000;
                transition: top 0.2s;
            `;

            skipLink.addEventListener('focus', () => {
                skipLink.style.top = '0';
            });

            skipLink.addEventListener('blur', () => {
                skipLink.style.top = '-40px';
            });

            document.body.insertBefore(skipLink, document.body.firstChild);

            // Add main landmark if not exists
            const main = document.querySelector('main') || document.querySelector('.container');
            if (main && !main.id) {
                main.id = 'main';
            }

            // Enhance focus indicators
            const style = document.createElement('style');
            style.textContent = `
                *:focus-visible {
                    outline: 3px solid #667eea;
                    outline-offset: 2px;
                }

                .reading-mode * focus-visible {
                    outline-color: #fbbf24;
                }
            `;
            document.head.appendChild(style);

            // Add aria-labels to interactive elements without text
            document.querySelectorAll('button:not([aria-label]), a:not([aria-label])').forEach(el => {
                if (!el.textContent.trim() && !el.getAttribute('aria-label')) {
                    const icon = el.querySelector('i[class*="pi-"]');
                    if (icon) {
                        const iconClass = Array.from(icon.classList).find(c => c.startsWith('pi-'));
                        if (iconClass) {
                            const label = iconClass.replace('pi-', '').replace(/-/g, ' ');
                            el.setAttribute('aria-label', label);
                        }
                    }
                }
            });
        },

        // ═══════════════════════════════════════════════════════════════
        // KEYBOARD SHORTCUTS
        // ═══════════════════════════════════════════════════════════════

        initKeyboardShortcuts: function() {
            document.addEventListener('keydown', (e) => {
                // Ctrl/Cmd + K: Toggle reading controls
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    document.getElementById('show-controls').click();
                }

                // Ctrl/Cmd + R: Toggle reading mode
                if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                    e.preventDefault();
                    this.toggleReadingMode();
                }

                // Ctrl/Cmd + +: Increase font size
                if ((e.ctrlKey || e.metaKey) && e.key === '=') {
                    e.preventDefault();
                    const slider = document.getElementById('font-size-slider');
                    const newValue = Math.min(24, parseInt(slider.value) + 1);
                    slider.value = newValue;
                    slider.dispatchEvent(new Event('input'));
                }

                // Ctrl/Cmd + -: Decrease font size
                if ((e.ctrlKey || e.metaKey) && e.key === '-') {
                    e.preventDefault();
                    const slider = document.getElementById('font-size-slider');
                    const newValue = Math.max(12, parseInt(slider.value) - 1);
                    slider.value = newValue;
                    slider.dispatchEvent(new Event('input'));
                }
            });

            // Show shortcuts help
            console.log(`
%c📖 Reading Enhancement Shortcuts
%cCtrl/Cmd + K: Toggle controls
Ctrl/Cmd + R: Toggle reading mode
Ctrl/Cmd + +: Increase font size
Ctrl/Cmd + -: Decrease font size
            `, 'font-weight: bold; font-size: 14px;', 'font-size: 12px;');
        },

        // ═══════════════════════════════════════════════════════════════
        // SETTINGS MANAGEMENT
        // ═══════════════════════════════════════════════════════════════

        applySettings: function() {
            const container = document.querySelector('.container') || document.body;

            container.style.fontSize = this.settings.fontSize + 'px';
            container.style.lineHeight = this.settings.lineHeight;

            const fontMap = {
                system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                serif: 'Georgia, "Times New Roman", serif',
                'sans-serif': 'Arial, Helvetica, sans-serif',
                monospace: '"Courier New", Courier, monospace'
            };

            container.style.fontFamily = fontMap[this.settings.fontFamily] || fontMap.system;
        },

        saveSettings: function() {
            try {
                localStorage.setItem('reading-settings', JSON.stringify(this.settings));
            } catch (e) {
                console.warn('Could not save settings:', e);
            }
        },

        loadSettings: function() {
            try {
                const saved = localStorage.getItem('reading-settings');
                if (saved) {
                    this.settings = { ...this.settings, ...JSON.parse(saved) };
                    this.applySettings();

                    if (this.settings.readingMode) {
                        document.body.classList.add('reading-mode');
                    }
                }
            } catch (e) {
                console.warn('Could not load settings:', e);
            }
        },

        resetSettings: function() {
            this.settings = {
                fontSize: 16,
                lineHeight: 1.8,
                fontFamily: 'system',
                readingMode: false
            };
            this.applySettings();
            this.saveSettings();
            document.body.classList.remove('reading-mode');

            if (window.ArtEffects) {
                window.ArtEffects.showToast('Settings Reset', 'info');
            }
        }
    };

    // Export to window
    window.ReadingEnhancements = ReadingEnhancements;

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            ReadingEnhancements.init();
        });
    } else {
        ReadingEnhancements.init();
    }

    // Add reading mode styles
    const readingModeStyle = document.createElement('style');
    readingModeStyle.textContent = `
        .reading-mode {
            background: #f9f9f9;
        }

        .reading-mode header,
        .reading-mode footer,
        .reading-mode nav,
        .reading-mode .back-to-top,
        .reading-mode .reading-time-indicator {
            display: none !important;
        }

        .reading-mode .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 4rem 2rem;
        }

        .reading-mode section {
            margin: 2rem 0;
        }
    `;
    document.head.appendChild(readingModeStyle);

})();
