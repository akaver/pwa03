
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
            return response.data as IListItem[];
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
            return response.data as IListItem;
        }
    } catch (e) {
        console.error("Problem in get", e);
    }
};

export const putListItem = async (listItem: IListItem, apiKey: string): Promise<number | undefined> => {
    try {
        const response = await httpClient.put(listItem.id.toString() + "?apiKey=" + apiKey, listItem);
        console.log("putListItem response", response);
        return response.status;
    } catch (e) {
        console.error("Problem in put", e);
    }
};

export const deleteListItem = async (id: number, apiKey: string): Promise<number | undefined> => {
    try {
        const response = await httpClient.delete(id.toString() + "?apiKey=" + apiKey);
        console.log("deleteListItem response", response);
        return response.status;
    } catch (e) {
        console.error("Problem in delete", e);
    }
};

export const postListItem = async (listItem: IListItemBase, apiKey: string): Promise<number | undefined> => {
    try {
        const response = await httpClient.post("?apiKey=" + apiKey, listItem);
        console.log("postListItem response", response);
        return response.status;
    } catch (e) {
        console.error("Problem in post", e);
    }
};
