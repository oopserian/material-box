import appModules from ".";

export interface ItemData {
    path: string;
    name: string;
}

export class Item {
    items: { [key: string]: ItemData };
    constructor() {
    }
    init() {
    }
}