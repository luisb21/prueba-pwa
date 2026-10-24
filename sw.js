const CACHE = 'pwa-demo-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Local test notification, triggered by the page itself (no server push).
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SHOW_TEST_NOTIFICATION') {
    self.registration.showNotification(data.title || 'Prueba PWA', {
      body: data.body || 'Si ves esto, las notificaciones funcionan.',
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      tag: 'pwa-demo-test',
      vibrate: [100, 50, 100],
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientsArr) => {
      if (clientsArr.length > 0) {
        clientsArr[0].focus();
      } else {
        self.clients.openWindow('./');
      }
    })
  );
});
