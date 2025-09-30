const CACHE_NAME = 'express-delivery-cache-v2'; // Updated cache name for new version
const urlsToCache = [
  '/',
  '/index.html',
  '/admin.html',
  '/manifest.json',
  '/admin-manifest.json',
  'https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1855.jpeg',
  'https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1860.jpeg',
  'https://unpkg.com/html2pdf.js@0.10.2/dist/html2pdf.bundle.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets:', urlsToCache);
      return cache.addAll(urlsToCache).catch((err) => {
        console.error('Cache addAll failed:', err);
      });
    }).catch((err) => {
      console.error('Cache open failed:', err);
    })
  );
  self.skipWaiting(); // Force new service worker to activate immediately
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Serving from cache:', event.request.url);
        return response;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        }).catch((err) => {
          console.error('Cache put failed:', err);
        });
        return networkResponse;
      }).catch((err) => {
        console.error('Fetch failed:', err);
        return caches.match('/index.html'); // Fallback to index.html
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service worker activated');
      return self.clients.claim(); // Take control of all clients immediately
    })
  );
});
