/**
 * CampusStay Hub — Main JavaScript
 * Handles: navbar, toast, search/filter, card rendering, shared helpers
 */

/* ===================== HELPERS ===================== */

function showToast(msg, type = 'blue') {
  let toast = document.getElementById('csh-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'csh-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'toast ' + type;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3200);
}

function getTypeBadge(type) {
  const map = { hotel: 'badge-hotel', motel: 'badge-motel', hostel: 'badge-hostel' };
  return `<span class="card-type-badge ${map[type] || ''}">${type}</span>`;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (half) s += '½';
  return `<span style="color:#f59e0b;font-size:13px">${s} <span style="color:#888">${rating} (${0} reviews)</span></span>`;
}

function renderCard(acc, onDetailsFn) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = acc.id;

  const imgHTML = acc.image
    ? `<img src="${acc.image}" alt="${acc.name}" style="width:100%;height:180px;object-fit:cover;">`
    : `<div class="card-img" style="font-size:52px;">${acc.emoji || '🏨'}</div>`;

  card.innerHTML = `
    ${imgHTML}
    <div class="card-body">
      ${getTypeBadge(acc.type)}
      <h3>${acc.name}</h3>
      <p class="location">📍 ${acc.location}</p>
      <p style="font-size:12px;color:#888;margin-bottom:6px;">🎓 ${acc.distance}</p>
      <p class="price">${acc.priceLabel}</p>
      <button>View Details</button>
    </div>`;

  card.querySelector('button').addEventListener('click', () => {
    if (onDetailsFn) {
      onDetailsFn(acc.id);
    } else {
      window.location.href = `details.html?id=${acc.id}`;
    }
  });

  return card;
}

/* ===================== NAVBAR ===================== */

function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');

  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => navUl.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) navUl.classList.remove('open');
    });
  }

  // Highlight active link
  const links = document.querySelectorAll('nav ul li a');
  const page = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });

  // Auth state
  updateNavAuth();
}

function updateNavAuth() {
  const user = Session.get();
  const loginBtn = document.querySelector('.login');
  const signupBtn = document.querySelector('.signup');

  if (user) {
    if (loginBtn) {
      loginBtn.textContent = user.name.split(' ')[0];
      loginBtn.onclick = () => { Session.clear(); window.location.reload(); };
    }
    if (signupBtn) signupBtn.textContent = 'Logout';
    if (signupBtn) signupBtn.onclick = () => { Session.clear(); window.location.reload(); };
  } else {
    if (loginBtn) { loginBtn.textContent = 'Login'; loginBtn.onclick = () => window.location.href = 'login.html'; }
    if (signupBtn) { signupBtn.textContent = 'Sign Up'; signupBtn.onclick = () => window.location.href = 'signup.html'; }
  }
}

/* ===================== INDEX PAGE ===================== */

function initIndexPage() {
  const container = document.getElementById('featured-cards');
  if (!container) return;

  const featured = DB.getFeatured().slice(0, 6);
  featured.forEach(acc => container.appendChild(renderCard(acc)));

  // Hero search
  const heroSearch = document.getElementById('hero-search');
  const heroType = document.getElementById('hero-type');
  const heroPrice = document.getElementById('hero-price');
  const heroBtn = document.getElementById('hero-search-btn');

  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      const q = heroSearch ? heroSearch.value : '';
      const t = heroType ? heroType.value : '';
      const p = heroPrice ? heroPrice.value : '';
      window.location.href = `listings.html?q=${encodeURIComponent(q)}&type=${t}&price=${p}`;
    });
  }
}

/* ===================== LISTINGS PAGE ===================== */

function initListingsPage() {
  const container = document.getElementById('listings-cards');
  if (!container) return;

  const searchInput = document.getElementById('search-input');
  const typeFilter = document.getElementById('type-filter');
  const priceFilter = document.getElementById('price-filter');
  const clearBtn = document.getElementById('clear-filters');

  // Pre-fill from URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('q') && searchInput) searchInput.value = params.get('q');
  if (params.get('type') && typeFilter) typeFilter.value = params.get('type');
  if (params.get('price') && priceFilter) priceFilter.value = params.get('price');

  function applyFilters() {
    const q = searchInput ? searchInput.value : '';
    const type = typeFilter ? typeFilter.value : '';
    const price = priceFilter ? priceFilter.value : '';
    const results = DB.search(q, type, price);

    container.innerHTML = '';

    if (results.length === 0) {
      container.innerHTML = `
        <div class="no-results" style="width:100%">
          <div class="icon">🔍</div>
          <p>No accommodations found. Try adjusting your filters.</p>
        </div>`;
      return;
    }

    results.forEach(acc => container.appendChild(renderCard(acc)));
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (typeFilter) typeFilter.addEventListener('change', applyFilters);
  if (priceFilter) priceFilter.addEventListener('change', applyFilters);
  if (clearBtn) clearBtn.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (typeFilter) typeFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    applyFilters();
  });

  applyFilters();
}

/* ===================== DETAILS PAGE ===================== */

function initDetailsPage() {
  const container = document.getElementById('details-root');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const acc = id ? DB.getById(id) : null;

  if (!acc) {
    container.innerHTML = `<div class="no-results"><div class="icon">😕</div><p>Accommodation not found.</p></div>`;
    return;
  }

  document.title = `${acc.name} — CampusStay Hub`;

  const amenitiesHTML = acc.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('');

  const imgHTML = acc.image
    ? `<img src="${acc.image}" alt="${acc.name}">`
    : `<div class="img-placeholder">${acc.emoji || '🏨'}</div>`;

  container.innerHTML = `
    <a href="listings.html" class="back-btn">← Back to Listings</a>
    <div class="details-image">${imgHTML}</div>
    <div class="details-info">
      ${getTypeBadge(acc.type)}
      <h2>${acc.name}</h2>
      <div class="details-meta">
        <span>📍 ${acc.location}</span>
        <span>🎓 ${acc.distance}</span>
        <span>⭐ ${acc.rating} (${acc.reviews} reviews)</span>
      </div>
      <p class="price-large">${acc.priceLabel}</p>
      <p>${acc.description}</p>
      <div class="amenities">
        <h4>Amenities & Features</h4>
        <div class="amenity-tags">${amenitiesHTML}</div>
      </div>
      <div class="contact-buttons">
        <a href="tel:${acc.contact}" class="contact-btn">📞 Call Now</a>
        <a href="https://wa.me/${acc.whatsapp}" target="_blank" class="whatsapp-btn">💬 WhatsApp</a>
        <a href="mailto:${acc.email}" class="contact-btn">✉ Email</a>
      </div>
    </div>`;
}

/* ===================== LOGIN PAGE ===================== */

function initLoginPage() {
  const form = document.getElementById('login-form');
  if (!form) return;

  if (Session.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const alert = document.getElementById('login-alert');

    const result = DB.loginUser(email, password);
    if (result.success) {
      Session.set(result.user);
      showToast(`Welcome back, ${result.user.name}! 🎉`, 'green');
      setTimeout(() => window.location.href = 'index.html', 800);
    } else {
      if (alert) { alert.textContent = result.message; alert.className = 'alert error show'; }
    }
  });
}

/* ===================== SIGNUP PAGE ===================== */

function initSignupPage() {
  const form = document.getElementById('signup-form');
  if (!form) return;

  if (Session.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const alert = document.getElementById('signup-alert');

    if (password !== confirm) {
      if (alert) { alert.textContent = 'Passwords do not match.'; alert.className = 'alert error show'; }
      return;
    }

    const result = DB.registerUser(name, email, password);
    if (result.success) {
      Session.set(result.user);
      showToast(`Account created! Welcome, ${name}! 🎉`, 'green');
      setTimeout(() => window.location.href = 'index.html', 800);
    } else {
      if (alert) { alert.textContent = result.message; alert.className = 'alert error show'; }
    }
  });
}

/* ===================== CONTACT PAGE ===================== */

function initContactPage() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value.trim();
    const message = document.getElementById('c-message').value.trim();
    const alert = document.getElementById('contact-alert');

    DB.saveMessage(name, email, subject, message);
    if (alert) { alert.textContent = '✅ Your message has been sent. We will get back to you shortly!'; alert.className = 'alert success show'; }
    form.reset();
    showToast('Message sent successfully!', 'green');
  });
}

/* ===================== POST LISTING PAGE ===================== */

function initPostPage() {
  const form = document.getElementById('post-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById('p-name').value.trim(),
      type: document.getElementById('p-type').value,
      location: document.getElementById('p-location').value.trim(),
      price: document.getElementById('p-price').value.trim(),
      contact: document.getElementById('p-contact').value.trim(),
      email: document.getElementById('p-email').value.trim(),
      description: document.getElementById('p-description').value.trim()
    };

    const alert = document.getElementById('post-alert');
    DB.saveListing(data);
    if (alert) { alert.textContent = '✅ Your listing has been submitted for review. We will contact you within 24 hours.'; alert.className = 'alert success show'; }
    form.reset();
    showToast('Listing submitted successfully!', 'green');
  });
}

/* ===================== INIT ===================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initIndexPage();
  initListingsPage();
  initDetailsPage();
  initLoginPage();
  initSignupPage();
  initContactPage();
  initPostPage();
});
