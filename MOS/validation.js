// validation.js — simple client-side validators for items and customers
(function () {
  'use strict';

  const validateItem = item => {
    const errors = [];

    if (!item.code || !item.code.trim()) {
      errors.push('Item code is required');
    }
    if (!item.name || !item.name.trim()) {
      errors.push('Item name is required');
    }
    if (!item.category || !item.category.trim()) {
      errors.push('Category is required');
    }
    if (isNaN(item.price) || Number(item.price) <= 0) {
      errors.push('Price must be a positive number');
    }
    if (!Number.isInteger(Number(item.quantity)) || Number(item.quantity) < 0) {
      errors.push('Quantity must be a non-negative integer');
    }

    if (item.expiryDate) {
      const date = new Date(item.expiryDate);
      if (isNaN(date.getTime())) {
        errors.push('Expiry date is invalid');
      }
    }

    return { valid: errors.length === 0, errors };
  };

  const validateCustomer = customer => {
    const errors = [];

    if (!customer.id || !customer.id.trim()) {
      errors.push('Customer ID is required');
    }
    if (!customer.name || !customer.name.trim()) {
      errors.push('Customer name is required');
    }
    if (!customer.phone || !/^[0-9]{7,12}$/.test(customer.phone)) {
      errors.push('Enter a valid phone number');
    }

    return { valid: errors.length === 0, errors };
  };

  window.validateItem = validateItem;
  window.validateCustomer = validateCustomer;
})();
