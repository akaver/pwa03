import { IListItem } from './../src/domain/list-item';
import { DBSchema, IDBPDatabase, openDB } from 'idb';

importScripts("/idb.min.js");

console.log('sw starts');

let idb: any;

export enum DdRecordStatus {
    synced = 0,
    unSynced = 1,
    deleted = 2,
}

export interface IDBListItem {
    id: number; // negative numbers for new unsynced records
    description: string;
    completed: number;
    status: DdRecordStatus; // 0 - synced, 1 - not synced
}

export interface IAppDb extends DBSchema {
    listItems: {
        value: IDBListItem;
        key: number;
        indexes: {
            'by-completed': number;
        };
    };
};

export const openDatabase = async (): Promise<IDBPDatabase<IAppDb>> => {
    const db = await idb.openDB('appDb', 1, {
        upgrade(upgradedDb: IDBPDatabase<IAppDb>) {
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
    }

    );
    return db;
};

export const putDbListItemDb = async (dbItem: IDBListItem): Promise<number> => {
    const db = await openDatabase();
    const res = await db.put('listItems', dbItem);
    return res;
};

export const putListItemDb = async (item: IListItem, status: DdRecordStatus): Promise<number> => {
    const dbItem: IDBListItem = {
        id: item.id,
        description: item.description,
        completed: item.completed ? 0 : 1,
        status: status,
    };
    const res = await putDbListItemDb(dbItem);
    return res;
};

workbox.core.setCacheNameDetails({ prefix: "vuepwa" });
self.__precacheManifest = [].concat((self.__precacheManifest as never) || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('message', ((event: ExtendableMessageEvent) => {
    console.log('message in sw', event);
    if (event.data && event.data.action === 'SKIP_WAITING') {
        self.skipWaiting();
    }
}) as EventListener);
