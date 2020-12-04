
import axios from 'axios';

const baseUrl = "https://taltech.akaver.com/api/v1/ListItems/";
const apiKey = "19361a21-655a-4b9d-8209-2c87162bd22c";

export const httpClient = axios.create({
    baseURL: baseUrl
});

// crud
// getListItems
// getListItem
// putListItem
// deleteListItem
// postListItem

