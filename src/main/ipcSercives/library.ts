import { appModules } from "@main/modules";
import { registerIPC } from "@utils/electron";
import fg from "fast-glob";
import path from "path";

export class LibraryService {
    constructor() {
        this.register();
    }
    register() {
        registerIPC("library:select", () => appModules.library.select());
        registerIPC("library:update", (_, params) => appModules.setting.update(params));
    }
}
