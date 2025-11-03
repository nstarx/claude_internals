/**
 * Multi-Session Decay Simulator
 * Visualize context degradation over time with timeline animation
 */

(function() {
    'use strict';

    const DecaySimulator = {
        isAnimating: false,

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
                <div class="simulator-card decay-simulator">
                    <div class="simulator-header">
                        <i class="pi pi-history"></i>
                        <h3>Multi-Session Decay Simulator</h3>
                        <p class="simulator-subtitle">Watch context fade over time without persistence</p>
                    </div>

                    <div class="simulator-body">
                        <div class="input-group">
                            <label for="days-between">
                                Days Between Sessions
                                <span class="tooltip" data-tooltip="Time gap between work sessions">ℹ️</span>
                            </label>
                            <input type="number" id="days-between" value="7" min="1" max="30" step="1">
                            <input type="range" id="days-slider" min="1" max="30" value="7" step="1">
                        </div>

                        <div class="input-group">
                            <label for="initial-context">
                                Initial Context Quality (%)
                                <span class="tooltip" data-tooltip="How well did you understand the project initially?">ℹ️</span>
                            </label>
                            <input type="number" id="initial-context" value="95" min="0" max="100" step="5">
                            <input type="range" id="context-slider" min="0" max="100" value="95" step="5">
                        </div>

                        <div class="input-group">
                            <label for="decay-rate">
                                Decay Rate (0.1-1.0)
                                <span class="tooltip" data-tooltip="How quickly context fades (higher = faster)">ℹ️</span>
                            </label>
                            <input type="number" id="decay-rate" value="0.25" min="0.05" max="1.0" step="0.05">
                            <input type="range" id="decay-slider" min="0.05" max="1.0" value="0.25" step="0.05">
                        </div>

                        <div class="timeline-container">
                            <div class="timeline-header">
                                <h4>Context Degradation Timeline</h4>
                                <button id="animate-decay-btn" class="btn btn-primary">
                                    <i class="pi pi-play"></i>
                                    Animate Decay
                                </button>
                            </div>

                            <div class="timeline-visualization" id="timeline-viz">
                                <div class="timeline-axis">
                                    <div class="axis-line"></div>
                                    <div class="session-markers" id="session-markers">
                                        <!-- Session markers will be generated here -->
                                    </div>
                                </div>

                                <div class="decay-curve-container">
                                    <svg id="decay-curve-svg" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet">
                                        <!-- Grid lines -->
                                        <g class="grid-lines">
                                            <line x1="0" y1="50" x2="600" y2="50" stroke="#e5e7eb" stroke-dasharray="2,2"/>
                                            <line x1="0" y1="100" x2="600" y2="100" stroke="#e5e7eb" stroke-dasharray="2,2"/>
                                            <line x1="0" y1="150" x2="600" y2="150" stroke="#e5e7eb" stroke-dasharray="2,2"/>
                                        </g>

                                        <!-- Decay curve path -->
                                        <path id="decay-path" class="decay-curve" fill="none" stroke="#ef4444" stroke-width="3"/>

                                        <!-- Context blocks along timeline -->
                                        <g id="context-blocks">
                                            <!-- Will be generated dynamically -->
                                        </g>

                                        <!-- Y-axis labels -->
                                        <text x="10" y="20" class="axis-label">100%</text>
                                        <text x="10" y="70" class="axis-label">75%</text>
                                        <text x="10" y="120" class="axis-label">50%</text>
                                        <text x="10" y="170" class="axis-label">25%</text>
                                    </svg>
                                </div>

                                <div class="memory-fog-overlay" id="memory-fog">
                                    <div class="fog-particles" id="fog-particles">
                                        <!-- Fog particles will be generated by JS -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="decay-stats-grid">
                            <div class="decay-stat-card">
                                <div class="stat-icon">📅</div>
                                <div class="stat-content">
                                    <div class="stat-label">After 1 Week</div>
                                    <div class="stat-value" id="week-1-context">0%</div>
                                </div>
                            </div>

                            <div class="decay-stat-card">
                                <div class="stat-icon">📅📅</div>
                                <div class="stat-content">
                                    <div class="stat-label">After 2 Weeks</div>
                                    <div class="stat-value" id="week-2-context">0%</div>
                                </div>
                            </div>

                            <div class="decay-stat-card">
                                <div class="stat-icon">📆</div>
                                <div class="stat-content">
                                    <div class="stat-label">After 1 Month</div>
                                    <div class="stat-value" id="month-1-context">0%</div>
                                </div>
                            </div>

                            <div class="decay-stat-card">
                                <div class="stat-icon">⏱️</div>
                                <div class="stat-content">
                                    <div class="stat-label">Half-Life</div>
                                    <div class="stat-value" id="half-life">0 days</div>
                                </div>
                            </div>
                        </div>

                        <div class="comparison-section">
                            <h4>💾 With Memory Persistence</h4>
                            <div class="memory-benefit">
                                <div class="benefit-stat">
                                    <span class="benefit-label">Context Retained</span>
                                    <span class="benefit-value">95%</span>
                                </div>
                                <div class="benefit-stat">
                                    <span class="benefit-label">After 1 Month</span>
                                    <span class="benefit-value">90%</span>
                                </div>
                                <div class="benefit-stat">
                                    <span class="benefit-label">Recovery Time</span>
                                    <span class="benefit-value">< 1 min</span>
                                </div>
                            </div>
                            <p class="memory-note">
                                <i class="pi pi-info-circle"></i>
                                Memory persistence preserves context across sessions, eliminating decay entirely.
                            </p>
                        </div>

                        <div class="decay-insights" id="decay-insights">
                            <!-- Dynamic insights -->
                        </div>
                    </div>
                </div>
            `;
        },

        // Attach event listeners
        attachEventListeners: function() {
            this.syncInput('days-between', 'days-slider');
            this.syncInput('initial-context', 'context-slider');
            this.syncInput('decay-rate', 'decay-slider');

            const animateBtn = this.container.querySelector('#animate-decay-btn');
            if (animateBtn) {
                animateBtn.addEventListener('click', () => {
                    this.animateDecay();
                });
            } else {
                console.error('Animate button not found');
            }
        },

        syncInput: function(inputId, sliderId) {
            const input = this.container.querySelector('#' + inputId);
            const slider = this.container.querySelector('#' + sliderId);

            if (!input || !slider) {
                console.error(`Elements not found: ${inputId} or ${sliderId}`);
                return;
            }

            input.addEventListener('input', (e) => {
                slider.value = e.target.value;
                this.calculate();
            });

            slider.addEventListener('input', (e) => {
                input.value = e.target.value;
                this.calculate();
            });
        },

        // Calculate decay over time
        calculate: function() {
            const daysBetween = parseInt(this.container.querySelector('#days-between')?.value) || 7;
            const initialContext = parseInt(this.container.querySelector('#initial-context')?.value) || 95;
            const decayRate = parseFloat(this.container.querySelector('#decay-rate')?.value) || 0.25;

            console.log('Calculating decay:', { daysBetween, initialContext, decayRate });

            // Exponential decay formula: retained = initial × e^(-decay_rate × time)
            const week1 = this.calculateDecay(initialContext, decayRate, 7);
            const week2 = this.calculateDecay(initialContext, decayRate, 14);
            const month1 = this.calculateDecay(initialContext, decayRate, 30);

            // Half-life: time when context drops to 50%
            const halfLife = Math.log(2) / decayRate;

            console.log('Decay results:', { week1, week2, month1, halfLife });

            // Update stats
            const week1El = this.container.querySelector('#week-1-context');
            const week2El = this.container.querySelector('#week-2-context');
            const month1El = this.container.querySelector('#month-1-context');
            const halfLifeEl = this.container.querySelector('#half-life');

            if (week1El) week1El.textContent = week1.toFixed(0) + '%';
            if (week2El) week2El.textContent = week2.toFixed(0) + '%';
            if (month1El) month1El.textContent = month1.toFixed(0) + '%';
            if (halfLifeEl) halfLifeEl.textContent = halfLife.toFixed(1) + ' days';

            // Update decay curve
            this.updateDecayCurve(initialContext, decayRate);

            // Show insights
            this.showInsights(week1, month1, halfLife);
        },

        // Calculate decay at specific time
        calculateDecay: function(initial, rate, days) {
            return initial * Math.exp(-rate * days);
        },

        // Update the decay curve visualization
        updateDecayCurve: function(initial, rate) {
            const path = this.container.querySelector('#decay-path');
            if (!path) {
                console.error('Decay path not found');
                return;
            }

            const maxDays = 30;
            const points = [];

            // Generate curve points
            for (let day = 0; day <= maxDays; day++) {
                const x = (day / maxDays) * 600;
                const retention = this.calculateDecay(initial, rate, day);
                const y = 200 - (retention / 100) * 180; // Invert Y and scale

                points.push(`${x},${y}`);
            }

            // Create path
            const pathData = `M ${points.join(' L ')}`;
            path.setAttribute('d', pathData);

            // Update context blocks
            this.updateContextBlocks(initial, rate, maxDays);
        },

        // Update context blocks along timeline
        updateContextBlocks: function(initial, rate, maxDays) {
            const container = this.container.querySelector('#context-blocks');
            if (!container) {
                console.error('Context blocks container not found');
                return;
            }
            container.innerHTML = '';

            const checkpoints = [0, 7, 14, 21, 30];

            checkpoints.forEach(day => {
                const x = (day / maxDays) * 600;
                const retention = this.calculateDecay(initial, rate, day);
                const y = 200 - (retention / 100) * 180;

                // Create context block
                const block = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                block.setAttribute('class', 'context-block-group');

                // Circle
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', y);
                circle.setAttribute('r', 8);
                circle.setAttribute('class', this.getBlockClass(retention));

                // Label
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', x);
                text.setAttribute('y', y - 15);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('class', 'block-label');
                text.textContent = `${retention.toFixed(0)}%`;

                // Day label
                const dayLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                dayLabel.setAttribute('x', x);
                dayLabel.setAttribute('y', 195);
                dayLabel.setAttribute('text-anchor', 'middle');
                dayLabel.setAttribute('class', 'day-label');
                dayLabel.textContent = `Day ${day}`;

                block.appendChild(circle);
                block.appendChild(text);
                block.appendChild(dayLabel);
                container.appendChild(block);
            });
        },

        getBlockClass: function(retention) {
            if (retention > 75) return 'context-block high';
            if (retention > 50) return 'context-block medium';
            if (retention > 25) return 'context-block low';
            return 'context-block critical';
        },

        // Generate fog particles with random positions
        generateFogParticles: function() {
            const fogContainer = this.container.querySelector('#fog-particles');
            if (!fogContainer) return;

            fogContainer.innerHTML = '';

            // Create 20 fog particles with random positions
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'fog-particle';

                // Random position
                const left = Math.random() * 100;
                const top = Math.random() * 100;

                particle.style.left = left + '%';
                particle.style.top = top + '%';
                particle.style.animationDelay = (Math.random() * -10) + 's';

                fogContainer.appendChild(particle);
            }
        },

        // Animate decay with memory fog effect
        animateDecay: function() {
            if (this.isAnimating) {
                console.log('Animation already in progress');
                return;
            }

            this.isAnimating = true;
            const btn = this.container.querySelector('#animate-decay-btn');
            const fog = this.container.querySelector('#memory-fog');
            const decayCurve = this.container.querySelector('#decay-path');

            if (!btn || !fog) {
                console.error('Animation elements not found');
                this.isAnimating = false;
                return;
            }

            // Generate fog particles
            this.generateFogParticles();

            btn.disabled = true;
            btn.innerHTML = '<i class="pi pi-spinner pi-spin"></i> Animating...';
            fog.style.opacity = '0';

            console.log('🌫️ Starting decay animation');

            // Add pulsing effect to decay curve
            if (decayCurve) {
                decayCurve.style.animation = 'pulse-decay 2s ease-in-out';
            }

            // Animate fog appearing with requestAnimationFrame for smoother animation
            let startTime = null;
            const fadeInDuration = 1500; // 1.5 seconds
            const holdDuration = 2000; // 2 seconds
            const fadeOutDuration = 1500; // 1.5 seconds

            const animateFadeIn = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / fadeInDuration, 1);

                fog.style.opacity = progress * 0.9; // Max 90% opacity for better visibility

                if (progress < 1) {
                    requestAnimationFrame(animateFadeIn);
                } else {
                    console.log('🌫️ Fog fully visible, holding...');
                    // Hold the fog
                    setTimeout(() => {
                        console.log('🌫️ Fading out fog...');
                        startTime = null;
                        requestAnimationFrame(animateFadeOut);
                    }, holdDuration);
                }
            };

            const animateFadeOut = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / fadeOutDuration, 1);

                fog.style.opacity = 0.9 * (1 - progress);

                if (progress < 1) {
                    requestAnimationFrame(animateFadeOut);
                } else {
                    console.log('✅ Animation complete');
                    this.isAnimating = false;
                    btn.disabled = false;
                    btn.innerHTML = '<i class="pi pi-refresh"></i> Animate Again';

                    // Remove curve animation
                    if (decayCurve) {
                        decayCurve.style.animation = '';
                    }
                }
            };

            startTime = null;
            requestAnimationFrame(animateFadeIn);
        },

        // Show insights based on decay
        showInsights: function(week1, month1, halfLife) {
            const insights = this.container.querySelector('#decay-insights');
            if (!insights) {
                console.error('Insights container not found');
                return;
            }
            let message = '';
            let severity = '';

            if (halfLife < 5) {
                severity = 'critical';
                message = `
                    <div class="insight-card severity-${severity}">
                        <div class="insight-icon">🚨</div>
                        <div class="insight-content">
                            <h4>Critical Decay Rate!</h4>
                            <p>Your context half-life is only ${halfLife.toFixed(1)} days. Without memory persistence, you'll lose most project knowledge within a week.</p>
                            <p><strong>Recommendation:</strong> Implement memory persistence immediately to prevent constant rediscovery.</p>
                        </div>
                    </div>
                `;
            } else if (halfLife < 10) {
                severity = 'warning';
                message = `
                    <div class="insight-card severity-${severity}">
                        <div class="insight-icon">⚠️</div>
                        <div class="insight-content">
                            <h4>Fast Context Decay</h4>
                            <p>With a ${halfLife.toFixed(1)}-day half-life, you'll retain only ${month1.toFixed(0)}% context after a month.</p>
                            <p><strong>Recommendation:</strong> Use memory persistence to maintain project knowledge across sessions.</p>
                        </div>
                    </div>
                `;
            } else {
                severity = 'good';
                message = `
                    <div class="insight-card severity-${severity}">
                        <div class="insight-icon">✅</div>
                        <div class="insight-content">
                            <h4>Moderate Decay Rate</h4>
                            <p>Your ${halfLife.toFixed(1)}-day half-life means context degrades gradually. Still, ${(100 - month1).toFixed(0)}% is lost after a month.</p>
                            <p><strong>Recommendation:</strong> Memory persistence will keep you at 90%+ retention indefinitely.</p>
                        </div>
                    </div>
                `;
            }

            insights.innerHTML = message;
        }
    };

    // Export to window
    window.DecaySimulator = DecaySimulator;

    // Auto-initialize if container exists
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('decay-simulator-container')) {
            DecaySimulator.init('decay-simulator-container');
        }
    });

})();
