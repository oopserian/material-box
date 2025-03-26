import { dialog } from "electron";
import { getFocusedWindow } from "@main/lib/window";

export class Dialog {
    constructor() {}
    async selectFolder(): Promise<string | null> {
        const result = await dialog.showOpenDialog(getFocusedWindow(), {
            properties: ['openDirectory']
        });
        if (!result.canceled) {
            return result.filePaths[0];
        }
        return null;
    }
    async selectFile(): Promise<string | null> {
        const result = await dialog.showOpenDialog(getFocusedWindow(), {
            properties: ['openFile']
        });
        if (!result.canceled) {
            return result.filePaths[0];
        }
        return null;
    }
}
