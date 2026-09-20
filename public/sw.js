/* India Biz Tools service worker — offline-first for the app shell, network-first for pages. */
const VERSION = "ibt-v1";
const SHELL = ["/", "/tools", "/categories", "/offline", "/manifest.webmanifest", "/icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return; // let CDN/API requests pass through

  // Hashed build assets: cache-first
  if (url.pathname.startsWith("/_next/static/")) {
    e.respondWith(caches.match(request).then((hit) => hit || fetch(request).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(request, copy)); return res; })));
    return;
  }
  // Navigations: network-first, fall back to cache, then offline page
  if (request.mode === "navigate") {
    e.respondWith(fetch(request).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(request, copy)); return res; }).catch(() => caches.match(request).then((hit) => hit || caches.match("/offline"))));
    return;
  }
  // Everything else same-origin: stale-while-revalidate
  e.respondWith(caches.match(request).then((hit) => { const net = fetch(request).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(request, copy)); return res; }).catch(() => hit); return hit || net; }));
});
