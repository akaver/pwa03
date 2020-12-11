import { IListItem } from './../domain/list-item';
import { DBSchema, IDBPDatabase, openDB } from 'idb';

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
    const db = await openDB<IAppDb>('appDb', 1, {
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

export const putListItemsDb = async (items: IListItem[], status: DdRecordStatus): Promise<number[]> => {
    const db = await openDatabase();
    const transaction = db.transaction('listItems', 'readwrite');
    const dbPromises: Promise<number | void>[] = [];
    items.forEach(item => {
        const dbItem: IDBListItem = {
            id: item.id,
            description: item.description,
            completed: item.completed ? 1 : 0,
            status: status
        };
        dbPromises.push(transaction.store.put(dbItem));
    });
    dbPromises.push(transaction.done);
    const promiseRes = await Promise.all(dbPromises);
    const res = promiseRes.filter(item => (typeof item) === 'number') as number[];
    return res;
};

export const deleteRecordDb = async (id: number) => {
    const db = await openDatabase();
    await db.delete('listItems', id);
};

export const updateRecordStatusDb = async (id: number, status: DdRecordStatus) => {
    const db = await openDatabase();
    const dbItem = await db.get('listItems', id);
    if (dbItem !== undefined) {
        dbItem.status = status;
        await putDbListItemDb(dbItem);
    }
};
