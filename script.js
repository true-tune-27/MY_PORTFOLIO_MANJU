/* ========================================
   MANJU — Portfolio v4 (Premium Edition)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initParticles();
    initCursorGlow();
    initCustomCursor();
    initNavbar();
    initMobileMenu();
    initPillIndicator();
    initScrollReveal();
    initCountUp();
    initContactForm();
    initSmoothScroll();
    initTypewriter();
    init3DTilt();
    initScrollProgress();
    initMagneticButtons();
    initBackToTop();
});

/* ========================================
   PAGE LOADER
   ======================================== */
function initPageLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    const hide = () => {
        loader.classList.add('loaded');
        setTimeout(() => loader.remove(), 800);
    };

    window.addEventListener('load', () => setTimeout(hide, 600));
    setTimeout(() => { if (loader.parentNode) hide(); }, 3500);
}

/* ========================================
   INTERACTIVE PARTICLE NETWORK
   ======================================== */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 40 : 80;
    const CONNECT = isMobile ? 100 : 150;
    const MOUSE_R = 180;

    const palette = [
        { h: 210, s: 80, l: 60 }, // Blue
        { h: 195, s: 85, l: 55 }, // Cyan
        { h: 220, s: 70, l: 65 }, // Light Blue
        { h: 180, s: 70, l: 50 }, // Teal
        { h: 215, s: 60, l: 45 }, // Navy
    ];

    class Particle {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
            this.r = Math.random() * 2 + 1;
            this.c = palette[Math.floor(Math.random() * palette.length)];
            this.a = Math.random() * 0.5 + 0.2;
            this.ps = Math.random() * 0.02 + 0.01;
            this.pp = Math.random() * Math.PI * 2;
        }

        update(t) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < MOUSE_R && d > 0) {
                const f = (MOUSE_R - d) / MOUSE_R;
                this.vx += (dx / d) * f * 0.2;
                this.vy += (dy / d) * f * 0.2;
            }
            this.vx *= 0.98;
            this.vy *= 0.98;
            const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (spd < 0.1) {
                this.vx += (Math.random() - 0.5) * 0.04;
                this.vy += (Math.random() - 0.5) * 0.04;
            }
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < -20) this.x = W + 20;
            if (this.x > W + 20) this.x = -20;
            if (this.y < -20) this.y = H + 20;
            if (this.y > H + 20) this.y = -20;
            this.a = 0.2 + Math.sin(t * this.ps + this.pp) * 0.15 + 0.15;
        }

        draw() {
            const { h, s, l } = this.c;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${h},${s}%,${l}%,${this.a})`;
            ctx.fill();
            // Glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${h},${s}%,${l}%,${this.a * 0.12})`;
            ctx.fill();
        }
    }

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        particles = Array.from({ length: COUNT }, () => new Particle());
    }

    let t = 0;
    function draw() {
        t++;
        ctx.clearRect(0, 0, W, H);

        // Dark base
        ctx.fillStyle = '#0b0b12';
        ctx.fillRect(0, 0, W, H);

        // Ambient glow
        const g = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, Math.max(W, H) * 0.6);
        g.addColorStop(0, 'rgba(124,92,252,0.06)');
        g.addColorStop(0.3, 'rgba(244,114,182,0.04)');
        g.addColorStop(0.6, 'rgba(34,211,238,0.02)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);

        // Connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < CONNECT) {
                    const alpha = (1 - d / CONNECT) * 0.12;
                    const { h, s, l } = particles[i].c;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `hsla(${h},${s}%,${l}%,${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

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

/* ========================================
   CURSOR GLOW
   ======================================== */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    let mx = 0, my = 0, gx = 0, gy = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        glow.classList.add('active');
    });
    document.addEventListener('mouseleave', () => glow.classList.remove('active'));

    (function anim() {
        gx += (mx - gx) * 0.08;
        gy += (my - gy) * 0.08;
        glow.style.left = gx + 'px';
        glow.style.top = gy + 'px';
        requestAnimationFrame(anim);
    })();
}

/* ========================================
   CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        dot.style.display = 'none';
        ring.style.display = 'none';
        return;
    }

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
    });

    (function animRing() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animRing);
    })();

    // Hover scaling via event delegation
    document.addEventListener('mouseover', e => {
        if (e.target.closest('a, button, .flip-card, .proj-card, .concept-pill, input, textarea, .cert-card, .achievement-card, .journey-card, .social-icon, .c-social')) {
            dot.classList.add('cursor-hover');
            ring.classList.add('cursor-hover');
        }
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest('a, button, .flip-card, .proj-card, .concept-pill, input, textarea, .cert-card, .achievement-card, .journey-card, .social-icon, .c-social')) {
            dot.classList.remove('cursor-hover');
            ring.classList.remove('cursor-hover');
        }
    });
}

/* ========================================
   NAVBAR
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const pills = document.querySelectorAll('.nav-pill');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActivePill();
    });

    function updateActivePill() {
        const sections = document.querySelectorAll('.section, .hero');
        let current = 'hero';

        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) {
                current = sec.getAttribute('id');
            }
        });

        pills.forEach(pill => {
            pill.classList.toggle('active', pill.dataset.section === current);
        });

        movePillIndicator();
    }
}

/* ========================================
   PILL INDICATOR
   ======================================== */
function initPillIndicator() {
    movePillIndicator();
    window.addEventListener('resize', movePillIndicator);
}

function movePillIndicator() {
    const indicator = document.getElementById('pill-indicator');
    const activeLink = document.querySelector('.nav-pill.active');
    if (!indicator || !activeLink) return;

    const container = activeLink.parentElement;
    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    indicator.style.width = linkRect.width + 'px';
    indicator.style.left = (linkRect.left - containerRect.left) + 'px';
}

/* ========================================
   MOBILE MENU
   ======================================== */
function initMobileMenu() {
    const burger = document.getElementById('nav-burger');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

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

/* ========================================
   SCROLL REVEAL
   ======================================== */
function initScrollReveal() {
    const cards = document.querySelectorAll('.proj-card, .journey-card, .skill-group, .about-text-block, .cert-card, .achievement-card, .sec-header');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.children).filter(el =>
                    el.classList.contains('proj-card') ||
                    el.classList.contains('journey-card') ||
                    el.classList.contains('skill-group') ||
                    el.classList.contains('cert-card') ||
                    el.classList.contains('achievement-card')
                ) : [];
                const index = siblings.indexOf(entry.target);
                const delay = index >= 0 ? index * 120 : 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    cards.forEach(card => observer.observe(card));
}

/* ========================================
   COUNT UP
   ======================================== */
function initCountUp() {
    const nums = document.querySelectorAll('.stat-num');
    let done = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !done) {
                done = true;
                nums.forEach(num => {
                    const isDecimal = num.dataset.decimal === 'true';
                    const target = parseFloat(num.dataset.target);
                    const dur = 1800;
                    const start = performance.now();

                    function tick(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / dur, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = eased * target;

                        if (isDecimal) {
                            num.textContent = current.toFixed(2);
                        } else {
                            num.textContent = Math.floor(current);
                        }

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

    const container = document.querySelector('.hero-stats');
    if (container) observer.observe(container);
}

/* ========================================
   CONTACT FORM
   ======================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('btn-send');

    if (!form || !btn) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const orig = btn.innerHTML;
        btn.innerHTML = `<span>Sending...</span><div style="width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.5s linear infinite;"></div>`;
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
                console.error("Web3Forms Error:", data);
            }
        } catch (error) {
            btn.innerHTML = `<span>Error! ❌</span>`;
            btn.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
            console.error("Fetch Error:", error);
        }

        setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
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

/* ========================================
   TYPEWRITER
   ======================================== */
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

        let delay = deleting ? 35 : 75;
        if (!deleting && ci === word.length) {
            delay = 1800;
            deleting = true;
        } else if (deleting && ci === 0) {
            delay = 400;
            deleting = false;
            wi = (wi + 1) % words.length;
        }

        setTimeout(tick, delay);
    }

    setTimeout(tick, 1200);
}

/* ========================================
   3D TILT ON PHOTO
   ======================================== */
function init3DTilt() {
    const wrap = document.querySelector('.hero-photo-wrapper');
    if (!wrap || !window.matchMedia('(hover: hover)').matches) return;

    wrap.addEventListener('mousemove', e => {
        const r = wrap.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        wrap.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.03,1.03,1.03)`;
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

/* ========================================
   SCROLL PROGRESS BAR
   ======================================== */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const s = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (s / h) * 100 : 0) + '%';
    });
}

/* ========================================
   MAGNETIC BUTTONS
   ======================================== */
function initMagneticButtons() {
    if (!window.matchMedia('(hover: hover)').matches) return;

    document.querySelectorAll('.btn-cv, .btn-send, .social-icon, .c-social').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            const strength = (btn.classList.contains('btn-cv') || btn.classList.contains('btn-send')) ? 0.2 : 0.3;
            btn.style.translate = `${x * strength}px ${y * strength}px`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.translate = '';
        });
    });
}

/* ========================================
   BACK TO TOP
   ======================================== */
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

/* ========================================
   INJECT KEYFRAMES
   ======================================== */
const injectedStyles = document.createElement('style');
injectedStyles.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(injectedStyles);
