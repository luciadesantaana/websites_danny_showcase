const tabs = document.querySelectorAll('.tab');
const listingGrid = document.getElementById('listing-grid');
const contactForm = document.querySelector('.contact-form');
const tabLinks = document.querySelectorAll('.tab-link, .tab-chip');
const tabPanels = document.querySelectorAll('.tab-panel');
const stats = document.querySelectorAll('.stat');
const animatedBlocks = document.querySelectorAll('.animate');

function setActiveTab(targetId) {
  tabPanels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.classList.toggle('active', isActive);
    panel.setAttribute('aria-hidden', !isActive);
  });

  tabLinks.forEach((link) => {
    const isMatch = link.dataset.target === targetId;
    link.classList.toggle('active', isMatch);
    if (link.hasAttribute('aria-selected')) {
      link.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    }
  });

  if (targetId === 'tab-overview') {
    runCounters();
  }
}

function runCounters() {
  stats.forEach((stat) => {
    if (stat.dataset.started) return;
    const numberEl = stat.querySelector('.stat-number');
    const target = Number(stat.dataset.target);
    const duration = 1200;
    const startTime = performance.now();
    stat.dataset.started = 'true';

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(target * progress);
      numberEl.textContent = target >= 100 ? current : current.toFixed(0);
      if (progress < 1) requestAnimationFrame(update);
      else numberEl.textContent = target >= 100 ? target : `${target}B+`;
    }

    requestAnimationFrame(update);
  });
}

function filterListings(type) {
  if (!listingGrid) return;
  const cards = listingGrid.querySelectorAll('.listing-card');
  cards.forEach((card) => {
    const match = type === 'all' || card.dataset.type === type;
    card.style.display = match ? 'flex' : 'none';
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.reset();
    alert('Thanks for reaching out! Danny and the Voro team will respond within one business day.');
  });
}

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
runCounters();

if (tabLinks.length) {
  tabLinks.forEach((link) => {
    link.addEventListener('click', () => setActiveTab(link.dataset.target));
  });
}

if (animatedBlocks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  animatedBlocks.forEach((el) => observer.observe(el));
}
