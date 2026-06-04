self.addEventListener('install', (event) => {
  console.log('Service Worker Installed')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated')
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  // Only handle GET requests (important)
  if (event.request.method !== 'GET') return

  event.respondWith(
    fetch(event.request).catch(() => {
      // fallback response instead of crashing
      return new Response('Offline or network error', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' }
      })
    })
  )
})