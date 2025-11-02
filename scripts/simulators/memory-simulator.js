/**
 * Memory Persistence Simulator
 * Compare efficiency with and without memory persistence (race animation)
 */

(function() {
    'use strict';

    const MemorySimulator = {
        isRacing: false,

        // Initialize the simulator
        init: function(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;

            this.render();
            this.attachEventListeners();
            this.calculate();
        },

        // Render the simulator UI
        render: function() {
            this.container.innerHTML = `
                <div class="simulator-card memory-simulator">
                    <div class="simulator-header">
                        <i class="pi pi-database"></i>
                        <h3>Memory Persistence Simulator</h3>
                        <p class="simulator-subtitle">See the impact of session memory on efficiency</p>
                    </div>

                    <div class="simulator-body">
                        <div class="input-group">
                            <label for="project-size">
                                Project Complexity (1-10)
                                <span class="tooltip" data-tooltip="How complex is your project?">ℹ️</span>
                            </label>
                            <input type="number" id="project-size" value="7" min="1" max="10" step="1">
                            <input type="range" id="project-slider" min="1" max="10" value="7" step="1">
                        </div>

                        <div class="input-group">
                            <label for="session-count">
                                Number of Sessions
                                <span class="tooltip" data-tooltip="How many work sessions?">ℹ️</span>
                            </label>
                            <input type="number" id="session-count" value="5" min="1" max="20" step="1">
                            <input type="range" id="session-slider" min="1" max="20" value="5" step="1">
                        </div>

                        <div class="race-container">
                            <div class="race-header">
                                <h4>Efficiency Comparison</h4>
                                <button id="start-race-btn" class="btn btn-primary">
                                    <i class="pi pi-play"></i>
                                    Start Race
                                </button>
                            </div>

                            <div class="race-track">
                                <div class="race-lane with-memory">
                                    <div class="lane-label">
                                        <span class="lane-icon">🚀</span>
                                        <span>With Memory</span>
                                    </div>
                                    <div class="track-container">
                                        <div class="racer memory-racer" id="memory-racer">
                                            <div class="racer-icon">🚀</div>
                                        </div>
                                        <div class="track-progress" id="memory-progress"></div>
                                    </div>
                                    <div class="lane-time" id="memory-time">0.0s</div>
                                </div>

                                <div class="race-lane without-memory">
                                    <div class="lane-label">
                                        <span class="lane-icon">🐌</span>
                                        <span>Without Memory</span>
                                    </div>
                                    <div class="track-container">
                                        <div class="racer no-memory-racer" id="no-memory-racer">
                                            <div class="racer-icon">🐌</div>
                                        </div>
                                        <div class="track-progress" id="no-memory-progress"></div>
                                    </div>
                                    <div class="lane-time" id="no-memory-time">0.0s</div>
                                </div>
                            </div>

                            <div class="finish-line">
                                <span>FINISH</span>
                            </div>
                        </div>

                        <div class="stats-comparison">
                            <div class="comparison-card with-memory-card">
                                <h4>✨ With Memory Persistence</h4>
                                <div class="stat-row">
                                    <span class="stat-label">Time to Productivity</span>
                                    <span class="stat-value" id="with-memory-time">0 min</span>
                                </div>
                                <div class="stat-row">
                                    <span class="stat-label">Context Loaded</span>
                                    <span class="stat-value" id="with-memory-context">0%</span>
                                </div>
                                <div class="stat-row">
                                    <span class="stat-label">Tokens Used</span>
                                    <span class="stat-value" id="with-memory-tokens">0K</span>
                                </div>
                                <div class="stat-row">
                                    <span class="stat-label">Efficiency</span>
                                    <span class="stat-value efficiency-high" id="with-memory-efficiency">0%</span>
                                </div>
                            </div>

                            <div class="comparison-card without-memory-card">
                                <h4>❌ Without Memory Persistence</h4>
                                <div class="stat-row">
                                    <span class="stat-label">Time to Productivity</span>
                                    <span class="stat-value" id="without-memory-time">0 min</span>
                                </div>
                                <div class="stat-row">
                                    <span class="stat-label">Context Loaded</span>
                                    <span class="stat-value" id="without-memory-context">0%</span>
                                </div>
                                <div class="stat-row">
                                    <span class="stat-label">Tokens Used</span>
                                    <span class="stat-value" id="without-memory-tokens">0K</span>
                                </div>
                                <div class="stat-row">
                                    <span class="stat-label">Efficiency</span>
                                    <span class="stat-value efficiency-low" id="without-memory-efficiency">0%</span>
                                </div>
                            </div>
                        </div>

                        <div class="savings-highlight" id="savings-highlight">
                            <!-- Dynamic savings info -->
                        </div>
                    </div>
                </div>
            `;
        },

        // Attach event listeners
        attachEventListeners: function() {
            this.syncInput('project-size', 'project-slider');
            this.syncInput('session-count', 'session-slider');

            ['project-size', 'session-count'].forEach(id => {
                document.getElementById(id).addEventListener('input', () => {
                    this.calculate();
                });
            });

            document.getElementById('start-race-btn').addEventListener('click', () => {
                this.startRace();
            });
        },

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

        // Calculate efficiency metrics
        calculate: function() {
            const complexity = parseInt(document.getElementById('project-size').value) || 7;
            const sessions = parseInt(document.getElementById('session-count').value) || 5;

            // Formula: Time to productivity
            // With memory: Base time + (complexity * 0.5 min)
            // Without memory: Base time + (complexity * 3 min) * sessions

            const withMemoryTime = 2 + (complexity * 0.5);
            const withoutMemoryTime = 5 + (complexity * 3);

            // Context loading percentage
            const withMemoryContext = 90 + (complexity * 0.5); // High context retention
            const withoutMemoryContext = 40 + (complexity * 2); // Low context, needs rediscovery

            // Token usage
            const withMemoryTokens = 5 + (complexity * 2);
            const withoutMemoryTokens = 20 + (complexity * 10);

            // Efficiency (inverse of time)
            const withMemoryEfficiency = 95 - (complexity * 2);
            const withoutMemoryEfficiency = 60 - (complexity * 4);

            // Update stats
            this.updateStats(
                withMemoryTime,
                withoutMemoryTime,
                withMemoryContext,
                withoutMemoryContext,
                withMemoryTokens,
                withoutMemoryTokens,
                withMemoryEfficiency,
                withoutMemoryEfficiency,
                sessions
            );
        },

        updateStats: function(
            withTime, withoutTime,
            withContext, withoutContext,
            withTokens, withoutTokens,
            withEff, withoutEff,
            sessions
        ) {
            document.getElementById('with-memory-time').textContent = withTime.toFixed(1) + ' min';
            document.getElementById('without-memory-time').textContent = withoutTime.toFixed(1) + ' min';

            document.getElementById('with-memory-context').textContent = Math.min(withContext, 100).toFixed(0) + '%';
            document.getElementById('without-memory-context').textContent = withoutContext.toFixed(0) + '%';

            document.getElementById('with-memory-tokens').textContent = withTokens.toFixed(1) + 'K';
            document.getElementById('without-memory-tokens').textContent = withoutTokens.toFixed(1) + 'K';

            document.getElementById('with-memory-efficiency').textContent = withEff.toFixed(0) + '%';
            document.getElementById('without-memory-efficiency').textContent = withoutEff.toFixed(0) + '%';

            // Calculate savings
            const timeSaved = withoutTime - withTime;
            const tokensSaved = withoutTokens - withTokens;
            const efficiencyGain = withEff - withoutEff;

            const totalTimeSaved = timeSaved * sessions;
            const totalTokensSaved = tokensSaved * sessions;

            // Update savings highlight
            const savingsEl = document.getElementById('savings-highlight');
            savingsEl.innerHTML = `
                <div class="savings-card">
                    <div class="savings-header">
                        <i class="pi pi-chart-line"></i>
                        <h4>Projected Savings (${sessions} sessions)</h4>
                    </div>
                    <div class="savings-content">
                        <div class="saving-item">
                            <span class="saving-icon">⏱️</span>
                            <div class="saving-info">
                                <span class="saving-value">${totalTimeSaved.toFixed(1)} minutes</span>
                                <span class="saving-label">Time Saved</span>
                            </div>
                        </div>
                        <div class="saving-item">
                            <span class="saving-icon">🎯</span>
                            <div class="saving-info">
                                <span class="saving-value">${totalTokensSaved.toFixed(1)}K tokens</span>
                                <span class="saving-label">Tokens Saved</span>
                            </div>
                        </div>
                        <div class="saving-item">
                            <span class="saving-icon">📈</span>
                            <div class="saving-info">
                                <span class="saving-value">${efficiencyGain.toFixed(0)}%</span>
                                <span class="saving-label">Efficiency Gain</span>
                            </div>
                        </div>
                    </div>
                    <div class="savings-message">
                        ${this.getSavingsMessage(totalTimeSaved, efficiencyGain)}
                    </div>
                </div>
            `;
        },

        getSavingsMessage: function(timeSaved, efficiencyGain) {
            if (efficiencyGain > 30) {
                return '🌟 <strong>Huge Impact!</strong> Memory persistence dramatically improves your workflow efficiency.';
            } else if (efficiencyGain > 20) {
                return '✨ <strong>Significant Boost!</strong> Memory persistence saves considerable time and effort.';
            } else if (efficiencyGain > 10) {
                return '✅ <strong>Notable Improvement.</strong> Memory persistence provides measurable benefits.';
            } else {
                return '💡 <strong>Modest Gains.</strong> Even simple projects benefit from memory persistence.';
            }
        },

        // Start race animation
        startRace: function() {
            if (this.isRacing) return;

            this.isRacing = true;
            const btn = document.getElementById('start-race-btn');
            btn.disabled = true;
            btn.innerHTML = '<i class="pi pi-spinner pi-spin"></i> Racing...';

            // Reset racers
            const memoryRacer = document.getElementById('memory-racer');
            const noMemoryRacer = document.getElementById('no-memory-racer');
            const memoryProgress = document.getElementById('memory-progress');
            const noMemoryProgress = document.getElementById('no-memory-progress');
            const memoryTime = document.getElementById('memory-time');
            const noMemoryTime = document.getElementById('no-memory-time');

            memoryRacer.style.left = '0%';
            noMemoryRacer.style.left = '0%';
            memoryProgress.style.width = '0%';
            noMemoryProgress.style.width = '0%';

            // Get times from stats
            const withTime = parseFloat(document.getElementById('with-memory-time').textContent);
            const withoutTime = parseFloat(document.getElementById('without-memory-time').textContent);

            // Normalize to race duration (5 seconds max for faster one)
            const raceDuration = 5000; // 5 seconds
            const memoryDuration = raceDuration;
            const noMemoryDuration = (withoutTime / withTime) * raceDuration;

            // Animate both racers
            this.animateRacer(memoryRacer, memoryProgress, memoryTime, memoryDuration, true);
            this.animateRacer(noMemoryRacer, noMemoryProgress, noMemoryTime, noMemoryDuration, false);

            // Re-enable button after race
            setTimeout(() => {
                this.isRacing = false;
                btn.disabled = false;
                btn.innerHTML = '<i class="pi pi-refresh"></i> Race Again';

                // Show sparkles on winner
                memoryRacer.classList.add('winner');
                setTimeout(() => memoryRacer.classList.remove('winner'), 2000);
            }, Math.max(memoryDuration, noMemoryDuration) + 500);
        },

        animateRacer: function(racer, progress, timeEl, duration, isMemory) {
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progressPercent = Math.min((elapsed / duration) * 100, 100);

                racer.style.left = progressPercent + '%';
                progress.style.width = progressPercent + '%';

                // Update time
                timeEl.textContent = (elapsed / 1000).toFixed(1) + 's';

                if (progressPercent < 100) {
                    requestAnimationFrame(animate);
                } else {
                    // Finished
                    timeEl.textContent = (duration / 1000).toFixed(1) + 's';
                    racer.classList.add('finished');
                }
            };

            requestAnimationFrame(animate);
        }
    };

    // Export to window
    window.MemorySimulator = MemorySimulator;

    // Auto-initialize if container exists
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('memory-simulator-container')) {
            MemorySimulator.init('memory-simulator-container');
        }
    });

})();
