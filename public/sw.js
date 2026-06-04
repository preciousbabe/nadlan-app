const CACHE_NAME = 'nadlan-v1'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.jsx',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
]

self.addEventListener('install', (event) => {
  console.log('Service Worker Installed')
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated')
  
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version or fetch from network
      return cachedResponse || fetch(event.request).catch(() => {
        return new Response('Offline — please check your connection', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        })
      })
    })
  )
})