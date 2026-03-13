// ===================== HEADER SCROLL =====================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ===================== BURGER MENU =====================
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  burger.classList.toggle('active');
  if (nav.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===================== SERVICES TABS =====================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('tab-btn--active'));
    tabContents.forEach(c => c.classList.remove('tab-content--active'));
    btn.classList.add('tab-btn--active');
    document.getElementById('tab-' + target).classList.add('tab-content--active');
  });
});

// ===================== PORTFOLIO FILTER =====================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');
    portfolioCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('portfolio-card--hidden');
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        card.classList.add('portfolio-card--hidden');
      }
    });
  });
});

// ===================== COUNTER ANIMATION =====================
function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}
const counters = document.querySelectorAll('.stat-item__num');
let countersStarted = false;
const statsSection = document.querySelector('.hero__stats');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(animateCount);
    }
  });
}, { threshold: 0.3 });
if (statsSection) observer.observe(statsSection);

// ===================== FORM SUBMIT =====================
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.querySelector('#name');
  const phone = form.querySelector('#phone');
  let valid = true;
  [name, phone].forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    } else {
      field.classList.remove('error');
    }
  });
  if (!valid) return;
  // Simulate send
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Отправляем...';
  btn.disabled = true;
  setTimeout(() => {
    formSuccess.classList.add('visible');
    form.reset();
    btn.textContent = 'Отправить заявку';
    btn.disabled = false;
    setTimeout(() => formSuccess.classList.remove('visible'), 5000);
  }, 1000);
});
form.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('error'));
});

// ===================== SMOOTH ACTIVE NAV =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ===================== PHONE MASK =====================
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('8')) val = '7' + val.slice(1);
    if (val.startsWith('7') && val.length > 0) {
      let res = '+7';
      if (val.length > 1) res += ' (' + val.slice(1, 4);
      if (val.length >= 4) res += ') ' + val.slice(4, 7);
      if (val.length >= 7) res += '-' + val.slice(7, 9);
      if (val.length >= 9) res += '-' + val.slice(9, 11);
      e.target.value = res;
    }
  });
}
