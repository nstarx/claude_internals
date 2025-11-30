/**
 * Compact Command Simulator
 * Interactive simulation of the /compact command behavior
 */

(function() {
    'use strict';

    const CompactSimulator = {
        // Configuration
        config: {
            maxContext: 200000,
            autoCompactThreshold: 0.95,
            warningThreshold: 0.75,
            compressionRatio: 0.90, // 90% compression on historical
            essentialRatio: 0.15, // 15% is typically essential
        },

        // State
        state: {
            conversationTokens: 25000,
            filesTokens: 80000,
            toolOutputsTokens: 40000,
            systemTokens: 15000,
            isCompacted: false,
            compactHistory: []
        },

        /**
         * Initialize the simulator
         */
        init: function(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;

            this.render();
            this.attachEventListeners();
            this.updateVisualization();
        },

        /**
         * Render the simulator UI
         */
        render: function() {
            this.container.innerHTML = `
                <div class="simulator-card compact-simulator">
                    <div class="simulator-header">
                        <i class="pi pi-compress"></i>
                        <h3>Compaction Simulator</h3>
                        <p class="simulator-subtitle">See how /compact affects your context window</p>
                    </div>

                    <div class="simulator-body">
                        <!-- Context Breakdown Inputs -->
                        <div class="inputs-section">
                            <div class="input-group">
                                <label for="compact-conversation">
                                    <i class="pi pi-comments"></i> Conversation
                                    <span class="token-badge" id="conversation-badge">25K</span>
                                </label>
                                <input type="range" id="compact-conversation" min="0" max="100000" value="25000" step="1000">
                            </div>

                            <div class="input-group">
                                <label for="compact-files">
                                    <i class="pi pi-file"></i> Files Loaded
                                    <span class="token-badge" id="files-badge">80K</span>
                                </label>
                                <input type="range" id="compact-files" min="0" max="150000" value="80000" step="1000">
                            </div>

                            <div class="input-group">
                                <label for="compact-tools">
                                    <i class="pi pi-wrench"></i> Tool Outputs
                                    <span class="token-badge" id="tools-badge">40K</span>
                                </label>
                                <input type="range" id="compact-tools" min="0" max="80000" value="40000" step="1000">
                            </div>

                            <div class="input-group">
                                <label for="compact-system">
                                    <i class="pi pi-cog"></i> System Context
                                    <span class="token-badge" id="system-badge">15K</span>
                                </label>
                                <input type="range" id="compact-system" min="5000" max="30000" value="15000" step="1000">
                            </div>
                        </div>

                        <!-- Visual Context Bar -->
                        <div class="context-visualization">
                            <div class="context-header">
                                <span class="context-title">Context Window Usage</span>
                                <span class="context-stats">
                                    <span id="total-used">160K</span> / 200K tokens
                                    (<span id="usage-percent">80%</span>)
                                </span>
                            </div>

                            <div class="context-bar-container">
                                <div class="context-bar">
                                    <div class="bar-segment conversation-segment" id="bar-conversation"></div>
                                    <div class="bar-segment files-segment" id="bar-files"></div>
                                    <div class="bar-segment tools-segment" id="bar-tools"></div>
                                    <div class="bar-segment system-segment" id="bar-system"></div>
                                    <div class="bar-segment available-segment" id="bar-available"></div>
                                </div>
                                <div class="threshold-markers">
                                    <div class="threshold-marker warning-marker" style="left: 75%">
                                        <span class="threshold-label">75%</span>
                                    </div>
                                    <div class="threshold-marker danger-marker" style="left: 95%">
                                        <span class="threshold-label">95%</span>
                                    </div>
                                </div>
                            </div>

                            <div class="context-legend">
                                <div class="legend-item">
                                    <span class="legend-dot conversation-dot"></span>
                                    <span>Conversation</span>
                                </div>
                                <div class="legend-item">
                                    <span class="legend-dot files-dot"></span>
                                    <span>Files</span>
                                </div>
                                <div class="legend-item">
                                    <span class="legend-dot tools-dot"></span>
                                    <span>Tools</span>
                                </div>
                                <div class="legend-item">
                                    <span class="legend-dot system-dot"></span>
                                    <span>System</span>
                                </div>
                                <div class="legend-item">
                                    <span class="legend-dot available-dot"></span>
                                    <span>Available</span>
                                </div>
                            </div>
                        </div>

                        <!-- Status Indicator -->
                        <div class="status-panel" id="status-panel">
                            <div class="status-icon" id="status-icon">
                                <i class="pi pi-check-circle"></i>
                            </div>
                            <div class="status-text">
                                <span class="status-title" id="status-title">Context Healthy</span>
                                <span class="status-description" id="status-description">Plenty of room for continued work</span>
                            </div>
                        </div>

                        <!-- Compact Controls -->
                        <div class="compact-controls">
                            <div class="instruction-input">
                                <label for="compact-instructions">
                                    <i class="pi pi-pencil"></i> Compact Instructions (optional)
                                </label>
                                <input type="text" id="compact-instructions"
                                       placeholder="e.g., Focus on code changes and test results">
                            </div>

                            <div class="action-buttons">
                                <button class="btn-compact" id="btn-compact">
                                    <i class="pi pi-compress"></i>
                                    Execute /compact
                                </button>
                                <button class="btn-reset" id="btn-reset">
                                    <i class="pi pi-refresh"></i>
                                    Reset
                                </button>
                            </div>
                        </div>

                        <!-- Compact Results -->
                        <div class="compact-results" id="compact-results" style="display: none;">
                            <h4><i class="pi pi-chart-bar"></i> Compaction Results</h4>

                            <div class="results-grid">
                                <div class="result-card before">
                                    <span class="result-label">Before</span>
                                    <span class="result-value" id="before-tokens">160K</span>
                                    <span class="result-percent" id="before-percent">80%</span>
                                </div>

                                <div class="result-arrow">
                                    <i class="pi pi-arrow-right"></i>
                                </div>

                                <div class="result-card after">
                                    <span class="result-label">After</span>
                                    <span class="result-value" id="after-tokens">65K</span>
                                    <span class="result-percent" id="after-percent">32%</span>
                                </div>

                                <div class="result-card freed">
                                    <span class="result-label">Freed</span>
                                    <span class="result-value" id="freed-tokens">95K</span>
                                    <span class="result-percent" id="freed-percent">59%</span>
                                </div>
                            </div>

                            <div class="compression-details">
                                <h5>Compression Breakdown:</h5>
                                <ul id="compression-breakdown">
                                    <!-- Populated dynamically -->
                                </ul>
                            </div>
                        </div>

                        <!-- Animation Canvas for Compaction -->
                        <div class="compact-animation" id="compact-animation" style="display: none;">
                            <div class="animation-content">
                                <div class="blocks-before" id="blocks-before"></div>
                                <div class="animation-arrow">
                                    <i class="pi pi-arrow-right"></i>
                                    <span>Compacting...</span>
                                </div>
                                <div class="blocks-after" id="blocks-after"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Attach event listeners
         */
        attachEventListeners: function() {
            // Slider inputs
            const sliders = ['conversation', 'files', 'tools', 'system'];
            sliders.forEach(name => {
                const slider = document.getElementById(`compact-${name}`);
                if (slider) {
                    slider.addEventListener('input', (e) => {
                        this.state[`${name}Tokens`] = parseInt(e.target.value);
                        this.state.isCompacted = false;
                        this.hideResults();
                        this.updateVisualization();
                    });
                }
            });

            // Compact button
            const compactBtn = document.getElementById('btn-compact');
            if (compactBtn) {
                compactBtn.addEventListener('click', () => this.executeCompact());
            }

            // Reset button
            const resetBtn = document.getElementById('btn-reset');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => this.reset());
            }
        },

        /**
         * Calculate total tokens
         */
        getTotalTokens: function() {
            return this.state.conversationTokens +
                   this.state.filesTokens +
                   this.state.toolOutputsTokens +
                   this.state.systemTokens;
        },

        /**
         * Format token number
         */
        formatTokens: function(tokens) {
            if (tokens >= 1000) {
                return Math.round(tokens / 1000) + 'K';
            }
            return tokens.toString();
        },

        /**
         * Update visualization
         */
        updateVisualization: function() {
            const total = this.getTotalTokens();
            const maxContext = this.config.maxContext;
            const percentage = (total / maxContext) * 100;

            // Update badges
            document.getElementById('conversation-badge').textContent = this.formatTokens(this.state.conversationTokens);
            document.getElementById('files-badge').textContent = this.formatTokens(this.state.filesTokens);
            document.getElementById('tools-badge').textContent = this.formatTokens(this.state.toolOutputsTokens);
            document.getElementById('system-badge').textContent = this.formatTokens(this.state.systemTokens);

            // Update stats
            document.getElementById('total-used').textContent = this.formatTokens(total);
            document.getElementById('usage-percent').textContent = Math.round(percentage) + '%';

            // Update bar segments
            const conversationWidth = (this.state.conversationTokens / maxContext) * 100;
            const filesWidth = (this.state.filesTokens / maxContext) * 100;
            const toolsWidth = (this.state.toolOutputsTokens / maxContext) * 100;
            const systemWidth = (this.state.systemTokens / maxContext) * 100;
            const availableWidth = Math.max(0, 100 - conversationWidth - filesWidth - toolsWidth - systemWidth);

            document.getElementById('bar-conversation').style.width = conversationWidth + '%';
            document.getElementById('bar-files').style.width = filesWidth + '%';
            document.getElementById('bar-tools').style.width = toolsWidth + '%';
            document.getElementById('bar-system').style.width = systemWidth + '%';
            document.getElementById('bar-available').style.width = availableWidth + '%';

            // Update status
            this.updateStatus(percentage);
        },

        /**
         * Update status indicator
         */
        updateStatus: function(percentage) {
            const statusPanel = document.getElementById('status-panel');
            const statusIcon = document.getElementById('status-icon');
            const statusTitle = document.getElementById('status-title');
            const statusDescription = document.getElementById('status-description');

            statusPanel.classList.remove('status-healthy', 'status-warning', 'status-danger', 'status-overflow');

            if (percentage >= 100) {
                statusPanel.classList.add('status-overflow');
                statusIcon.innerHTML = '<i class="pi pi-exclamation-triangle"></i>';
                statusTitle.textContent = 'Context Overflow!';
                statusDescription.textContent = 'Context exceeds maximum - /compact required immediately';
            } else if (percentage >= 95) {
                statusPanel.classList.add('status-danger');
                statusIcon.innerHTML = '<i class="pi pi-exclamation-circle"></i>';
                statusTitle.textContent = 'Auto-Compact Triggered';
                statusDescription.textContent = 'At 95% - automatic compaction will occur';
            } else if (percentage >= 75) {
                statusPanel.classList.add('status-warning');
                statusIcon.innerHTML = '<i class="pi pi-info-circle"></i>';
                statusTitle.textContent = 'Context Getting Full';
                statusDescription.textContent = 'Consider using /compact soon';
            } else {
                statusPanel.classList.add('status-healthy');
                statusIcon.innerHTML = '<i class="pi pi-check-circle"></i>';
                statusTitle.textContent = 'Context Healthy';
                statusDescription.textContent = 'Plenty of room for continued work';
            }
        },

        /**
         * Execute compaction simulation
         */
        executeCompact: function() {
            const beforeTotal = this.getTotalTokens();
            const instructions = document.getElementById('compact-instructions').value;

            // Calculate what gets compressed
            // Essential: System context + recent conversation (20% of conversation)
            // Compressible: 80% of conversation + all files + all tool outputs

            const essentialConversation = this.state.conversationTokens * 0.2;
            const compressibleConversation = this.state.conversationTokens * 0.8;

            // Files and tools get heavily compressed
            const compressedFiles = this.state.filesTokens * (1 - this.config.compressionRatio);
            const compressedTools = this.state.toolOutputsTokens * (1 - this.config.compressionRatio);
            const compressedConversation = compressibleConversation * (1 - this.config.compressionRatio);

            // New totals
            const newConversation = Math.round(essentialConversation + compressedConversation);
            const newFiles = Math.round(compressedFiles);
            const newTools = Math.round(compressedTools);
            const newSystem = this.state.systemTokens; // System context unchanged

            const afterTotal = newConversation + newFiles + newTools + newSystem;
            const freedTokens = beforeTotal - afterTotal;

            // Show animation
            this.showCompactAnimation(beforeTotal, afterTotal);

            // Update state after animation
            setTimeout(() => {
                this.state.conversationTokens = newConversation;
                this.state.filesTokens = newFiles;
                this.state.toolOutputsTokens = newTools;
                this.state.isCompacted = true;

                // Update sliders
                document.getElementById('compact-conversation').value = newConversation;
                document.getElementById('compact-files').value = newFiles;
                document.getElementById('compact-tools').value = newTools;

                this.updateVisualization();
                this.showResults(beforeTotal, afterTotal, freedTokens, instructions);
            }, 1500);
        },

        /**
         * Show compaction animation
         */
        showCompactAnimation: function(before, after) {
            const animation = document.getElementById('compact-animation');
            animation.style.display = 'block';

            // Generate before blocks
            const blocksBefore = document.getElementById('blocks-before');
            const blocksAfter = document.getElementById('blocks-after');

            const beforeBlockCount = Math.ceil(before / 10000);
            const afterBlockCount = Math.ceil(after / 10000);

            blocksBefore.innerHTML = '';
            blocksAfter.innerHTML = '';

            for (let i = 0; i < beforeBlockCount; i++) {
                const block = document.createElement('div');
                block.className = 'token-block before-block';
                block.style.animationDelay = (i * 0.05) + 's';
                blocksBefore.appendChild(block);
            }

            setTimeout(() => {
                for (let i = 0; i < afterBlockCount; i++) {
                    const block = document.createElement('div');
                    block.className = 'token-block after-block';
                    block.style.animationDelay = (i * 0.05) + 's';
                    blocksAfter.appendChild(block);
                }
            }, 800);

            setTimeout(() => {
                animation.style.display = 'none';
            }, 1500);
        },

        /**
         * Show results panel
         */
        showResults: function(before, after, freed, instructions) {
            const results = document.getElementById('compact-results');
            results.style.display = 'block';

            document.getElementById('before-tokens').textContent = this.formatTokens(before);
            document.getElementById('before-percent').textContent = Math.round((before / this.config.maxContext) * 100) + '%';

            document.getElementById('after-tokens').textContent = this.formatTokens(after);
            document.getElementById('after-percent').textContent = Math.round((after / this.config.maxContext) * 100) + '%';

            document.getElementById('freed-tokens').textContent = this.formatTokens(freed);
            document.getElementById('freed-percent').textContent = Math.round((freed / before) * 100) + '%';

            // Compression breakdown
            const breakdown = document.getElementById('compression-breakdown');
            breakdown.innerHTML = `
                <li><strong>Compression ratio:</strong> ${Math.round(this.config.compressionRatio * 100)}%</li>
                <li><strong>Essential preserved:</strong> ~20% of conversation + system context</li>
                <li><strong>Summarized:</strong> Historical conversation, file contents, tool outputs</li>
                ${instructions ? `<li><strong>Priority:</strong> "${instructions}"</li>` : ''}
            `;
        },

        /**
         * Hide results panel
         */
        hideResults: function() {
            const results = document.getElementById('compact-results');
            if (results) {
                results.style.display = 'none';
            }
        },

        /**
         * Reset to defaults
         */
        reset: function() {
            this.state = {
                conversationTokens: 25000,
                filesTokens: 80000,
                toolOutputsTokens: 40000,
                systemTokens: 15000,
                isCompacted: false,
                compactHistory: []
            };

            // Reset sliders
            document.getElementById('compact-conversation').value = 25000;
            document.getElementById('compact-files').value = 80000;
            document.getElementById('compact-tools').value = 40000;
            document.getElementById('compact-system').value = 15000;
            document.getElementById('compact-instructions').value = '';

            this.hideResults();
            this.updateVisualization();
        }
    };

    // Export to window
    window.CompactSimulator = CompactSimulator;

})();
