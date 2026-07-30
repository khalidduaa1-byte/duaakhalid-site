// Interactive Animations & UI/UX Enhancements for Duaa Khalid Portfolio

document.addEventListener('DOMContentLoaded', () => {

  // 1. Animated Metric Counters (IntersectionObserver)
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const numElements = statsSection.querySelectorAll('.n');
    
    const animateCount = (el, target, duration = 1500) => {
      const isFormatted = target.includes(',');
      const rawNum = parseInt(target.replace(/,/g, ''), 10);
      let start = 0;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        // Ease out quadratic formula
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(easeProgress * rawNum);
        
        el.textContent = isFormatted ? current.toLocaleString() : String(current).padStart(2, '0');

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          numElements.forEach(el => {
            const targetVal = el.getAttribute('data-target') || el.textContent.trim();
            el.setAttribute('data-target', targetVal);
            animateCount(el, targetVal);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // 2. 3D Cursor Spotlight & Card Tilt Effect
  const tiltCards = document.querySelectorAll('.proj .shot, .target-card, .catalog-window, .hb-terminal');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5; // max 5deg tilt
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.transition = 'transform 0.1s ease-out';
      
      // Dynamic radial spotlight
      card.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(240, 52, 25, 0.08) 0%, transparent 70%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
      card.style.backgroundImage = 'none';
    });
  });

  // 3. Floating Status Bar / Dock Reveal on Scroll
  const floatingDock = document.createElement('div');
  floatingDock.className = 'floating-dock';
  floatingDock.innerHTML = `
    <div class="dock-content">
      <span class="dock-dot"></span>
      <span class="dock-text">DUBAI &rarr; NEW YORK &middot; Open to AI &amp; Product Roles</span>
      <a href="mailto:dk947@cornell.edu" class="dock-btn">GET IN TOUCH</a>
    </div>
  `;
  document.body.appendChild(floatingDock);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      floatingDock.classList.add('visible');
    } else {
      floatingDock.classList.remove('visible');
    }
  });

  // 4. Smooth Anchor Link Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

});

/* ------------------------------------------------------------------
   Interactive target setting on the dashboard mockup.
   Demo data only: sales are fixed, you set the target and the card
   recalculates attainment, remaining, the bar and the status pill.
   Saved to localStorage so it survives a reload.
------------------------------------------------------------------ */
(function () {
  var CITIES = {
    cairo:    { label: 'Cairo',    sales: 38916, target: 39400, pcs: '6.4' },
    hurgadah: { label: 'Hurgadah', sales: 41972, target: 39500, pcs: '8.3' },
    sharm:    { label: 'Sharm',    sales: 26875, target: 30800, pcs: '5.7' }
  };
  var KEY = 'dk.targets.v1';
  var save = document.getElementById('tgt-save');
  if (!save) return;

  var citySel = document.getElementById('tgt-city');
  var amount  = document.getElementById('tgt-amount');
  var reset   = document.getElementById('tgt-reset');

  function stored() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function persist(o) {
    try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
  }
  function k(n) { return '$' + (n / 1000).toFixed(1) + 'k'; }
  function kt(n) { return '$' + Math.round(n / 1000) + 'k'; }

  function paint(key) {
    var c = CITIES[key];
    var card = document.querySelector('.target-card[data-city="' + key + '"]');
    if (!card) return;
    var pct = c.sales / c.target;
    var remaining = Math.max(0, c.target - c.sales);
    var onTrack = pct >= 0.95;

    card.querySelector('.tcard-val strong').textContent = k(c.sales);
    card.querySelector('.tcard-sub').innerHTML = 'of ' + kt(c.target) + ' target &middot; Jul 2026';

    var badge = card.querySelector('.track-badge');
    badge.className = 'track-badge' + (onTrack ? '' : ' behind');
    badge.innerHTML = onTrack ? '&check; On Track' : '&darr; Behind Target';

    var bar = card.querySelector('.tcard-progress');
    var w = Math.max(2, Math.min(100, pct * 100));
    bar.innerHTML = '<div class="pbar-fill ' + (onTrack ? 'green' : 'orange') +
                    '" style="width:' + w.toFixed(0) + '%"></div>';

    var metrics = card.querySelectorAll('.tcard-metrics strong');
    if (metrics[0]) metrics[0].textContent = k(remaining);
    if (metrics[2]) metrics[2].textContent = c.pcs + ' pcs';
  }

  function applyStored() {
    var o = stored();
    Object.keys(CITIES).forEach(function (key) {
      if (o[key] && o[key] > 0) CITIES[key].target = o[key];
      paint(key);
    });
  }

  save.addEventListener('click', function () {
    var key = citySel.value;
    var v = parseInt(amount.value, 10);
    if (!v || v < 1000) { amount.focus(); return; }
    CITIES[key].target = v;
    var o = stored(); o[key] = v; persist(o);
    paint(key);
    amount.value = '';
    save.textContent = 'Saved';
    setTimeout(function () { save.textContent = 'Save Target'; }, 1200);
  });

  amount.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); save.click(); }
  });

  if (reset) reset.addEventListener('click', function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    CITIES.cairo.target = 39400; CITIES.hurgadah.target = 39500; CITIES.sharm.target = 30800;
    Object.keys(CITIES).forEach(paint);
  });

  applyStored();
})();

/* ------------------------------------------------------------------
   The duplicate-pair table runs its own dedup.
   Values are illustrative (see CLAUDE.md: never publish real advisor
   data). The duplicate row is struck through rather than deleted,
   which matches the site's "removed, not rejected" language.
------------------------------------------------------------------ */
(function () {
  var btn = document.getElementById('dedup-btn');
  var table = document.getElementById('dupt');
  if (!btn || !table) return;

  var RAW = { rows: '2', sales: '4,150', days: '2' };
  var CLEAN = { rows: '1', sales: '1,840', days: '1' };

  var out = {
    rows: document.getElementById('kpi-rows'),
    sales: document.getElementById('kpi-sales'),
    days: document.getElementById('kpi-days')
  };

  function paint(deduped) {
    var v = deduped ? CLEAN : RAW;
    Object.keys(out).forEach(function (k) {
      if (!out[k]) return;
      out[k].textContent = v[k];
      out[k].classList.toggle('corrected', deduped);
    });
    table.classList.toggle('deduped', deduped);
    btn.setAttribute('aria-pressed', deduped ? 'true' : 'false');
    btn.innerHTML = deduped ? '&larr; SHOW RAW EXPORT' : 'RUN DEDUP &rarr;';
  }

  btn.addEventListener('click', function () {
    paint(btn.getAttribute('aria-pressed') !== 'true');
  });
})();

/* ------------------------------------------------------------------
   Homebase context block generator.
   The whole point is that the shape does not change, so this renders
   the same eight fields for every combination.
------------------------------------------------------------------ */
(function () {
  var issueSel = document.getElementById('hb-issue');
  var urgSel = document.getElementById('hb-urg');
  var out = document.getElementById('hb-out');
  if (!issueSel || !urgSel || !out) return;

  var ISSUES = {
    ac:   { id: 'HB-4192', issue: 'AC not cooling',         vendor: 'CoolAir Technical FZE' },
    leak: { id: 'HB-4207', issue: 'Kitchen sink leaking',   vendor: 'AquaFix Plumbing LLC' },
    lock: { id: 'HB-4231', issue: 'Front door lock jammed', vendor: 'SecureKey Locksmiths' }
  };
  var URGENCY = {
    routine:   { sla: '72h', window: 'Thu 10:00 to 14:00' },
    urgent:    { sla: '24h', window: 'Tomorrow 08:00 to 12:00' },
    emergency: { sla: '4h',  window: 'Today, next available' }
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function render() {
    var i = ISSUES[issueSel.value];
    var u = URGENCY[urgSel.value];
    var fields = [
      ['ticket_id', i.id],
      ['unit', 'Marina Heights 1204'],
      ['issue', i.issue],
      ['urgency', urgSel.value],
      ['sla', u.sla],
      ['tenant_window', u.window],
      ['vendor', i.vendor],
      ['language', 'en + ar']
    ];
    out.innerHTML = fields.map(function (f) {
      return '<div class="ln"><span>' + f[0] + '</span><b>' + esc(f[1]) + '</b></div>';
    }).join('');
  }

  issueSel.addEventListener('change', render);
  urgSel.addEventListener('change', render);
  render();
})();

/* ------------------------------------------------------------------
   Scroll reveal on the case-study rows. IntersectionObserver only,
   no library, per the "zero dependencies" note in CLAUDE.md.
   data-reveal is set here rather than in the HTML so that with JS
   disabled the rows render normally instead of staying invisible.
------------------------------------------------------------------ */
(function () {
  var rows = document.querySelectorAll('.cs .row');
  if (!rows.length) return;

  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still || !('IntersectionObserver' in window)) return;

  var seen = new WeakMap();
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.style.transitionDelay = (seen.get(e.target) * 70) + 'ms';
      e.target.classList.add('in');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  rows.forEach(function (row) {
    var idx = Array.prototype.indexOf.call(row.parentNode.children, row);
    seen.set(row, idx < 0 ? 0 : idx);
    row.setAttribute('data-reveal', '');
    obs.observe(row);
  });
})();
