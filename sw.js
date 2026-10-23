/* SayCard service worker. Change VERSION on every deploy so installed copies update. */
const VERSION = 'saycard-2026-10-22-1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Never touch AnkiConnect or other local addresses
  if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return;
  if (req.mode === 'navigate') {
    // Network first for the page, so updates show up; cached copy when offline
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return r; }).catch(() => caches.match('./index.html')));
    return;
  }
  // Cache first for icons and fonts
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok && (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname))) {
      const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy));
    }
    return r;
  })));
});
