/* ============================================
   SUDA SALT — main.js
   Scroll Animations, Counters & Particles
   ============================================ */

(function () {
  'use strict';

  // --- Initialize AOS ---
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

  // --- Salt Crystal Particle Background ---
  function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const count = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < count; i++) {
      const crystal = document.createElement('div');
      crystal.classList.add('salt-crystal');

      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 15;
      const opacity = Math.random() * 0.2 + 0.05;

      crystal.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        opacity: ${opacity};
        border-radius: ${Math.random() > 0.5 ? '1px' : '50%'};
      `;

      container.appendChild(crystal);
    }
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

  // --- Parallax effect on hero ---
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;

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
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Navbar show/hide on scroll (future use) ---
  function initScrollDetection() {
    let lastScroll = 0;
    document.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      document.body.classList.toggle('scrolled', currentScroll > 100);
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // --- Init All ---
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateCounters();
    initSmoothScroll();
    initParallax();
    initScrollDetection();
  });

})();
