// Table of contents, built from the h2/h3 headings inside .content:
// a numbered card in the article (phones, tablets) and a sticky sidebar (desktop)
(function () {
  const lists = [document.getElementById('toc'), document.getElementById('toc-side')].filter(Boolean);
  if (!lists.length) return;
  const headings = [...document.querySelectorAll('.content h2, .content h3')];
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const sideLinks = [];

  headings.forEach(h => {
    if (!h.id) h.id = slug(h.textContent);
    lists.forEach(list => {
      const li = document.createElement('li');
      li.className = 'lvl-' + h.tagName.slice(1);
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
      if (list.id === 'toc-side') sideLinks.push(a);
    });
  });

  // Highlight the section currently on screen in the sidebar
  if (!sideLinks.length) return;
  let current = -1, ticking = false;
  const update = () => {
    ticking = false;
    let i = -1;
    headings.forEach((h, n) => { if (h.getBoundingClientRect().top < 120) i = n; });
    if (i < 0) i = 0;
    if (i === current) return;
    if (current >= 0) sideLinks[current].classList.remove('active');
    sideLinks[i].classList.add('active');
    current = i;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
