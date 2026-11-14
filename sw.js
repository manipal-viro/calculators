const CACHE_NAME = 'viro-calc-v3.1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './css/main.css',
  './calculators/realstar-vl.html',
  './calculators/altona-mastermix.html',
  './calculators/neubauer-calc.html',
  './calculators/fumigation-calc.html',
  './calculators/dengue-elisa.html'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
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
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version, but fetch update in background
        fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
