interface ICacheEntry {
    "revision": string;
    "url": string;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface WorkerGlobalScope {
    __precacheManifest: ICacheEntry[];
    skipWaiting(): Promise<void>;
}
