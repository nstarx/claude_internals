/**
 * Markdown Rendering System
 * Dynamically loads and renders .md files from the repository
 * Uses marked.js for parsing and highlight.js for syntax highlighting
 */

(function() {
    'use strict';

    const MarkdownRenderer = {
        // Configuration
        config: {
            baseUrl: '..',  // Relative to web/ directory
            cacheEnabled: true,
            cachePrefix: 'md-cache-',
            cacheVersion: '1.0',
            markedCDN: 'https://cdn.jsdelivr.net/npm/marked@11.0.0/marked.min.js',
            highlightCDN: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js',
            highlightCSS: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css',
            dompurifyCDN: 'https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js'
        },

        // State
        loaded: false,
        loading: false,
        cache: null,

        // Initialize the renderer
        init: async function() {
            if (this.loaded) return;
            if (this.loading) {
                // Wait for loading to complete
                return new Promise((resolve) => {
                    const checkLoaded = setInterval(() => {
                        if (this.loaded) {
                            clearInterval(checkLoaded);
                            resolve();
                        }
                    }, 100);
                });
            }

            this.loading = true;
            console.log('📚 Initializing Markdown Renderer...');

            try {
                // Load CSS first
                await this.loadHighlightCSS();

                // Load libraries in parallel
                await Promise.all([
                    this.loadScript(this.config.markedCDN, 'marked'),
                    this.loadScript(this.config.highlightCDN, 'hljs'),
                    this.loadScript(this.config.dompurifyCDN, 'DOMPurify')
                ]);

                // Configure marked
                this.configureMarked();

                // Initialize cache
                if (this.config.cacheEnabled) {
                    this.initCache();
                }

                this.loaded = true;
                this.loading = false;
                console.log('✓ Markdown Renderer ready');

                // Auto-render elements with data-md-source
                this.autoRender();
            } catch (error) {
                console.error('Failed to initialize Markdown Renderer:', error);
                this.loading = false;
            }
        },

        // Load external script
        loadScript: function(url, globalName) {
            return new Promise((resolve, reject) => {
                // Check if already loaded
                if (window[globalName]) {
                    console.log(`✓ ${globalName} already loaded`);
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = url;
                script.onload = () => {
                    console.log(`✓ ${globalName} loaded from CDN`);
                    resolve();
                };
                script.onerror = () => {
                    reject(new Error(`Failed to load ${globalName} from ${url}`));
                };
                document.head.appendChild(script);
            });
        },

        // Load highlight.js CSS
        loadHighlightCSS: function() {
            return new Promise((resolve) => {
                // Check if already loaded
                const existing = document.querySelector(`link[href*="highlight"]`);
                if (existing) {
                    resolve();
                    return;
                }

                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = this.config.highlightCSS;
                link.onload = () => {
                    console.log('✓ Highlight.js CSS loaded');
                    resolve();
                };
                link.onerror = () => {
                    console.warn('Failed to load Highlight.js CSS');
                    resolve(); // Don't fail on CSS
                };
                document.head.appendChild(link);
            });
        },

        // Configure marked options
        configureMarked: function() {
            if (!window.marked) return;

            marked.setOptions({
                highlight: function(code, lang) {
                    if (window.hljs && lang && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(code, { language: lang }).value;
                        } catch (err) {
                            console.warn('Highlight error:', err);
                        }
                    }
                    return code;
                },
                breaks: true,
                gfm: true,
                headerIds: true,
                mangle: false
            });

            console.log('✓ Marked.js configured');
        },

        // Initialize cache
        initCache: function() {
            try {
                this.cache = {
                    get: (key) => {
                        const item = localStorage.getItem(this.config.cachePrefix + key);
                        if (!item) return null;

                        const data = JSON.parse(item);
                        // Check version
                        if (data.version !== this.config.cacheVersion) {
                            this.cache.remove(key);
                            return null;
                        }
                        return data.content;
                    },
                    set: (key, content) => {
                        const data = {
                            version: this.config.cacheVersion,
                            content: content,
                            timestamp: Date.now()
                        };
                        try {
                            localStorage.setItem(this.config.cachePrefix + key, JSON.stringify(data));
                        } catch (e) {
                            // localStorage full, clear old items
                            this.cache.clear();
                        }
                    },
                    remove: (key) => {
                        localStorage.removeItem(this.config.cachePrefix + key);
                    },
                    clear: () => {
                        Object.keys(localStorage)
                            .filter(key => key.startsWith(this.config.cachePrefix))
                            .forEach(key => localStorage.removeItem(key));
                    }
                };
                console.log('✓ Cache initialized');
            } catch (e) {
                console.warn('Cache not available:', e);
                this.config.cacheEnabled = false;
            }
        },

        // Fetch markdown file
        fetchMarkdown: async function(path) {
            // Check cache first
            if (this.config.cacheEnabled && this.cache) {
                const cached = this.cache.get(path);
                if (cached) {
                    console.log(`📦 Cache hit: ${path}`);
                    return cached;
                }
            }

            // Fetch from network
            const url = `${this.config.baseUrl}/${path}`;
            console.log(`📥 Fetching: ${url}`);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const markdown = await response.text();

                // Cache it
                if (this.config.cacheEnabled && this.cache) {
                    this.cache.set(path, markdown);
                }

                return markdown;
            } catch (error) {
                console.error(`Failed to fetch ${path}:`, error);
                throw error;
            }
        },

        // Render markdown to HTML
        renderMarkdown: function(markdown) {
            if (!window.marked) {
                console.error('Marked.js not loaded');
                return '<p>Markdown renderer not available</p>';
            }

            try {
                const html = marked.parse(markdown);

                // Sanitize HTML if DOMPurify is available
                if (window.DOMPurify) {
                    return DOMPurify.sanitize(html, {
                        ADD_ATTR: ['target'],
                        ADD_TAGS: ['iframe']
                    });
                }

                return html;
            } catch (error) {
                console.error('Markdown rendering error:', error);
                return '<p>Error rendering markdown</p>';
            }
        },

        // Render markdown into container
        render: async function(container, markdownPath) {
            if (typeof container === 'string') {
                container = document.querySelector(container);
            }

            if (!container) {
                console.error('Container not found');
                return;
            }

            // Show loading state
            container.innerHTML = '<div class="md-loading">📄 Loading...</div>';
            container.classList.add('md-container', 'md-loading-state');

            try {
                // Ensure renderer is initialized
                await this.init();

                // Fetch markdown
                const markdown = await this.fetchMarkdown(markdownPath);

                // Render HTML
                const html = this.renderMarkdown(markdown);

                // Insert into container
                container.innerHTML = html;
                container.classList.remove('md-loading-state');
                container.classList.add('md-loaded');

                // Post-process
                this.postProcess(container);

                console.log(`✓ Rendered: ${markdownPath}`);
            } catch (error) {
                console.error(`Failed to render ${markdownPath}:`, error);
                container.innerHTML = `
                    <div class="md-error">
                        <p><strong>⚠️ Failed to load content</strong></p>
                        <p>Could not load: <code>${markdownPath}</code></p>
                        <p class="error-detail">${error.message}</p>
                    </div>
                `;
                container.classList.remove('md-loading-state');
                container.classList.add('md-error-state');
            }
        },

        // Post-process rendered HTML
        postProcess: function(container) {
            // Add target="_blank" to external links
            container.querySelectorAll('a[href^="http"]').forEach(link => {
                if (!link.href.includes(window.location.hostname)) {
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                }
            });

            // Add copy buttons to code blocks
            container.querySelectorAll('pre code').forEach(block => {
                this.addCopyButton(block);
            });

            // Process headings for auto-linking
            container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
                if (!heading.id) {
                    heading.id = this.generateId(heading.textContent);
                }
                this.makeHeadingLinkable(heading);
            });

            // Highlight current code blocks
            if (window.hljs) {
                container.querySelectorAll('pre code:not(.hljs)').forEach(block => {
                    hljs.highlightElement(block);
                });
            }
        },

        // Add copy button to code block
        addCopyButton: function(codeBlock) {
            const pre = codeBlock.parentElement;
            if (pre.querySelector('.copy-button')) return; // Already has button

            const button = document.createElement('button');
            button.className = 'copy-button';
            button.innerHTML = '<i class="pi pi-copy"></i>';
            button.title = 'Copy code';

            button.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeBlock.textContent);
                    button.innerHTML = '<i class="pi pi-check"></i>';
                    button.classList.add('copied');
                    setTimeout(() => {
                        button.innerHTML = '<i class="pi pi-copy"></i>';
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Copy failed:', err);
                }
            });

            pre.style.position = 'relative';
            pre.appendChild(button);
        },

        // Generate ID from text
        generateId: function(text) {
            return text
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
        },

        // Make heading linkable
        makeHeadingLinkable: function(heading) {
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.className = 'heading-anchor';
            link.innerHTML = '<i class="pi pi-link"></i>';
            heading.appendChild(link);
        },

        // Auto-render all elements with data-md-source
        autoRender: function() {
            document.querySelectorAll('[data-md-source]').forEach(element => {
                const path = element.getAttribute('data-md-source');
                if (path) {
                    this.render(element, path);
                }
            });
        },

        // Clear cache
        clearCache: function() {
            if (this.cache) {
                this.cache.clear();
                console.log('✓ Cache cleared');
            }
        }
    };

    // Export to window
    window.MarkdownRenderer = MarkdownRenderer;

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            MarkdownRenderer.init();
        });
    } else {
        MarkdownRenderer.init();
    }

})();
