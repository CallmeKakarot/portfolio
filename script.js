/* ===================================================
   SUSHIL POUDEL — PORTFOLIO
   script.js — All JavaScript Logic
   =================================================== */

/* ============================================================
   1. LOADER
   ============================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1900); // matches CSS animation duration
});

/* ============================================================
   2. THEME TOGGLE (dark / light) with localStorage persistence
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeToggle.textContent = next === 'dark' ? '☀' : '🌙';
  localStorage.setItem('theme', next);
});

/* ============================================================
   3. NAVBAR — scroll effect + active link highlighting
   ============================================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class for background
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link based on scroll position
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

  // Scroll-to-top button visibility
  const scrollTopBtn = document.getElementById('scrollTop');
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

/* ============================================================
   4. HAMBURGER MENU (mobile)
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu when a link is clicked
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

/* ============================================================
   5. SCROLL TO TOP BUTTON
   ============================================================ */
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   6. TYPING ANIMATION (Hero section)
   ============================================================ */
const roles = [
  'Java Backend Developer',
  'Spring Boot Developer',
  'REST API Architect',
  'BCA Graduate',
  'Automobile Enthusiast 🏍️',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Typing forward
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      // Pause at end then start deleting
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    // Deleting
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
}

// Start typing after loader
setTimeout(type, 2000);

/* ============================================================
   7. REVEAL ON SCROLL (Intersection Observer)
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay for grid children
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  revealObserver.observe(el);
});

/* ============================================================
   8. SKILL BAR ANIMATION (triggered when skills section visible)
   ============================================================ */
const skillBars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth + '%';
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ============================================================
   9. ANIMATED COUNTERS (Hero stats)
   ============================================================ */
const counters = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      let current = 0;
      const increment = target / 40;

      const update = () => {
        current += increment;
        if (current < target) {
          el.textContent = Math.floor(current);
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      };

      setTimeout(update, 2100); // after loader
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/* ============================================================
   10. SKILL FILTER (All / Backend / Frontend / Database / Tools)
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    skillCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        // Re-trigger reveal animation
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
        // Re-trigger skill bar
        const bar = card.querySelector('.skill-fill');
        if (bar) {
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = bar.getAttribute('data-width') + '%';
          }, 100);
        }
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ============================================================
   11. CONTACT FORM VALIDATION
   ============================================================ */
const contactForm = document.getElementById('contactForm');

function showError(fieldId, message) {
  document.getElementById(fieldId + 'Error').textContent = message;
  document.getElementById(fieldId).style.borderColor = '#ff6b6b';
}
function clearError(fieldId) {
  document.getElementById(fieldId + 'Error').textContent = '';
  document.getElementById(fieldId).style.borderColor = '';
}

// Live clearing of errors on input
['name', 'email', 'subject', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => clearError(id));
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  let valid = true;

  // Name validation
  if (!name) {
    showError('name', 'Please enter your full name.');
    valid = false;
  } else if (name.length < 2) {
    showError('name', 'Name must be at least 2 characters.');
    valid = false;
  } else {
    clearError('name');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError('email', 'Please enter your email address.');
    valid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address.');
    valid = false;
  } else {
    clearError('email');
  }

  // Subject validation
  if (!subject) {
    showError('subject', 'Please enter a subject.');
    valid = false;
  } else {
    clearError('subject');
  }

  // Message validation
  if (!message) {
    showError('message', 'Please enter your message.');
    valid = false;
  } else if (message.length < 20) {
    showError('message', 'Message should be at least 20 characters.');
    valid = false;
  } else {
    clearError('message');
  }

  if (valid) {
    // Simulate form submission (replace with actual API/emailjs call)
    const btn = contactForm.querySelector('button[type="submit"] span');
    btn.textContent = 'Sending...';

    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Send Message';
      const successMsg = document.getElementById('formSuccess');
      successMsg.classList.remove('hidden');
      setTimeout(() => successMsg.classList.add('hidden'), 4000);
    }, 1500);
  }
});

/* ============================================================
   12. FOOTER YEAR
   ============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   13. DOWNLOAD CV BUTTON
   ============================================================ */
document.getElementById('downloadCV').addEventListener('click', (e) => {
  e.preventDefault();
  // Replace with actual CV file path when available
  // window.open('assets/Sushil_Poudel_CV.pdf', '_blank');
  alert('📄 CV download coming soon! Please reach out via email for now😉.');
});

/* ============================================================
   14. DOTS ANIMATION (Loader)
   ============================================================ */
const dotsEl = document.querySelector('.dots');
if (dotsEl) {
  let dotCount = 0;
  const dotsInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dotsEl.textContent = '.'.repeat(dotCount || 3);
  }, 400);
  setTimeout(() => clearInterval(dotsInterval), 2000);
}

/* ============================================================
   15. STAGGER REVEAL for grid children
   ============================================================ */
// Add staggered delays to skill cards, project cards, cert cards
function addStaggerDelay(selector, delayStep = 80) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = `${i * delayStep}ms`;
  });
}

addStaggerDelay('.skill-card', 60);
addStaggerDelay('.project-card', 100);
addStaggerDelay('.cert-card', 120);
addStaggerDelay('.timeline-item', 150);
