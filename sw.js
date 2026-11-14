// Network-first service worker: always tries the live site first (so GitHub Pages
// updates show up immediately) and falls back to the cache when offline.
const CACHE_NAME = 'viro-calc-v4.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './css/main.css',
  './images/theme-bg.jpg',
  './calculators/realstar-vl.html',
  './calculators/altona-mastermix.html',
  './calculators/neubauer-calc.html',
  './calculators/fumigation-calc.html',
  './calculators/dengue-elisa.html'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  // Cache each file separately so one missing file can't break the whole install.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(ASSETS.map((url) => cache.add(url).catch(() => {})))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
  );
});
