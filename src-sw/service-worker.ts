export { };

interface ICacheEntry {
    "revision": string;
    "url": string;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface WorkerGlobalScope {
        __precacheManifest: ICacheEntry[];
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
