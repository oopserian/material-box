export interface FolderData {
    path: string;
    name: string;
    children: FolderData[];
}

export class Folder {
    folder: FolderData;
    constructor() {
    }
}