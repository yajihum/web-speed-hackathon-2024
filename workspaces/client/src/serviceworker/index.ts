/// <reference types="@types/serviceworker" />

self.addEventListener('install', (ev: ExtendableEvent) => {
  ev.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (ev: ExtendableEvent) => {
  ev.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (ev: FetchEvent) => {
  ev.respondWith(onFetch(ev.request));
});

async function onFetch(request: Request): Promise<Response> {
  return await fetch(request, {
    headers: new Headers([
      ...request.headers.entries(),
      ['X-Accept-Encoding', 'gzip, deflate, br'],
    ]),
  });
}
