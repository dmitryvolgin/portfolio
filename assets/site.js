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
      // Umami picks up clicks on elements with data-umami-event
      a.dataset.umamiEvent = 'toc-click';
      a.dataset.umamiEventSection = h.textContent;
      a.dataset.umamiEventPlace = list.id === 'toc-side' ? 'sidebar' : 'card';
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

// Analytics (Umami): video plays and scroll depth
(function () {
  const track = (name, data) => { if (window.umami) window.umami.track(name, data); };

  // Video plays via the YouTube IFrame API (embeds carry enablejsapi=1).
  // Each video is reported once per page view.
  const frames = [...document.querySelectorAll('.video iframe')];
  if (frames.length) {
    const seen = new Set();
    window.onYouTubeIframeAPIReady = () => {
      frames.forEach(f => {
        const name = f.title; // the API replaces the title with YouTube's own
        new YT.Player(f, { events: { onStateChange: e => {
          if (e.data !== YT.PlayerState.PLAYING || seen.has(f)) return;
          seen.add(f);
          track('video-play', { video: name });
        } } });
      });
    };
    const api = document.createElement('script');
    api.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(api);
  }

  // Scroll depth milestones, each reported once per page view
  const marks = [25, 50, 75, 100];
  let next = 0, ticking = false;
  const check = () => {
    ticking = false;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max <= 0 ? 100 : (window.scrollY / max) * 100;
    while (next < marks.length && pct >= marks[next] - 1) {
      track('scroll-depth', { depth: marks[next] });
      next++;
    }
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(check); }
  }, { passive: true });
})();
