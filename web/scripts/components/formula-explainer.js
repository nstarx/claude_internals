/**
 * Formula Explainer Component
 * Interactive formula display with examples and calculations
 */

(function() {
    'use strict';

    const FormulaExplainer = {
        formulas: null,
        claims: null,
        loaded: false,

        // Initialize the component
        init: async function() {
            if (this.loaded) return;

            console.log('📐 Initializing Formula Explainer...');

            try {
                // Load formulas.json
                const response = await fetch('./data/formulas.json');
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                this.formulas = data.formulas || [];
                this.claims = data.claims || [];
                this.metadata = data.metadata || {};

                this.loaded = true;
                console.log(`✓ Loaded ${this.formulas.length} formulas and ${this.claims.length} claims`);
            } catch (error) {
                console.error('Failed to load formulas:', error);
            }
        },

        // Render all formulas
        renderAll: async function(containerId) {
            await this.init();

            const container = document.getElementById(containerId);
            if (!container) {
                console.error('Container not found:', containerId);
                return;
            }

            if (!this.formulas || this.formulas.length === 0) {
                container.innerHTML = '<p>No formulas available</p>';
                return;
            }

            // Group by category
            const categories = {};
            this.formulas.forEach(formula => {
                const cat = formula.category || 'Other';
                if (!categories[cat]) categories[cat] = [];
                categories[cat].push(formula);
            });

            // Render by category
            let html = '';
            Object.keys(categories).sort().forEach(category => {
                html += `
                    <div class="formula-category">
                        <h2 class="category-title">
                            <i class="pi pi-calculator"></i>
                            ${category}
                        </h2>
                        <div class="formulas-grid">
                            ${categories[category].map(f => this.renderFormulaCard(f)).join('')}
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;

            // Attach event listeners
            this.attachListeners(container);
        },

        // Render single formula card
        renderFormulaCard: function(formula) {
            return `
                <div class="formula-card" data-formula-id="${formula.id}">
                    <div class="formula-header">
                        <h3>${formula.name}</h3>
                        <span class="formula-category-badge">${formula.category}</span>
                    </div>

                    <div class="formula-display">
                        <code class="formula-code">${this.escapeHtml(formula.formula)}</code>
                    </div>

                    <button class="expand-button" data-formula-id="${formula.id}">
                        <i class="pi pi-chevron-down"></i>
                        Show Details
                    </button>

                    <div class="formula-details" id="details-${formula.id}" style="display: none;">
                        ${this.renderFormulaDetails(formula)}
                    </div>
                </div>
            `;
        },

        // Render formula details
        renderFormulaDetails: function(formula) {
            return `
                <div class="formula-content">
                    <!-- Variables -->
                    <div class="variables-section">
                        <h4><i class="pi pi-bookmark"></i> Variables</h4>
                        <div class="variables-list">
                            ${Object.keys(formula.variables).map(key => {
                                const v = formula.variables[key];
                                return `
                                    <div class="variable-item">
                                        <div class="variable-name">
                                            <code>${key}</code>
                                        </div>
                                        <div class="variable-details">
                                            <strong>${v.name}</strong>
                                            <p>${v.description}</p>
                                            <div class="variable-meta">
                                                <span class="meta-item">
                                                    <i class="pi pi-chart-line"></i>
                                                    Range: ${v.typical_range}
                                                </span>
                                                <span class="meta-item">
                                                    <i class="pi pi-tag"></i>
                                                    Unit: ${v.unit}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Examples -->
                    <div class="examples-section">
                        <h4><i class="pi pi-lightbulb"></i> Examples</h4>
                        ${formula.examples.map((ex, idx) => `
                            <div class="example-card">
                                <div class="example-header">
                                    <strong>Example ${idx + 1}:</strong> ${ex.description}
                                </div>
                                <div class="example-calculation">
                                    <div class="calc-inputs">
                                        <strong>Input:</strong>
                                        ${Object.keys(ex.input).map(key => `
                                            <div class="calc-input-item">
                                                <code>${key}</code> = <strong>${ex.input[key].toLocaleString()}</strong>
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div class="calc-arrow">
                                        <i class="pi pi-arrow-right"></i>
                                    </div>
                                    <div class="calc-output">
                                        <strong>Output:</strong>
                                        <div class="output-value">${ex.output.toLocaleString()}</div>
                                    </div>
                                </div>
                                <div class="example-explanation">
                                    <i class="pi pi-info-circle"></i>
                                    ${ex.explanation}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Interactive Calculator -->
                    <div class="calculator-section">
                        <h4><i class="pi pi-calculator"></i> Try It Yourself</h4>
                        <div class="interactive-calculator" id="calc-${formula.id}">
                            ${this.renderCalculator(formula)}
                        </div>
                    </div>

                    <!-- Sources & Verification -->
                    <div class="sources-section">
                        <h4><i class="pi pi-book"></i> Sources & Verification</h4>
                        <div class="sources-grid">
                            <div class="source-item">
                                <strong>Verification Status:</strong>
                                <span class="badge badge-success">${formula.verification_date || 'N/A'}</span>
                            </div>
                            <div class="source-item">
                                <strong>Sources:</strong>
                                <ul class="sources-list">
                                    ${formula.sources.map(s => `<li>${s}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        ${formula.notes ? `
                            <div class="formula-notes">
                                <i class="pi pi-comment"></i>
                                <strong>Notes:</strong> ${formula.notes}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        // Render interactive calculator
        renderCalculator: function(formula) {
            const variables = Object.keys(formula.variables);
            const firstExample = formula.examples[0] || {};

            return `
                <div class="calc-inputs-container">
                    ${variables.map(key => {
                        const v = formula.variables[key];
                        const defaultValue = firstExample.input ? firstExample.input[key] : '';
                        return `
                            <div class="calc-input-group">
                                <label for="calc-${formula.id}-${key}">
                                    <code>${key}</code>
                                    <span class="label-unit">(${v.unit})</span>
                                </label>
                                <input
                                    type="number"
                                    id="calc-${formula.id}-${key}"
                                    class="calc-input"
                                    data-var="${key}"
                                    value="${defaultValue}"
                                    placeholder="${v.typical_range}"
                                    step="any"
                                >
                            </div>
                        `;
                    }).join('')}
                </div>
                <button class="btn btn-primary calculate-btn" data-formula-id="${formula.id}">
                    <i class="pi pi-play"></i>
                    Calculate
                </button>
                <div class="calc-result" id="result-${formula.id}">
                    <div class="result-label">Result:</div>
                    <div class="result-value">--</div>
                </div>
            `;
        },

        // Attach event listeners
        attachListeners: function(container) {
            // Expand/collapse buttons
            container.querySelectorAll('.expand-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const formulaId = button.getAttribute('data-formula-id');
                    const details = document.getElementById(`details-${formulaId}`);
                    const icon = button.querySelector('i');

                    if (details.style.display === 'none') {
                        details.style.display = 'block';
                        icon.className = 'pi pi-chevron-up';
                        button.innerHTML = '<i class="pi pi-chevron-up"></i> Hide Details';
                    } else {
                        details.style.display = 'none';
                        icon.className = 'pi pi-chevron-down';
                        button.innerHTML = '<i class="pi pi-chevron-down"></i> Show Details';
                    }
                });
            });

            // Calculate buttons
            container.querySelectorAll('.calculate-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const formulaId = button.getAttribute('data-formula-id');
                    this.calculate(formulaId);
                });
            });

            // Auto-calculate on input change
            container.querySelectorAll('.calc-input').forEach(input => {
                input.addEventListener('input', () => {
                    const formulaId = input.closest('.interactive-calculator').id.replace('calc-', '');
                    this.calculate(formulaId);
                });
            });
        },

        // Calculate formula result
        calculate: function(formulaId) {
            const formula = this.formulas.find(f => f.id === formulaId);
            if (!formula) return;

            // Get input values
            const inputs = {};
            let hasAllInputs = true;

            Object.keys(formula.variables).forEach(key => {
                const input = document.getElementById(`calc-${formulaId}-${key}`);
                if (input) {
                    const value = parseFloat(input.value);
                    if (isNaN(value)) {
                        hasAllInputs = false;
                    } else {
                        inputs[key] = value;
                    }
                }
            });

            if (!hasAllInputs) {
                this.updateResult(formulaId, 'Please enter all values', true);
                return;
            }

            // Calculate based on formula
            let result = this.evaluateFormula(formula, inputs);

            if (result !== null) {
                this.updateResult(formulaId, result.toLocaleString());
            } else {
                this.updateResult(formulaId, 'Calculation error', true);
            }
        },

        // Evaluate formula with inputs
        evaluateFormula: function(formula, inputs) {
            try {
                // Map formula IDs to calculation functions
                switch (formula.id) {
                    case 'token_calculation':
                        return inputs.LOC * inputs.tokens_per_line;

                    case 'context_window_usage':
                        return inputs.conversation + inputs.files + inputs.tool_outputs;

                    case 'effective_cognitive_capacity':
                        return inputs.total_capacity * (1 - inputs.irrelevant_percentage / 100);

                    case 'context_decay':
                        return inputs.initial_context * Math.exp(-inputs.decay_rate * inputs.time);

                    case 'half_life':
                        return Math.log(2) / inputs.decay_rate;

                    case 'memory_efficiency':
                        return (inputs.persisted_context / inputs.rediscovery_time) * 100;

                    case 'relevance_ratio':
                        return (inputs.relevant_context / inputs.total_context) * 100;

                    case 'token_budget':
                        return inputs.limit - (inputs.conversation + inputs.code + inputs.tools + inputs.overhead);

                    case 'multitasking_penalty':
                        return (inputs.concurrent_tasks - 1) * inputs.task_switching_cost;

                    case 'session_startup_time':
                        return inputs.base_time +
                               (inputs.complexity * inputs.discovery_factor) -
                               (inputs.memory_quality * inputs.speedup / 100);

                    default:
                        return null;
                }
            } catch (error) {
                console.error('Calculation error:', error);
                return null;
            }
        },

        // Update result display
        updateResult: function(formulaId, value, isError = false) {
            const resultDiv = document.getElementById(`result-${formulaId}`);
            if (!resultDiv) return;

            const valueEl = resultDiv.querySelector('.result-value');
            if (valueEl) {
                valueEl.textContent = value;
                valueEl.className = isError ? 'result-value error' : 'result-value';
            }
        },

        // Render all claims
        renderClaims: async function(containerId) {
            await this.init();

            const container = document.getElementById(containerId);
            if (!container) return;

            if (!this.claims || this.claims.length === 0) {
                container.innerHTML = '<p>No claims available</p>';
                return;
            }

            let html = `
                <div class="claims-container">
                    <h2><i class="pi pi-check-circle"></i> Verified Claims</h2>
                    <div class="claims-grid">
                        ${this.claims.map(c => this.renderClaimCard(c)).join('')}
                    </div>
                </div>
            `;

            container.innerHTML = html;
        },

        // Render claim card
        renderClaimCard: function(claim) {
            const statusClass = {
                'verified': 'success',
                'empirical': 'info',
                'calculated': 'warning',
                'research_backed': 'info',
                'best_practice': 'info'
            }[claim.verification_status] || 'secondary';

            return `
                <div class="claim-card">
                    <div class="claim-header">
                        <span class="badge badge-${statusClass}">
                            ${claim.verification_status.replace('_', ' ')}
                        </span>
                    </div>
                    <div class="claim-text">
                        "${claim.claim}"
                    </div>
                    <div class="claim-value">
                        <strong>${claim.value}</strong> ${claim.unit}
                    </div>
                    <div class="claim-sources">
                        <strong>Sources:</strong>
                        <ul>
                            ${claim.sources.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                    ${claim.notes ? `
                        <div class="claim-notes">
                            <i class="pi pi-info-circle"></i>
                            ${claim.notes}
                        </div>
                    ` : ''}
                </div>
            `;
        },

        // Utility: Escape HTML
        escapeHtml: function(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    };

    // Export to window
    window.FormulaExplainer = FormulaExplainer;

})();
