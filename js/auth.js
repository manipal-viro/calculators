/* Viro Calculator — sign-in + department-private cloud data (Firebase Auth + Firestore).
   Calculators work for everyone without login. Synced data (Dengue ODs, viral-load history,
   master-mix protocols) is stored per department at  departments/{dept}/data/{name}
   and only members of that department can read or write it (enforced by firestore.rules). */
(function () {
  'use strict';
  const V = '13.3.0', G = 'https://www.gstatic.com/firebasejs/' + V + '/';
  const CFG = { apiKey: "AIzaSyCdl2Ds5b4Sn-KL94UQCifRZsg3_xU91oM", authDomain: "viro-calculator.firebaseapp.com", projectId: "viro-calculator", storageBucket: "viro-calculator.firebasestorage.app", messagingSenderId: "668811903388", appId: "1:668811903388:web:e0b40f5f1f508091fd8859" };
  const state = { ready: false, offline: false, user: null, dept: null, deptName: '', deptCode: '', domain: '' };
  const subs = [];
  let A, AU, FS, auth, db, modal;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slug = s => String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  const who = () => state.user ? (state.user.displayName || state.user.email || 'User') : '';
  const emit = () => { subs.forEach(f => { try { f(state); } catch (e) { console.error(e); } }); render(); if (modal && modal.isConnected) drawModal(); };

  /* ---------- account chips ---------- */
  function render() {
    document.querySelectorAll('[data-vc-acct]').forEach(b => {
      if (!b.dataset.bound) { b.dataset.bound = 1; b.addEventListener('click', openModal); }
      b.classList.toggle('in', !!state.dept);
      b.innerHTML = state.user ? `<span>👤</span><span class="t"><b>${esc(who())}</b><small>${state.dept ? '🔒 ' + esc(state.deptName || state.dept) : 'Join a department'}</small></span>`
        : `<span>👤</span><span class="t"><b>Sign in</b><small>${state.offline ? 'Offline' : 'To sync your department data'}</small></span>`;
    });
  }

  /* ---------- firebase boot ---------- */
  const boot = (async () => {
    try {
      [A, AU, FS] = await Promise.all([import(G + 'firebase-app.js'), import(G + 'firebase-auth.js'), import(G + 'firebase-firestore.js')]);
      const app = A.initializeApp(CFG); auth = AU.getAuth(app); db = FS.getFirestore(app);
      if (AU.isSignInWithEmailLink(auth, location.href)) {
        let em = localStorage.getItem('viro_email_link') || prompt('Confirm your email to finish signing in:');
        if (em) { try { await AU.signInWithEmailLink(auth, em, location.href); localStorage.removeItem('viro_email_link'); history.replaceState(null, '', location.pathname); } catch (e) { alert('Sign-in link failed: ' + e.message); } }
      }
      AU.onAuthStateChanged(auth, async u => { state.user = u; state.ready = true; await loadProfile(); emit(); });
    } catch (e) { state.offline = true; state.ready = true; emit(); }
  })();

  async function loadProfile() {
    state.dept = null; state.deptName = ''; state.deptCode = ''; state.domain = '';
    if (!state.user) return;
    try {
      const p = await FS.getDoc(FS.doc(db, 'users', state.user.uid));
      const d = p.exists() ? p.data().dept : null;
      if (!d) return;
      const dd = await FS.getDoc(FS.doc(db, 'departments', d));          // readable only by members
      state.dept = d; state.deptName = dd.data().name || d; state.deptCode = dd.data().code || ''; state.domain = dd.data().domain || '';
    } catch (e) { state.dept = null; }
  }

  /* ---------- actions ---------- */
  const A_ = {
    async google() {
      const pr = new AU.GoogleAuthProvider();
      try { await AU.signInWithPopup(auth, pr); } catch (e) { if (/popup|cancelled-popup|operation-not-supported/.test(e.code || '')) await AU.signInWithRedirect(auth, pr); else throw e; }
    },
    email(em, pw, create) { return create ? AU.createUserWithEmailAndPassword(auth, em, pw) : AU.signInWithEmailAndPassword(auth, em, pw); },
    async link(em) { await AU.sendSignInLinkToEmail(auth, em, { url: location.origin + location.pathname, handleCodeInEmail: true }); localStorage.setItem('viro_email_link', em); },
    reset(em) { return AU.sendPasswordResetEmail(auth, em); },
    out() { return AU.signOut(auth); },
    async join(id, code) {
      id = slug(id); if (!id) throw new Error('Enter the department ID.');
      const u = state.user, member = { name: who(), email: u.email || '', joinedAt: Date.now() };
      if (code) member.code = code.trim();
      await FS.setDoc(FS.doc(db, 'departments', id, 'members', u.uid), member).catch(() => { throw new Error('Could not join — check the department ID and code (or use your department email).'); });
      await FS.setDoc(FS.doc(db, 'users', u.uid), { dept: id, name: who(), email: u.email || '' });
      await loadProfile(); emit();
    },
    async create(name, code, domain) {
      const id = slug(name); if (!id) throw new Error('Enter a department name.'); if (!code || code.trim().length < 4) throw new Error('Choose a join code of at least 4 characters.');
      const u = state.user, ref = FS.doc(db, 'departments', id);
      try { await FS.setDoc(ref, { name: name.trim(), code: code.trim(), domain: (domain || '').trim().toLowerCase().replace(/^@/, ''), createdBy: u.uid, createdAt: Date.now() }); }
      catch (e) { throw new Error('That department ID is already taken — choose another name, or join it with its code.'); }
      await FS.setDoc(FS.doc(db, 'departments', id, 'members', u.uid), { name: who(), email: u.email || '', joinedAt: Date.now() });
      await FS.setDoc(FS.doc(db, 'users', u.uid), { dept: id, name: who(), email: u.email || '' });
      await loadProfile(); emit();
    },
    async leave() {
      const u = state.user, d = state.dept;
      await FS.deleteDoc(FS.doc(db, 'departments', d, 'members', u.uid)).catch(() => {});
      await FS.deleteDoc(FS.doc(db, 'users', u.uid)).catch(() => {});
      await loadProfile(); emit();
    }
  };

  /* ---------- modal ---------- */
  const CSS = `.vca-ov{position:fixed;inset:0;background:rgba(10,30,55,.5);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px}
  .vca{background:#fff;color:#0f2a43;border-radius:16px;max-width:400px;width:100%;max-height:92vh;overflow:auto;padding:20px 20px 16px;box-shadow:0 20px 60px rgba(0,0,0,.35);font-family:inherit}
  .vca h3{margin:0 0 4px;font-size:1.15rem}.vca p{margin:4px 0 10px;font-size:.85rem;color:#52667a}.vca label{display:block;font-size:.75rem;font-weight:700;margin:10px 0 3px}
  .vca input{width:100%;padding:10px;border:1px solid #c7d6e5;border-radius:10px;font-size:16px;box-sizing:border-box}.vca button{font:inherit}
  .vca .b{width:100%;padding:10px;border-radius:10px;border:1px solid #1478d4;background:#1478d4;color:#fff;font-weight:700;margin-top:10px;cursor:pointer}
  .vca .b.s{background:#fff;color:#1478d4}.vca .b.g{background:#fff;color:#0f2a43;border-color:#c7d6e5}.vca .lnk{background:none;border:0;color:#1478d4;font-size:.8rem;cursor:pointer;padding:6px 0;text-decoration:underline}
  .vca .err{background:#fee2e2;color:#991b1b;border-radius:8px;padding:8px;font-size:.8rem;margin-top:10px}.vca .ok{background:#dcfce7;color:#166534;border-radius:8px;padding:8px;font-size:.8rem;margin-top:10px}
  .vca .or{text-align:center;font-size:.75rem;color:#7b8da0;margin:12px 0 0}.vca .x{float:right;background:none;border:0;font-size:1.3rem;cursor:pointer;color:#52667a}
  .vca .code{font-family:ui-monospace,Menlo,monospace;background:#eef6fd;padding:3px 8px;border-radius:6px;font-weight:700}`;
  let view = 'in', msg = null;
  function openModal() { if (!document.getElementById('vca-css')) { const s = document.createElement('style'); s.id = 'vca-css'; s.textContent = CSS; document.head.append(s); } view = 'in'; msg = null; modal = document.createElement('div'); modal.className = 'vca-ov'; document.body.append(modal); modal.addEventListener('mousedown', e => { if (e.target === modal) modal.remove(); }); drawModal(); }
  const val = id => (modal.querySelector('#' + id) || {}).value || '';
  async function run(fn) { msg = null; try { const r = await fn(); if (r) msg = { ok: r }; } catch (e) { msg = { err: (e.message || String(e)).replace('Firebase: ', '').replace(/\s*\(auth\/[^)]+\)\.?/, '') }; } if (modal.isConnected) drawModal(); }
  function drawModal() {
    const m = msg ? `<div class="${msg.err ? 'err' : 'ok'}">${esc(msg.err || msg.ok)}</div>` : '';
    let h = '<button class="x" data-x aria-label="Close">×</button>';
    if (state.offline) h += '<h3>Offline</h3><p>Cloud sign-in is not reachable right now. Calculators still work and data stays on this device.</p>';
    else if (!state.ready) h += '<h3>Loading…</h3>';
    else if (!state.user) {
      h += `<h3>${view === 'up' ? 'Create account' : 'Sign in'}</h3><p>Calculators work without signing in. Sign in only to sync data privately with your department.</p>
        <button class="b g" data-a="google">Continue with Google</button><div class="or">or use email</div>
        <label for="vca-e">Email</label><input id="vca-e" type="email" autocomplete="email" inputmode="email" />
        <label for="vca-p">Password</label><input id="vca-p" type="password" autocomplete="${view === 'up' ? 'new-password' : 'current-password'}" />
        <button class="b" data-a="${view === 'up' ? 'signup' : 'signin'}">${view === 'up' ? 'Create account' : 'Sign in'}</button>
        <button class="b s" data-a="link">Email me a sign-in link (no password)</button>
        <div style="display:flex;justify-content:space-between"><button class="lnk" data-a="${view === 'up' ? 'vin' : 'vup'}">${view === 'up' ? 'I have an account' : 'Create an account'}</button><button class="lnk" data-a="reset">Forgot password</button></div>`;
    } else if (!state.dept) {
      h += `<h3>Join your department</h3><p>Signed in as <b>${esc(who())}</b>. Your department's data is visible only to its members.</p>
        ${view === 'new' ? `<label for="vca-n">Department name</label><input id="vca-n" placeholder="e.g. Virology" />
          <label for="vca-c">Join code (share with your team)</label><input id="vca-c" placeholder="at least 4 characters" />
          <label for="vca-d">Auto-join email domain (optional)</label><input id="vca-d" placeholder="e.g. myhospital.org" />
          <button class="b" data-a="create">Create department</button><button class="lnk" data-a="vjoin">I have a code instead</button>`
        : `<label for="vca-i">Department ID</label><input id="vca-i" placeholder="e.g. virology" autocapitalize="none" />
          <label for="vca-c">Join code (leave empty if your email domain is approved)</label><input id="vca-c" />
          <button class="b" data-a="join">Join</button><button class="lnk" data-a="vnew">Create a new department</button>`}
        <div><button class="lnk" data-a="out">Sign out</button></div>`;
    } else {
      h += `<h3>🔒 ${esc(state.deptName)}</h3><p>Signed in as <b>${esc(who())}</b>${state.user.email && state.user.displayName ? '<br>' + esc(state.user.email) : ''}</p>
        <p>Department ID: <span class="code">${esc(state.dept)}</span><br>Join code: <span class="code">${esc(state.deptCode)}</span>${state.domain ? '<br>Auto-join domain: <span class="code">@' + esc(state.domain) + '</span>' : ''}</p>
        <p>Dengue ODs, viral-load history and master-mix protocols sync here and are visible only to members of this department.</p>
        <button class="b s" data-a="out">Sign out</button><button class="lnk" data-a="leave">Leave this department</button>`;
    }
    modal.innerHTML = '<div class="vca" role="dialog" aria-modal="true">' + h + m + '</div>';
    modal.querySelector('[data-x]').addEventListener('click', () => modal.remove());
    modal.querySelectorAll('[data-a]').forEach(b => b.addEventListener('click', () => act(b.dataset.a)));
  }
  function act(a) {
    const em = val('vca-e').trim(), pw = val('vca-p');
    const need = (c, t) => { if (!c) { msg = { err: t }; drawModal(); return false; } return true; };
    switch (a) {
      case 'google': return run(() => A_.google());
      case 'signin': if (need(em && pw, 'Enter email and password.')) run(() => A_.email(em, pw, false)); return;
      case 'signup': if (need(em && pw.length >= 6, 'Enter an email and a password of at least 6 characters.')) run(() => A_.email(em, pw, true)); return;
      case 'link': if (need(em, 'Enter your email first.')) run(async () => { await A_.link(em); return 'Sign-in link sent. Open it on this device to finish.'; }); return;
      case 'reset': if (need(em, 'Enter your email first.')) run(async () => { await A_.reset(em); return 'Password reset email sent.'; }); return;
      case 'vup': view = 'up'; msg = null; return drawModal();
      case 'vin': view = 'in'; msg = null; return drawModal();
      case 'vnew': view = 'new'; msg = null; return drawModal();
      case 'vjoin': view = 'in'; msg = null; return drawModal();
      case 'out': return run(() => A_.out());
      case 'join': return run(() => A_.join(val('vca-i'), val('vca-c')));
      case 'create': return run(() => A_.create(val('vca-n'), val('vca-c'), val('vca-d')));
      case 'leave': if (confirm('Leave this department? You will stop seeing its data.')) run(() => A_.leave()); return;
    }
  }

  window.VCAuth = {
    state, who,
    open: openModal,
    onState(fn) { subs.push(fn); if (state.ready) fn(state); },
    // doc in the department's private area, or null when not signed in to a department
    docRef(name) { return state.dept && db ? FS.doc(db, 'departments', state.dept, 'data', name) : null; },
    get fs() { return FS; }, render
  };
  document.addEventListener('DOMContentLoaded', render);
})();
