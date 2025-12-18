const tabs = document.querySelectorAll('.tab');
const listingGrid = document.getElementById('listing-grid');
const contactForm = document.querySelector('.contact-form');
const animatedElements = document.querySelectorAll('.animate');
const counters = document.querySelectorAll('.stat');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.reset();
    alert('Thanks for reaching out! Danny and the Voro team will respond within one business day.');
  });
}

function filterListings(type) {
  if (!listingGrid) return;
  const cards = listingGrid.querySelectorAll('.listing-card');
  cards.forEach((card) => {
    const match = type === 'all' || card.dataset.type === type;
    card.style.display = match ? 'block' : 'none';
  });
}

function animateCount(el, target) {
  const duration = 1200;
  const start = 0;
  const end = Number(target);
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    el.textContent = end >= 100 ? value.toLocaleString() : value;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = end >= 100 ? `${end.toLocaleString()}+` : end;
      el.dataset.done = 'true';
    }
  }

  requestAnimationFrame(tick);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('stat')) {
          const numberEl = entry.target.querySelector('.stat-number');
          if (numberEl && !numberEl.dataset.done) {
            animateCount(numberEl, entry.target.dataset.target || numberEl.textContent);
          }
        }
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

animatedElements.forEach((el) => observer.observe(el));
counters.forEach((el) => observer.observe(el));

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((btn) => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-pressed', 'true');
    filterListings(tab.dataset.filter);
  });
});

filterListings('all');
