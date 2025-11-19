/* js/script.js
   - Hamburger toggle (mobile)
   - Accordion open/close
   - Modal open/close (resources)
   - Dynamic content loader (example)
   - Search filter hookup (courses)
   - Gallery thumbnail hookup (calls lightbox)
*/

/* Hamburger menu: toggle .nav-links.show and aria-expanded */
document.querySelectorAll('.hamburger').forEach(btn => {
  btn.addEventListener('click', function () {
    const nav = this.closest('.navbar');
    if (!nav) return;
    const navLinks = nav.querySelector('.nav-links');
    if (!navLinks) return;
    const shown = navLinks.classList.toggle('show');
    this.setAttribute('aria-expanded', shown ? 'true' : 'false');
  });
});

/* Click outside to close mobile nav */
document.addEventListener('click', (e) => {
  if (e.target.closest('.navbar')) return;
  document.querySelectorAll('.nav-links.show').forEach(n => n.classList.remove('show'));
  document.querySelectorAll('.hamburger[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded','false'));
});

/* Accordion logic */
document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('accordion-btn')) return;
  const btn = e.target;
  const panel = btn.nextElementSibling;
  if (!panel) return;
  const container = btn.closest('.accordion');
  if (container) {
    container.querySelectorAll('.accordion-panel.open').forEach(p => { if (p !== panel) p.classList.remove('open'); });
  }
  panel.classList.toggle('open');
});

/* Modal open/close (resources modal example uses IDs openResourcesModal & resourcesModal) */
(function() {
  const openBtn = document.getElementById('openResourcesModal');
  const modal = document.getElementById('resourcesModal');
  if (!openBtn || !modal) return;
  openBtn.addEventListener('click', (e) => { e.preventDefault(); modal.style.display = 'flex'; modal.setAttribute('aria-hidden','false'); });
  const close = modal.querySelector('.modal-close');
  if (close) close.addEventListener('click', ()=>{ modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); });
  modal.addEventListener('click', (e) => { if (e.target === modal) { modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); } });
})();

/* Dynamic content loader: appends latest announcements to .callout .container */
function loadDynamicContent() {
  const el = document.querySelector('.callout .container');
  if (!el) return;
  const block = document.createElement('div');
  block.className = 'dynamic';
  block.innerHTML = '<p><strong>Latest:</strong> Community Maths workshop — Sat 29 Nov. Seats limited.</p>';
  el.appendChild(block);
}
document.addEventListener('DOMContentLoaded', loadDynamicContent);

/* Search/filter for services (input id=serviceSearch expected on courses page) */
const searchInput = document.getElementById('serviceSearch');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll('.service-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

/* Hook gallery thumbnails to lightbox (lightbox.js exposes showLightbox) */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-thumb').forEach((thumb, idx) => {
    thumb.addEventListener('click', () => { if (window.showLightbox) window.showLightbox(idx); });
  });
});
