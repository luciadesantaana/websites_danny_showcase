const listings = [
  {
    id: 'uws-1',
    address: '215 West 92nd St #7B, Upper West Side',
    type: 'co-op',
    price: 1295000,
    beds: 2,
    baths: 2,
    sqft: 1150,
    ppsf: 1126,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    comps: [
      { address: '205 W 95th St #8D', price: 1250000, sqft: 1120 },
      { address: '215 W 92nd St #5C', price: 1325000, sqft: 1175 },
    ],
  },
  {
    id: 'lincoln-1',
    address: '50 Riverside Blvd #22M, Lincoln Square',
    type: 'condo',
    price: 2180000,
    beds: 2,
    baths: 2,
    sqft: 1240,
    ppsf: 1758,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    comps: [
      { address: '10 Riverside Blvd #18J', price: 2120000, sqft: 1205 },
      { address: '50 Riverside Blvd #20H', price: 2250000, sqft: 1280 },
    ],
  },
  {
    id: 'flatiron-1',
    address: '31 East 22nd St #14A, Flatiron',
    type: 'condo',
    price: 3450000,
    beds: 3,
    baths: 2,
    sqft: 1780,
    ppsf: 1938,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    comps: [
      { address: '50 Gramercy Park N #6B', price: 3320000, sqft: 1700 },
      { address: '15 W 18th St #8E', price: 3585000, sqft: 1825 },
    ],
  },
  {
    id: 'soho-1',
    address: '120 Wooster St #4F, SoHo',
    type: 'condo',
    price: 4150000,
    beds: 2,
    baths: 2,
    sqft: 1950,
    ppsf: 2128,
    image: 'https://images.unsplash.com/photo-1512914890250-353c97c9e7cc?auto=format&fit=crop&w=1200&q=80',
    comps: [
      { address: '100 Prince St #6E', price: 4020000, sqft: 1905 },
      { address: '158 Mercer St #5A', price: 4295000, sqft: 2025 },
    ],
  },
  {
    id: 'tribeca-1',
    address: '270 Greenwich St #18B, Tribeca',
    type: 'condo',
    price: 2950000,
    beds: 2,
    baths: 2,
    sqft: 1450,
    ppsf: 2034,
    image: 'https://images.unsplash.com/photo-1529429617124-aeeae885b051?auto=format&fit=crop&w=1200&q=80',
    comps: [
      { address: '200 Chambers St #14G', price: 2850000, sqft: 1420 },
      { address: '270 Greenwich St #16C', price: 3025000, sqft: 1485 },
    ],
  },
  {
    id: 'gramercy-1',
    address: '121 East 23rd St #8K, Gramercy',
    type: 'co-op',
    price: 1150000,
    beds: 1,
    baths: 1,
    sqft: 810,
    ppsf: 1420,
    image: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1200&q=80',
    comps: [
      { address: '142 E 16th St #6B', price: 1080000, sqft: 780 },
      { address: '201 E 21st St #11D', price: 1135000, sqft: 820 },
    ],
  },
  {
    id: 'fidi-1',
    address: '15 Broad St #2504, Financial District',
    type: 'condo',
    price: 1675000,
    beds: 2,
    baths: 2,
    sqft: 1350,
    ppsf: 1241,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    comps: [
      { address: '20 Pine St #2303', price: 1590000, sqft: 1320 },
      { address: '75 Wall St #32B', price: 1710000, sqft: 1365 },
    ],
  },
  {
    id: 'uws-2',
    address: '120 West 72nd St #9C, Upper West Side',
    type: 'townhouse',
    price: 4895000,
    beds: 4,
    baths: 3,
    sqft: 3100,
    ppsf: 1579,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    comps: [
      { address: '145 W 71st St #TH', price: 4750000, sqft: 3000 },
      { address: '118 W 74th St #PH', price: 5050000, sqft: 3180 },
    ],
  },
];

const heroButtons = document.querySelectorAll('.hero-actions button');
const filterChips = document.querySelectorAll('.chip');
const listingGrid = document.getElementById('listing-grid');
const compTable = document.getElementById('comp-table');
const statCount = document.getElementById('stat-count');
const statPrice = document.getElementById('stat-price');
const statPps = document.getElementById('stat-pps');
const contactForm = document.querySelector('.contact-form');

function formatMoney(value) {
  return `$${value.toLocaleString()}`;
}

function renderListings(type = 'all') {
  const filtered = listings.filter((item) => type === 'all' || item.type === type);
  listingGrid.innerHTML = filtered
    .map((item) => {
      const compMarkup = item.comps
        .map((comp) => `<div class="comp-item"><strong>${comp.address}</strong><span>${formatMoney(comp.price)} · ${comp.sqft} ft²</span></div>`)
        .join('');

      return `
        <article class="listing-card" data-type="${item.type}">
          <div class="badge-row">
            <span class="badge">${item.type}</span>
            <span class="badge">Newest</span>
          </div>
          <img src="${item.image}" alt="Listing at ${item.address}" />
          <div class="listing-body">
            <div class="address">${item.address}</div>
            <div class="price-line">
              <span class="price">${formatMoney(item.price)}</span>
              <span class="price-label">estimated ask</span>
            </div>
            <div class="meta-row">
              <span>${item.beds} bd</span>
              <span>${item.baths} ba</span>
              <span>${item.sqft.toLocaleString()} ft²</span>
              <span class="tag">$${item.ppsf.toLocaleString()}/ft²</span>
            </div>
            <div class="comp-list" aria-label="Comparable sales">
              ${compMarkup}
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  updateStats(filtered);
}

function renderComps() {
  const rows = listings.flatMap((item) =>
    item.comps.map((comp) => ({
      source: item.address,
      ...comp,
      ppsf: Math.round(comp.price / comp.sqft),
    }))
  );

  const header = `<div class="comp-row header"><div>Address</div><div>Price</div><div>Footage</div><div>$ / ft²</div></div>`;
  const body = rows
    .map(
      (row) =>
        `<div class="comp-row"><div>${row.address}</div><div>${formatMoney(row.price)}</div><div>${row.sqft.toLocaleString()} ft²</div><div>$${row.ppsf.toLocaleString()}</div></div>`
    )
    .join('');

  compTable.innerHTML = header + body;
}

function updateStats(current) {
  const count = current.length;
  const avgPrice = Math.round(current.reduce((sum, i) => sum + i.price, 0) / Math.max(count, 1));
  const avgPpsf = Math.round(current.reduce((sum, i) => sum + i.ppsf, 0) / Math.max(count, 1));
  statCount.textContent = count;
  statPrice.textContent = formatMoney(avgPrice);
  statPps.textContent = `$${avgPpsf.toLocaleString()}`;
}

function setFilter(type) {
  filterChips.forEach((chip) => chip.classList.toggle('active', chip.dataset.filter === type));
  heroButtons.forEach((btn) => btn.classList.toggle('primary', btn.dataset.filter === type || (type === 'all' && btn.dataset.filter === 'all')));
  renderListings(type);
}

heroButtons.forEach((btn) => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));
filterChips.forEach((chip) => chip.addEventListener('click', () => setFilter(chip.dataset.filter)));

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.reset();
    alert('Thanks for reaching out. Expect a reply with comps within one business day.');
  });
}

renderListings('all');
renderComps();
