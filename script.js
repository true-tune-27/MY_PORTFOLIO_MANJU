/* ═══════════════════════════════════════════════
   MANJU MUKESH DANNINA — PORTFOLIO SCRIPT
   Dark futuristic aesthetic with zero-G elements
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initGeometricGrid();
    initCustomCursor();
    initNavbar();
    initMobileMenu();
    initNavIndicator();
    initScrollReveal();
    initScrollProgress();
    initCountUp();
    initTypewriter();
    initPhotoTilt();
    initContactForm();
    initSmoothScroll();
    initMagneticButtons();
    initBackToTop();
    initCardSpotlight();
    initRippleEffect();
});

/* ═══════════════════════════════════════════════
   PAGE LOADER
   ═══════════════════════════════════════════════ */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const hide = () => {
        loader.classList.add('loaded');
        setTimeout(() => loader.remove(), 700);
    };

    window.addEventListener('load', () => setTimeout(hide, 800));
    setTimeout(() => { if (loader.parentNode) hide(); }, 4000);
}

/* ═══════════════════════════════════════════════
   GEOMETRIC GRID CANVAS — Subtle grid + particles
   ═══════════════════════════════════════════════ */
function initGeometricGrid() {
    const canvas = document.getElementById('geo-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 30 : 60;
    const CONNECT_DIST = isMobile ? 100 : 160;
    const MOUSE_RADIUS = 200;

    class Particle {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.15;
            this.vy = (Math.random() - 0.5) * 0.15;
            this.r = Math.random() * 1.5 + 0.5;
            this.alpha = Math.random() * 0.4 + 0.1;
            this.hue = [185, 260, 45][Math.floor(Math.random() * 3)]; // cyan, violet, gold
            this.pulseSpeed = Math.random() * 0.02 + 0.005;
            this.pulseOffset = Math.random() * Math.PI * 2;
        }

        update(t) {
            // Mouse repulsion
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < MOUSE_RADIUS && d > 0) {
                const f = (MOUSE_RADIUS - d) / MOUSE_RADIUS;
                this.vx += (dx / d) * f * 0.15;
                this.vy += (dy / d) * f * 0.15;
            }

            this.vx *= 0.985;
            this.vy *= 0.985;

            const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (spd < 0.05) {
                this.vx += (Math.random() - 0.5) * 0.03;
                this.vy += (Math.random() - 0.5) * 0.03;
            }

            this.x += this.vx;
            this.y += this.vy;

            if (this.x < -30) this.x = W + 30;
            if (this.x > W + 30) this.x = -30;
            if (this.y < -30) this.y = H + 30;
            if (this.y > H + 30) this.y = -30;

            this.alpha = 0.15 + Math.sin(t * this.pulseSpeed + this.pulseOffset) * 0.1 + 0.1;
        }

        draw() {
            // Core
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.alpha})`;
            ctx.fill();

            // Glow halo
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.alpha * 0.08})`;
            ctx.fill();
        }
    }

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    }

    let t = 0;
    function draw() {
        t++;
        ctx.clearRect(0, 0, W, H);

        // Deep space background
        ctx.fillStyle = '#030711';
        ctx.fillRect(0, 0, W, H);

        // Subtle radial glow
        const grd = ctx.createRadialGradient(W * 0.4, H * 0.35, 0, W * 0.4, H * 0.35, Math.max(W, H) * 0.6);
        grd.addColorStop(0, 'rgba(0, 240, 255, 0.03)');
        grd.addColorStop(0.3, 'rgba(139, 92, 246, 0.02)');
        grd.addColorStop(0.6, 'rgba(251, 191, 36, 0.01)');
        grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < CONNECT_DIST) {
                    const alpha = (1 - d / CONNECT_DIST) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `hsla(185, 70%, 55%, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        for (const p of particles) {
            p.update(t);
            p.draw();
        }

        requestAnimationFrame(draw);
    }

    document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
    window.addEventListener('resize', resize);

    resize();
    requestAnimationFrame(draw);
}

/* ═══════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════ */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');
    if (!cursor || !trail) return;

    // Disable on touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        trail.style.display = 'none';
        return;
    }

    let mx = 0, my = 0, tx = 0, ty = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });

    (function animTrail() {
        tx += (mx - tx) * 0.12;
        ty += (my - ty) * 0.12;
        trail.style.left = tx + 'px';
        trail.style.top = ty + 'px';
        requestAnimationFrame(animTrail);
    })();

    // Hover effects via delegation
    const hoverSelectors = 'a, button, .project, .service, .skill-pill, .concept-pill, .cert, .achievement, .journey__card, .social-link, .contact__card, input, textarea';

    document.addEventListener('mouseover', e => {
        if (e.target.closest(hoverSelectors)) {
            cursor.classList.add('hover');
            trail.classList.add('hover');
        }
    });

    document.addEventListener('mouseout', e => {
        if (e.target.closest(hoverSelectors)) {
            cursor.classList.remove('hover');
            trail.classList.remove('hover');
        }
    });
}

/* ═══════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════ */
function initNavbar() {
    const nav = document.getElementById('nav');
    const links = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveLink();
    });

    function updateActiveLink() {
        const sections = document.querySelectorAll('.section, .hero');
        let current = 'hero';

        sections.forEach(sec => {
            const top = sec.offsetTop - 140;
            if (window.scrollY >= top) {
                current = sec.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.toggle('active', link.dataset.section === current);
        });

        moveIndicator();
    }
}

/* ═══════════════════════════════════════════════
   NAV INDICATOR
   ═══════════════════════════════════════════════ */
function initNavIndicator() {
    moveIndicator();
    window.addEventListener('resize', moveIndicator);
}

function moveIndicator() {
    const indicator = document.getElementById('nav-indicator');
    const activeLink = document.querySelector('.nav__link.active');
    if (!indicator || !activeLink) return;

    const container = activeLink.parentElement;
    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    indicator.style.width = linkRect.width + 'px';
    indicator.style.left = (linkRect.left - containerRect.left) + 'px';
}

/* ═══════════════════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════════════════ */
function initMobileMenu() {
    const burger = document.getElementById('nav-burger');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-menu__link');

    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        menu.classList.toggle('open');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            menu.classList.remove('open');
        });
    });
}

/* ═══════════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
   ═══════════════════════════════════════════════ */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Stagger siblings
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.children).filter(el => el.classList.contains('reveal')) : [];
                const idx = siblings.indexOf(entry.target);
                const delay = idx >= 0 ? idx * 100 : 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════════ */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const s = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (s / h) * 100 : 0) + '%';
    });
}

/* ═══════════════════════════════════════════════
   COUNT UP ANIMATION
   ═══════════════════════════════════════════════ */
function initCountUp() {
    const nums = document.querySelectorAll('.hero__stat-num');
    let done = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !done) {
                done = true;
                nums.forEach(num => {
                    const isDecimal = num.dataset.decimal === 'true';
                    const target = parseFloat(num.dataset.target);
                    const dur = 2000;
                    const start = performance.now();

                    function tick(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / dur, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = eased * target;

                        num.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);

                        if (progress < 1) {
                            requestAnimationFrame(tick);
                        } else {
                            num.textContent = isDecimal ? target.toFixed(2) : target;
                        }
                    }

                    requestAnimationFrame(tick);
                });
            }
        });
    }, { threshold: 0.5 });

    const container = document.querySelector('.hero__stats');
    if (container) observer.observe(container);
}

/* ═══════════════════════════════════════════════
   TYPEWRITER
   ═══════════════════════════════════════════════ */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const words = [
        'Full-Stack Web Apps.',
        'AI-Powered Platforms.',
        'Scalable REST APIs.',
        'Beautiful User Interfaces.',
        'Production-Ready Software.'
    ];
    let wi = 0, ci = 0, deleting = false;

    function tick() {
        const word = words[wi];
        el.textContent = word.substring(0, deleting ? --ci : ++ci);

        let delay = deleting ? 30 : 65;
        if (!deleting && ci === word.length) {
            delay = 2000;
            deleting = true;
        } else if (deleting && ci === 0) {
            delay = 500;
            deleting = false;
            wi = (wi + 1) % words.length;
        }

        setTimeout(tick, delay);
    }

    setTimeout(tick, 1500);
}

/* ═══════════════════════════════════════════════
   PHOTO 3D TILT
   ═══════════════════════════════════════════════ */
function initPhotoTilt() {
    const wrap = document.querySelector('.hero__photo-wrapper');
    if (!wrap || !window.matchMedia('(hover: hover)').matches) return;

    wrap.addEventListener('mousemove', e => {
        const r = wrap.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        wrap.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale3d(1.04, 1.04, 1.04)`;
    });

    wrap.addEventListener('mouseleave', () => {
        wrap.style.transition = 'transform 0.5s ease';
        wrap.style.transform = '';
        setTimeout(() => { wrap.style.transition = ''; }, 500);
    });

    wrap.addEventListener('mouseenter', () => {
        wrap.style.transition = 'none';
    });
}

/* ═══════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('btn-send');
    if (!form || !btn) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const orig = btn.innerHTML;
        btn.innerHTML = `<span>Sending...</span><div style="width:18px;height:18px;border:2px solid rgba(0,240,255,0.3);border-top-color:var(--accent-cyan);border-radius:50%;animation:spin 0.5s linear infinite;"></div>`;
        btn.disabled = true;

        const formData = new FormData(form);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                btn.innerHTML = `<span>Sent! ✓</span>`;
                btn.style.background = 'linear-gradient(135deg, #34d399, #10b981)';
                form.reset();
            } else {
                btn.innerHTML = `<span>Error! ❌</span>`;
                btn.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
            }
        } catch (error) {
            btn.innerHTML = `<span>Error! ❌</span>`;
            btn.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
        }

        setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
}

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL
   ═══════════════════════════════════════════════ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ═══════════════════════════════════════════════
   MAGNETIC BUTTONS
   ═══════════════════════════════════════════════ */
function initMagneticButtons() {
    if (!window.matchMedia('(hover: hover)').matches) return;

    document.querySelectorAll('.btn, .social-link, .project__link').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            const strength = btn.classList.contains('btn') ? 0.2 : 0.3;
            btn.style.translate = `${x * strength}px ${y * strength}px`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.translate = '';
        });
    });
}

/* ═══════════════════════════════════════════════
   BACK TO TOP
   ═══════════════════════════════════════════════ */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ═══════════════════════════════════════════════
   CARD SPOTLIGHT (Follow cursor glow)
   ═══════════════════════════════════════════════ */
function initCardSpotlight() {
    const cards = document.querySelectorAll('.project, .service, .journey__card, .cert, .achievement, .contact__card');

    cards.forEach(card => {
        const spotlight = document.createElement('div');
        spotlight.classList.add('card-spotlight');
        card.style.position = 'relative';
        card.appendChild(spotlight);

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spotlight.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(0, 240, 255, 0.04), rgba(139, 92, 246, 0.02), transparent 50%)`;
        });

        card.addEventListener('mouseleave', () => {
            spotlight.style.background = 'transparent';
        });
    });
}

/* ═══════════════════════════════════════════════
   RIPPLE EFFECT ON BUTTONS
   ═══════════════════════════════════════════════ */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}
