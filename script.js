// script.js
import setScrollSpy from "./js/scroll-spy.js";
import { calculateAge } from "./js/utils.js";
import { initI18n, setLanguage, getCurrentLanguage, getTaglines, SUPPORTED_LANGS } from "./js/i18n.js";

document.addEventListener('DOMContentLoaded', async () => {

    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 600);
    });

    setTimeout(() => loader.classList.add('hidden'), 3000);

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
        });
    }

    setScrollSpy();

    const ageText = document.querySelector('#age');
    if (ageText) {
        ageText.textContent = calculateAge(ageText.dataset['birth']);
    }

    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    const taglineEl = document.getElementById('typed-tagline');
    let phrases = [
        'Data Science × Finance',
        'Machine Learning Engineer',
        'Full-Stack Developer',
        'FinTech Enthusiast',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    let typingTimer = null;

    function typeEffect() {
        if (!taglineEl) return;
        const currentPhrase = phrases[phraseIndex % phrases.length];

        if (isDeleting) {
            taglineEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            taglineEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        typingTimer = setTimeout(typeEffect, typingSpeed);
    }

    window.addEventListener('langchange', (e) => {
        const newPhrases = e.detail.dict['about.taglines'];
        if (newPhrases && Array.isArray(newPhrases)) {
            phrases = newPhrases;
            charIndex = 0;
            phraseIndex = 0;
            isDeleting = false;
            if (typingTimer) clearTimeout(typingTimer);
            typeEffect();
        }
        if (ageText) {
            ageText.textContent = calculateAge(ageText.dataset['birth']);
        }
        updateContactFormLang(e.detail.dict);
    });

    const langToggle = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');
    if (langToggle) {
        function updateLangLabel() {
            const cur = getCurrentLanguage();
            langLabel.textContent = cur === 'zh-TW' ? 'EN' : '中';
        }

        langToggle.addEventListener('click', () => {
            const cur = getCurrentLanguage();
            const next = cur === 'zh-TW' ? 'en' : 'zh-TW';
            setLanguage(next);
            updateLangLabel();
        });

        window.addEventListener('langchange', () => updateLangLabel());
    }

    await initI18n();

    const i18nPhrases = getTaglines();
    if (i18nPhrases.length > 0) phrases = i18nPhrases;
    if (taglineEl) typeEffect();

    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Portrait switching
    const portraitImg = document.getElementById('portrait-img');
    const portraitContainer = document.getElementById('portrait-container');
    if (portraitImg) {
        const savedPortrait = localStorage.getItem('portraitMode') || 'formal';
        
        function setPortrait(mode) {
            const src = portraitImg.dataset[mode];
            portraitImg.style.opacity = '0';
            setTimeout(() => {
                portraitImg.src = src;
                portraitImg.style.opacity = '1';
            }, 250);
            localStorage.setItem('portraitMode', mode);
        }
        
        // Load saved portrait
        setPortrait(savedPortrait);
        
        // Toggle on click
        portraitContainer.addEventListener('click', () => {
            const current = localStorage.getItem('portraitMode') || 'formal';
            const next = current === 'formal' ? 'casual' : 'formal';
            setPortrait(next);
        });
    }

    const skillBars = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.style.width = level + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    let contactSuccessMsg = '感謝您的留言！';
    function updateContactFormLang(dict) {
        if (dict && dict['contact.formSuccess']) {
            contactSuccessMsg = dict['contact.formSuccess'];
        }
    }

    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         const name = document.getElementById('form-name').value;
    //         const email = document.getElementById('form-email').value;
    //         const message = document.getElementById('form-message').value;

    //         alert(`${contactSuccessMsg}\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    //         contactForm.reset();
    //     });
    // }

});

