/**
 * Context Window Visualizer
 * Visual representation of context window filling with blocks
 */

(function() {
    'use strict';

    const ContextWindowVisualizer = {
        // Constants
        CONTEXT_LIMIT: 200000,
        BLOCK_SIZE: 5000, // Each block represents 5K tokens
        MAX_BLOCKS: 40, // 200K / 5K

        blocks: [],

        // Initialize the visualizer
        init: function(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;

            this.render();
            this.attachEventListeners();
            this.updateVisualization();
        },

        // Render the visualizer UI
        render: function() {
            this.container.innerHTML = `
                <div class="simulator-card context-window-viz">
                    <div class="simulator-header">
                        <i class="pi pi-window-maximize"></i>
                        <h3>Context Window Visualizer</h3>
                        <p class="simulator-subtitle">See how your context fills up in real-time</p>
                    </div>

                    <div class="simulator-body">
                        <div class="input-group">
                            <label for="conversation-tokens">
                                Conversation Tokens
                                <span class="tooltip" data-tooltip="Tokens from chat messages">ℹ️</span>
                            </label>
                            <input type="number" id="conversation-tokens" value="10000" min="0" step="1000">
                            <input type="range" id="conversation-slider" min="0" max="100000" value="10000" step="1000">
                            <span class="input-value">${this.formatTokens(10000)}</span>
                        </div>

                        <div class="input-group">
                            <label for="files-loaded-tokens">
                                Files Loaded
                                <span class="tooltip" data-tooltip="Tokens from loaded files">ℹ️</span>
                            </label>
                            <input type="number" id="files-loaded-tokens" value="50000" min="0" step="1000">
                            <input type="range" id="files-loaded-slider" min="0" max="150000" value="50000" step="1000">
                            <span class="input-value">${this.formatTokens(50000)}</span>
                        </div>

                        <div class="input-group">
                            <label for="tool-outputs-tokens">
                                Tool Outputs
                                <span class="tooltip" data-tooltip="Tokens from search results, commands, etc.">ℹ️</span>
                            </label>
                            <input type="number" id="tool-outputs-tokens" value="15000" min="0" step="1000">
                            <input type="range" id="tool-outputs-slider" min="0" max="100000" value="15000" step="1000">
                            <span class="input-value">${this.formatTokens(15000)}</span>
                        </div>

                        <div class="context-window-container">
                            <div class="window-header">
                                <div class="window-info">
                                    <span class="window-label">Context Window</span>
                                    <span class="window-capacity">200,000 tokens</span>
                                </div>
                                <div class="window-stats">
                                    <span id="used-tokens">0</span>
                                    <span class="divider">/</span>
                                    <span>200K</span>
                                </div>
                            </div>

                            <div class="blocks-container" id="blocks-container">
                                <!-- Blocks will be generated here -->
                            </div>

                            <div class="window-legend">
                                <div class="legend-item">
                                    <span class="legend-color conversation-color"></span>
                                    <span>Conversation</span>
                                </div>
                                <div class="legend-item">
                                    <span class="legend-color files-color"></span>
                                    <span>Files</span>
                                </div>
                                <div class="legend-item">
                                    <span class="legend-color tools-color"></span>
                                    <span>Tool Outputs</span>
                                </div>
                                <div class="legend-item">
                                    <span class="legend-color empty-color"></span>
                                    <span>Available</span>
                                </div>
                            </div>
                        </div>

                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-label">Used</div>
                                <div class="stat-value" id="used-percent">0%</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Remaining</div>
                                <div class="stat-value" id="remaining-tokens">200K</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Status</div>
                                <div class="stat-value" id="window-status">✅ Healthy</div>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <button id="add-conversation-btn" class="btn btn-small">
                                <i class="pi pi-plus"></i> Add Message
                            </button>
                            <button id="load-file-btn" class="btn btn-small">
                                <i class="pi pi-file"></i> Load File
                            </button>
                            <button id="run-tool-btn" class="btn btn-small">
                                <i class="pi pi-cog"></i> Run Tool
                            </button>
                            <button id="clear-context-btn" class="btn btn-small btn-danger">
                                <i class="pi pi-trash"></i> Clear All
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Create blocks
            this.createBlocks();
        },

        // Create visual blocks
        createBlocks: function() {
            const blocksContainer = document.getElementById('blocks-container');
            blocksContainer.innerHTML = '';

            for (let i = 0; i < this.MAX_BLOCKS; i++) {
                const block = document.createElement('div');
                block.className = 'context-block empty';
                block.dataset.index = i;
                block.dataset.type = 'empty';

                // Add tooltip
                block.title = `Block ${i + 1}: Empty`;

                blocksContainer.appendChild(block);
                this.blocks.push(block);
            }
        },

        // Attach event listeners
        attachEventListeners: function() {
            // Sync inputs with sliders
            this.syncInputAndUpdate('conversation-tokens', 'conversation-slider');
            this.syncInputAndUpdate('files-loaded-tokens', 'files-loaded-slider');
            this.syncInputAndUpdate('tool-outputs-tokens', 'tool-outputs-slider');

            // Quick action buttons
            document.getElementById('add-conversation-btn').addEventListener('click', () => {
                this.addQuickTokens('conversation-tokens', 5000);
            });

            document.getElementById('load-file-btn').addEventListener('click', () => {
                this.addQuickTokens('files-loaded-tokens', 10000);
            });

            document.getElementById('run-tool-btn').addEventListener('click', () => {
                this.addQuickTokens('tool-outputs-tokens', 3000);
            });

            document.getElementById('clear-context-btn').addEventListener('click', () => {
                this.clearContext();
            });
        },

        // Sync input with slider and update visualization
        syncInputAndUpdate: function(inputId, sliderId) {
            const input = document.getElementById(inputId);
            const slider = document.getElementById(sliderId);
            const valueDisplay = input.parentElement.querySelector('.input-value');

            const update = (value) => {
                input.value = value;
                slider.value = value;
                valueDisplay.textContent = this.formatTokens(parseInt(value));
                this.updateVisualization();
            };

            input.addEventListener('input', (e) => update(e.target.value));
            slider.addEventListener('input', (e) => update(e.target.value));
        },

        // Add tokens quickly
        addQuickTokens: function(inputId, amount) {
            const input = document.getElementById(inputId);
            const currentValue = parseInt(input.value) || 0;
            const newValue = Math.min(currentValue + amount, this.CONTEXT_LIMIT);

            input.value = newValue;
            input.dispatchEvent(new Event('input'));

            // Flash animation
            const parentCard = input.closest('.input-group');
            parentCard.classList.add('flash');
            setTimeout(() => parentCard.classList.remove('flash'), 300);
        },

        // Clear all context
        clearContext: function() {
            document.getElementById('conversation-tokens').value = 0;
            document.getElementById('files-loaded-tokens').value = 0;
            document.getElementById('tool-outputs-tokens').value = 0;

            document.getElementById('conversation-slider').value = 0;
            document.getElementById('files-loaded-slider').value = 0;
            document.getElementById('tool-outputs-slider').value = 0;

            this.updateVisualization();

            // Animate blocks clearing
            this.blocks.forEach((block, index) => {
                setTimeout(() => {
                    block.classList.add('pop-out');
                    setTimeout(() => {
                        block.classList.remove('pop-out');
                    }, 300);
                }, index * 10);
            });
        },

        // Update the visualization
        updateVisualization: function() {
            const conversation = parseInt(document.getElementById('conversation-tokens').value) || 0;
            const files = parseInt(document.getElementById('files-loaded-tokens').value) || 0;
            const tools = parseInt(document.getElementById('tool-outputs-tokens').value) || 0;

            const totalUsed = conversation + files + tools;
            const remaining = Math.max(0, this.CONTEXT_LIMIT - totalUsed);
            const usedPercent = (totalUsed / this.CONTEXT_LIMIT) * 100;

            // Update stats
            document.getElementById('used-tokens').textContent = this.formatTokens(totalUsed);
            document.getElementById('used-percent').textContent = usedPercent.toFixed(1) + '%';
            document.getElementById('remaining-tokens').textContent = this.formatTokens(remaining);

            // Update status
            const statusEl = document.getElementById('window-status');
            if (usedPercent < 60) {
                statusEl.textContent = '✅ Healthy';
                statusEl.className = 'stat-value status-good';
            } else if (usedPercent < 80) {
                statusEl.textContent = '⚠️ Filling';
                statusEl.className = 'stat-value status-warning';
            } else if (usedPercent < 100) {
                statusEl.textContent = '🔥 Critical';
                statusEl.className = 'stat-value status-danger';
            } else {
                statusEl.textContent = '💥 Overflow!';
                statusEl.className = 'stat-value status-critical';
            }

            // Update blocks
            this.updateBlocks(conversation, files, tools);
        },

        // Update block colors and types
        updateBlocks: function(conversation, files, tools) {
            const conversationBlocks = Math.ceil(conversation / this.BLOCK_SIZE);
            const filesBlocks = Math.ceil(files / this.BLOCK_SIZE);
            const toolsBlocks = Math.ceil(tools / this.BLOCK_SIZE);

            let currentBlock = 0;

            // Fill conversation blocks
            for (let i = 0; i < conversationBlocks && currentBlock < this.MAX_BLOCKS; i++) {
                this.setBlockType(currentBlock, 'conversation', i, conversationBlocks);
                currentBlock++;
            }

            // Fill file blocks
            for (let i = 0; i < filesBlocks && currentBlock < this.MAX_BLOCKS; i++) {
                this.setBlockType(currentBlock, 'files', i, filesBlocks);
                currentBlock++;
            }

            // Fill tool blocks
            for (let i = 0; i < toolsBlocks && currentBlock < this.MAX_BLOCKS; i++) {
                this.setBlockType(currentBlock, 'tools', i, toolsBlocks);
                currentBlock++;
            }

            // Empty remaining blocks
            for (let i = currentBlock; i < this.MAX_BLOCKS; i++) {
                this.setBlockType(i, 'empty', 0, 0);
            }
        },

        // Set block type with animation
        setBlockType: function(index, type, blockNum, totalOfType) {
            const block = this.blocks[index];
            const previousType = block.dataset.type;

            if (previousType !== type) {
                block.className = `context-block ${type}`;
                block.dataset.type = type;

                // Add pop-in animation for new blocks
                if (previousType === 'empty' && type !== 'empty') {
                    block.classList.add('pop-in');
                    setTimeout(() => block.classList.remove('pop-in'), 300);
                }

                // Update tooltip
                if (type === 'empty') {
                    block.title = `Block ${index + 1}: Empty`;
                } else {
                    const tokenStart = blockNum * this.BLOCK_SIZE;
                    const tokenEnd = Math.min((blockNum + 1) * this.BLOCK_SIZE, totalOfType * this.BLOCK_SIZE);
                    block.title = `Block ${index + 1}: ${this.capitalizeFirst(type)} (${this.formatTokens(tokenStart)}-${this.formatTokens(tokenEnd)})`;
                }
            }
        },

        // Format tokens for display
        formatTokens: function(tokens) {
            if (tokens >= 1000) {
                return (tokens / 1000).toFixed(0) + 'K';
            }
            return tokens.toString();
        },

        // Capitalize first letter
        capitalizeFirst: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    };

    // Export to window
    window.ContextWindowVisualizer = ContextWindowVisualizer;

    // Auto-initialize if container exists
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('context-window-container')) {
            ContextWindowVisualizer.init('context-window-container');
        }
    });

})();
