const CACHE_NAME = 'transform-dxn-v1';
const ASSETS = [
'/',
'/index.html'
];

// Install - cache les fichiers
self.addEventListener('install', event => {
event.waitUntil(
  caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
);
self.skipWaiting();
});

// Activate - nettoie les anciens caches
self.addEventListener('activate', event => {
event.waitUntil(
  caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  )
);
self.clients.claim();
});

// Fetch - sert depuis le cache si offline
self.addEventListener('fetch', event => {
event.respondWith(
  caches.match(event.request).then(cached => cached || fetch(event.request))
);
});