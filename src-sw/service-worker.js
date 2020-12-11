importScripts("/idb.min.js");
console.log('sw starts');
let idb;
export var DdRecordStatus;
(function (DdRecordStatus) {
    DdRecordStatus[DdRecordStatus["synced"] = 0] = "synced";
    DdRecordStatus[DdRecordStatus["unSynced"] = 1] = "unSynced";
    DdRecordStatus[DdRecordStatus["deleted"] = 2] = "deleted";
})(DdRecordStatus || (DdRecordStatus = {}));
;
export const openDatabase = async () => {
    const db = await idb.openDB('appDb', 1, {
        upgrade(upgradedDb) {
            if (upgradedDb.objectStoreNames.contains('listItems')) {
                db.deleteObjectStore('listItems');
            }
            const store = upgradedDb.createObjectStore('listItems', {
                keyPath: 'id'
            });
            store.createIndex('by-completed', 'completed');
        },
        blocked() {
            console.log('blocked');
        },
        blocking() {
            console.log('blocking');
        },
        terminated() {
            console.log('terminated');
        }
    });
    return db;
};
export const putDbListItemDb = async (dbItem) => {
    const db = await openDatabase();
    const res = await db.put('listItems', dbItem);
    return res;
};
export const putListItemDb = async (item, status) => {
    const dbItem = {
        id: item.id,
        description: item.description,
        completed: item.completed ? 0 : 1,
        status: status,
    };
    const res = await putDbListItemDb(dbItem);
    return res;
};
workbox.core.setCacheNameDetails({ prefix: "vuepwa" });
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
self.addEventListener('message', ((event) => {
    console.log('message in sw', event);
    if (event.data && event.data.action === 'SKIP_WAITING') {
        self.skipWaiting();
    }
}));
