/**
 * Artistic Effects & Micro-interactions
 * Particle systems, parallax, tilt effects, and animations
 */

(function() {
    'use strict';

    const ArtEffects = {
        initialized: false,

        // Initialize all effects
        init: function() {
            if (this.initialized) return;

            console.log('🎨 Initializing Artistic Effects...');

            // Initialize effects
            this.initParticles();
            this.initScrollAnimations();
            this.initTiltCards();
            this.initRippleEffects();
            this.initParallax();
            this.initTooltips();

            this.initialized = true;
            console.log('✓ Artistic Effects ready');
        },

        // ═══════════════════════════════════════════════════════════════
        // PARTICLE SYSTEM
        // ═══════════════════════════════════════════════════════════════

        initParticles: function() {
            const header = document.querySelector('header');
            if (!header) return;

            // Create canvas for particles
            const canvas = document.createElement('canvas');
            canvas.className = 'particles-canvas';
            canvas.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            `;
            header.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            let particles = [];
            let animationId;

            // Resize canvas
            const resizeCanvas = () => {
                canvas.width = header.offsetWidth;
                canvas.height = header.offsetHeight;
            };
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            // Particle class
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 3 + 1;
                    this.speedX = Math.random() * 0.5 - 0.25;
                    this.speedY = Math.random() * 0.5 - 0.25;
                    this.opacity = Math.random() * 0.5 + 0.2;
                }

                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    // Wrap around
                    if (this.x > canvas.width) this.x = 0;
                    if (this.x < 0) this.x = canvas.width;
                    if (this.y > canvas.height) this.y = 0;
                    if (this.y < 0) this.y = canvas.height;
                }

                draw() {
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Create particles
            const createParticles = () => {
                const particleCount = Math.floor(canvas.width / 20);
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            };
            createParticles();
            window.addEventListener('resize', createParticles);

            // Animation loop
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });

                // Connect particles
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }

                animationId = requestAnimationFrame(animate);
            };
            animate();

            // Pause when not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    cancelAnimationFrame(animationId);
                } else {
                    animate();
                }
            });
        },

        // ═══════════════════════════════════════════════════════════════
        // SCROLL ANIMATIONS (Fade-in on scroll)
        // ═══════════════════════════════════════════════════════════════

        initScrollAnimations: function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements
            document.querySelectorAll('section').forEach(section => {
                section.classList.add('fade-in-up');
                observer.observe(section);
            });

            document.querySelectorAll('.card, .info-box, .highlight').forEach(el => {
                el.classList.add('fade-in-up');
                observer.observe(el);
            });
        },

        // ═══════════════════════════════════════════════════════════════
        // TILT CARDS (DISABLED)
        // ═══════════════════════════════════════════════════════════════

        initTiltCards: function() {
            // Tilt animation removed per user request
            return;
        },

        // ═══════════════════════════════════════════════════════════════
        // RIPPLE EFFECTS (Click animations)
        // ═══════════════════════════════════════════════════════════════

        initRippleEffects: function() {
            document.querySelectorAll('.btn, button').forEach(button => {
                button.classList.add('ripple');
            });
        },

        // ═══════════════════════════════════════════════════════════════
        // PARALLAX SCROLLING
        // ═══════════════════════════════════════════════════════════════

        initParallax: function() {
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            if (parallaxElements.length === 0) return;

            let ticking = false;

            const updateParallax = () => {
                const scrolled = window.pageYOffset;

                parallaxElements.forEach(el => {
                    const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                    const yPos = -(scrolled * speed);
                    el.style.transform = `translateY(${yPos}px)`;
                });

                ticking = false;
            };

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            });
        },

        // ═══════════════════════════════════════════════════════════════
        // ENHANCED TOOLTIPS
        // ═══════════════════════════════════════════════════════════════

        initTooltips: function() {
            document.querySelectorAll('[data-tooltip]').forEach(el => {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = el.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-size: 0.85rem;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.2s;
                    z-index: 10000;
                    white-space: nowrap;
                `;
                document.body.appendChild(tooltip);

                el.addEventListener('mouseenter', (e) => {
                    const rect = el.getBoundingClientRect();
                    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
                    tooltip.style.opacity = '1';
                });

                el.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                });

                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
                });
            });
        },

        // ═══════════════════════════════════════════════════════════════
        // TOAST NOTIFICATIONS
        // ═══════════════════════════════════════════════════════════════

        showToast: function(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;

            const icon = {
                success: '<i class="pi pi-check-circle"></i>',
                error: '<i class="pi pi-times-circle"></i>',
                warning: '<i class="pi pi-exclamation-triangle"></i>',
                info: '<i class="pi pi-info-circle"></i>'
            }[type] || '';

            toast.innerHTML = `
                ${icon}
                <span>${message}</span>
            `;

            document.body.appendChild(toast);

            // Auto-remove
            setTimeout(() => {
                toast.classList.add('toast-out');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);

            return toast;
        },

        // ═══════════════════════════════════════════════════════════════
        // SMOOTH SCROLL TO ANCHOR
        // ═══════════════════════════════════════════════════════════════

        initSmoothScroll: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;

                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });

                        // Update URL without jumping
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                    }
                });
            });
        },

        // ═══════════════════════════════════════════════════════════════
        // LOADING SKELETON
        // ═══════════════════════════════════════════════════════════════

        createSkeleton: function(type = 'text') {
            const skeleton = document.createElement('div');
            skeleton.className = `skeleton skeleton-${type}`;
            return skeleton;
        },

        // ═══════════════════════════════════════════════════════════════
        // LAZY LOAD IMAGES
        // ═══════════════════════════════════════════════════════════════

        initLazyLoad: function() {
            const images = document.querySelectorAll('img[data-src]');
            if (images.length === 0) return;

            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);

                        img.addEventListener('load', () => {
                            img.classList.add('loaded');
                        });
                    }
                });
            });

            images.forEach(img => {
                img.classList.add('lazy-image');
                imageObserver.observe(img);
            });
        },

        // ═══════════════════════════════════════════════════════════════
        // CONFETTI EFFECT
        // ═══════════════════════════════════════════════════════════════

        confetti: function() {
            const colors = ['#667eea', '#764ba2', '#f093fb', '#fee440'];
            const confettiCount = 100;

            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    opacity: ${Math.random()};
                    transform: rotate(${Math.random() * 360}deg);
                    pointer-events: none;
                    z-index: 9999;
                    animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
                `;

                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 5000);
            }

            // Add animation
            if (!document.querySelector('#confetti-style')) {
                const style = document.createElement('style');
                style.id = 'confetti-style';
                style.textContent = `
                    @keyframes confetti-fall {
                        to {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    };

    // Export to window
    window.ArtEffects = ArtEffects;

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            ArtEffects.init();
            ArtEffects.initSmoothScroll();
            ArtEffects.initLazyLoad();
        });
    } else {
        ArtEffects.init();
        ArtEffects.initSmoothScroll();
        ArtEffects.initLazyLoad();
    }

})();
