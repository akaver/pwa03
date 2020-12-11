
import { putListItemDb, putListItemsDb, DdRecordStatus, deleteRecordDb, updateRecordStatusDb } from '@/db/list-db';
import { IListItem, IListItemBase } from '@/domain/list-item';
import axios from 'axios';

const baseUrl = "https://taltech.akaver.com/api/v1/ListItems/";

export const httpClient = axios.create({
    baseURL: baseUrl
});

// crud
export const getListItems = async (apiKey: string): Promise<IListItem[] | undefined> => {
    try {
        const response = await httpClient.get("?apiKey=" + apiKey);
        console.log("getListItems response", response);
        if (response.status === 200) {
            const data = response.data as IListItem[];
            await putListItemsDb(data, DdRecordStatus.synced);
            return data;
        } else {
            console.log('Bad status code', response);
        }
    } catch (e) {
        console.error("Problem in get", e);
    }
};

export const getListItem = async (id: number, apiKey: string): Promise<IListItem | undefined> => {
    try {
        const response = await httpClient.get(id.toString() + "?apiKey=" + apiKey);
        console.log("getListItem response", response);
        if (response.status === 200) {
            const data = response.data as IListItem;
            await putListItemDb(data, DdRecordStatus.synced);
            return data;
        }
    } catch (e) {
        console.error("Problem in get", e);
    }
};

export const putListItem = async (listItem: IListItem, apiKey: string): Promise<number | undefined> => {
    try {
        // modify db, mark record as unsynced
        await putListItemDb(listItem, DdRecordStatus.unSynced);
        const response = await httpClient.put(listItem.id.toString() + "?apiKey=" + apiKey, listItem);
        if (response.status === 200) {
            //
        }
        // await addRecordDatabase(listItem, DdRecordStatus.synced);
        console.log("putListItem response", response);
        return response.status;
    } catch (e) {
        console.error("Problem in put", e);
    }
};

export const deleteListItem = async (id: number, apiKey: string): Promise<number | undefined> => {
    try {
        // mark as deleted in db
        await updateRecordStatusDb(id, DdRecordStatus.deleted);
        const response = await httpClient.delete(id.toString() + "?apiKey=" + apiKey);
        if (response.status === 200) {
            // it was deleted from backend
            // really delete it from db
            await deleteRecordDb(id);
        }
        console.log("deleteListItem response", response);
        return response.status;
    } catch (e) {
        console.error("Problem in delete", e);
    }
};

export const postListItem = async (listItem: IListItemBase, apiKey: string): Promise<number | undefined> => {
    try {
        // add temp record to db, id as next available negative number
        const response = await httpClient.post("?apiKey=" + apiKey, listItem);
        // get id from backend, update db, mark record as synced

        console.log("postListItem response", response);
        return response.status;
    } catch (e) {
        console.error("Problem in post", e);
    }
};
