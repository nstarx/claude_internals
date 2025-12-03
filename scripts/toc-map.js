/**
 * TOC Forest Map - Interactive Navigation
 * A visual map for navigating through documentation sections
 */

(function() {
    'use strict';

    const TOCMap = {
        config: {
            containerId: 'toc-map-container',
            zones: [
                {
                    id: 'start',
                    name: 'Starting Point',
                    icon: 'pi-flag',
                    color: '#10b981',
                    sections: [
                        { id: 'claude-code-methodology', name: 'Methodology', icon: 'pi-compass' },
                        { id: 'overview', name: 'Overview', icon: 'pi-map' }
                    ]
                },
                {
                    id: 'foundation',
                    name: 'Foundation',
                    icon: 'pi-building',
                    color: '#3b82f6',
                    sections: [
                        { id: 'working-memory', name: 'Working Memory', icon: 'pi-database' },
                        { id: 'architecture', name: 'Architecture', icon: 'pi-sitemap' },
                        { id: 'principles', name: 'Core Principles', icon: 'pi-bookmark' }
                    ]
                },
                {
                    id: 'strategy',
                    name: 'Strategy',
                    icon: 'pi-chart-line',
                    color: '#8b5cf6',
                    sections: [
                        { id: 'patterns', name: 'Patterns', icon: 'pi-th-large' },
                        { id: 'tools', name: 'Tool Integration', icon: 'pi-wrench' },
                        { id: 'metrics', name: 'Metrics', icon: 'pi-chart-bar' }
                    ]
                },
                {
                    id: 'interactive',
                    name: 'Interactive',
                    icon: 'pi-play',
                    color: '#f59e0b',
                    sections: [
                        { id: 'simulators', name: 'Simulations', icon: 'pi-sliders-h' },
                        { id: 'compact-command', name: '/compact', icon: 'pi-compress' }
                    ]
                },
                {
                    id: 'warnings',
                    name: 'Pitfalls',
                    icon: 'pi-exclamation-triangle',
                    color: '#ef4444',
                    sections: [
                        { id: 'without-tools', name: 'Without Tools', icon: 'pi-ban' },
                        { id: 'antipatterns', name: 'Antipatterns', icon: 'pi-times-circle' },
                        { id: 'things-to-avoid', name: 'Things to Avoid', icon: 'pi-minus-circle' },
                        { id: 'behavior-issues', name: 'Behavior Issues', icon: 'pi-exclamation-circle' }
                    ]
                },
                {
                    id: 'advanced',
                    name: 'Deep Dive',
                    icon: 'pi-bolt',
                    color: '#06b6d4',
                    sections: [
                        { id: 'advanced-topics', name: 'How It Works', icon: 'pi-cog' },
                        { id: 'self-assessment', name: 'Self-Assessment', icon: 'pi-user' },
                        { id: 'advanced', name: 'Advanced', icon: 'pi-star' }
                    ]
                },
                {
                    id: 'application',
                    name: 'Application',
                    icon: 'pi-check-circle',
                    color: '#84cc16',
                    sections: [
                        { id: 'integration', name: 'Integration', icon: 'pi-link' },
                        { id: 'workflows', name: 'Workflows', icon: 'pi-list' },
                        { id: 'complex-scenarios', name: 'Scenarios', icon: 'pi-folder-open' },
                        { id: 'conclusion', name: 'Conclusion', icon: 'pi-flag-fill' }
                    ]
                }
            ]
        },

        /**
         * Initialize the map
         */
        init: function() {
            console.log('Initializing TOC Map...');
            this.render();
            this.attachEvents();
            this.updateActiveState();

            // Listen for hash changes
            window.addEventListener('hashchange', () => this.updateActiveState());

            console.log('TOC Map ready');
        },

        /**
         * Render the map
         */
        render: function() {
            const container = document.getElementById(this.config.containerId);
            if (!container) return;

            const isCollapsed = this.getCollapsedState();
            const collapsedClass = isCollapsed ? ' collapsed' : '';

            const html = `
                <div class="toc-map${collapsedClass}">
                    <div class="map-header">
                        <div class="map-header-left">
                            <h3><i class="pi pi-map"></i> Navigation Map</h3>
                            <p class="map-subtitle">Click any node to explore</p>
                        </div>
                        <button class="map-collapse-btn" title="${isCollapsed ? 'Expand map' : 'Collapse map'}">
                            <i class="pi ${isCollapsed ? 'pi-chevron-down' : 'pi-chevron-up'}"></i>
                            <span>${isCollapsed ? 'Expand' : 'Collapse'}</span>
                        </button>
                    </div>
                    <div class="map-canvas">
                        ${this.renderZones()}
                    </div>
                    <div class="map-legend">
                        <span class="legend-item"><span class="legend-dot current"></span> Current</span>
                        <span class="legend-item"><span class="legend-dot visited"></span> Visited</span>
                        <span class="legend-item"><span class="legend-dot"></span> Unexplored</span>
                    </div>
                </div>
            `;

            container.innerHTML = html;
        },

        /**
         * Render all zones
         */
        renderZones: function() {
            return this.config.zones.map((zone, index) => `
                <div class="map-zone" data-zone="${zone.id}" style="--zone-color: ${zone.color}">
                    <div class="zone-header">
                        <i class="pi ${zone.icon}"></i>
                        <span>${zone.name}</span>
                    </div>
                    <div class="zone-nodes">
                        ${this.renderNodes(zone.sections)}
                    </div>
                    ${index < this.config.zones.length - 1 ? '<div class="zone-connector"><i class="pi pi-arrow-down"></i></div>' : ''}
                </div>
            `).join('');
        },

        /**
         * Render nodes for a zone
         */
        renderNodes: function(sections) {
            return sections.map(section => `
                <a href="#${section.id}" class="map-node" data-section="${section.id}" title="${section.name}">
                    <i class="pi ${section.icon}"></i>
                    <span class="node-label">${section.name}</span>
                </a>
            `).join('');
        },

        /**
         * Attach event listeners
         */
        attachEvents: function() {
            const container = document.getElementById(this.config.containerId);
            if (!container) return;

            // Collapse toggle handling
            container.addEventListener('click', (e) => {
                const collapseBtn = e.target.closest('.map-collapse-btn');
                if (collapseBtn) {
                    this.toggleCollapse();
                    return;
                }

                const node = e.target.closest('.map-node');
                if (node) {
                    const sectionId = node.dataset.section;
                    this.markVisited(sectionId);

                    // Load section if using SectionLoader
                    if (window.SectionLoader) {
                        window.SectionLoader.loadSection(sectionId);
                    }
                }
            });

            // Hover effects for zones
            container.querySelectorAll('.map-zone').forEach(zone => {
                zone.addEventListener('mouseenter', () => {
                    zone.classList.add('zone-hover');
                });
                zone.addEventListener('mouseleave', () => {
                    zone.classList.remove('zone-hover');
                });
            });
        },

        /**
         * Toggle collapse state
         */
        toggleCollapse: function() {
            const container = document.getElementById(this.config.containerId);
            if (!container) return;

            const map = container.querySelector('.toc-map');
            const btn = container.querySelector('.map-collapse-btn');
            const isCollapsed = map.classList.toggle('collapsed');

            // Update button
            if (btn) {
                const icon = btn.querySelector('i');
                const text = btn.querySelector('span');
                icon.className = `pi ${isCollapsed ? 'pi-chevron-down' : 'pi-chevron-up'}`;
                text.textContent = isCollapsed ? 'Expand' : 'Collapse';
                btn.title = isCollapsed ? 'Expand map' : 'Collapse map';
            }

            // Save state
            this.saveCollapsedState(isCollapsed);
        },

        /**
         * Get collapsed state from localStorage
         */
        getCollapsedState: function() {
            try {
                return localStorage.getItem('toc-map-collapsed') === 'true';
            } catch (e) {
                return false;
            }
        },

        /**
         * Save collapsed state to localStorage
         */
        saveCollapsedState: function(isCollapsed) {
            try {
                localStorage.setItem('toc-map-collapsed', isCollapsed ? 'true' : 'false');
            } catch (e) {
                console.warn('Could not save collapsed state');
            }
        },

        /**
         * Update active state based on current hash
         */
        updateActiveState: function() {
            const container = document.getElementById(this.config.containerId);
            if (!container) return;

            const currentHash = window.location.hash.substring(1) || 'overview';

            // Remove all active states
            container.querySelectorAll('.map-node').forEach(node => {
                node.classList.remove('active');
            });

            // Set current active
            const activeNode = container.querySelector(`[data-section="${currentHash}"]`);
            if (activeNode) {
                activeNode.classList.add('active');
                this.markVisited(currentHash);
            }
        },

        /**
         * Mark a section as visited
         */
        markVisited: function(sectionId) {
            const container = document.getElementById(this.config.containerId);
            if (!container) return;

            const node = container.querySelector(`[data-section="${sectionId}"]`);
            if (node) {
                node.classList.add('visited');
            }

            // Save to localStorage
            this.saveVisited(sectionId);
        },

        /**
         * Save visited sections to localStorage
         */
        saveVisited: function(sectionId) {
            try {
                const visited = this.getVisited();
                if (!visited.includes(sectionId)) {
                    visited.push(sectionId);
                    localStorage.setItem('toc-map-visited', JSON.stringify(visited));
                }
            } catch (e) {
                console.warn('Could not save visited state');
            }
        },

        /**
         * Get visited sections from localStorage
         */
        getVisited: function() {
            try {
                const stored = localStorage.getItem('toc-map-visited');
                return stored ? JSON.parse(stored) : [];
            } catch (e) {
                return [];
            }
        },

        /**
         * Restore visited state from localStorage
         */
        restoreVisited: function() {
            const container = document.getElementById(this.config.containerId);
            if (!container) return;

            const visited = this.getVisited();
            visited.forEach(sectionId => {
                const node = container.querySelector(`[data-section="${sectionId}"]`);
                if (node) {
                    node.classList.add('visited');
                }
            });
        },

        /**
         * Get progress percentage
         */
        getProgress: function() {
            const total = this.config.zones.reduce((sum, zone) => sum + zone.sections.length, 0);
            const visited = this.getVisited().length;
            return Math.round((visited / total) * 100);
        },

        /**
         * Reset visited state
         */
        reset: function() {
            localStorage.removeItem('toc-map-visited');
            const container = document.getElementById(this.config.containerId);
            if (container) {
                container.querySelectorAll('.map-node').forEach(node => {
                    node.classList.remove('visited', 'active');
                });
            }
        }
    };

    // Export to window
    window.TOCMap = TOCMap;

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            TOCMap.init();
            TOCMap.restoreVisited();
        });
    } else {
        TOCMap.init();
        TOCMap.restoreVisited();
    }

})();
