export interface IListItemBase {
    description: string;
    completed: boolean;
}

export interface IListItem extends IListItemBase {
    id: number;
}
