import { ipcMain } from "electron";
import { selectFolder, getFileList } from "@main/core/file";

export class FileService {
    register() {
        ipcMain.handle("selectFolder", this.selectLibrary);
    }
    async selectLibrary() {
        const result = await selectFolder();
        const fileList = await getFileList(result);
        return fileList;
    }
}
