// Table of contents: built from the h2/h3 headings inside .content
(function () {
  const toc = document.getElementById('toc');
  if (!toc) return;
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  document.querySelectorAll('.content h2, .content h3').forEach(h => {
    if (!h.id) h.id = slug(h.textContent);
    const li = document.createElement('li');
    li.className = 'lvl-' + h.tagName.slice(1);
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    toc.appendChild(li);
  });
})();
