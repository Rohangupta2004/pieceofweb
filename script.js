// ===========================
// NAV SCROLL
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===========================
// MOBILE MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
}

let countersStarted = false;
function startCounters() {
  if (countersStarted) return;
  countersStarted = true;
  document.querySelectorAll('.stat-num').forEach(el => {
    animateCounter(el, parseInt(el.dataset.target, 10));
  });
}

// ===========================
// INTERSECTION OBSERVER — REVEAL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Counter observer
const heroStats = document.getElementById('heroStats');
if (heroStats) {
  const statsObs = new IntersectionObserver((e) => {
    if (e[0].isIntersecting) startCounters();
  }, { threshold: 0.1 });
  statsObs.observe(heroStats);
}
setTimeout(startCounters, 1200);

// ===========================
// TESTIMONIALS SLIDER
// ===========================
const track = document.getElementById('testimonialsTrack');
const tDotsContainer = document.getElementById('tDots');
const cards = track ? Array.from(track.querySelectorAll('.testimonial-card')) : [];
let currentIndex = 0;
let autoTimer = null;

function buildDots() {
  if (!tDotsContainer) return;
  tDotsContainer.innerHTML = '';
  for (let i = 0; i < cards.length; i++) {
    const dot = document.createElement('div');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    tDotsContainer.appendChild(dot);
  }
}

function updateSlider() {
  if (!track) return;
  const w = track.parentElement.offsetWidth;
  track.style.transform = `translateX(-${currentIndex * w}px)`;
  document.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}

function goTo(i) { currentIndex = Math.max(0, Math.min(i, cards.length - 1)); updateSlider(); }
function next() { currentIndex = (currentIndex + 1) % cards.length; updateSlider(); }
function prev() { currentIndex = (currentIndex - 1 + cards.length) % cards.length; updateSlider(); }

document.getElementById('tNext')?.addEventListener('click', next);
document.getElementById('tPrev')?.addEventListener('click', prev);

function startAuto() { autoTimer = setInterval(next, 4500); }
function stopAuto() { clearInterval(autoTimer); }

if (track) {
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) d > 0 ? next() : prev();
  });
}

buildDots();
startAuto();
setTimeout(updateSlider, 100);
window.addEventListener('resize', () => { currentIndex = 0; updateSlider(); });

// ===========================
// BOOKING FORM
// ===========================
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');
const submitBtn = document.getElementById('submitBtn');

bookingForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!bookingForm.checkValidity()) {
    bookingForm.querySelectorAll('input, select').forEach(inp => {
      inp.classList.toggle('error', !inp.checkValidity());
    });
    bookingForm.addEventListener('input', (ev) => {
      if (ev.target.checkValidity()) ev.target.classList.remove('error');
    });
    return;
  }

  const fname = document.getElementById('fname')?.value.trim() || '';
  const lname = document.getElementById('lname')?.value.trim() || '';
  const phone = document.getElementById('phone')?.value.trim() || '';
  const service = document.getElementById('service')?.value || 'General Checkup';
  const date = document.getElementById('apptdate')?.value || '';

  const msg = `Hi PureSmile Dental! I would like to book an appointment.%0A%0A` +
    `Name: ${encodeURIComponent(fname + ' ' + lname)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Service: ${encodeURIComponent(service)}%0A` +
    (date ? `Preferred Date: ${encodeURIComponent(date)}%0A` : '') +
    `%0APlease confirm my slot. Thank you!`;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Opening WhatsApp…';

  setTimeout(() => {
    window.open(`https://wa.me/919876500000?text=${msg}`, '_blank');
    bookingForm.style.display = 'none';
    bookingSuccess.style.display = 'block';
  }, 600);
});

// ===========================
// ACTIVE NAV
// ===========================
const sections = document.querySelectorAll('section[id]');
const navEls = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navEls.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
}, { passive: true });
