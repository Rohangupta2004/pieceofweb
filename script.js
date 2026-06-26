// ===========================
// NAV SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

// ===========================
// MOBILE MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
}

let countersStarted = false;
function startCounters() {
  if (countersStarted) return;
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    animateCounter(el, target);
  });
  countersStarted = true;
}

// ===========================
// INTERSECTION OBSERVER
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.service-card, .why-card, .contact-card, .about-feature, .testimonial-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Trigger counters when hero stats are visible
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) startCounters();
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// ===========================
// TESTIMONIALS SLIDER
// ===========================
const track = document.getElementById('testimonialsTrack');
const tDotsContainer = document.getElementById('tDots');
const cards = track ? Array.from(track.querySelectorAll('.testimonial-card')) : [];
let currentIndex = 0;
let cardsPerView = 3;
let autoSlideTimer = null;

function getCardsPerView() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function buildDots() {
  if (!tDotsContainer) return;
  tDotsContainer.innerHTML = '';
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    tDotsContainer.appendChild(dot);
  }
}

function updateSlider() {
  if (!track) return;
  cardsPerView = getCardsPerView();
  const gap = 24;
  const trackWidth = track.parentElement.offsetWidth;
  const cardWidth = (trackWidth - (cardsPerView - 1) * gap) / cardsPerView;
  const offset = currentIndex * (cardWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;
  document.querySelectorAll('.t-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function goToSlide(index) {
  cardsPerView = getCardsPerView();
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
  updateSlider();
}

function nextSlide() {
  cardsPerView = getCardsPerView();
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  cardsPerView = getCardsPerView();
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
}

document.getElementById('tNext')?.addEventListener('click', nextSlide);
document.getElementById('tPrev')?.addEventListener('click', prevSlide);

function startAutoSlide() {
  autoSlideTimer = setInterval(nextSlide, 4500);
}
function stopAutoSlide() {
  clearInterval(autoSlideTimer);
}

if (track) {
  track.addEventListener('mouseenter', stopAutoSlide);
  track.addEventListener('mouseleave', startAutoSlide);
}

// Touch swipe support
let touchStartX = 0;
track?.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
track?.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
});

window.addEventListener('resize', () => {
  cardsPerView = getCardsPerView();
  buildDots();
  currentIndex = 0;
  updateSlider();
});

buildDots();
startAutoSlide();
// Init after slight delay to allow layout
setTimeout(updateSlider, 100);

// ===========================
// BOOKING FORM
// ===========================
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');
const submitBtn = document.getElementById('submitBtn');

bookingForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Sending…';
  setTimeout(() => {
    bookingForm.style.display = 'none';
    bookingSuccess.style.display = 'block';
    bookingSuccess.classList.add('reveal', 'visible');
  }, 1200);
});

// ===========================
// SMOOTH HOVER CARD EFFECTS
// ===========================
document.querySelectorAll('.service-card, .why-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `translateY(-6px) rotateX(${-y * 0.5}deg) rotateY(${x * 0.5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===========================
// ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });
