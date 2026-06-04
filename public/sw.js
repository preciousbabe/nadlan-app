self.addEventListener('install', (event) => {
  console.log('Service Worker Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
  event.waitUntil(self.clients.claim());
});

// REQUIRED for PWA installability
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request))
})