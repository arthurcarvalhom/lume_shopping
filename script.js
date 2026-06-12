/* ===========================
   LUME SHOPPING — script.js
   =========================== */

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- BURGER MENU ----
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- PIXEL RAIN (HERO) ----
const pixelRain = document.getElementById('pixelRain');
const COLORS = ['#5DC45A', '#FFD700', '#7EFF7A', '#58a7ff', '#ff5078', '#c864ff', '#ff8c00'];

function createPixel(container) {
  const el = document.createElement('div');
  el.className = 'pixel-drop';
  el.style.left = Math.random() * 100 + '%';
  el.style.top = '-20px';
  el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
  el.style.opacity = (Math.random() * 0.5 + 0.2).toString();
  const size = Math.random() * 8 + 4;
  el.style.width = size + 'px';
  el.style.height = size + 'px';
  const dur = Math.random() * 8 + 6;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = Math.random() * 5 + 's';
  container.appendChild(el);
  setTimeout(() => el.remove(), (dur + 5) * 1000);
}

if (pixelRain) {
  // Initial burst
  for (let i = 0; i < 30; i++) createPixel(pixelRain);
  setInterval(() => createPixel(pixelRain), 400);
}

// ---- CTA PIXELS ----
const ctaPixels = document.getElementById('ctaPixels');
if (ctaPixels) {
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      width: ${Math.random() * 10 + 4}px;
      height: ${Math.random() * 10 + 4}px;
      border-radius: 2px;
      background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
      opacity: ${Math.random() * 0.15 + 0.05};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 4 + 3}s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
    `;
    ctaPixels.appendChild(el);
  }
}

// ---- GALLERY TABS ----
const tabs = document.querySelectorAll('.gallery-tab');
const panels = document.querySelectorAll('.gallery-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById('panel-' + tab.dataset.tab);
    if (target) {
      target.classList.add('active');
      // Animate items in
      target.querySelectorAll('.gallery-item').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(12px)';
        setTimeout(() => {
          item.style.transition = 'all 0.35s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 60);
      });
    }
  });
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
  '.skill-card, .edu-card, .step-item, .sobre-card-wrap, .sobre-text, .minecraft-card'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// Stagger skill cards
document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.08) + 's';
});
document.querySelectorAll('.edu-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.1) + 's';
});

// ---- SMOOTH ANCHOR SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--green)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ---- GALLERY PLACEHOLDER CLICK ----
document.querySelectorAll('.gallery-placeholder').forEach(ph => {
  ph.addEventListener('click', () => {
    const label = ph.querySelector('span')?.textContent || 'imagem';
    // Simple visual feedback — pulse border
    ph.style.borderStyle = 'solid';
    ph.style.transition = 'border-color 0.2s';
    setTimeout(() => { ph.style.borderStyle = 'dashed'; }, 300);
    // Tooltip hint
    showToast(`Adicione uma imagem real de: ${label}`);
  });
});

// ---- TOAST ----
function showToast(msg) {
  let toast = document.getElementById('lume-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lume-toast';
    toast.style.cssText = `
      position: fixed; bottom: 28px; left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #1A2340;
      border: 1px solid rgba(93,196,90,0.4);
      color: #F4F8FF;
      font-family: 'Nunito', sans-serif;
      font-size: 14px; font-weight: 700;
      padding: 12px 24px;
      border-radius: 10px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      z-index: 999;
      opacity: 0;
      transition: all 0.3s ease;
      white-space: nowrap;
      max-width: 90vw;
      text-align: center;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = '💡 ' + msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(12px)';
  }, 3000);
}
