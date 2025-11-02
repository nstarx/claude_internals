/**
 * Token Usage Calculator Simulator
 * Interactive calculator for estimating token usage from codebase metrics
 */

(function() {
    'use strict';

    const TokenCalculator = {
        // Constants
        CONTEXT_LIMIT: 200000,
        TOKENS_PER_LINE_MIN: 4,
        TOKENS_PER_LINE_MAX: 6,
        TOKENS_PER_LINE_AVG: 5,

        // Initialize the calculator
        init: function(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;

            this.render();
            this.attachEventListeners();
            this.calculate(); // Initial calculation
        },

        // Render the calculator UI
        render: function() {
            this.container.innerHTML = `
                <div class="simulator-card token-calculator">
                    <div class="simulator-header">
                        <i class="pi pi-code"></i>
                        <h3>Token Usage Calculator</h3>
                        <p class="simulator-subtitle">Estimate token consumption from your codebase</p>
                    </div>

                    <div class="simulator-body">
                        <div class="input-group">
                            <label for="loc-input">
                                Lines of Code (LOC)
                                <span class="tooltip" data-tooltip="Total number of lines in your codebase">ℹ️</span>
                            </label>
                            <input type="number" id="loc-input" value="150000" min="0" step="1000">
                            <input type="range" id="loc-slider" min="0" max="500000" value="150000" step="1000">
                        </div>

                        <div class="input-group">
                            <label for="files-input">
                                Number of Files
                                <span class="tooltip" data-tooltip="Total files in your project">ℹ️</span>
                            </label>
                            <input type="number" id="files-input" value="500" min="0" step="10">
                            <input type="range" id="files-slider" min="0" max="5000" value="500" step="10">
                        </div>

                        <div class="input-group">
                            <label for="tokens-per-line">
                                Tokens per Line
                                <span class="tooltip" data-tooltip="Average tokens per line (typically 4-6)">ℹ️</span>
                            </label>
                            <input type="number" id="tokens-per-line" value="5" min="1" max="20" step="0.5">
                            <input type="range" id="tokens-per-line-slider" min="1" max="20" value="5" step="0.5">
                        </div>

                        <div class="calculator-button-group">
                            <button id="calc-btn" class="btn btn-primary">
                                <i class="pi pi-calculator"></i>
                                Calculate
                            </button>
                            <button id="reset-btn" class="btn btn-secondary">
                                <i class="pi pi-refresh"></i>
                                Reset
                            </button>
                        </div>

                        <div class="results-container" id="token-results">
                            <div class="result-card">
                                <div class="result-label">Total Tokens</div>
                                <div class="result-value" id="total-tokens">0</div>
                                <div class="result-subtext" id="tokens-formatted">0 tokens</div>
                            </div>

                            <div class="result-card">
                                <div class="result-label">Context Windows</div>
                                <div class="result-value" id="context-windows">0</div>
                                <div class="result-subtext">×200K limit</div>
                            </div>

                            <div class="result-card">
                                <div class="result-label">Usage</div>
                                <div class="result-value" id="usage-percent">0%</div>
                                <div class="result-subtext" id="usage-status">Efficient</div>
                            </div>
                        </div>

                        <div class="progress-visualization">
                            <div class="progress-label">
                                <span>Context Window Usage</span>
                                <span id="progress-text">0%</span>
                            </div>
                            <div class="progress-bar-container">
                                <div class="progress-bar" id="token-progress">
                                    <div class="progress-fill"></div>
                                </div>
                                <div class="progress-marker" style="left: 100%;">
                                    <span class="marker-label">200K</span>
                                </div>
                            </div>
                        </div>

                        <div class="feedback-container" id="token-feedback">
                            <!-- Dynamic feedback will be inserted here -->
                        </div>
                    </div>
                </div>
            `;
        },

        // Attach event listeners
        attachEventListeners: function() {
            // Sync number inputs with range sliders
            this.syncInput('loc-input', 'loc-slider');
            this.syncInput('files-input', 'files-slider');
            this.syncInput('tokens-per-line', 'tokens-per-line-slider');

            // Calculate button
            document.getElementById('calc-btn').addEventListener('click', () => {
                this.calculate();
            });

            // Reset button
            document.getElementById('reset-btn').addEventListener('click', () => {
                this.reset();
            });

            // Auto-calculate on input change
            ['loc-input', 'files-input', 'tokens-per-line'].forEach(id => {
                document.getElementById(id).addEventListener('input', () => {
                    this.calculate();
                });
            });
        },

        // Sync number input with range slider
        syncInput: function(inputId, sliderId) {
            const input = document.getElementById(inputId);
            const slider = document.getElementById(sliderId);

            input.addEventListener('input', (e) => {
                slider.value = e.target.value;
            });

            slider.addEventListener('input', (e) => {
                input.value = e.target.value;
            });
        },

        // Calculate token usage
        calculate: function() {
            const loc = parseInt(document.getElementById('loc-input').value) || 0;
            const files = parseInt(document.getElementById('files-input').value) || 0;
            const tokensPerLine = parseFloat(document.getElementById('tokens-per-line').value) || 5;

            // Formula: Total Tokens = LOC × Tokens per Line
            const totalTokens = Math.round(loc * tokensPerLine);
            const contextWindows = totalTokens / this.CONTEXT_LIMIT;
            const usagePercent = (totalTokens / this.CONTEXT_LIMIT) * 100;

            // Update results
            this.updateResults(totalTokens, contextWindows, usagePercent);

            // Animate progress bar
            this.animateProgress(usagePercent);

            // Show feedback
            this.showFeedback(totalTokens, contextWindows, usagePercent);
        },

        // Update results display
        updateResults: function(totalTokens, contextWindows, usagePercent) {
            document.getElementById('total-tokens').textContent =
                this.formatNumber(totalTokens);
            document.getElementById('tokens-formatted').textContent =
                `${this.formatNumberWithCommas(totalTokens)} tokens`;
            document.getElementById('context-windows').textContent =
                contextWindows.toFixed(2) + '×';
            document.getElementById('usage-percent').textContent =
                usagePercent.toFixed(1) + '%';

            // Update status based on usage
            const statusEl = document.getElementById('usage-status');
            if (usagePercent < 50) {
                statusEl.textContent = '✅ Efficient';
                statusEl.className = 'result-subtext status-good';
            } else if (usagePercent < 100) {
                statusEl.textContent = '⚠️ Moderate';
                statusEl.className = 'result-subtext status-warning';
            } else {
                statusEl.textContent = '❌ Exceeds Limit';
                statusEl.className = 'result-subtext status-danger';
            }
        },

        // Animate progress bar
        animateProgress: function(percent) {
            const progressFill = document.querySelector('#token-progress .progress-fill');
            const progressText = document.getElementById('progress-text');

            // Cap at 100% for display, but show real number in text
            const displayPercent = Math.min(percent, 100);

            // Animate from current to target
            progressFill.style.transition = 'none';
            const currentWidth = parseFloat(progressFill.style.width) || 0;

            setTimeout(() => {
                progressFill.style.transition = 'width 0.8s cubic-bezier(0.4, 0.0, 0.2, 1), background-color 0.3s';
                progressFill.style.width = displayPercent + '%';

                // Change color based on percentage
                if (percent < 50) {
                    progressFill.style.backgroundColor = '#10b981'; // Green
                } else if (percent < 80) {
                    progressFill.style.backgroundColor = '#f59e0b'; // Orange
                } else if (percent < 100) {
                    progressFill.style.backgroundColor = '#ef4444'; // Red
                } else {
                    progressFill.style.backgroundColor = '#dc2626'; // Dark red
                    // Add shake animation when exceeding limit
                    progressFill.classList.add('shake');
                    setTimeout(() => progressFill.classList.remove('shake'), 500);
                }
            }, 50);

            // Animate number
            this.animateNumber(progressText, currentWidth, percent, '%');
        },

        // Show contextual feedback
        showFeedback: function(totalTokens, contextWindows, usagePercent) {
            const feedback = document.getElementById('token-feedback');
            let message = '';
            let icon = '';
            let className = '';

            if (usagePercent < 25) {
                icon = '🏆';
                className = 'feedback-success';
                message = `<strong>Excellent!</strong> Your codebase would use only ${usagePercent.toFixed(1)}% of a single context window. This is highly efficient for AI-assisted development.`;
            } else if (usagePercent < 50) {
                icon = '✅';
                className = 'feedback-good';
                message = `<strong>Great!</strong> Your token usage is well within limits. You have ${(100 - usagePercent).toFixed(1)}% of the context window remaining for conversation and tool outputs.`;
            } else if (usagePercent < 100) {
                icon = '⚠️';
                className = 'feedback-warning';
                message = `<strong>Moderate Usage.</strong> Consider using strategic context management techniques to optimize token usage. You're using ${usagePercent.toFixed(1)}% of available capacity.`;
            } else if (usagePercent < 200) {
                icon = '🔥';
                className = 'feedback-danger';
                message = `<strong>Exceeds Limit!</strong> Your codebase would require ${contextWindows.toFixed(2)}× context windows. You'll need advanced strategies like selective loading, symbol-based reading, and memory persistence.`;
            } else {
                icon = '💥';
                className = 'feedback-critical';
                message = `<strong>Critical!</strong> At ${contextWindows.toFixed(1)}× the context limit, full codebase loading is impossible. Essential techniques: symbolic navigation, hierarchical understanding, and aggressive filtering.`;

                // Add explosion animation for extreme cases
                this.triggerExplosion();
            }

            feedback.innerHTML = `
                <div class="feedback-message ${className}">
                    <div class="feedback-icon">${icon}</div>
                    <div class="feedback-text">${message}</div>
                </div>
            `;

            // Fade in animation
            feedback.style.opacity = '0';
            setTimeout(() => {
                feedback.style.transition = 'opacity 0.5s';
                feedback.style.opacity = '1';
            }, 100);
        },

        // Trigger explosion animation for critical cases
        triggerExplosion: function() {
            const container = this.container.querySelector('.simulator-card');
            container.classList.add('explosion');
            setTimeout(() => container.classList.remove('explosion'), 1000);
        },

        // Animate number change
        animateNumber: function(element, start, end, suffix = '') {
            const duration = 800;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const current = start + (end - start) * easeOutCubic;

                element.textContent = current.toFixed(1) + suffix;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        },

        // Format large numbers (e.g., 750000 -> 750K)
        formatNumber: function(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'K';
            }
            return num.toString();
        },

        // Format numbers with commas
        formatNumberWithCommas: function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        // Reset to defaults
        reset: function() {
            document.getElementById('loc-input').value = 150000;
            document.getElementById('loc-slider').value = 150000;
            document.getElementById('files-input').value = 500;
            document.getElementById('files-slider').value = 500;
            document.getElementById('tokens-per-line').value = 5;
            document.getElementById('tokens-per-line-slider').value = 5;

            this.calculate();
        }
    };

    // Export to window
    window.TokenCalculator = TokenCalculator;

    // Auto-initialize if container exists
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('token-calculator-container')) {
            TokenCalculator.init('token-calculator-container');
        }
    });

})();
