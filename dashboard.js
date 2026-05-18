// dashboard.js — simple dashboard population logic

(function () {
  'use strict';

  const formatCurrency = amount => MOS.formatCurrency(amount || 0);
  const getById = id => document.getElementById(id);

  const updateStats = () => {
    const items = MOS.getItems();
    const customers = MOS.getCustomers();
    const orders = MOS.getOrders();

    const totalItems = items.length;
    const totalCustomers = customers.length;
    const totalOrders = orders.length;

    const today = MOS.getTodayStr();
    const todayOrders = orders.filter(o => o.date === today);
    const todayOrderCount = todayOrders.length;
    const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.finalAmount || o.total || 0), 0);

    const totalItemsEl = getById('totalItems');
    const totalCustomersEl = getById('totalCustomers');
    const totalOrdersEl = getById('totalOrders');
    const todayOrderCountEl = getById('todayOrderCount');
    const todayRevenueEl = getById('todayRevenue');

    if (totalItemsEl) totalItemsEl.textContent = totalItems;
    if (totalCustomersEl) totalCustomersEl.textContent = totalCustomers;
    if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
    if (todayOrderCountEl) todayOrderCountEl.textContent = todayOrderCount;
    if (todayRevenueEl) todayRevenueEl.textContent = formatCurrency(todayRevenue);
  };

  const populateRecentOrders = () => {
    const orders = MOS.getOrders();
    const tbody = getById('recentOrdersBody');
    if (!tbody || !orders.length) return;

    tbody.innerHTML = '';
    orders.slice().reverse().slice(0, 8).forEach(order => {
      const tr = document.createElement('tr');
      const tdId = document.createElement('td');
      tdId.textContent = order.orderId || order.id || '-';
      const tdCustomer = document.createElement('td');
      tdCustomer.textContent = order.customerName || order.customerId || '-';
      const tdAmount = document.createElement('td');
      tdAmount.textContent = MOS.formatCurrency(order.finalAmount || order.total || 0);
      const tdDate = document.createElement('td');
      tdDate.textContent = MOS.formatDate(order.date || order.createdAt);

      tr.append(tdId, tdCustomer, tdAmount, tdDate);
      tbody.appendChild(tr);
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (typeof MOS !== 'undefined' && MOS.seedData) MOS.seedData();

    updateStats();
    populateRecentOrders();

    document.addEventListener('mos:dataChanged', () => {
      updateStats();
      populateRecentOrders();
    });
  });
})();
