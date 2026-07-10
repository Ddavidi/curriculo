/* ==========================================
   INTERACTIVITY — David Nunes Ribeiro CV
   Language toggle, theme toggle, animations
   ========================================== */

(function() {
    'use strict';

    // ==========================================
    // STATE
    // ==========================================
    let currentLang = 'pt';
    let currentTheme = localStorage.getItem('theme') || 'dark';

    // ==========================================
    // LANGUAGE TOGGLE
    // ==========================================
    const langToggle = document.getElementById('langToggle');

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

        // Update all elements with data-pt / data-en
        document.querySelectorAll('[data-pt][data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Update toggle button
        if (lang === 'pt') {
            langToggle.querySelector('.lang-flag').textContent = '🇧🇷';
            langToggle.querySelector('.lang-text').textContent = 'EN';
        } else {
            langToggle.querySelector('.lang-flag').textContent = '🇺🇸';
            langToggle.querySelector('.lang-text').textContent = 'PT';
        }

        // Update nav dot labels
        document.querySelectorAll('.nav-dot span').forEach(span => {
            if (span.dataset.pt && span.dataset.en) {
                span.textContent = span.getAttribute(`data-${lang}`);
            }
        });
    }

    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
    });

    // ==========================================
    // THEME TOGGLE
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');

    function setTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Apply saved theme
    setTheme(currentTheme);

    // ==========================================
    // SCROLL ANIMATIONS (AOS-like)
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.getAttribute('data-aos-delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('aos-animate');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // SKILL BARS ANIMATION
    // ==========================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach((fill, index) => {
                    setTimeout(() => {
                        const level = fill.getAttribute('data-level');
                        fill.style.width = level + '%';
                    }, index * 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(cat => {
        skillObserver.observe(cat);
    });

    // ==========================================
    // FLOATING NAV — Active Section
    // ==========================================
    const sections = document.querySelectorAll('.section, .hero');
    const navDots = document.querySelectorAll('.nav-dot');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navDots.forEach(dot => {
                    dot.classList.toggle('active', dot.getAttribute('data-section') === id);
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Smooth scroll for nav dots
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // INITIALIZE NAV LABELS
    // ==========================================
    document.querySelectorAll('.nav-dot span').forEach(span => {
        if (span.dataset.pt) {
            span.textContent = span.dataset.pt;
        }
    });

})();
