// Meni in izbira jezika za pravne strani (script.js predvideva elemente domače strani)
const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
function toggleMenu() {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('menu-open');
  menuIcon.classList.toggle('bx-menu');
  menuIcon.classList.toggle('bx-x');
}
menuIcon.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Zapri meni ob kliku na povezavo
sidebar.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (sidebar.classList.contains('active')) toggleMenu();
  });
});

// Vrednost opcije je ista pravna stran v izbranem jeziku
function redirectLanguage(select) {
  window.location.href = select.value;
}
