const bakeCategories = {
  cakes: 'Cakes for your sweet moments.',
  cookies: 'Cookies, made for sharing.',
  'sugar-cookies': 'Sugar cookies made just for you.',
  pastries: 'A little pastry perfection.',
  bread: 'A place for bread at the table.',
};
const productGrid = document.getElementById('product-grid');
const inquiryPreview = document.getElementById('inquiry-preview');

function makeBakeCard(bake) {
  const card = document.createElement('article');
  card.className = 'product-card';
  const photo = document.createElement('img');
  photo.src = `assets/${bake.image}`;
  photo.alt = bake.alt;
  photo.loading = 'lazy';
  photo.className = 'product-photo';
  if (!bake.name) {
    card.append(photo);
    return card;
  }
  const info = document.createElement('div');
  info.className = 'product-info';
  const title = document.createElement('h3');
  title.className = 'product-name';
  title.textContent = bake.name;
  info.append(title);
  if (bake.croatianName) {
    const subtitle = document.createElement('p');
    subtitle.className = 'product-name-secondary';
    subtitle.textContent = bake.croatianName;
    info.append(subtitle);
  }
  card.append(photo, info);
  return card;
}

function showBakeCategory(bakeryBakes) {
  const requested = window.location.hash.slice(1);
  const category = Object.hasOwn(bakeCategories, requested) ? requested : 'cakes';
  const bakes = bakeryBakes.filter(bake => bake.category === category);
  const gridBakes = bakes.filter(bake => !bake.customOrder);
  productGrid.replaceChildren(...gridBakes.map(makeBakeCard));
  const customCookie = bakes.find(bake => bake.customOrder);
  document.getElementById('custom-cookie-feature').hidden = !customCookie;
  if (customCookie) {
    const customPhoto = document.getElementById('custom-cookie-image');
    customPhoto.src = `assets/${customCookie.image}`;
    customPhoto.alt = customCookie.alt;
  }
  document.getElementById('collection-heading').textContent = bakeCategories[category];
  document.getElementById('collection-count').textContent = gridBakes.length
    ? `${gridBakes.length} ${gridBakes.length === 1 ? 'bake' : 'bakes'} to explore`
    : '';
  document.getElementById('collection-empty').hidden = bakes.length > 0;
  document.getElementById('cake-info').hidden = category !== 'cakes';
  document.getElementById('pastry-info').hidden = category !== 'pastries';
  document.getElementById('cookie-info').hidden = category !== 'cookies';
  document.getElementById('bread-info').hidden = category !== 'bread';
  document.querySelectorAll('[data-category]').forEach(link => {
    if (link.dataset.category === category) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

if (productGrid) {
  showBakeCategory(window.bakeryBakes);
  window.addEventListener('hashchange', () => showBakeCategory(window.bakeryBakes));
}

// Carry the selected bake to the contact page without submitting an order.
if (inquiryPreview) {
  const bakeId = new URLSearchParams(window.location.search).get('bake');
  const bake = window.bakeryBakes.find(item => item.id === bakeId);
  if (bake) {
    inquiryPreview.hidden = false;
    document.getElementById('inquiry-name').textContent = bake.name || 'Bread';
    const photo = document.getElementById('inquiry-image');
    photo.src = `assets/${bake.image}`;
    photo.alt = bake.alt;
  }
}
