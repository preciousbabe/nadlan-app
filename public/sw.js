const CACHE_NAME = 'nadlan-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
  // Add other critical files here (e.g. images, fonts) if they are local
];

/* ── INSTALL ── */
self.addEventListener('install', (event) => {
  console.log('Service Worker Installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch((err) => console.warn('Pre-cache failed:', err))
  );
  self.skipWaiting();
});

/* ── ACTIVATE ── */
self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH ── */
self.addEventListener('fetch', (event) => {
  // Ignore non-GET requests (POST, etc.)
  if (event.request.method !== 'GET') return;

  // Ignore cross-origin requests (Google Fonts, APIs, etc.) to avoid CORS pain
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      // 1. Return cached file immediately if we have it
      if (cached) {
        // Still try to update the cache in the background for next time
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
              });
            }
          })
          .catch(() => {});
        return cached;
      }

      // 2. Nothing in cache — go to network
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return networkResponse;
        })
        .catch(() => {
          // 3. Network failed AND nothing in cache
          if (event.request.mode === 'navigate') {
            // If it's a page request, serve the cached index.html (SPA fallback)
            return caches.match('/index.html');
          }
          // For images/css/js, return a tiny error response instead of a blank page
          return new Response('Network error', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
          });
        });
    })
  );
});