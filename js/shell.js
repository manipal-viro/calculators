/* Viro Calculator — app shell
   Desktop (>720px): floating sidebar with every calculator.
   Phone  (<=720px): app header, bottom navigation, "Tools" sheet.
   Also handles the "Install app" button / instructions. */
(function () {
  'use strict';
  const me = document.currentScript || document.querySelector('script[src*="shell.js"]');
  const ROOT = me.src.replace(/js\/shell\.js(\?.*)?$/, '');

  const SECTIONS = [
    { t: 'Serology · ELISA', items: [
      { n: 'Dengue ELISA',        s: 'Dengue',     ic: '🦟', c: '#e11d48', f: 'calculators/dengue-elisa.html' },
      { n: 'Chikungunya IgM',     s: 'Chik IgM',   ic: '🧫', c: '#db2777', f: 'calculators/chik-igm-elisa.html' },
      { n: 'Generic ELISA (S/CO)', s: 'ELISA S/CO', ic: '📊', c: '#4d7c0f', f: 'calculators/generic-elisa.html' } ] },
    { t: 'Molecular · PCR', items: [
      { n: 'RealStar® Viral Load', s: 'Viral load', ic: '🧪', c: '#1478d4', f: 'calculators/realstar-vl.html' },
      { n: 'Master Mix Prep',      s: 'Master mix', ic: '💧', c: '#7c3aed', f: 'calculators/altona-mastermix.html' },
      { n: 'qPCR Tools',           s: 'qPCR',       ic: '📈', c: '#4f46e5', f: 'calculators/qpcr-tools.html' } ] },
    { t: 'Virology · Cell culture', items: [
      { n: 'Viral Titer',          s: 'Titer',      ic: '🧬', c: '#15803d', f: 'calculators/viral-titer.html' },
      { n: 'MOI Calculator',       s: 'MOI',        ic: '🎯', c: '#a21caf', f: 'calculators/moi-calc.html' },
      { n: 'Neubauer & Splitting', s: 'Cell count', ic: '🔬', c: '#0d9488', f: 'calculators/neubauer-calc.html' } ] },
    { t: 'Lab utilities', items: [
      { n: 'Dilution & Serial',    s: 'Dilution',   ic: '⚗️', c: '#0e7490', f: 'calculators/dilution-calc.html' },
      { n: 'Centrifuge RPM ⇄ RCF', s: 'RPM ⇄ ×g',   ic: '🌀', c: '#a16207', f: 'calculators/rcf-calc.html' },
      { n: 'Room Fumigation',      s: 'Fumigation', ic: '🧯', c: '#ea580c', f: 'calculators/fumigation-calc.html' } ] }
  ];

  const file = location.pathname.split('/').pop() || 'index.html';
  const isHome = file === 'index.html';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const here = t => t.f.split('/').pop() === file;
  const on = t => (here(t) ? ' on' : '');

  /* ---------- install handling ---------- */
  let deferred = null;
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; renderInstall(); });
  window.addEventListener('appinstalled', () => { deferred = null; renderInstall(); });
  async function doInstall() {
    if (!deferred) return;
    deferred.prompt();
    try { await deferred.userChoice; } catch (e) { /* ignore */ }
    deferred = null; renderInstall();
  }
  function renderInstall() {
    document.querySelectorAll('[data-vc-install]').forEach(el => {
      if (standalone()) { el.style.display = 'none'; return; }
      el.style.display = '';
      const btn = el.querySelector('[data-vc-install-btn]'), txt = el.querySelector('[data-vc-install-txt]');
      if (deferred) { btn.style.display = ''; txt.textContent = 'Install Viro Calculator on this device — opens like a normal app, works offline.'; }
      else if (isIOS) { btn.style.display = 'none'; txt.innerHTML = 'To install: tap <b>Share</b> <span aria-hidden="true">⎋</span> in Safari, then <b>Add to Home Screen</b>.'; }
      else { btn.style.display = 'none'; txt.innerHTML = 'To install: open the browser menu <b>⋮</b> and choose <b>Install app</b> (or <b>Add to Home screen</b>).'; }
    });
  }
  function installBlock(cls) {
    return `<div class="${cls}" data-vc-install style="display:none"><span class="vc-install-ic">📲</span><span data-vc-install-txt></span><button type="button" data-vc-install-btn style="display:none">Install</button></div>`;
  }

  function build() {
    const body = document.body;
    body.classList.toggle('vc-home', isHome);

    // status-bar colour follows the page accent
    const acc = getComputedStyle(body).getPropertyValue('--accent').trim();
    const tc = document.querySelector('meta[name="theme-color"]');
    if (tc && acc && !isHome) tc.setAttribute('content', acc);

    /* ----- install banner on the hub ----- */
    const hub = document.querySelector('.hub');
    if (hub) {
      const hero = hub.querySelector('.hero');
      const wrap = document.createElement('div');
      wrap.innerHTML = installBlock('vc-install');
      if (hero) hero.after(wrap.firstChild);
    }

    if (isHome) { bindInstall(); renderInstall(); return; }

    body.classList.add('vc-has-side');

    /* ----- desktop sidebar ----- */
    const side = document.createElement('nav');
    side.className = 'vc-side';
    side.setAttribute('aria-label', 'Calculators');
    side.innerHTML =
      `<a class="vc-side-brand" href="${ROOT}index.html"><img src="${ROOT}icons/icon-192.png" alt="" /><span><b>ViroCalc</b><small>Lab calculator suite</small></span></a>` +
      SECTIONS.map(sec => `<div class="vc-side-sec">${esc(sec.t)}</div>` +
        sec.items.map(t => `<a class="vc-link${on(t)}" style="--c:${t.c}" href="${ROOT}${t.f}" title="${esc(t.n)}"><span class="ic">${t.ic}</span><span class="lbl">${esc(t.n)}</span></a>`).join('')).join('') +
      installBlock('vc-install vc-install-side') +
      `<div class="vc-side-foot">v5.1</div>`;
    body.prepend(side);

    /* ----- phone app header ----- */
    const chip = document.querySelector('.page-chip');
    const title = chip ? chip.textContent.trim() : document.title.split('—')[0].trim();
    const bar = document.createElement('header');
    bar.className = 'vc-appbar';
    bar.innerHTML = `<a class="ab-back" href="${ROOT}index.html" aria-label="Home">‹</a><div class="ab-t"><small>VIRO CALCULATOR</small><b>${esc(title)}</b></div><button type="button" class="ab-menu" aria-label="All calculators" data-vc-open>▦</button>`;
    body.prepend(bar);

    /* ----- bottom navigation ----- */
    const nav = document.createElement('nav');
    nav.className = 'vc-bnav';
    nav.setAttribute('aria-label', 'App navigation');
    nav.innerHTML = `<a href="${ROOT}index.html"><span class="bi">🏠</span>Home</a><button type="button" data-vc-open><span class="bi">▦</span>Tools</button><button type="button" data-vc-top><span class="bi">⬆️</span>Top</button>`;
    body.append(nav);

    /* ----- tools sheet ----- */
    const scrim = document.createElement('div'); scrim.className = 'vc-scrim';
    const sheet = document.createElement('div'); sheet.className = 'vc-sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-label', 'All calculators');
    sheet.innerHTML = '<div class="grab"></div>' + installBlock('vc-install') +
      SECTIONS.map(sec => `<h4>${esc(sec.t)}</h4><div class="grid">` +
        sec.items.map(t => `<a class="vc-tile${on(t)}" style="--c:${t.c}" href="${ROOT}${t.f}"><span class="ic">${t.ic}</span>${esc(t.s)}</a>`).join('') + '</div>').join('');
    body.append(scrim, sheet);

    const open = v => { scrim.classList.toggle('open', v); sheet.classList.toggle('open', v); };
    document.querySelectorAll('[data-vc-open]').forEach(b => b.addEventListener('click', () => open(true)));
    scrim.addEventListener('click', () => open(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') open(false); });
    nav.querySelector('[data-vc-top]').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    bindInstall(); renderInstall();
  }

  function bindInstall() {
    document.querySelectorAll('[data-vc-install-btn]').forEach(b => b.addEventListener('click', doInstall));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
