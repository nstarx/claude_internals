/**
 * SVG Diagram Renderer
 * Creates real SVG flowcharts with connected nodes
 *
 * Usage:
 *   DiagramRenderer.render(container, {
 *     nodes: [...],
 *     connections: [...]
 *   });
 */

(function() {
    'use strict';

    const DiagramRenderer = {
        // Default configuration
        config: {
            nodeWidth: 140,
            nodeHeight: 50,
            nodeRadius: 8,
            decisionSize: 60,
            horizontalGap: 60,
            verticalGap: 40,
            arrowSize: 8,
            padding: 40,
            fontSize: 14,
            fontFamily: 'inherit'
        },

        /**
         * Render a diagram into a container
         * @param {HTMLElement|string} container - DOM element or selector
         * @param {Object} data - Diagram data with nodes and connections
         * @param {Object} options - Optional configuration overrides
         */
        render: function(container, data, options = {}) {
            const el = typeof container === 'string'
                ? document.querySelector(container)
                : container;

            if (!el) {
                console.error('DiagramRenderer: Container not found');
                return;
            }

            const config = { ...this.config, ...options };
            const { nodes, connections } = this.processData(data, config);
            const { width, height } = this.calculateDimensions(nodes, config);

            const svg = this.createSVG(width, height);

            // Render connections first (behind nodes)
            connections.forEach(conn => {
                this.renderConnection(svg, conn, nodes, config);
            });

            // Render nodes
            nodes.forEach(node => {
                this.renderNode(svg, node, config);
            });

            el.innerHTML = '';
            el.appendChild(svg);
        },

        /**
         * Process data and calculate node positions
         */
        processData: function(data, config) {
            const nodes = [];
            const nodeMap = new Map();

            // Create nodes with positions based on row/col
            data.nodes.forEach((nodeData, index) => {
                const node = {
                    id: nodeData.id || `node-${index}`,
                    label: nodeData.label || '',
                    type: nodeData.type || 'default', // default, primary, accent, decision
                    row: nodeData.row || 0,
                    col: nodeData.col || index,
                    sublabel: nodeData.sublabel || null
                };

                // Calculate position
                const cellWidth = config.nodeWidth + config.horizontalGap;
                const cellHeight = config.nodeHeight + config.verticalGap;

                node.x = config.padding + (node.col * cellWidth) + (config.nodeWidth / 2);
                node.y = config.padding + (node.row * cellHeight) + (config.nodeHeight / 2);

                nodes.push(node);
                nodeMap.set(node.id, node);
            });

            // Process connections
            const connections = (data.connections || []).map(conn => ({
                from: conn.from,
                to: conn.to,
                label: conn.label || null,
                active: conn.active || false
            }));

            return { nodes, connections, nodeMap };
        },

        /**
         * Calculate SVG dimensions
         */
        calculateDimensions: function(nodes, config) {
            let maxX = 0;
            let maxY = 0;

            nodes.forEach(node => {
                maxX = Math.max(maxX, node.x + config.nodeWidth / 2);
                maxY = Math.max(maxY, node.y + config.nodeHeight / 2);
            });

            return {
                width: maxX + config.padding,
                height: maxY + config.padding
            };
        },

        /**
         * Create SVG element
         */
        createSVG: function(width, height) {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', height);
            svg.classList.add('diagram-svg');

            // Add arrow marker definition
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

            // Default arrow
            defs.appendChild(this.createArrowMarker('arrow', 'var(--color-border, #e2e8f0)'));
            // Active arrow
            defs.appendChild(this.createArrowMarker('arrow-active', 'var(--color-secondary, #3b82f6)'));

            svg.appendChild(defs);
            return svg;
        },

        /**
         * Create arrow marker definition
         */
        createArrowMarker: function(id, color) {
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker.setAttribute('id', id);
            marker.setAttribute('viewBox', '0 0 10 10');
            marker.setAttribute('refX', '9');
            marker.setAttribute('refY', '5');
            marker.setAttribute('markerWidth', '6');
            marker.setAttribute('markerHeight', '6');
            marker.setAttribute('orient', 'auto-start-reverse');

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
            path.setAttribute('fill', color);

            marker.appendChild(path);
            return marker;
        },

        /**
         * Render a node
         */
        renderNode: function(svg, node, config) {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.classList.add('node-group');
            group.setAttribute('data-node-id', node.id);

            if (node.type === 'decision') {
                this.renderDecisionNode(group, node, config);
            } else {
                this.renderRectNode(group, node, config);
            }

            svg.appendChild(group);
        },

        /**
         * Render rectangular node
         */
        renderRectNode: function(group, node, config) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', node.x - config.nodeWidth / 2);
            rect.setAttribute('y', node.y - config.nodeHeight / 2);
            rect.setAttribute('width', config.nodeWidth);
            rect.setAttribute('height', config.nodeHeight);
            rect.setAttribute('rx', config.nodeRadius);
            rect.setAttribute('ry', config.nodeRadius);
            rect.classList.add('node');

            if (node.type === 'primary') {
                rect.classList.add('node--primary');
            } else if (node.type === 'accent') {
                rect.classList.add('node--accent');
            }

            group.appendChild(rect);

            // Main label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.sublabel ? node.y - 6 : node.y);
            text.classList.add('node-text');
            if (node.type === 'primary' || node.type === 'accent') {
                text.classList.add('node-text--light');
            }
            text.textContent = node.label;
            group.appendChild(text);

            // Sublabel
            if (node.sublabel) {
                const subtext = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                subtext.setAttribute('x', node.x);
                subtext.setAttribute('y', node.y + 12);
                subtext.classList.add('node-text', 'node-text--sub');
                subtext.textContent = node.sublabel;
                group.appendChild(subtext);
            }
        },

        /**
         * Render decision diamond node
         */
        renderDecisionNode: function(group, node, config) {
            const size = config.decisionSize;
            const points = [
                `${node.x},${node.y - size/2}`,
                `${node.x + size/2},${node.y}`,
                `${node.x},${node.y + size/2}`,
                `${node.x - size/2},${node.y}`
            ].join(' ');

            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', points);
            polygon.classList.add('decision');
            group.appendChild(polygon);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y);
            text.classList.add('node-text');
            text.textContent = node.label;
            group.appendChild(text);
        },

        /**
         * Render connection line between nodes
         */
        renderConnection: function(svg, conn, nodes, config) {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);

            if (!fromNode || !toNode) return;

            // Calculate connection points
            const points = this.calculateConnectionPoints(fromNode, toNode, config);

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', this.createPathD(points));
            path.classList.add('connector');

            if (conn.active) {
                path.classList.add('connector--active');
                path.setAttribute('marker-end', 'url(#arrow-active)');
            } else {
                path.setAttribute('marker-end', 'url(#arrow)');
            }

            svg.appendChild(path);

            // Add label if present
            if (conn.label) {
                const midX = (points.start.x + points.end.x) / 2;
                const midY = (points.start.y + points.end.y) / 2;

                const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                labelText.setAttribute('x', midX);
                labelText.setAttribute('y', midY - 8);
                labelText.classList.add('connector-label');
                labelText.textContent = conn.label;
                svg.appendChild(labelText);
            }
        },

        /**
         * Calculate connection points between two nodes
         */
        calculateConnectionPoints: function(from, to, config) {
            const hw = config.nodeWidth / 2;
            const hh = config.nodeHeight / 2;

            // Determine direction
            const dx = to.x - from.x;
            const dy = to.y - from.y;

            let start, end;

            if (Math.abs(dx) > Math.abs(dy)) {
                // Horizontal connection
                if (dx > 0) {
                    start = { x: from.x + hw, y: from.y };
                    end = { x: to.x - hw, y: to.y };
                } else {
                    start = { x: from.x - hw, y: from.y };
                    end = { x: to.x + hw, y: to.y };
                }
            } else {
                // Vertical connection
                if (dy > 0) {
                    start = { x: from.x, y: from.y + hh };
                    end = { x: to.x, y: to.y - hh };
                } else {
                    start = { x: from.x, y: from.y - hh };
                    end = { x: to.x, y: to.y + hh };
                }
            }

            return { start, end };
        },

        /**
         * Create SVG path d attribute
         */
        createPathD: function(points) {
            const { start, end } = points;

            // Create a smooth curve if not aligned
            if (start.x !== end.x && start.y !== end.y) {
                const midX = (start.x + end.x) / 2;
                return `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;
            }

            return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
        },

        /**
         * Render a simple horizontal flow diagram
         * Convenience method for common use case
         */
        renderFlow: function(container, steps, options = {}) {
            const nodes = steps.map((step, index) => ({
                id: `step-${index}`,
                label: step.label || step,
                type: step.type || (index === 0 ? 'primary' : index === steps.length - 1 ? 'accent' : 'default'),
                row: 0,
                col: index,
                sublabel: step.sublabel || null
            }));

            const connections = [];
            for (let i = 0; i < nodes.length - 1; i++) {
                connections.push({
                    from: nodes[i].id,
                    to: nodes[i + 1].id,
                    active: true
                });
            }

            this.render(container, { nodes, connections }, options);
        },

        /**
         * Render a vertical stack diagram
         */
        renderStack: function(container, items, options = {}) {
            const nodes = items.map((item, index) => ({
                id: `item-${index}`,
                label: item.label || item,
                type: item.type || 'default',
                row: index,
                col: 0,
                sublabel: item.sublabel || null
            }));

            const connections = [];
            for (let i = 0; i < nodes.length - 1; i++) {
                connections.push({
                    from: nodes[i].id,
                    to: nodes[i + 1].id,
                    active: true
                });
            }

            this.render(container, { nodes, connections }, {
                ...options,
                nodeWidth: options.nodeWidth || 200
            });
        },

        /**
         * Render a decision tree
         */
        renderDecision: function(container, data, options = {}) {
            // Data format:
            // {
            //   question: "...",
            //   yes: { label: "...", type: "..." },
            //   no: { label: "...", type: "..." }
            // }

            const nodes = [
                { id: 'decision', label: data.question, type: 'decision', row: 0, col: 1 },
                { id: 'yes', label: data.yes.label, type: data.yes.type || 'accent', row: 1, col: 0, sublabel: 'Yes' },
                { id: 'no', label: data.no.label, type: data.no.type || 'default', row: 1, col: 2, sublabel: 'No' }
            ];

            const connections = [
                { from: 'decision', to: 'yes', label: 'Yes', active: true },
                { from: 'decision', to: 'no', label: 'No' }
            ];

            this.render(container, { nodes, connections }, options);
        }
    };

    // Export to window
    window.DiagramRenderer = DiagramRenderer;

})();
