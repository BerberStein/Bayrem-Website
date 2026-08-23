// ===== Terminal boot / typing effect =====
(function typeIntro() {
  const el = document.getElementById('typedCmd');
  const cursor = document.getElementById('typeCursor');
  const text = 'whoami';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reveal() {
    document.getElementById('heroName').hidden = false;
    document.getElementById('heroRole').hidden = false;
    document.getElementById('heroAbout').hidden = false;
    document.getElementById('heroCta').hidden = false;
    if (cursor) cursor.style.display = 'none';
  }

  if (reduced) {
    el.textContent = text;
    reveal();
    return;
  }

  let i = 0;
  const interval = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      setTimeout(reveal, 380);
    }
  }, 90);
})();

// ===== Page uptime ticker (literal: how long this page has been open) =====
(function uptime() {
  const start = Date.now();
  const el = document.getElementById('uptime');
  if (!el) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const elapsed = Math.floor((Date.now() - start) / 1000);
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;
    el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  tick();
  setInterval(tick, 1000);
})();

// ===== Sparkline: deterministic-ish "metrics" line, since this is a monitoring-flavored site =====
(function sparkline() {
  const canvas = document.getElementById('sparkline');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;

  // seeded pseudo-random walk so it looks alive but not jarring
  let points = [];
  let value = h * 0.6;
  for (let i = 0; i < 40; i++) {
    value += (Math.sin(i * 0.7) * 3) + (Math.random() - 0.5) * 6;
    value = Math.max(h * 0.15, Math.min(h * 0.85, value));
    points.push(value);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#2EE6A6';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    points.forEach((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - p;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // fill under line
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(46,230,166,0.18)');
    grad.addColorStop(1, 'rgba(46,230,166,0)');
    ctx.fillStyle = grad;
    ctx.fill();
  }

  function step() {
    points.shift();
    let next = points[points.length - 1] + (Math.random() - 0.5) * 8;
    next = Math.max(h * 0.15, Math.min(h * 0.85, next));
    points.push(next);
    draw();
  }

  draw();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) setInterval(step, 1400);
})();

// ===== Mobile menu =====
(function menu() {
  const btn = document.getElementById('menuToggle');
  const tabs = document.getElementById('tabs');
  if (!btn || !tabs) return;
  btn.addEventListener('click', () => {
    const open = tabs.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  tabs.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    tabs.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
