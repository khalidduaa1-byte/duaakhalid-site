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
      <span class="dock-text">NEW YORK &middot; Open to forward-deployed AI roles</span>
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
   The case-study rows cascade in when their fold is opened.

   Deliberately NOT IntersectionObserver: the rows sit inside a closed
   <details>, so they are display:none and would never intersect.

   This only ever ADDS a class that triggers a keyframe animation. The
   rows' resting style is already visible, so nothing here can leave
   content hidden if the animation or this script does not run.
------------------------------------------------------------------ */
(function () {
  var folds = document.querySelectorAll('.cs-fold');
  if (!folds.length) return;

  Array.prototype.forEach.call(folds, function (fold) {
    var rows = fold.querySelectorAll('.cs .row');

    fold.addEventListener('toggle', function () {
      if (!fold.open) return;
      Array.prototype.forEach.call(rows, function (row, i) {
        row.style.animationDelay = (i * 65) + 'ms';
        row.classList.remove('in');
        // Force a reflow so re-opening replays the animation.
        void row.offsetWidth;
        row.classList.add('in');
      });
    });
  });
})();

/* ------------------------------------------------------------------
   Rollout log stepper.

   Progressive enhancement, deliberately. The log ships as a plain stacked
   list of dated rows, which is what it was and what it stays if this script
   never runs. Only once we know JS is alive do we add .is-stepper and show
   one step at a time.

   Above the step, in order: a phase strip, then the dots, the counter and the
   transport. Seven dated entries read as a diary. Grouped into DECIDE, BUILD,
   LAUNCH and FIX they read as a process, and because each segment is as wide
   as the number of steps it holds, the shape of the whole rollout stays on
   screen while only one step is open. FIX holds the last two because June is
   the evidence the fix held: the 29 duplicates removed are the dedup key from
   the month before, doing its job.

   The rail under the phase names is hand-drawn inline SVG rather than a
   border, because it is a measured scale and not a progress bar: a tall cap
   at each phase edge, a short tick at each step boundary inside a phase, an
   accent fill up to the current step, and a drawn station mark riding the
   leading edge of that fill. Original geometry, no image files, no
   dependencies, and it is aria-hidden because the buttons already say it.

   Three faults from the design review are fixed here.
   1. The box was pinned to the tallest step, so four of the seven sat above
      a hole. It now eases between the real heights, which takes the dead
      space out without snapping the page under the reader.
   2. The dots were 8px painted in --rule, with no hit area. The dot is still
      8px; the button around it is 24px square, and it carries a done state so
      the row reads as a sequence rather than as decoration.
   3. Autoplay started on load and moved the page under a reader who was
      somewhere else. It starts paused, playing is a deliberate act, and under
      prefers-reduced-motion the play button is not built at all.
------------------------------------------------------------------ */
(function () {
  var log = document.getElementById('rollout-log');
  if (!log) return;
  var rows = Array.prototype.slice.call(log.querySelectorAll('.row'));
  if (rows.length < 2) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DWELL = 7000;
  var GLIDE = 300;                     // must match the height transition in the CSS
  var i = 0, timer = null, sizeT = null, playing = false;

  log.classList.add('is-stepper');

  var labelOf = function (r) {
    var el = r.querySelector('.m');
    return el ? el.textContent.trim() : '';
  };

  /* ---- the phase strip ------------------------------------------------
     Phases are declared by their first step only; each one runs up to the
     step before the next begins, and the last runs to the end. So adding an
     eighth row extends FIX instead of falling off the strip. */
  var PHASES = [
    { name: 'DECIDE', from: 0 },
    { name: 'BUILD',  from: 1 },
    { name: 'LAUNCH', from: 3 },
    { name: 'FIX',    from: 5 }
  ].filter(function (p) { return p.from < rows.length; });

  PHASES.forEach(function (p, n) {
    p.to = (n + 1 < PHASES.length) ? PHASES[n + 1].from - 1 : rows.length - 1;
    p.span = p.to - p.from + 1;
  });

  var SVGNS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs) {
    var el = document.createElementNS(SVGNS, tag);
    Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }

  // The station mark: a cream diamond knocks the rail out behind it, an accent
  // diamond outline sits on that, and a small solid diamond marks the point.
  function stationMark() {
    var s = svgEl('svg', {
      'class': 'ph-mark', width: '14', height: '14', viewBox: '0 0 14 14',
      'aria-hidden': 'true', focusable: 'false'
    });
    s.appendChild(svgEl('path', { 'class': 'mk-halo', d: 'M7 0 14 7 7 14 0 7Z' }));
    s.appendChild(svgEl('path', { 'class': 'mk-ring', d: 'M7 2 12 7 7 12 2 7Z' }));
    s.appendChild(svgEl('path', { 'class': 'mk-core', d: 'M7 5.1 8.9 7 7 8.9 5.1 7Z' }));
    return s;
  }
  var marker = stationMark();

  var strip = document.createElement('div');
  strip.className = 'log-phases';
  strip.setAttribute('role', 'group');
  strip.setAttribute('aria-label', 'Rollout phases');

  var phEls = PHASES.map(function (p, n) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ph';
    b.style.flexGrow = String(p.span);   // the segment is as wide as the phase is long
    b.setAttribute('aria-label',
      p.name + ', phase ' + (n + 1) + ' of ' + PHASES.length + ', ' +
      (p.span === 1 ? 'step ' + (p.from + 1)
                    : 'steps ' + (p.from + 1) + ' to ' + (p.to + 1)) +
      ' of ' + rows.length);

    var nm = document.createElement('span');
    nm.className = 'ph-name';
    nm.textContent = p.name;
    b.appendChild(nm);

    var rail = document.createElement('span');
    rail.className = 'ph-rail';
    var s = svgEl('svg', {
      'class': 'ph-svg', viewBox: '0 0 100 12', preserveAspectRatio: 'none',
      'aria-hidden': 'true', focusable: 'false'
    });
    s.appendChild(svgEl('line', {
      'class': 'ph-base', x1: 0, y1: 6, x2: 100, y2: 6, 'vector-effect': 'non-scaling-stroke'
    }));
    // Two tick heights, which is what makes it a scale and not a progress bar:
    // a 8px cap divides the phases, a 5px tick counts the steps inside one.
    for (var t = 1; t < p.span; t++) {
      s.appendChild(svgEl('line', {
        'class': 'ph-tick', x1: (t / p.span) * 100, y1: 3.5, x2: (t / p.span) * 100, y2: 8.5,
        'vector-effect': 'non-scaling-stroke'
      }));
    }
    s.appendChild(svgEl('line', {
      'class': 'ph-cap', x1: 0.5, y1: 2, x2: 0.5, y2: 10, 'vector-effect': 'non-scaling-stroke'
    }));
    s.appendChild(svgEl('line', {
      'class': 'ph-cap', x1: 99.5, y1: 2, x2: 99.5, y2: 10, 'vector-effect': 'non-scaling-stroke'
    }));
    var fill = svgEl('line', {
      'class': 'ph-fill', x1: 0, y1: 6, x2: 0, y2: 6, 'vector-effect': 'non-scaling-stroke'
    });
    s.appendChild(fill);
    rail.appendChild(s);
    b.appendChild(rail);

    b.addEventListener('click', function () { stop(); show(p.from); });
    strip.appendChild(b);
    return { btn: b, rail: rail, fill: fill, p: p };
  });

  /* ---- dots, counter, transport --------------------------------------- */
  var bar = document.createElement('div');
  bar.className = 'log-bar';
  var dots = document.createElement('div');
  dots.className = 'log-dots';
  dots.setAttribute('role', 'group');
  dots.setAttribute('aria-label', 'Jump to a step');
  var count = document.createElement('span');
  count.className = 'log-count';
  var ctl = document.createElement('div');
  ctl.className = 'log-ctl';

  var dotEls = rows.map(function (r, n) {
    var d = document.createElement('button');
    d.type = 'button';
    d.className = 'log-dot';
    d.setAttribute('aria-label', 'Step ' + (n + 1) + ', ' + labelOf(r));
    d.addEventListener('click', function () { stop(); show(n); });
    dots.appendChild(d);
    return d;
  });

  // Arrow keys walk the dots, which is what a reader expects once one of them
  // has focus, and it saves seven tab stops to reach the last step.
  dots.addEventListener('keydown', function (e) {
    var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    stop();
    show(i + d);
    dotEls[i].focus();
  });

  function mkBtn(label, aria, fn) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'log-btn';
    b.textContent = label;
    b.setAttribute('aria-label', aria);
    b.addEventListener('click', fn);
    ctl.appendChild(b);
    return b;
  }
  mkBtn('←', 'Previous step', function () { stop(); show(i - 1); });
  // No autoplay under prefers-reduced-motion, so no control for it either.
  var playBtn = reduce ? null : mkBtn('Play', 'Play the sequence', function () {
    playing ? stop() : start();
  });
  mkBtn('→', 'Next step', function () { stop(); show(i + 1); });

  bar.appendChild(dots);
  bar.appendChild(count);
  bar.appendChild(ctl);
  log.parentNode.insertBefore(strip, log);
  log.parentNode.insertBefore(bar, log);

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  /* Height. The old code pinned the box to the tallest step, which left the
     four short ones sitting above a hole. Instead the box eases from the
     height it is at to the height the incoming step actually needs, then goes
     back to auto so a resize still reflows normally. */
  function resize(prevH, instant) {
    clearTimeout(sizeT);
    log.style.height = '';
    var nextH = log.offsetHeight;
    if (instant || reduce || Math.abs(prevH - nextH) < 1) return;
    log.style.height = prevH + 'px';
    log.classList.add('is-sizing');
    void log.offsetHeight;                       // commit the start height
    log.style.height = nextH + 'px';
    sizeT = setTimeout(function () {
      log.style.height = '';
      log.classList.remove('is-sizing');
    }, GLIDE + 60);
  }

  function show(n, instant) {
    var prevH = log.offsetHeight;
    i = (n + rows.length) % rows.length;
    rows.forEach(function (r, k) { r.classList.toggle('on', k === i); });

    dotEls.forEach(function (d, k) {
      d.classList.toggle('on', k === i);
      d.classList.toggle('done', k < i);
      if (k === i) d.setAttribute('aria-current', 'step');
      else d.removeAttribute('aria-current');
    });

    phEls.forEach(function (x) {
      var p = x.p;
      // Fill to the end of the current step's slot, so the strip completes on
      // the last step and the mark reads as a playhead rather than a dot.
      var pct = i > p.to ? 100 : i < p.from ? 0 : ((i - p.from + 1) / p.span) * 100;
      x.fill.setAttribute('x2', pct);
      var here = i >= p.from && i <= p.to;
      x.btn.classList.toggle('now', here);
      x.btn.classList.toggle('done', i > p.to);
      if (here) {
        x.btn.setAttribute('aria-current', 'step');
        x.rail.appendChild(marker);              // one mark, moved to the live phase
        marker.style.left = 'clamp(7px, ' + pct + '%, calc(100% - 7px))';
      } else {
        x.btn.removeAttribute('aria-current');
      }
    });

    count.textContent = pad(i + 1) + ' / ' + pad(rows.length);
    resize(prevH, instant);
  }

  function start() {
    if (reduce || !playBtn) return;
    playing = true;
    playBtn.textContent = 'Pause';
    playBtn.setAttribute('aria-label', 'Pause the sequence');
    clearInterval(timer);
    timer = setInterval(function () { show(i + 1); }, DWELL);
  }
  function stop() {
    playing = false;
    if (playBtn) {
      playBtn.textContent = 'Play';
      playBtn.setAttribute('aria-label', 'Play the sequence');
    }
    clearInterval(timer);
  }

  // Reading a step should not have it yanked away mid-sentence.
  log.addEventListener('mouseenter', function () { if (playing) clearInterval(timer); });
  log.addEventListener('mouseleave', function () { if (playing) start(); });
  log.addEventListener('focusin', stop);

  show(0, true);
})();

/* ------------------------------------------------------------------
   Scroll-spy for the single-page nav.

   The site is now one page with anchor links, so the header needs to
   say where you are. Marks the deepest section whose anchor has passed
   under the sticky header. Purely additive: with JS off you simply get
   no highlight, and the anchor links still work.
------------------------------------------------------------------ */
(function () {
  var links = document.querySelectorAll('.sitehead nav a[href^="#"]');
  if (!links.length) return;

  var targets = [];
  Array.prototype.forEach.call(links, function (link) {
    var el = document.getElementById(link.getAttribute('href').slice(1));
    if (el) targets.push({ link: link, el: el });
  });
  if (!targets.length) return;

  var ticking = false;

  function sync() {
    ticking = false;
    var current = null;
    targets.forEach(function (t) {
      // 100px allows for the sticky header plus a little breathing room.
      if (t.el.getBoundingClientRect().top <= 100) current = t;
    });
    targets.forEach(function (t) {
      t.link.classList.toggle('here', t === current);
    });
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(sync);
  }, { passive: true });

  sync();
})();


/* ------------------------------------------------------------------
   Selected Work carousel.

   Three case studies, one on screen at a time, with the transport built
   here rather than in the markup. Progressive enhancement, same contract
   as the rollout stepper: with JS off all three slides render stacked and
   every word is readable, so this can only ever add.

   Deliberately not auto-advancing. The rollout stepper on this page does
   advance, and two things moving on one page is one too many. A reader
   who wants the next case study will ask for it.
------------------------------------------------------------------ */
(function () {
  var cw = document.getElementById('cw');
  if (!cw) return;
  var slides = Array.prototype.slice.call(cw.querySelectorAll('.cw-slide'));
  if (slides.length < 2) return;

  var titleOf = function (s) {
    var el = s.querySelector('.cw-title');
    return el ? el.textContent.trim() : '';
  };

  var i = 0;
  cw.classList.add('is-carousel');

  var bar = document.createElement('div');
  bar.className = 'cw-bar';

  function mk(cls, label, aria, fn) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = cls; b.innerHTML = label;
    b.setAttribute('aria-label', aria);
    b.addEventListener('click', fn);
    return b;
  }

  var prev = mk('cw-btn', '&larr; PREV', 'Previous case study', function () { go(i - 1); });
  var nums = document.createElement('div');
  nums.className = 'cw-nums';
  var numEls = slides.map(function (s, n) {
    var b = mk('cw-num', (n + 1 < 10 ? '0' : '') + (n + 1),
               'Case study ' + (n + 1) + ', ' + titleOf(s), function () { go(n); });
    nums.appendChild(b);
    return b;
  });
  var upnext = document.createElement('span');
  upnext.className = 'cw-upnext';
  var next = mk('cw-btn cw-next', 'NEXT CASE STUDY &rarr;', 'Next case study', function () { go(i + 1); });

  bar.appendChild(prev); bar.appendChild(nums); bar.appendChild(upnext); bar.appendChild(next);
  cw.appendChild(bar);

  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    numEls.forEach(function (b, k) {
      b.classList.toggle('on', k === i);
      b.setAttribute('aria-current', k === i ? 'true' : 'false');
    });
    upnext.innerHTML = 'Up next &nbsp;<b>' + titleOf(slides[(i + 1) % slides.length]) + '</b>';
  }

  // Arrow keys move between case studies while focus is inside the transport.
  bar.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(i - 1); }
  });

  go(0);
})();
