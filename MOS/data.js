var MOS = {

  getItems: function() {
    var raw = localStorage.getItem('mos_items');
    return raw ? JSON.parse(raw) : [];
  },

  saveItems: function(items) {
    localStorage.setItem('mos_items', JSON.stringify(items));
  },

  getCustomers: function() {
    var raw = localStorage.getItem('mos_customers');
    return raw ? JSON.parse(raw) : [];
  },

  saveCustomers: function(customers) {
    localStorage.setItem('mos_customers', JSON.stringify(customers));
  },

  getOrders: function() {
    var raw = localStorage.getItem('mos_orders');
    return raw ? JSON.parse(raw) : [];
  },

  saveOrders: function(orders) {
    localStorage.setItem('mos_orders', JSON.stringify(orders));
  },

  generateId: function(prefix) {
    var num = Date.now().toString().slice(-6);
    return prefix + num;
  },

  formatCurrency: function(amount) {
    return 'Rs. ' + parseFloat(amount).toFixed(2);
  },

  formatDate: function(dateStr) {
    if (!dateStr) return '-';
    var d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  },

  getTodayStr: function() {
    return new Date().toISOString().split('T')[0];
  },

  showToast: function(msg, type) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'success');
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(function() {
      toast.classList.add('show');
    });

    setTimeout(function() {
      toast.classList.remove('show');
      setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
  },

  seedData: function() {
    var items = MOS.getItems();
    if (items.length > 0) return;

    var sampleItems = [
      { code: 'B1001', name: 'Classic Burger', category: 'Burgers', price: 750, discount: 0, quantity: 50, expiryDate: '2026-08-01' },
      { code: 'B1002', name: 'Cheese Burger', category: 'Burgers', price: 850, discount: 10, quantity: 40, expiryDate: '2026-08-01' },
      { code: 'B1003', name: 'Spicy Chicken Burger', category: 'Burgers', price: 900, discount: 5, quantity: 35, expiryDate: '2026-07-15' },
      { code: 'C1001', name: 'Crispy Chicken', category: 'Chicken', price: 650, discount: 0, quantity: 60, expiryDate: '2026-07-20' },
      { code: 'S1001', name: 'Loaded Fries', category: 'Sides', price: 350, discount: 0, quantity: 80, expiryDate: '2026-09-01' },
      { code: 'S1002', name: 'Onion Rings', category: 'Sides', price: 300, discount: 0, quantity: 70, expiryDate: '2026-09-01' },
      { code: 'D1001', name: 'Cola', category: 'Drinks', price: 200, discount: 0, quantity: 100, expiryDate: '2026-12-31' },
      { code: 'D1002', name: 'Milkshake', category: 'Drinks', price: 450, discount: 0, quantity: 45, expiryDate: '2026-06-15' }
    ];

    MOS.saveItems(sampleItems);

    var sampleCustomers = [
      { id: 'C001', name: 'Kasun Perera', phone: '0771234567', email: 'kasun@email.com', joinDate: '2026-01-15' },
      { id: 'C002', name: 'Nimasha Silva', phone: '0712345678', email: 'nimasha@email.com', joinDate: '2026-02-10' },
      { id: 'C003', name: 'Ashan Fernando', phone: '0759876543', email: 'ashan@email.com', joinDate: '2026-03-05' }
    ];

    MOS.saveCustomers(sampleCustomers);
  }

};