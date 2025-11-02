/**
 * Cognitive Load Calculator
 * Visualize cognitive capacity with brain representation
 */

(function() {
    'use strict';

    const CognitiveLoadCalculator = {
        brainSegments: [],

        // Initialize the calculator
        init: function(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;

            this.render();
            this.attachEventListeners();
            this.calculate();
        },

        // Render the calculator UI
        render: function() {
            this.container.innerHTML = `
                <div class="simulator-card cognitive-load">
                    <div class="simulator-header">
                        <i class="pi pi-bolt"></i>
                        <h3>Cognitive Load Calculator</h3>
                        <p class="simulator-subtitle">Measure effective cognitive capacity</p>
                    </div>

                    <div class="simulator-body">
                        <div class="input-group">
                            <label for="irrelevant-context">
                                Irrelevant Context (%)
                                <span class="tooltip" data-tooltip="Percentage of context not relevant to current task">ℹ️</span>
                            </label>
                            <input type="number" id="irrelevant-context" value="30" min="0" max="100" step="5">
                            <input type="range" id="irrelevant-slider" min="0" max="100" value="30" step="5">
                        </div>

                        <div class="input-group">
                            <label for="task-complexity">
                                Task Complexity (1-10)
                                <span class="tooltip" data-tooltip="How complex is the current task?">ℹ️</span>
                            </label>
                            <input type="number" id="task-complexity" value="7" min="1" max="10" step="1">
                            <input type="range" id="complexity-slider" min="1" max="10" value="7" step="1">
                        </div>

                        <div class="input-group">
                            <label for="multitasking">
                                Concurrent Tasks
                                <span class="tooltip" data-tooltip="Number of tasks being juggled">ℹ️</span>
                            </label>
                            <input type="number" id="multitasking" value="2" min="1" max="10" step="1">
                            <input type="range" id="multitask-slider" min="1" max="10" value="2" step="1">
                        </div>

                        <div class="brain-visualization">
                            <div class="brain-container" id="brain-container">
                                <svg viewBox="0 0 200 200" class="brain-svg">
                                    <!-- Brain outline -->
                                    <path class="brain-outline" d="M100,30 Q130,30 140,50 Q150,40 160,50 Q170,60 165,75 Q170,90 165,105 Q170,120 160,135 Q150,145 135,145 Q130,155 120,160 Q110,165 100,165 Q90,165 80,160 Q70,155 65,145 Q50,145 40,135 Q30,120 35,105 Q30,90 35,75 Q30,60 40,50 Q50,40 60,50 Q70,30 100,30 Z"/>

                                    <!-- Brain segments (will be filled dynamically) -->
                                    <g id="brain-segments">
                                        <circle class="brain-segment" cx="100" cy="70" r="12" data-index="0"/>
                                        <circle class="brain-segment" cx="80" cy="85" r="12" data-index="1"/>
                                        <circle class="brain-segment" cx="120" cy="85" r="12" data-index="2"/>
                                        <circle class="brain-segment" cx="70" cy="105" r="12" data-index="3"/>
                                        <circle class="brain-segment" cx="100" cy="105" r="12" data-index="4"/>
                                        <circle class="brain-segment" cx="130" cy="105" r="12" data-index="5"/>
                                        <circle class="brain-segment" cx="85" cy="125" r="12" data-index="6"/>
                                        <circle class="brain-segment" cx="115" cy="125" r="12" data-index="7"/>
                                        <circle class="brain-segment" cx="100" cy="140" r="12" data-index="8"/>
                                    </g>

                                    <!-- Thought bubbles -->
                                    <g id="thought-bubbles" class="thought-bubbles">
                                        <!-- Will be added dynamically -->
                                    </g>
                                </svg>

                                <div class="brain-status" id="brain-status">
                                    <div class="status-icon">🧠</div>
                                    <div class="status-text">Analyzing...</div>
                                </div>
                            </div>
                        </div>

                        <div class="capacity-breakdown">
                            <div class="breakdown-header">
                                <h4>Capacity Breakdown</h4>
                            </div>

                            <div class="capacity-bar">
                                <div class="capacity-segment effective" id="effective-capacity" style="width: 70%">
                                    <span class="segment-label">Effective</span>
                                    <span class="segment-value" id="effective-value">70%</span>
                                </div>
                                <div class="capacity-segment wasted" id="wasted-capacity" style="width: 30%">
                                    <span class="segment-label">Wasted</span>
                                    <span class="segment-value" id="wasted-value">30%</span>
                                </div>
                            </div>

                            <div class="capacity-stats">
                                <div class="stat-item">
                                    <span class="stat-icon">✅</span>
                                    <div class="stat-content">
                                        <span class="stat-label">Effective Capacity</span>
                                        <span class="stat-value" id="effective-percent">70%</span>
                                    </div>
                                </div>

                                <div class="stat-item">
                                    <span class="stat-icon">⚡</span>
                                    <div class="stat-content">
                                        <span class="stat-label">Processing Power</span>
                                        <span class="stat-value" id="processing-power">Medium</span>
                                    </div>
                                </div>

                                <div class="stat-item">
                                    <span class="stat-icon">🎯</span>
                                    <div class="stat-content">
                                        <span class="stat-label">Focus Level</span>
                                        <span class="stat-value" id="focus-level">Good</span>
                                    </div>
                                </div>

                                <div class="stat-item">
                                    <span class="stat-icon">💡</span>
                                    <div class="stat-content">
                                        <span class="stat-label">Productivity</span>
                                        <span class="stat-value" id="productivity">75%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="recommendations" id="recommendations">
                            <!-- Dynamic recommendations -->
                        </div>
                    </div>
                </div>
            `;

            this.brainSegments = document.querySelectorAll('.brain-segment');
        },

        // Attach event listeners
        attachEventListeners: function() {
            this.syncInput('irrelevant-context', 'irrelevant-slider');
            this.syncInput('task-complexity', 'complexity-slider');
            this.syncInput('multitasking', 'multitask-slider');

            ['irrelevant-context', 'task-complexity', 'multitasking'].forEach(id => {
                document.getElementById(id).addEventListener('input', () => {
                    this.calculate();
                });
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

        // Calculate cognitive load
        calculate: function() {
            const irrelevantPercent = parseInt(document.getElementById('irrelevant-context').value) || 0;
            const complexity = parseInt(document.getElementById('task-complexity').value) || 5;
            const multitasking = parseInt(document.getElementById('multitasking').value) || 1;

            // Formula: Effective Capacity = 100% - irrelevant% - (complexity penalty) - (multitasking penalty)
            const complexityPenalty = (complexity - 5) * 2; // 0-10% penalty
            const multitaskingPenalty = (multitasking - 1) * 5; // 0-45% penalty

            const effectiveCapacity = Math.max(5, 100 - irrelevantPercent - complexityPenalty - multitaskingPenalty);
            const wastedCapacity = 100 - effectiveCapacity;

            // Processing power calculation
            const processingPower = effectiveCapacity * (1 - (complexity / 20));

            // Focus level (inverse of multitasking)
            const focusLevel = Math.max(10, 100 - (multitasking * 10));

            // Productivity (combination of all factors)
            const productivity = (effectiveCapacity * 0.5) + (processingPower * 0.3) + (focusLevel * 0.2);

            // Update display
            this.updateDisplay(effectiveCapacity, wastedCapacity, processingPower, focusLevel, productivity);

            // Update brain visualization
            this.updateBrain(effectiveCapacity);

            // Show recommendations
            this.showRecommendations(effectiveCapacity, irrelevantPercent, complexity, multitasking);
        },

        updateDisplay: function(effective, wasted, processing, focus, productivity) {
            // Update capacity bar
            document.getElementById('effective-capacity').style.width = effective + '%';
            document.getElementById('wasted-capacity').style.width = wasted + '%';
            document.getElementById('effective-value').textContent = effective.toFixed(0) + '%';
            document.getElementById('wasted-value').textContent = wasted.toFixed(0) + '%';

            // Update stats
            document.getElementById('effective-percent').textContent = effective.toFixed(0) + '%';

            const processingEl = document.getElementById('processing-power');
            if (processing > 70) {
                processingEl.textContent = 'High 🔥';
                processingEl.className = 'stat-value power-high';
            } else if (processing > 40) {
                processingEl.textContent = 'Medium ⚡';
                processingEl.className = 'stat-value power-medium';
            } else {
                processingEl.textContent = 'Low 🐌';
                processingEl.className = 'stat-value power-low';
            }

            const focusEl = document.getElementById('focus-level');
            if (focus > 70) {
                focusEl.textContent = 'Excellent 🎯';
                focusEl.className = 'stat-value focus-high';
            } else if (focus > 50) {
                focusEl.textContent = 'Good ✓';
                focusEl.className = 'stat-value focus-medium';
            } else {
                focusEl.textContent = 'Poor ✗';
                focusEl.className = 'stat-value focus-low';
            }

            document.getElementById('productivity').textContent = productivity.toFixed(0) + '%';
        },

        updateBrain: function(effectiveCapacity) {
            const activeSegments = Math.round((effectiveCapacity / 100) * this.brainSegments.length);

            // Update brain segments
            this.brainSegments.forEach((segment, index) => {
                if (index < activeSegments) {
                    segment.classList.add('active');
                    segment.classList.remove('inactive');
                } else {
                    segment.classList.add('inactive');
                    segment.classList.remove('active');
                }
            });

            // Update brain status
            const statusIcon = document.querySelector('.status-icon');
            const statusText = document.querySelector('.status-text');

            if (effectiveCapacity > 80) {
                statusIcon.textContent = '🧠✨';
                statusText.textContent = 'Peak Performance!';
                statusText.className = 'status-text status-excellent';
            } else if (effectiveCapacity > 60) {
                statusIcon.textContent = '🧠';
                statusText.textContent = 'Working Well';
                statusText.className = 'status-text status-good';
            } else if (effectiveCapacity > 40) {
                statusIcon.textContent = '🤔';
                statusText.textContent = 'Suboptimal';
                statusText.className = 'status-text status-warning';
            } else {
                statusIcon.textContent = '😵';
                statusText.textContent = 'Overloaded!';
                statusText.className = 'status-text status-danger';
            }

            // Add thought bubbles based on capacity
            this.updateThoughtBubbles(effectiveCapacity);
        },

        updateThoughtBubbles: function(effectiveCapacity) {
            const bubblesGroup = document.getElementById('thought-bubbles');
            bubblesGroup.innerHTML = '';

            if (effectiveCapacity > 70) {
                // Happy thoughts
                this.addThoughtBubble(bubblesGroup, 170, 50, '💡');
                this.addThoughtBubble(bubblesGroup, 30, 60, '✨');
            } else if (effectiveCapacity < 40) {
                // Stressed thoughts
                this.addThoughtBubble(bubblesGroup, 170, 50, '😵');
                this.addThoughtBubble(bubblesGroup, 30, 60, '🤯');
                this.addThoughtBubble(bubblesGroup, 170, 120, '💭');
            }
        },

        addThoughtBubble: function(parent, x, y, emoji) {
            const bubble = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            bubble.setAttribute('x', x);
            bubble.setAttribute('y', y);
            bubble.setAttribute('class', 'thought-bubble');
            bubble.setAttribute('font-size', '20');
            bubble.textContent = emoji;

            parent.appendChild(bubble);

            // Animate bubble
            setTimeout(() => bubble.classList.add('visible'), 100);
        },

        showRecommendations: function(effective, irrelevant, complexity, multitasking) {
            const recommendations = [];

            if (irrelevant > 40) {
                recommendations.push({
                    icon: '🎯',
                    title: 'Reduce Irrelevant Context',
                    text: 'High irrelevant context is hurting your effectiveness. Use strategic loading and filtering to improve focus.',
                    priority: 'high'
                });
            }

            if (multitasking > 3) {
                recommendations.push({
                    icon: '📌',
                    title: 'Focus on Fewer Tasks',
                    text: 'Multitasking reduces cognitive capacity significantly. Try focusing on 1-2 tasks at a time for better results.',
                    priority: 'high'
                });
            }

            if (complexity > 7 && effective < 60) {
                recommendations.push({
                    icon: '🔨',
                    title: 'Break Down Complex Tasks',
                    text: 'High complexity with low capacity is problematic. Break the task into smaller, manageable chunks.',
                    priority: 'medium'
                });
            }

            if (effective > 80) {
                recommendations.push({
                    icon: '🌟',
                    title: 'Optimal State!',
                    text: 'Your cognitive load is well-managed. This is ideal for tackling challenging problems.',
                    priority: 'success'
                });
            }

            // Render recommendations
            const container = document.getElementById('recommendations');
            if (recommendations.length === 0) {
                container.innerHTML = '';
                return;
            }

            container.innerHTML = `
                <div class="recommendations-list">
                    <h4>💡 Recommendations</h4>
                    ${recommendations.map(rec => `
                        <div class="recommendation-item priority-${rec.priority}">
                            <div class="rec-icon">${rec.icon}</div>
                            <div class="rec-content">
                                <div class="rec-title">${rec.title}</div>
                                <div class="rec-text">${rec.text}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    };

    // Export to window
    window.CognitiveLoadCalculator = CognitiveLoadCalculator;

    // Auto-initialize if container exists
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('cognitive-load-container')) {
            CognitiveLoadCalculator.init('cognitive-load-container');
        }
    });

})();
