const CACHE_NAME = "express-delivery-v1";
const urlsToCache = [
  "index.html",
  "admin.html",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1855.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1860.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/From%20KlickPin%20CF%20Pin%20van%20Nayara%20Duartt%20op%20Slow%20in%202025.mov",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/From%20KlickPin%20CF%20White%20Truck%20Parked%20Next%20to%20Bridge.mov",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1676.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1677.webp",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1678.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1680.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1681.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1682.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1683.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1843.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1844.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1845.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1846.jpeg",
  "https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1847.jpeg",
  "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
