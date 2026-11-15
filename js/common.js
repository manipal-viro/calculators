/* Shared helpers for the Viro Calculator pages */
window.VC = (() => {
  const SUP = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻' };
  const sup = n => String(n).split('').map(c => SUP[c] || c).join('');
  const $ = id => document.getElementById(id);
  const num = el => {
    const v = parseFloat(typeof el === 'string' ? el : el.value);
    return isNaN(v) ? null : v;
  };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));

  function sci(x, sig = 3) {
    if (x === null || x === undefined || !isFinite(x)) return '—';
    if (x === 0) return '0';
    let e = Math.floor(Math.log10(Math.abs(x)));
    let m = Number((x / Math.pow(10, e)).toPrecision(sig));
    if (Math.abs(m) >= 10) { m /= 10; e += 1; }
    return `${m} × 10${sup(e)}`;
  }
  function fmt(x, sig = 3) {
    if (x === null || x === undefined || !isFinite(x)) return '—';
    if (x === 0) return '0';
    const ax = Math.abs(x);
    if (ax >= 1e6 || ax < 1e-3) return sci(x, sig);
    const d = Math.max(0, sig - 1 - Math.floor(Math.log10(ax)));
    return Number(x.toFixed(Math.min(d, 8))).toLocaleString('en-US', { maximumFractionDigits: 8 });
  }
  const store = {
    get(k, def) { try { const v = localStorage.getItem(k); return v === null ? def : JSON.parse(v); } catch (e) { return def; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  function tabs(rootId, cb) {
    const btns = $(rootId).querySelectorAll('button[data-tab]');
    function show(name) {
      btns.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
      document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + name));
      if (cb) cb(name);
    }
    btns.forEach(b => b.addEventListener('click', () => show(b.dataset.tab)));
    return show;
  }
  function chips(rootId, cb) {
    const root = $(rootId);
    const btns = root.querySelectorAll('.chip');
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.toggle('active', x === b));
      if (cb) cb(b.dataset.v);
    }));
    return () => (root.querySelector('.chip.active') || {}).dataset.v;
  }
  function copy(text, btn) {
    const done = () => { if (!btn) return; const o = btn.textContent; btn.textContent = 'Copied ✓'; setTimeout(() => btn.textContent = o, 1200); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
    else done();
  }
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function niceMax(v) {
    if (!(v > 0)) return 1;
    const e = Math.pow(10, Math.floor(Math.log10(v)));
    const f = v / e;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * e;
  }
  function ticks(min, max, count = 5) {
    const span = max - min; if (!(span > 0)) return [min];
    const raw = span / count, mag = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / mag;
    const step = (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * mag;
    const out = [];
    for (let t = Math.ceil(min / step - 1e-9) * step; t <= max + step * 1e-6; t += step) out.push(+t.toFixed(10));
    return out;
  }
  // Enter key moves to the next input in the list
  function enterNav(inputs) {
    inputs.forEach((el, i) => el.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); const n = inputs[i + 1]; if (n) { n.focus(); n.select && n.select(); } }
    }));
  }
  return { sup, $, num, esc, sci, fmt, store, tabs, chips, copy, rng, niceMax, ticks, enterNav };
})();
