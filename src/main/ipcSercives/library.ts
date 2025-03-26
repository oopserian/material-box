import { ipcMain } from "electron";
import appModules from "@main/modules";
import lib from "@main/lib";
import fg from "fast-glob";
// import compress from "@main/utils/compress";
import path from "path";
export class LibraryService {
    constructor() {
        this.register();
    }
    register() {
        ipcMain.handle("selectLibrary", this.selectLibrary.bind(this));
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
        const rootLibraryDir = appModules.setting.get().rootLibraryDir;
        console.time("initLibrary");
        const files = fg.stream("**", {
            cwd: rootLibraryDir,
            dot: false,
        });
        files.on("data", async (file) => {
            const start = path.join(rootLibraryDir, file);
            const dest = path.join(rootLibraryDir, file);
            console.log(start, dest);
            // const compressResult = await compress({
            //     start,
            //     dest,
            // });
            // console.log(compressResult);
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
