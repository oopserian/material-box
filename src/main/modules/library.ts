import { appModules } from ".";
import fs from "fs";
import fg from "fast-glob";
import path from "path";
import HashUtil from "@utils/hash";
import { app } from "electron";
import lib from "@main/lib";

export interface LibraryData {
    rootPath: string
}

export class Library {
    libraryMetaCachePath: string;
    library: LibraryData = {
        rootPath: ""
    };
    constructor() { }
    init() {
        this.library.rootPath = appModules.setting.rootLibraryDir;
        this.libraryMetaCachePath = path.join(this.library.rootPath, ".pptbox");
        if (!fs.existsSync(this.libraryMetaCachePath)) {
            fs.mkdirSync(this.libraryMetaCachePath);
        };
    }
    async select() {
        const result = await lib.dialog.selectFolder();
        if (result) {
            appModules.setting.update({ rootLibraryDir: result });
            this.init();
            appModules.item.init();
            this.generateLibraryItems();
        }
    }
    generateLibraryCache() {
        return new Promise((resolve, reject) => {
            console.time("「创建」库缓存");
            try {
                const userData = app.getPath('userData');
                const metaCacheName = HashUtil.fnv1a(this.library.rootPath).toString() + '.txt';
                const metaCacheDirPath = path.join(userData, "library-caches");
                if (!fs.existsSync(metaCacheDirPath)) {
                    fs.mkdirSync(metaCacheDirPath);
                };
                const metaCachePath = path.join(metaCacheDirPath, metaCacheName);
                const metaCacheStream = fs.createWriteStream(metaCachePath, { flags: "w" });
                const meataDatas = fg.stream("**/*.json", {
                    cwd: path.join(this.library.rootPath, ".pptbox"),
                    dot: false,
                    absolute: true,
                });
                meataDatas.on("data", (filePath) => {
                    const fileContent = fs.readFileSync(filePath, "utf-8");
                    metaCacheStream.write(fileContent + "\n");
                });
                meataDatas.on("end", () => {
                    metaCacheStream.end();
                    console.timeEnd("「创建」库缓存");
                    resolve(true);
                });
                meataDatas.on("error", (err) => {
                    reject(err)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
    generateLibraryItems() {
        console.time("--创建所有item");
        const files = fg.stream("**", {
            ignore: [".pptbox/**"],
            cwd: this.library.rootPath,
            dot: false,
        });
        files.on("data", async (filePath) => {
            const inputPath = path.join(this.library.rootPath, filePath);
            console.log(inputPath);
            appModules.item.createItem(inputPath);
        });
        files.on("end", () => {
            console.timeEnd("--创建所有item");
        });
        files.on("error", (error) => {
            console.log(error);
        });
    }
    get rootPath(){
        return this.library.rootPath
    }
}
