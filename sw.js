const CACHE_NAME = 'filament-monitor-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './MAS.png',
  './prusa.svg'
];

// Pri inštalácii appky si uložíme základné súbory do pamäte
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Zabezpečí okamžité prevzatie kontroly
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Stratégia: "Network First" (Najskôr skús stiahnuť z internetu, ak nejde, daj z cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
