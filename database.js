/**
 * CampusStay Hub — Accommodation Database
 * All data stored as JS objects (client-side)
 * Future: migrate to MySQL / MongoDB backend
 */

const DB = {

  /* ========== ACCOMMODATIONS ========== */
  accommodations: [
    {
      id: 1,
      name: "Victoria Mews Hotel",
      type: "hotel",
      location: "Kampala",
      distance: "0.3 km from VU",
      price: 148000,
      priceLabel: "UGX 148,000 / night",
      contact: "+256 709 719 140",
      whatsapp: "256709719140",
      email: "info@victoriamews.ug",
      amenities: ["Wi-Fi", "Breakfast", "AC", "24hr Security", "Parking", "Hot Water"],
      description: "A clean, well-managed hotel minutes from Victoria University main campus. Ideal for students and visiting academics seeking comfort at an affordable rate. Rooms come with free Wi-Fi, breakfast, and 24-hour security.",
      rating: 4.5,
      reviews: 38,
      image: "victoria.jpg",
      emoji: "🏨",
      featured: true
    },
    {
      id: 2,
      name: "Galaxy Motel",
      type: "motel",
      location: "Kampala",
      distance: "0.5 km from VU",
      price: 83000,
      priceLabel: "UGX 83,000 / night",
      contact: "+256 701 333 444",
      whatsapp: "256707888192",
      email: "booking@galaxymotel.ug",
      amenities: ["Wi-Fi", "Parking", "Hot Water", "TV", "24hr Security"],
      description: "A budget-friendly motel conveniently located on Makerere Hill Road. Popular with students for its proximity to Victoria University and competitive nightly rates. Clean rooms with all basic amenities.",
      rating: 4.0,
      reviews: 52,
      image: "galaxy.jpg",
      emoji: "🏩",
      featured: true
    },
    {
      id: 3,
      name: "Diamonds Hotel",
      type: "hotel",
      location: "Hanifa towers,Kampala",
      distance: "0.2 km from VU",
      price: 230000,
      priceLabel: "UGX 230,000 / month",
      contact: "+256 702 555 666",
      whatsapp: "256702555666",
      email: "diamondhotel@ug.com",
      amenities: ["Wi-Fi", "Study Room", "Shared Kitchen", "Laundry", "24hr Security"],
      description: "The most affordable hostel directly next to Victoria University. Offers monthly room rental with shared facilities including a dedicated study room and laundry area. Very popular with first-year students.",
      rating: 4.2,
      reviews: 97,
      image: "diamond.webp",
      emoji: "🏠",
      featured: true
    },
    {
      id: 4,
      name: "Galaxy Guest House",
      type: "motel",
      location: "Kampala",
      distance: "1.1 km from VU",
      price: 89700,
      priceLabel: "UGX 89,700 / night",
      contact: "+256 704 613 798",
      whatsapp: "256704613798",
      email: "galaxyguesthouse@gmail.com",
      amenities: ["Parking", "Hot Water", "TV", "24hr Security"],
      description: "An economical motel option located in Bwaise, a short boda-boda ride from Victoria University. Simple, clean rooms at the lowest nightly rates in the area. Ideal for short stays.",
      rating: 3.7,
      reviews: 24,
      image: "guest.jpg",
      emoji: "🏩",
      featured: false
    },
    {
      id: 5,
      name: "JBK Hotel",
      type: "hotel",
      location: "Kampala",
      distance: "0.7 km from VU",
      price: 180000,
      priceLabel: "UGX 180,000 / month",
      contact: "+256 704 999 000",
      whatsapp: "256704999000",
      email: "JBKHostel@gmail.com",
      amenities: ["Wi-Fi", "Shared Kitchen", "Locker Storage", "24hr Security", "Common Room"],
      description: "A lively backpacker-style hostel in Kivulu catering largely to university students. Monthly rates include Wi-Fi, use of the shared kitchen, and access to a comfortable common room for socialising and studying.",
      rating: 4.1,
      reviews: 63,
      image: "jbk.jpg",
      emoji: "🏠",
      featured: true
    },
    {
      id: 6,
      name: "Namayiba park Hotel",
      type: "hotel",
      location: "Kampala",
      distance: "0.8 km from VU",
      price: 166000,
      priceLabel: "UGX 166,000 / night",
      contact: "+256 705 123 456",
      whatsapp: "256705123456",
      email: "namayiba@parkhotel.ug",
      amenities: ["Wi-Fi", "Restaurant", "AC", "Parking", "Conference Room", "Hot Water"],
      description: "A mid-range hotel on Makerere Hill offering excellent facilities for students and researchers visiting Victoria University. Includes an on-site restaurant and conference facilities for academic events.",
      rating: 4.4,
      reviews: 41,
      image: "namayiba.jpg",
      emoji: "🏨",
      featured: false
    },
    {
      id: 7,
      name: "Grand Plaza Hotel",
      type: "hotel",
      location: "Kampala",
      distance: "1.2 km from VU",
      price: 169000,
      priceLabel: "UGX 169,000 / month",
      contact: "+256 706 234 567",
      whatsapp: "256706234567",
      email: "grandplaza@gmail.com",
      amenities: ["Wi-Fi", "Study Room", "AC", "Laundry", "Gym", "24hr Security"],
      description: "A premium student residence near Mulago offering spacious self-contained rooms. Monthly rental includes access to a well-equipped study room, gymnasium, and laundry facilities. Shuttle service to VU available.",
      rating: 4.6,
      reviews: 55,
      image: "Grand.jpg",
      emoji: "🏠",
      featured: true
    },
    {
      id: 8,
      name: "Morgen Breeze Tours & Backpackers",
      type: "motel",
      location: "Kampala",
      distance: "1.5 km from VU",
      price: 61000,
      priceLabel: "UGX 61,000 / night",
      contact: "+256 707 345 678",
      whatsapp: "256707345678",
      email: "morgenmotel@gmail.com",
      amenities: ["Parking", "Hot Water", "TV"],
      description: "A simple transit motel in Kalerwe, suitable for short stays near Victoria University. Offers basic comfortable rooms at very accessible prices. Close to public transport routes.",
      rating: 3.5,
      reviews: 18,
      image: "morgen.jpg",
      emoji: "🏩",
      featured: false
    },
    {
      id: 9,
      name: "Jeliza Hotel Co.Ltd",
      type: "hotel",
      location: "Kampala",
      distance: "0.4 km from VU",
      price: 196000,
      priceLabel: "UGX 196,000 / night",
      contact: "+256 708 456 789",
      whatsapp: "256708456789",
      email: "jelizaCo@gmail.com",
      amenities: ["Wi-Fi", "Breakfast", "Hot Water", "TV", "24hr Security", "Parking"],
      description: "A highly regarded guesthouse in Wandegeya catering specifically to visitors of Victoria University. Located a short walk from the main campus gate with consistent positive reviews for cleanliness and hospitality.",
      rating: 4.3,
      reviews: 72,
      image: "jeliza.jpg",
      emoji: "🏨",
      featured: true
    }
  ],

  /* ========== USERS (in-memory session store) ========== */
  users: [],

  /* ========== CONTACT MESSAGES ========== */
  messages: [],

  /* ========== LISTINGS SUBMITTED ========== */
  submissions: [],

  /* ========== HELPER METHODS ========== */

  getAll() {
    return this.accommodations;
  },

  getById(id) {
    return this.accommodations.find(a => a.id === parseInt(id)) || null;
  },

  getFeatured() {
    return this.accommodations.filter(a => a.featured);
  },

  search(query, type, maxPrice) {
    const q = query.toLowerCase().trim();
    return this.accommodations.filter(a => {
      const matchesQuery = !q ||
        a.name.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q);

      const matchesType = !type || type === 'all' || a.type === type;

      const matchesPrice = !maxPrice || a.price <= parseInt(maxPrice);

      return matchesQuery && matchesType && matchesPrice;
    });
  },

  registerUser(name, email, password) {
    const exists = this.users.find(u => u.email === email);
    if (exists) return { success: false, message: 'Email already registered.' };
    const user = { id: this.users.length + 1, name, email, password, createdAt: new Date() };
    this.users.push(user);
    return { success: true, user };
  },

  loginUser(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid email or password.' };
    return { success: true, user };
  },

  saveMessage(name, email, subject, message) {
    const msg = { id: this.messages.length + 1, name, email, subject, message, createdAt: new Date() };
    this.messages.push(msg);
    return { success: true };
  },

  saveListing(data) {
    const listing = { id: this.submissions.length + 1, ...data, status: 'pending', createdAt: new Date() };
    this.submissions.push(listing);
    return { success: true, listing };
  }
};

// Session management helpers
const Session = {
  set(user) {
    try { localStorage.setItem('csh_user', JSON.stringify(user)); } catch(e) {}
    window._cshUser = user;
  },
  get() {
    try {
      const s = localStorage.getItem('csh_user');
      return s ? JSON.parse(s) : (window._cshUser || null);
    } catch(e) { return window._cshUser || null; }
  },
  clear() {
    try { localStorage.removeItem('csh_user'); } catch(e) {}
    window._cshUser = null;
  },
  isLoggedIn() { return !!this.get(); }
};
