// Network-first service worker: always tries the live site first (so GitHub Pages
// updates show up immediately) and falls back to the cache when offline.
const CACHE_NAME = 'viro-calc-v5.5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-48.png',
  './css/main.css',
  './css/shell.css',
  './js/common.js',
  './js/shell.js',
  './js/auth.js',
  './images/bg-dna.webp',
  './images/bg-virus-bl.webp',
  './images/bg-hex.webp',
  './images/bg-calc.webp',
  './images/bg-wave.webp',
  './images/bg-virus-1.webp',
  './images/bg-virus-2.webp',
  './images/bg-virus-3.webp',
  './calculators/realstar-vl.html',
  './calculators/altona-mastermix.html',
  './calculators/neubauer-calc.html',
  './calculators/fumigation-calc.html',
  './calculators/dengue-elisa.html',
  './calculators/dilution-calc.html',
  './calculators/rcf-calc.html',
  './calculators/viral-titer.html',
  './calculators/moi-calc.html',
  './calculators/qpcr-tools.html',
  './calculators/custom-vl.html',
  './calculators/wash-buffer.html',
  './calculators/altona-am16-order.html',
  './calculators/custom-mastermix.html',
  './calculators/xeno-mir-mle.html',
  './calculators/diagnostic-2x2.html',
  './calculators/pooling-dorfman.html',
  './calculators/pcr-tm.html',
  './calculators/unit-converter.html',
  './calculators/sci-calc.html',
  './calculators/reagent-duration.html',
  './calculators/generic-elisa.html',
  './calculators/chik-igm-elisa.html'
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
