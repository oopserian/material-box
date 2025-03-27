import appModules from ".";
import fs from "fs";
import path from "path";
import HashUtil from "@utils/hash";
import { app } from "electron";

export interface LibraryData {
    rootPath: string
}

export class Library {
    libraryCachePath: string;
    library: LibraryData;
    constructor() {
    }
    init() {
        const rootLibraryDir = appModules.setting.rootLibraryDir;
        const userData = app.getPath('userData');
        const metaCacheName = HashUtil.fnv1a(rootLibraryDir).toString() + '.txt';
        const metaCacheDirPath = path.join(userData, "library-caches");
        if (!fs.existsSync(metaCacheDirPath)) {
            fs.mkdirSync(metaCacheDirPath);
        };
        const metaCachePath = path.join(metaCacheDirPath, metaCacheName);
        if (!fs.existsSync(metaCachePath)) {
            fs.writeFileSync(metaCachePath, "{}");
        };
        this.libraryCachePath = path.join(appModules.setting.rootLibraryDir, ".pptbox");
        if (!fs.existsSync(this.libraryCachePath)) {
            fs.mkdirSync(this.libraryCachePath);
        };
    }
}
