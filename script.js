/* ═══════════════════════════════════════════════
   MANJU MUKESH DANNINA — PORTFOLIO SCRIPT
   Dark futuristic aesthetic with zero-G elements
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initCertViewer();
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
    initAIAssistant();
});

/* ═══════════════════════════════════════════════
   THEME TOGGLE (light / dark, persisted)
   ═══════════════════════════════════════════════ */
function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Ensure an explicit theme is set (head script normally does this)
    if (!root.getAttribute('data-theme')) root.setAttribute('data-theme', 'light');

    function apply(theme) {
        root.setAttribute('data-theme', theme);
        try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
    }

    if (!btn) return;
    btn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        apply(current === 'dark' ? 'light' : 'dark');
    });
}

/* ═══════════════════════════════════════════════
   CERTIFICATE VIEWER (in-page modal)
   ═══════════════════════════════════════════════ */
function initCertViewer() {
    const modal = document.getElementById('cert-viewer');
    if (!modal) return;

    const frame = document.getElementById('cert-viewer-frame');
    const titleEl = document.getElementById('cert-viewer-title');
    const openLink = document.getElementById('cert-viewer-open');
    const dlLink = document.getElementById('cert-viewer-dl');

    function open(path, title) {
        titleEl.textContent = title || 'Certificate';
        openLink.href = path;
        dlLink.href = path;
        frame.src = '';
        modal.classList.remove('show-fallback');

        if (location.protocol === 'file:') {
            // Local preview: fetch/HEAD is unreliable, so load the PDF directly
            // and let the browser's built-in viewer render it.
            frame.src = path;
        } else {
            // Served over http(s): verify the file exists so we can show a
            // friendly message instead of a broken frame for missing files.
            fetch(path, { method: 'HEAD' })
                .then(res => {
                    if (res.ok) { frame.src = path; }
                    else { modal.classList.add('show-fallback'); }
                })
                .catch(() => { frame.src = path; });
        }

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // Stop the PDF from playing/loading in the background
        setTimeout(() => { frame.src = ''; }, 300);
    }

    // Open from any element carrying data-cert
    document.querySelectorAll('[data-cert]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            open(btn.getAttribute('data-cert'), btn.getAttribute('data-cert-title'));
        });
    });

    // Close via backdrop / close button
    modal.querySelectorAll('[data-cert-close]').forEach(el => {
        el.addEventListener('click', close);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });
}

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
    let isDark = document.documentElement.getAttribute('data-theme') === 'dark';
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
            this.hue = [245, 258, 199][Math.floor(Math.random() * 3)]; // indigo, violet, sky
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
            const L = isDark ? 70 : 55;
            // Core
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 75%, ${L}%, ${this.alpha})`;
            ctx.fill();

            // Glow halo
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 75%, ${L}%, ${this.alpha * (isDark ? 0.1 : 0.06)})`;
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
        isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.clearRect(0, 0, W, H);

        // Theme-aware background
        ctx.fillStyle = isDark ? '#0a0e17' : '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // Subtle radial tint
        const grd = ctx.createRadialGradient(W * 0.4, H * 0.35, 0, W * 0.4, H * 0.35, Math.max(W, H) * 0.6);
        if (isDark) {
            grd.addColorStop(0, 'rgba(129, 140, 248, 0.07)');
            grd.addColorStop(0.35, 'rgba(167, 139, 250, 0.04)');
            grd.addColorStop(0.65, 'rgba(56, 189, 248, 0.025)');
            grd.addColorStop(1, 'rgba(10, 14, 23, 0)');
        } else {
            grd.addColorStop(0, 'rgba(79, 70, 229, 0.035)');
            grd.addColorStop(0.35, 'rgba(124, 58, 237, 0.02)');
            grd.addColorStop(0.65, 'rgba(56, 189, 248, 0.012)');
            grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < CONNECT_DIST) {
                    const alpha = (1 - d / CONNECT_DIST) * (isDark ? 0.16 : 0.12);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `hsla(245, 65%, ${isDark ? 70 : 55}%, ${alpha})`;
                    ctx.lineWidth = 0.6;
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
        btn.innerHTML = `<span>Sending...</span><div style="width:18px;height:18px;border:2px solid rgba(255,255,255,0.4);border-top-color:#ffffff;border-radius:50%;animation:spin 0.5s linear infinite;"></div>`;
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
            spotlight.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.025), transparent 50%)`;
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

/* ═══════════════════════════════════════════════
   AI ASSISTANT — Built-in knowledge engine
   A lightweight intent-matching chatbot trained on
   Manju's portfolio. No API keys, works offline.
   ═══════════════════════════════════════════════ */
function initAIAssistant() {
    const fab = document.getElementById('ai-fab');
    const chat = document.getElementById('ai-chat');
    const closeBtn = document.getElementById('ai-chat-close');
    const body = document.getElementById('ai-chat-body');
    const form = document.getElementById('ai-chat-form');
    const input = document.getElementById('ai-chat-text');
    const suggestionsBar = document.getElementById('ai-chat-suggestions');
    const badge = document.getElementById('ai-fab-badge');
    if (!fab || !chat || !body || !form) return;

    /* ── Knowledge base ── */
    const KB = {
        name: 'Dannina Manju Mukesh',
        projects: [
            {
                id: 'proj-1',
                name: 'SkillStack AI — Career Launchpad',
                tag: 'Full-Stack AI Platform',
                summary: `<strong>SkillStack AI</strong> is a full-stack placement-preparation platform built on <strong>11 Flask Blueprint modules</strong>. It bundles AI mock interviews, an ATS resume builder, coding assessments, and live job discovery — all powered by <strong>Google Gemini</strong> with a 4-tier AI fallback (Gemini → OpenAI → OpenRouter → NVIDIA) so it never goes down.`,
                highlights: [
                    'MediaPipe FaceMesh for real-time biometric interview analytics',
                    '5-step RAG pipeline hitting 88–98% ATS resume compatibility',
                    'Firebase Phone OTP, SHA-256 hashing & 20+ pytest tests'
                ],
                stack: 'Python, Flask, MongoDB Atlas, Gemini AI, Firebase, React.js, MediaPipe, LangChain'
            },
            {
                id: 'proj-2',
                name: 'Centralized Student Affairs & Club Portal',
                tag: 'Administrative Dashboard',
                summary: `A full-stack <strong>administrative dashboard</strong> he architected for the Dean of Student Affairs — centralizing club management, extension activities and SAC operations with role-based access.`,
                highlights: [
                    'Chart.js analytics with real-time filtering',
                    'RBAC — permission-scoped views for Dean & Coordinators',
                    'Automated NAAC-compliant PDF/Excel reporting'
                ],
                stack: 'Python, Flask, React.js, Tailwind CSS, MongoDB, Chart.js, SheetJS'
            },
            {
                id: 'proj-3',
                name: 'Premium Developer Portfolio',
                tag: 'Web Application',
                summary: `The interactive portfolio you're viewing right now — a hand-built, corporate-ready site with a custom particle engine, custom cursor, glassmorphism UI and 3D tilt effects, all in vanilla JS.`,
                highlights: [
                    'Custom vanilla-JS particle physics engine on Canvas',
                    'Advanced CSS3 animations & design tokens',
                    'Fully responsive with smooth micro-interactions'
                ],
                stack: 'HTML5, CSS3, Vanilla JS, Canvas API'
            }
        ],
        skills: {
            languages: ['Python', 'Java', 'C / C++', 'JavaScript'],
            frontend: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
            backend: ['Flask', 'Node.js', 'Express.js', 'Spring Boot', 'REST APIs', 'MongoDB', 'Firebase'],
            ai: ['Google Gemini', 'LangChain (RAG)', 'MediaPipe', 'AI Analytics'],
            concepts: ['DSA', 'OOP', 'DBMS', 'SDLC']
        },
        achievements: [
            '🏆 Selected for Smart India Hackathon (SIH) 2024–25',
            '🥇 Top 5 Team — Google Hacksprint 2K25',
            '🥈 Runner Up — Tech Sprint, GDG Aditya University 2025–26'
        ],
        certs: [
            'Oracle Cloud Infrastructure 2025 — AI Foundations Associate (Oracle)',
            'Oracle Data Platform 2025 — Foundations Associate (Oracle)',
            'Oracle Certified Foundations Associate — Java (Oracle)',
            'Google AI Professional Certificate (Google · Coursera)',
            'IT Specialist — HTML & CSS (Pearson · Certiport)',
            'Gemini AI Foundational Associate (Google · STAR Academy)',
            'C Essentials 1 & 2 (Cisco)'
        ],
        internship: `<strong>Full-Stack Developer Intern</strong> at <strong>Technical Hub Pvt. Ltd.</strong> (summer 2026) — built MERN-stack applications using React, Express.js and MongoDB. Intern ID: THSI260810.`,
        education: `He's a <strong>CSE undergraduate</strong> at Aditya College of Engineering & Technology, Surampalem (batch 2024–2028), holding a strong <strong>9.10 CGPA</strong>. He speaks English, Hindi, Telugu & Urdu.`,
        contact: {
            email: '24P31a0585@acet.ac.in',
            phone: '+91 9490692101',
            location: 'Surampalem, Andhra Pradesh, India',
            linkedin: 'https://www.linkedin.com/in/manjumukeshdannina',
            github: 'https://github.com/true-tune-27'
        }
    };

    /* ── Response builders ── */
    function projectsOverview() {
        const list = KB.projects.map(p =>
            `<li><strong>${p.name}</strong> — ${p.tag}</li>`).join('');
        return {
            html: `Manju has shipped <strong>${KB.projects.length} major projects</strong>. Here's the lineup:<ul>${list}</ul>Tap one below for a deep dive 👇`,
            actions: KB.projects.map(p => ({ label: p.name.split('—')[0].trim(), q: p.name }))
                .concat([{ label: '📂 See all in page', scroll: 'projects' }])
        };
    }

    function projectDetail(p) {
        const hl = p.highlights.map(h => `<li>${h}</li>`).join('');
        return {
            html: `${p.summary}<br><br><strong>Key highlights:</strong><ul>${hl}</ul><strong>Stack:</strong> ${p.stack}`,
            actions: [
                { label: '🔎 View in portfolio', scroll: p.id },
                { label: '↩ Other projects', q: 'show me the projects' }
            ]
        };
    }

    function skillsOverview() {
        const s = KB.skills;
        return {
            html: `Manju is a <strong>full-stack developer & AI enthusiast</strong>. His toolkit:` +
                `<br><br>💻 <strong>Languages:</strong> ${s.languages.join(', ')}` +
                `<br>🎨 <strong>Frontend:</strong> ${s.frontend.join(', ')}` +
                `<br>⚙️ <strong>Backend:</strong> ${s.backend.join(', ')}` +
                `<br>🧠 <strong>AI / ML:</strong> ${s.ai.join(', ')}` +
                `<br>📚 <strong>CS core:</strong> ${s.concepts.join(', ')}`,
            actions: [{ label: '🛠 View skills section', scroll: 'skills' }, { label: '🚀 His projects', q: 'projects' }]
        };
    }

    function achievementsOverview() {
        const list = KB.achievements.map(a => `<li>${a}</li>`).join('');
        return {
            html: `Here's what Manju has earned so far:<ul>${list}</ul>He also holds certifications from <strong>Oracle, Google, Pearson & Cisco</strong>.`,
            actions: [{ label: '🏅 View achievements', scroll: 'skills' }, { label: '📜 Certifications', q: 'certifications' }]
        };
    }

    function certsOverview() {
        const list = KB.certs.map(c => `<li>${c}</li>`).join('');
        return {
            html: `Manju holds <strong>${KB.certs.length} certifications</strong> spanning cloud, AI, web & programming:<ul>${list}</ul>You can view the official badges and <strong>download each certificate</strong> in the Certifications section 👇`,
            actions: [{ label: '📜 View badges & downloads', scroll: 'skills' }]
        };
    }

    function aboutOverview() {
        return {
            html: `${KB.education}<br><br>He's a detail-oriented problem solver with hands-on experience in software development, AI systems and full-stack web apps — and has led project teams from requirements through deployment.`,
            actions: [{ label: '👤 About section', scroll: 'about' }, { label: '💼 Experience', q: 'experience' }]
        };
    }

    function experienceOverview() {
        return {
            html: `Manju's hands-on experience:<ul>` +
                `<li><strong>Full-Stack Developer Intern</strong> — Technical Hub Pvt. Ltd. (summer 2026): React, Express.js & MongoDB</li>` +
                `<li><strong>Full-Stack Developer</strong> — Centralized Student Affairs Portal (Flask + React, analytics & RBAC)</li>` +
                `<li><strong>Hackathon Competitor</strong> — SIH, Google Hacksprint, GDG Tech Sprint</li></ul>` +
                `His internship certificate is downloadable in the Journey & Experience section.`,
            actions: [{ label: '🧭 View journey', scroll: 'about' }, { label: '📜 Certifications', q: 'certifications' }]
        };
    }

    function contactOverview() {
        const c = KB.contact;
        return {
            html: `You can reach Manju here:<br><br>📧 <a href="mailto:${c.email}">${c.email}</a>` +
                `<br>📱 ${c.phone}<br>📍 ${c.location}` +
                `<br>💼 <a href="${c.linkedin}" target="_blank">LinkedIn</a>` +
                ` &nbsp;·&nbsp; 💻 <a href="${c.github}" target="_blank">GitHub</a>`,
            actions: [{ label: '✉️ Open contact form', scroll: 'contact' }, { label: '📄 View CV', href: 'Manju_Mukesh_Resume_ATS.pdf' }]
        };
    }

    function hireOverview() {
        return {
            html: `Absolutely — Manju is <strong>open to internships & opportunities</strong>! He brings full-stack skills (Python/Flask, React, MongoDB), real AI integration experience (Gemini, RAG, MediaPipe), a 9.10 CGPA and proven project leadership. Shall I point you to his CV or contact details?`,
            actions: [{ label: '📄 View CV', href: 'Manju_Mukesh_Resume_ATS.pdf' }, { label: '✉️ Contact him', q: 'contact' }]
        };
    }

    function greeting() {
        return {
            html: `Hi there! 👋 I'm Manju's AI assistant. I can brief you on his <strong>projects</strong>, <strong>skills</strong>, <strong>experience</strong>, <strong>achievements</strong> or how to <strong>get in touch</strong>. What would you like to know?`,
            actions: [{ label: '🚀 Projects', q: 'projects' }, { label: '🛠 Skills', q: 'skills' }, { label: '📬 Contact', q: 'contact' }]
        };
    }

    function fallback() {
        return {
            html: `I'm not totally sure about that one 🤔 — but I know Manju's portfolio inside out! Try asking about his <strong>projects</strong>, <strong>skills</strong>, <strong>AI work</strong>, <strong>achievements</strong>, <strong>education</strong> or <strong>contact</strong> info.`,
            actions: [{ label: '🚀 Projects', q: 'projects' }, { label: '🛠 Skills', q: 'skills' }, { label: '📬 Contact', q: 'contact' }]
        };
    }

    /* ── Intent matching ── */
    function respond(raw) {
        const t = ' ' + raw.toLowerCase().replace(/[^\w\s]/g, ' ') + ' ';
        const has = (...words) => words.some(w => t.includes(w));

        // Specific project match first
        for (const p of KB.projects) {
            const key = p.name.toLowerCase();
            if (t.includes(key) || (key.includes('skillstack') && has('skillstack', 'skill stack', 'launchpad', 'career')) ||
                (p.id === 'proj-2' && has('student affairs', 'club portal', 'dashboard', 'naac', 'dean')) ||
                (p.id === 'proj-3' && has('portfolio website', 'this site', 'this website'))) {
                return projectDetail(p);
            }
        }

        if (has('hi', 'hello', 'hey', 'yo', 'greetings', 'namaste')) return greeting();
        if (has('hire', 'recruit', 'internship', 'job', 'available', 'opportunit', 'why should')) return hireOverview();
        if (has('project', 'projects', 'work', 'portfolio', 'built', 'build', 'app', 'apps')) return projectsOverview();
        if (has('ai', 'ml', 'machine learning', 'gemini', 'llm', 'rag', 'langchain', 'mediapipe')) return skillsOverview();
        if (has('skill', 'skills', 'tech', 'stack', 'technolog', 'language', 'languages', 'framework', 'know', 'good at')) return skillsOverview();
        if (has('achieve', 'award', 'hackathon', 'win', 'won', 'prize', 'sih')) return achievementsOverview();
        if (has('cert', 'certification', 'certificate', 'oracle', 'course')) return certsOverview();
        if (has('experience', 'work experience', 'intern', 'lead', 'led', 'role')) return experienceOverview();
        if (has('about', 'who is', 'who s', 'yourself', 'education', 'college', 'cgpa', 'study', 'degree', 'background')) return aboutOverview();
        if (has('contact', 'email', 'phone', 'reach', 'linkedin', 'github', 'connect', 'hire him', 'get in touch', 'cv', 'resume')) return contactOverview();
        if (has('thank', 'thanks', 'thx', 'cool', 'awesome', 'nice', 'great')) {
            return { html: `You're welcome! 😊 Anything else you'd like to know about Manju?`, actions: [{ label: '🚀 Projects', q: 'projects' }, { label: '📬 Contact', q: 'contact' }] };
        }

        return fallback();
    }

    /* ── Rendering ── */
    function scrollBottom() { body.scrollTop = body.scrollHeight; }

    const BOT_AVATAR = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`;

    function addUser(text) {
        const el = document.createElement('div');
        el.className = 'ai-msg ai-msg--user';
        el.innerHTML = `<div class="ai-msg__bubble"></div>`;
        el.querySelector('.ai-msg__bubble').textContent = text;
        body.appendChild(el);
        scrollBottom();
    }

    function addBot(res) {
        const el = document.createElement('div');
        el.className = 'ai-msg ai-msg--bot';
        let actionsHtml = '';
        if (res.actions && res.actions.length) {
            actionsHtml = `<div class="ai-msg__actions">` + res.actions.map((a, i) =>
                `<button class="ai-msg__action" data-idx="${i}">${a.label}</button>`).join('') + `</div>`;
        }
        el.innerHTML = `<div class="ai-msg__avatar">${BOT_AVATAR}</div><div class="ai-msg__bubble">${res.html}${actionsHtml}</div>`;

        // Wire action buttons
        if (res.actions) {
            el.querySelectorAll('.ai-msg__action').forEach(btn => {
                const a = res.actions[+btn.dataset.idx];
                btn.addEventListener('click', () => {
                    if (a.scroll) {
                        closePanel();
                        const target = document.getElementById(a.scroll);
                        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else if (a.href) {
                        window.open(a.href, '_blank');
                    } else if (a.q) {
                        handleUserInput(a.q, a.label.replace(/^[^\w]+/, '').trim());
                    }
                });
            });
        }
        body.appendChild(el);
        scrollBottom();
    }

    function showTyping() {
        const el = document.createElement('div');
        el.className = 'ai-msg ai-msg--bot ai-typing';
        el.id = 'ai-typing';
        el.innerHTML = `<div class="ai-msg__avatar">${BOT_AVATAR}</div><div class="ai-typing__bubble"><span></span><span></span><span></span></div>`;
        body.appendChild(el);
        scrollBottom();
    }

    function hideTyping() {
        const el = document.getElementById('ai-typing');
        if (el) el.remove();
    }

    /* ── Conversation flow ── */
    function handleUserInput(query, displayText) {
        addUser(displayText || query);
        showTyping();
        const delay = 500 + Math.random() * 500;
        setTimeout(() => {
            hideTyping();
            addBot(respond(query));
        }, delay);
    }

    const SUGGESTIONS = [
        { label: '🚀 His projects', q: 'Tell me about his projects' },
        { label: '🛠 Skills & stack', q: 'What are his skills?' },
        { label: '🧠 AI work', q: 'Tell me about his AI work' },
        { label: '🏆 Achievements', q: 'What are his achievements?' },
        { label: '🎓 About him', q: 'Tell me about him' },
        { label: '📬 Contact', q: 'How can I contact him?' },
        { label: '💼 Is he open to work?', q: 'Is he available to hire?' }
    ];

    function renderSuggestions() {
        suggestionsBar.innerHTML = '';
        SUGGESTIONS.forEach(s => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'ai-suggestion';
            b.textContent = s.label;
            b.addEventListener('click', () => handleUserInput(s.q, s.label.replace(/^[^\w]+/, '').trim()));
            suggestionsBar.appendChild(b);
        });
    }

    /* ── Open / close ── */
    let greeted = false;
    function openPanel() {
        chat.classList.add('open');
        fab.classList.add('open');
        chat.setAttribute('aria-hidden', 'false');
        badge.classList.add('hidden');
        if (!greeted) {
            greeted = true;
            renderSuggestions();
            showTyping();
            setTimeout(() => { hideTyping(); addBot(greeting()); }, 700);
        }
        setTimeout(() => input.focus(), 350);
    }

    function closePanel() {
        chat.classList.remove('open');
        fab.classList.remove('open');
        chat.setAttribute('aria-hidden', 'true');
    }

    function togglePanel() {
        chat.classList.contains('open') ? closePanel() : openPanel();
    }

    fab.addEventListener('click', togglePanel);
    closeBtn.addEventListener('click', closePanel);

    form.addEventListener('submit', e => {
        e.preventDefault();
        const val = input.value.trim();
        if (!val) return;
        input.value = '';
        handleUserInput(val);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && chat.classList.contains('open')) closePanel();
    });
}
