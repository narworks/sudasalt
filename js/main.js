/* ============================================
   SUDA SALT — main.js
   Tuz Temalı Görsel Efektler & Animasyonlar
   ============================================ */

(function () {
  'use strict';

  // --- Configuration ---
  const CONFIG = {
    particles: {
      countDesktop: 60,
      countMobile: 25,
      types: ['normal', 'large', 'sparkle']
    },
    sparkles: {
      count: 15,
      sections: ['.story', '.product', '.tradition', '.hayriye', '.contact']
    }
  };

  // --- Initialize AOS ---
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

  // --- Enhanced Salt Crystal Particle System ---
  function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? CONFIG.particles.countMobile : CONFIG.particles.countDesktop;

    for (let i = 0; i < count; i++) {
      const crystal = document.createElement('div');

      // Determine crystal type
      const typeRand = Math.random();
      let crystalType = 'normal';
      if (typeRand > 0.9) {
        crystalType = 'sparkle';
      } else if (typeRand > 0.75) {
        crystalType = 'large';
      }

      crystal.classList.add('salt-crystal');
      if (crystalType !== 'normal') {
        crystal.classList.add(`salt-crystal--${crystalType}`);
      }

      // Size based on type
      let size;
      switch (crystalType) {
        case 'large':
          size = Math.random() * 4 + 5;
          break;
        case 'sparkle':
          size = Math.random() * 3 + 3;
          break;
        default:
          size = Math.random() * 3 + 2;
      }

      const left = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 20;
      const opacity = crystalType === 'sparkle'
        ? Math.random() * 0.4 + 0.2
        : Math.random() * 0.25 + 0.05;

      // Random rotation for crystal shape
      const rotation = Math.random() * 360;
      const isSquare = Math.random() > 0.4;

      crystal.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        opacity: ${opacity};
        border-radius: ${isSquare ? '1px' : '50%'};
        transform: rotate(${rotation}deg);
      `;

      container.appendChild(crystal);
    }
  }

  // --- Sparkle Effect for Sections ---
  function initSparkles() {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Skip on mobile for performance

    CONFIG.sparkles.sections.forEach(selector => {
      const section = document.querySelector(selector);
      if (!section) return;

      const container = document.createElement('div');
      container.classList.add('sparkle-container');
      section.style.position = 'relative';
      section.insertBefore(container, section.firstChild);

      for (let i = 0; i < CONFIG.sparkles.count; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        const size = Math.random() * 3 + 2;

        sparkle.style.cssText = `
          left: ${left}%;
          top: ${top}%;
          width: ${size}px;
          height: ${size}px;
          --duration: ${duration}s;
          --delay: ${delay}s;
        `;

        container.appendChild(sparkle);
      }
    });
  }

  // --- Parallax Crystal Layers ---
  function initParallaxCrystals() {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const container = document.createElement('div');
    container.classList.add('parallax-crystals');
    document.body.appendChild(container);

    const crystalCount = 20;
    const crystals = [];

    for (let i = 0; i < crystalCount; i++) {
      const crystal = document.createElement('div');
      crystal.classList.add('parallax-crystal');

      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = Math.random() * 4 + 2;
      const speed = Math.random() * 0.3 + 0.1;

      crystal.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
      `;

      crystal.dataset.speed = speed;
      container.appendChild(crystal);
      crystals.push(crystal);
    }

    // Parallax scroll effect
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          crystals.forEach(crystal => {
            const speed = parseFloat(crystal.dataset.speed);
            const yOffset = scrollY * speed;
            crystal.style.transform = `translateY(${yOffset}px) rotate(45deg)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Mouse Tracking Glow for Contact Link ---
  function initMouseTracking() {
    const contactLink = document.querySelector('.contact-link');
    if (!contactLink) return;

    contactLink.addEventListener('mousemove', (e) => {
      const rect = contactLink.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      contactLink.style.setProperty('--x', `${x}%`);
      contactLink.style.setProperty('--y', `${y}%`);
    });
  }

  // --- Animated Number Counter ---
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const prefix = el.getAttribute('data-prefix') || '';
            const duration = 2000;
            const start = performance.now();

            function update(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(eased * target);
              el.textContent = prefix + current.toLocaleString('tr-TR') + suffix;

              if (progress < 1) {
                requestAnimationFrame(update);
              }
            }

            requestAnimationFrame(update);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  // --- Smooth Scroll for anchor links ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  // --- Enhanced Parallax effect on hero ---
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;
    const particles = hero.querySelector('.hero-particles');

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = hero.offsetHeight;

          if (scrollY < heroHeight) {
            const progress = scrollY / heroHeight;
            const content = hero.querySelector('.hero-content');

            if (content) {
              content.style.transform = `translateY(${scrollY * 0.3}px)`;
              content.style.opacity = 1 - progress * 0.8;
            }

            // Parallax particles layer
            if (particles) {
              particles.style.transform = `translateY(${scrollY * 0.15}px)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Scroll Detection ---
  function initScrollDetection() {
    document.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      document.body.classList.toggle('scrolled', currentScroll > 100);
    }, { passive: true });
  }

  // --- Section Visibility Effects ---
  function initSectionEffects() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // --- Add Grain Overlay ---
  function initGrainOverlay() {
    const grain = document.createElement('div');
    grain.classList.add('grain-overlay');
    document.body.appendChild(grain);
  }

  // --- Contact Form Handler ---
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.btn-submit');
      const statusDiv = form.querySelector('.form-status');

      // Get form data
      const formData = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        message: form.querySelector('#message').value.trim()
      };

      // Validation
      if (!formData.name || !formData.email || !formData.message) {
        showStatus(statusDiv, 'Lütfen tüm alanları doldurun.', 'error');
        return;
      }

      // Set loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
          showStatus(statusDiv, 'Mesajınız başarıyla gönderildi!', 'success');
          form.reset();
        } else {
          showStatus(statusDiv, result.error || 'Bir hata oluştu.', 'error');
        }
      } catch (error) {
        showStatus(statusDiv, 'Bağlantı hatası. Lütfen tekrar deneyin.', 'error');
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });

    function showStatus(el, message, type) {
      el.textContent = message;
      el.className = 'form-status ' + type;
      el.style.display = 'block';

      setTimeout(() => {
        el.style.display = 'none';
      }, 5000);
    }
  }

  // --- Init All ---
  document.addEventListener('DOMContentLoaded', () => {
    initGrainOverlay();
    initParticles();
    initSparkles();
    initParallaxCrystals();
    initMouseTracking();
    animateCounters();
    initSmoothScroll();
    initParallax();
    initScrollDetection();
    initSectionEffects();
    initContactForm();
  });

  // --- Handle Resize ---
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Reinitialize particles on significant resize
      const container = document.getElementById('heroParticles');
      if (container) {
        container.innerHTML = '';
        initParticles();
      }
    }, 250);
  });

})();
