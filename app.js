// app.js — general UI behaviors and accessibility helpers

(function () {
  'use strict';

  const getSidebarWidth = property => getComputedStyle(document.documentElement).getPropertyValue(property).trim() || '0';

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('.main-content');
    if (!sidebar) return;
    const isMobile = () => window.matchMedia('(max-width: 640px)').matches;

    // On small screens we use an "open" class that slides the sidebar in/out.
    if (isMobile()) {
      const opened = sidebar.classList.toggle('open');
      // Let CSS handle the positioning on mobile; clear inline widths to avoid conflicts.
      sidebar.style.width = '';
      if (main) main.style.marginLeft = '';
      return;
    }

    // On wider screens collapse/expand by adjusting width.
    const collapsed = sidebar.classList.toggle('collapsed');
    const widthKey = collapsed ? '--sidebar-collapsed' : '--sidebar-w';
    const widthValue = getSidebarWidth(widthKey) || (collapsed ? '72px' : '240px');

    sidebar.style.width = widthValue;
    if (main) main.style.marginLeft = widthValue;
  };

  const initMenuToggle = () => {
    const toggleButton = document.getElementById('menuToggle');
    if (!toggleButton) return;

    toggleButton.addEventListener('click', toggleSidebar);
    toggleButton.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleSidebar();
      }
    });
  };

  const initSkipLink = () => {
    const skipLink = document.querySelector('.skip-link');
    const main = document.getElementById('main');
    if (!skipLink || !main) return;

    skipLink.addEventListener('click', () => {
      main.setAttribute('tabindex', '-1');
      main.focus();
    });
  };

  const initNavAutoClose = () => {
    const sidebar = document.getElementById('sidebar');
    const links = document.querySelectorAll('.sidebar .nav-link');
    if (!sidebar || !links.length) return;

    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 640px)').matches && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initSkipLink();
    initNavAutoClose();
  });
})();
