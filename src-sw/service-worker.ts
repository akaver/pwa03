export { };

interface CacheEntry {
    "revision": string;
    "url": string;
}

declare global {
    interface WorkerGlobalScope {
        __precacheManifest: CacheEntry[];
        skipWaiting(): Promise<void>;
    }
}

console.log('sw starts');

workbox.core.setCacheNameDetails({ prefix: "vuepwa" });
self.__precacheManifest = [].concat((self.__precacheManifest as never) || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('message', ((event: ExtendableMessageEvent) => {
    console.log('message in sw', event);
    if (event.data && event.data.action === 'SKIP_WAITING') {
        self.skipWaiting();
    }
}) as EventListener);
