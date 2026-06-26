// Shared nav scroll effect for inner pages
const navbar = document.getElementById('navbar');
if (navbar) {
  // Inner pages start scrolled
  navbar.classList.add('scrolled');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.add('scrolled'); // always keep white on inner pages
  }, { passive: true });
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => {
  revealObserver.observe(el);
});
