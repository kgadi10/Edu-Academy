/* js/lightbox.js
   Minimal lightbox that collects .gallery-thumb and shows overlay.
*/
(function(){
  const thumbs = Array.from(document.querySelectorAll('.gallery-thumb'));
  if (thumbs.length === 0) return;
  const srcs = thumbs.map(t => t.src);

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.style.display = 'none';
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '2000';
  overlay.style.padding = '1rem';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close" style="position:absolute; right:18px; top:18px; font-size:2rem; background:none; border:none; color:#fff; cursor:pointer">×</button><img src="" alt="Lightbox image" style="max-width:90%; max-height:80%; border-radius:8px;" />';
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function show(index) {
    index = index || 0;
    imgEl.src = srcs[index] || srcs[0];
    overlay.style.display = 'flex';
  }
  function hide() { overlay.style.display = 'none'; imgEl.src = ''; }

  closeBtn.addEventListener('click', hide);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) hide(); });

  window.showLightbox = show;
})();
