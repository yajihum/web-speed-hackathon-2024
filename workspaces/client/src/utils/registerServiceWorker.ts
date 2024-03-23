export async function registerServiceWorker() {
  const registration = await navigator.serviceWorker
    .register('/serviceworker.mjs', { type: 'module', updateViaCache: 'none' })
    .then(() => navigator.serviceWorker.ready);

  // Wait until the service worker becomes active
  await new Promise<void>((resolve) => {
    const activeServiceWorker = registration.active!;
    if (activeServiceWorker.state === 'activated') {
      resolve();
    }
    activeServiceWorker.addEventListener('statechange', (ev) => {
      if (
        ev.target instanceof ServiceWorker &&
        ev.target.state === 'activated'
      ) {
        resolve();
      }
    });
  });
}
