/**
 * SuperClaude Framework - Markdown Loader
 * Dynamically loads and renders markdown files into HTML
 *
 * Requirements:
 * - Load MD files dynamically for GitHub Pages
 * - Support chunked documents (Complex_Scenarios_01.md, etc.)
 * - Render markdown to HTML with proper styling
 * - Handle navigation between chunks
 * - Loading states and error handling
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // CONFIGURATION
    // ═══════════════════════════════════════════════════════════════

    const config = {
        markdownBasePath: '../',
        cacheEnabled: true,
        cache: new Map(),
        renderer: null  // Will be set based on available library
    };

    // ═══════════════════════════════════════════════════════════════
    // MARKDOWN PARSING (Simple fallback if no library available)
    // ═══════════════════════════════════════════════════════════════

    const SimpleMarkdownParser = {
        parse: function(markdown) {
            let html = markdown;

            // Headers
            html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
            html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
            html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

            // Bold
            html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            html = html.replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>');

            // Italic
            html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
            html = html.replace(/\_(.*?)\_/g, '<em>$1</em>');

            // Code blocks
            html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

            // Inline code
            html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

            // Links
            html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');

            // Lists
            html = html.replace(/^\* (.*)$/gim, '<li>$1</li>');
            html = html.replace(/^\- (.*)$/gim, '<li>$1</li>');

            // Wrap lists
            html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

            // Paragraphs
            html = html.split('\n\n').map(para => {
                if (!para.match(/^<[h|u|o|p|l]/)) {
                    return '<p>' + para + '</p>';
                }
                return para;
            }).join('\n');

            return html;
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // MARKDOWN LOADER
    // ═══════════════════════════════════════════════════════════════

    const MarkdownLoader = {
        /**
         * Load and render markdown file
         * @param {string} filePath - Path to markdown file
         * @param {string|HTMLElement} container - Container to render into
         * @param {Object} options - Additional options
         */
        load: async function(filePath, container, options = {}) {
            const targetContainer = typeof container === 'string'
                ? document.querySelector(container)
                : container;

            if (!targetContainer) {
                console.error(`Container not found: ${container}`);
                return;
            }

            // Show loading state
            const loader = this.showLoading(targetContainer);

            try {
                // Check cache
                let content;
                if (config.cacheEnabled && config.cache.has(filePath)) {
                    content = config.cache.get(filePath);
                } else {
                    // Fetch markdown file
                    const fullPath = config.markdownBasePath + filePath;
                    const response = await fetch(fullPath);

                    if (!response.ok) {
                        throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
                    }

                    content = await response.text();

                    // Cache the content
                    if (config.cacheEnabled) {
                        config.cache.set(filePath, content);
                    }
                }

                // Parse markdown to HTML
                const html = this.parseMarkdown(content);

                // Remove loading state
                this.hideLoading(loader);

                // Render HTML
                targetContainer.innerHTML = html;

                // Post-process rendered content
                this.postProcess(targetContainer, options);

                console.log(`✓ Loaded markdown: ${filePath}`);

            } catch (error) {
                console.error('Error loading markdown:', error);
                this.hideLoading(loader);
                this.showError(targetContainer, error.message);
            }
        },

        /**
         * Load multiple markdown files in sequence (for chunked documents)
         * @param {Array} filePaths - Array of file paths
         * @param {string|HTMLElement} container - Container to render into
         */
        loadChunks: async function(filePaths, container) {
            const targetContainer = typeof container === 'string'
                ? document.querySelector(container)
                : container;

            if (!targetContainer) {
                console.error(`Container not found: ${container}`);
                return;
            }

            targetContainer.innerHTML = '';

            for (const filePath of filePaths) {
                const chunkDiv = document.createElement('div');
                chunkDiv.className = 'markdown-chunk';
                targetContainer.appendChild(chunkDiv);

                await this.load(filePath, chunkDiv);
            }
        },

        /**
         * Parse markdown to HTML
         */
        parseMarkdown: function(markdown) {
            // Check if marked.js is available (popular markdown library)
            if (typeof marked !== 'undefined') {
                return marked.parse(markdown);
            }

            // Check if showdown is available
            if (typeof showdown !== 'undefined') {
                const converter = new showdown.Converter();
                return converter.makeHtml(markdown);
            }

            // Fallback to simple parser
            console.warn('No markdown library found, using simple parser');
            return SimpleMarkdownParser.parse(markdown);
        },

        /**
         * Post-process rendered HTML
         */
        postProcess: function(container, options) {
            // Add IDs to headers for anchor links
            container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
                if (!heading.id) {
                    const id = heading.textContent
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '');
                    heading.id = id;
                }
            });

            // Add classes to tables
            container.querySelectorAll('table').forEach(table => {
                if (!table.parentElement.classList.contains('table-wrapper')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'table-wrapper';
                    table.parentNode.insertBefore(wrapper, table);
                    wrapper.appendChild(table);
                }
            });

            // Add classes to code blocks
            container.querySelectorAll('pre code').forEach(code => {
                // Try to detect language
                const classes = code.className.match(/language-(\w+)/);
                if (classes) {
                    code.parentElement.classList.add(`language-${classes[1]}`);
                }
            });

            // Process custom blocks (info boxes, warnings, etc.)
            this.processCustomBlocks(container);

            // If options include syntax highlighting, apply it
            if (options.highlightCode && typeof hljs !== 'undefined') {
                container.querySelectorAll('pre code').forEach(block => {
                    hljs.highlightElement(block);
                });
            }
        },

        /**
         * Process custom markdown blocks (alerts, info boxes, etc.)
         */
        processCustomBlocks: function(container) {
            // Convert blockquotes with special markers to styled boxes
            container.querySelectorAll('blockquote').forEach(blockquote => {
                const firstLine = blockquote.textContent.trim().split('\n')[0];

                if (firstLine.includes('[!NOTE]') || firstLine.includes('[!INFO]')) {
                    blockquote.className = 'info-box';
                    blockquote.innerHTML = blockquote.innerHTML.replace(/\[!NOTE\]|\[!INFO\]/g, '');
                } else if (firstLine.includes('[!WARNING]')) {
                    blockquote.className = 'warning-box';
                    blockquote.innerHTML = blockquote.innerHTML.replace(/\[!WARNING\]/g, '');
                } else if (firstLine.includes('[!DANGER]') || firstLine.includes('[!ERROR]')) {
                    blockquote.className = 'error-box';
                    blockquote.innerHTML = blockquote.innerHTML.replace(/\[!DANGER\]|\[!ERROR\]/g, '');
                } else if (firstLine.includes('[!SUCCESS]')) {
                    blockquote.className = 'success-box';
                    blockquote.innerHTML = blockquote.innerHTML.replace(/\[!SUCCESS\]/g, '');
                }
            });
        },

        /**
         * Show loading state
         */
        showLoading: function(container) {
            const loader = document.createElement('div');
            loader.className = 'skeleton skeleton-text';
            loader.style.minHeight = '200px';

            // Create multiple skeleton lines
            for (let i = 0; i < 5; i++) {
                const line = document.createElement('div');
                line.className = 'skeleton skeleton-text';
                line.style.marginBottom = '1rem';
                loader.appendChild(line);
            }

            container.appendChild(loader);
            return loader;
        },

        /**
         * Hide loading state
         */
        hideLoading: function(loader) {
            if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        },

        /**
         * Show error message
         */
        showError: function(container, message) {
            container.innerHTML = `
                <div class="error-box">
                    <strong>Error loading content</strong>
                    <p>${message}</p>
                    <button class="btn btn-primary" onclick="location.reload()">Retry</button>
                </div>
            `;
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // AUTO-LOAD MARKDOWN FROM DATA ATTRIBUTES
    // ═══════════════════════════════════════════════════════════════

    function autoLoadMarkdown() {
        document.querySelectorAll('[data-markdown]').forEach(async element => {
            const filePath = element.getAttribute('data-markdown');
            const cacheOption = element.getAttribute('data-markdown-cache') !== 'false';

            config.cacheEnabled = cacheOption;

            await MarkdownLoader.load(filePath, element);
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // CHUNK NAVIGATION HELPER
    // ═══════════════════════════════════════════════════════════════

    const ChunkNavigator = {
        /**
         * Create navigation for chunked documents
         * @param {Array} chunks - Array of {title, file} objects
         * @param {number} currentIndex - Current chunk index
         */
        createNavigation: function(chunks, currentIndex = 0) {
            const nav = document.createElement('nav');
            nav.className = 'chunk-nav';

            const header = document.createElement('div');
            header.className = 'chunk-nav-header';
            header.textContent = `📄 Document Parts (${currentIndex + 1}/${chunks.length})`;
            nav.appendChild(header);

            const links = document.createElement('div');
            links.className = 'chunk-nav-links';

            chunks.forEach((chunk, index) => {
                const link = document.createElement('a');
                link.href = chunk.file;
                link.textContent = `Part ${index + 1}: ${chunk.title}`;

                if (index === currentIndex) {
                    link.className = 'current';
                    link.setAttribute('aria-current', 'page');
                }

                links.appendChild(link);
            });

            nav.appendChild(links);
            return nav;
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // EXPOSE PUBLIC API
    // ═══════════════════════════════════════════════════════════════

    window.MarkdownLoader = MarkdownLoader;
    window.ChunkNavigator = ChunkNavigator;

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZE
    // ═══════════════════════════════════════════════════════════════

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                autoLoadMarkdown();
                console.log('✓ Markdown loader initialized');
            });
        } else {
            autoLoadMarkdown();
            console.log('✓ Markdown loader initialized');
        }
    }

    init();

})();
