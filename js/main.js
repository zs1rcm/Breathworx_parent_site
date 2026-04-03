// Breathworx — Main Script

(function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  const header = document.getElementById('header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');

  navToggle.addEventListener('click', function () {
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      header.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Header Background on Scroll ---
  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // --- Newsletter Form Submission ---
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('.form-input');
      var submitBtn = form.querySelector('.btn');
      var email = emailInput.value.trim();
      if (!email) return;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      fetch(form.getAttribute('data-endpoint'), {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      })
        .then(function () {
          emailInput.value = '';
          submitBtn.textContent = 'Subscribed!';
          submitBtn.classList.add('btn-success');
          setTimeout(function () {
            submitBtn.textContent = 'Subscribe';
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-success');
          }, 3000);
        })
        .catch(function () {
          submitBtn.textContent = 'Try Again';
          submitBtn.disabled = false;
          setTimeout(function () {
            submitBtn.textContent = 'Subscribe';
          }, 3000);
        });
    });
  }

  // --- Scroll Reveal Animations ---
  var animatedElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    animatedElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }
})();
