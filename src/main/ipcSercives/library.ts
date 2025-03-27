import { ipcMain } from "electron";
import appModules from "@main/modules";
import lib from "@main/lib";
import fg from "fast-glob";
import path from "path";

export class LibraryService {
    constructor() {
        this.register();
    }
    register() {
        ipcMain.handle("library", (event, action, params) => {
            if (action === "select") {
                this.selectLibrary();
            }
        });
    }
    async selectLibrary() {
        const result = await lib.dialog.selectFolder();
        if (result) {
            appModules.setting.update({
                rootLibraryDir: result,
            });
            this.initLibrary();
        }
    }
    async initLibrary() {
        const rootLibraryDir = appModules.setting.rootLibraryDir;
        const files = fg.stream("**", {
            ignore: [".pptbox/**"],
            cwd: rootLibraryDir,
            dot: false,
        });
        files.on("data", async (filePath) => {
            const inputPath = path.join(rootLibraryDir, filePath);
            appModules.item.createItem(inputPath);
        });
        files.on("end", () => {
            console.log("end");
            console.timeEnd("initLibrary");
        });
        files.on("error", (error) => {
            console.log(error);
        });
    }
}
