importScripts("/pwa03/precache-manifest.96f5d92ee9e5f77476808cdc6e6e64bf.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

"use strict";
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

