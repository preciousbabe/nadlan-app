const VERSION = 'v2';                 // ← bump this string on EVERY deploy
const CACHE_NAME = `nadlan-cache-${VERSION}`;

// Only files that are guaranteed to exist at these exact paths.
// Vite's hashed assets (/assets/index-XXXX.js) are handled at runtime instead.
const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/NADLAN_LOGO.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

const MAX_CACHE_ITEMS = 80;

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})

/* ── INSTALL ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        // Add files one-by-one so ONE missing icon can't kill the whole install
        await Promise.allSettled(PRECACHE.map((url) => cache.add(url)));
      })
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── FETCH ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Never touch non-GET (Supabase auth POSTs, etc.)
  if (request.method !== 'GET') return;

  // 2. Never touch cross-origin (Font Awesome CDN, Supabase, Google anything).
  //    Caching opaque CDN responses is a classic source of bloat and failures.
  if (url.origin !== self.location.origin) return;

  // 3. Skip Range requests (video/audio streaming) — SWs mishandle them
  if (request.headers.has('range')) return;

  // 4. Page navigations → NETWORK FIRST.
  //    Guarantees users always get the newest index.html that references
  //    existing hashed assets. Falls back to cache when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put('/index.html', clone));
          }
          return res;
        })
        .catch(async () => {
          const cached = await caches.match('/index.html');
          return cached || new Response('Offline — NADLAN is unavailable.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          });
        })
    );
    return;
  }

  // 5. Same-origin static assets (JS/CSS/images/fonts) → CACHE FIRST,
  //    with background revalidation, capped cache size.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          // Only cache fully valid, basic responses
          if (res.ok && res.type === 'basic') {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => {
              c.put(request, clone);
              trimCache(c); // enforce size cap
            });
          }
          return res;
        })
        .catch(() => cached); // offline + not cached → browser's natural error

      return cached || network;
    })
  );
});

/* Trim oldest entries if cache grows too large */
async function trimCache(cache) {
  const keys = await cache.keys();
  if (keys.length > MAX_CACHE_ITEMS) {
    await cache.delete(keys[0]);
    return trimCache(cache);
  }
}