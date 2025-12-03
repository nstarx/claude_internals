/**
 * Floating Navigation Panel
 * Compact, user-friendly navigation similar to Reading Settings
 */

(function() {
    'use strict';

    const FloatingNav = {
        config: {
            storageKey: 'floating-nav',
            zones: [
                {
                    id: 'start',
                    name: 'Start',
                    icon: 'pi-flag',
                    color: '#10b981',
                    sections: [
                        { id: 'claude-code-methodology', name: 'Methodology' },
                        { id: 'overview', name: 'Overview' }
                    ]
                },
                {
                    id: 'foundation',
                    name: 'Foundation',
                    icon: 'pi-building',
                    color: '#3b82f6',
                    sections: [
                        { id: 'working-memory', name: 'Working Memory' },
                        { id: 'architecture', name: 'Architecture' },
                        { id: 'principles', name: 'Principles' }
                    ]
                },
                {
                    id: 'strategy',
                    name: 'Strategy',
                    icon: 'pi-chart-line',
                    color: '#8b5cf6',
                    sections: [
                        { id: 'patterns', name: 'Patterns' },
                        { id: 'tools', name: 'Tools' },
                        { id: 'metrics', name: 'Metrics' }
                    ]
                },
                {
                    id: 'interactive',
                    name: 'Interactive',
                    icon: 'pi-play',
                    color: '#f59e0b',
                    sections: [
                        { id: 'simulators', name: 'Simulations' },
                        { id: 'compact-command', name: '/compact' }
                    ]
                },
                {
                    id: 'warnings',
                    name: 'Pitfalls',
                    icon: 'pi-exclamation-triangle',
                    color: '#ef4444',
                    sections: [
                        { id: 'without-tools', name: 'Without Tools' },
                        { id: 'antipatterns', name: 'Antipatterns' },
                        { id: 'things-to-avoid', name: 'Avoid' },
                        { id: 'behavior-issues', name: 'Behavior' }
                    ]
                },
                {
                    id: 'advanced',
                    name: 'Deep Dive',
                    icon: 'pi-bolt',
                    color: '#06b6d4',
                    sections: [
                        { id: 'advanced-topics', name: 'How It Works' },
                        { id: 'self-assessment', name: 'Assessment' },
                        { id: 'advanced', name: 'Advanced' }
                    ]
                },
                {
                    id: 'application',
                    name: 'Apply',
                    icon: 'pi-check-circle',
                    color: '#84cc16',
                    sections: [
                        { id: 'integration', name: 'Integration' },
                        { id: 'workflows', name: 'Workflows' },
                        { id: 'complex-scenarios', name: 'Scenarios' },
                        { id: 'conclusion', name: 'Conclusion' }
                    ]
                }
            ]
        },

        init: function() {
            console.log('Initializing Floating Navigation...');
            this.loadVisited();
            this.render();
            this.attachEvents();
            this.updateActiveState();

            window.addEventListener('hashchange', () => this.updateActiveState());
            console.log('Floating Navigation ready');
        },

        render: function() {
            // Create the floating panel
            const panel = document.createElement('div');
            panel.id = 'floating-nav';
            panel.innerHTML = `
                <div class="fnav-panel">
                    <div class="fnav-header">
                        <span class="fnav-title">
                            <i class="pi pi-compass"></i>
                            Navigation
                        </span>
                        <div class="fnav-header-actions">
                            <span class="fnav-progress" title="Reading progress">
                                <span class="fnav-progress-text">0%</span>
                            </span>
                            <button class="fnav-close" title="Close">
                                <i class="pi pi-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="fnav-content">
                        ${this.renderZones()}
                    </div>
                    <div class="fnav-footer">
                        <button class="fnav-reset" title="Reset progress">
                            <i class="pi pi-refresh"></i> Reset
                        </button>
                    </div>
                </div>
                <button class="fnav-trigger" title="Open Navigation (Press N)">
                    <i class="pi pi-compass"></i>
                    <span class="fnav-trigger-badge">0/21</span>
                </button>
            `;
            document.body.appendChild(panel);
        },

        renderZones: function() {
            return this.config.zones.map(zone => `
                <div class="fnav-zone" data-zone="${zone.id}">
                    <div class="fnav-zone-header" style="--zone-color: ${zone.color}">
                        <i class="pi ${zone.icon}"></i>
                        <span>${zone.name}</span>
                        <span class="fnav-zone-count">0/${zone.sections.length}</span>
                    </div>
                    <div class="fnav-zone-items">
                        ${zone.sections.map(s => `
                            <a href="#${s.id}" class="fnav-item" data-section="${s.id}">
                                <span class="fnav-item-dot"></span>
                                <span class="fnav-item-name">${s.name}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        },

        attachEvents: function() {
            const panel = document.getElementById('floating-nav');
            const trigger = panel.querySelector('.fnav-trigger');
            const closeBtn = panel.querySelector('.fnav-close');
            const resetBtn = panel.querySelector('.fnav-reset');
            const navPanel = panel.querySelector('.fnav-panel');

            // Toggle panel
            trigger.addEventListener('click', () => {
                panel.classList.toggle('open');
            });

            closeBtn.addEventListener('click', () => {
                panel.classList.remove('open');
            });

            // Reset progress
            resetBtn.addEventListener('click', () => {
                this.resetProgress();
            });

            // Navigation clicks
            panel.querySelectorAll('.fnav-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const sectionId = item.dataset.section;
                    this.markVisited(sectionId);

                    // Load section
                    if (window.SectionLoader) {
                        window.SectionLoader.loadSection(sectionId);
                    }

                    // Close panel on mobile
                    if (window.innerWidth < 768) {
                        panel.classList.remove('open');
                    }
                });
            });

            // Keyboard shortcut (N key)
            document.addEventListener('keydown', (e) => {
                if (e.key === 'n' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    const activeEl = document.activeElement;
                    if (activeEl.tagName !== 'INPUT' && activeEl.tagName !== 'TEXTAREA') {
                        e.preventDefault();
                        panel.classList.toggle('open');
                    }
                }
                // Escape to close
                if (e.key === 'Escape' && panel.classList.contains('open')) {
                    panel.classList.remove('open');
                }
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (panel.classList.contains('open') &&
                    !e.target.closest('.fnav-panel') &&
                    !e.target.closest('.fnav-trigger')) {
                    panel.classList.remove('open');
                }
            });
        },

        updateActiveState: function() {
            const panel = document.getElementById('floating-nav');
            if (!panel) return;

            const currentHash = window.location.hash.substring(1) || 'overview';

            // Update active states
            panel.querySelectorAll('.fnav-item').forEach(item => {
                item.classList.remove('active');
            });

            const activeItem = panel.querySelector(`[data-section="${currentHash}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
                this.markVisited(currentHash);
            }

            this.updateProgress();
        },

        markVisited: function(sectionId) {
            const panel = document.getElementById('floating-nav');
            if (!panel) return;

            const item = panel.querySelector(`[data-section="${sectionId}"]`);
            if (item && !item.classList.contains('visited')) {
                item.classList.add('visited');
                this.saveVisited(sectionId);
                this.updateProgress();
            }
        },

        updateProgress: function() {
            const panel = document.getElementById('floating-nav');
            if (!panel) return;

            const visited = this.getVisited();
            const total = this.getTotalSections();
            const percent = Math.round((visited.length / total) * 100);

            // Update trigger badge
            panel.querySelector('.fnav-trigger-badge').textContent = `${visited.length}/${total}`;

            // Update progress text
            panel.querySelector('.fnav-progress-text').textContent = `${percent}%`;

            // Update zone counts
            this.config.zones.forEach(zone => {
                const zoneEl = panel.querySelector(`[data-zone="${zone.id}"]`);
                if (zoneEl) {
                    const zoneVisited = zone.sections.filter(s => visited.includes(s.id)).length;
                    zoneEl.querySelector('.fnav-zone-count').textContent = `${zoneVisited}/${zone.sections.length}`;

                    if (zoneVisited === zone.sections.length) {
                        zoneEl.classList.add('complete');
                    } else {
                        zoneEl.classList.remove('complete');
                    }
                }
            });
        },

        getTotalSections: function() {
            return this.config.zones.reduce((sum, z) => sum + z.sections.length, 0);
        },

        getVisited: function() {
            try {
                const stored = localStorage.getItem(this.config.storageKey + '-visited');
                return stored ? JSON.parse(stored) : [];
            } catch (e) {
                return [];
            }
        },

        saveVisited: function(sectionId) {
            try {
                const visited = this.getVisited();
                if (!visited.includes(sectionId)) {
                    visited.push(sectionId);
                    localStorage.setItem(this.config.storageKey + '-visited', JSON.stringify(visited));
                }
            } catch (e) {
                console.warn('Could not save visited state');
            }
        },

        loadVisited: function() {
            // Will be applied after render
            this.visited = this.getVisited();
        },

        restoreVisited: function() {
            const panel = document.getElementById('floating-nav');
            if (!panel) return;

            this.visited.forEach(sectionId => {
                const item = panel.querySelector(`[data-section="${sectionId}"]`);
                if (item) {
                    item.classList.add('visited');
                }
            });

            this.updateProgress();
        },

        resetProgress: function() {
            try {
                localStorage.removeItem(this.config.storageKey + '-visited');
            } catch (e) {}

            const panel = document.getElementById('floating-nav');
            if (panel) {
                panel.querySelectorAll('.fnav-item').forEach(item => {
                    item.classList.remove('visited');
                });
                panel.querySelectorAll('.fnav-zone').forEach(zone => {
                    zone.classList.remove('complete');
                });
            }

            this.visited = [];
            this.updateProgress();
        }
    };

    // Export
    window.FloatingNav = FloatingNav;

    // Auto-init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            FloatingNav.init();
            FloatingNav.restoreVisited();
        });
    } else {
        FloatingNav.init();
        FloatingNav.restoreVisited();
    }

})();
