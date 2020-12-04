importScripts("/docs/precache-manifest.a6299319561a2d274d0c776061c5a244.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

console.log('sw starts');
workbox.core.setCacheNameDetails({ prefix: "vuepwa" });
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
self.addEventListener('message', ((event) => {
    console.log('message in sw', event);
    if (event.data && event.data.action === 'SKIP_WAITING') {
        self.skipWaiting();
    }
}));

