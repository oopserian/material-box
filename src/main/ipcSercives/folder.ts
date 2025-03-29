import { appModules } from "@main/modules";
import { registerIPC } from "@utils/electron";

export class FolderService {
    constructor() {
        this.register();
    }
    register() {
        registerIPC("folder:getAll", () => appModules.folder.folders);
    }
}
