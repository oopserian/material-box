import path from "path";
import { appModules } from ".";
import fg from "fast-glob";
import fs from "fs";
import HashUtil from "@utils/hash";

export interface FolderData {
    id: string | number;
    name: string;
    children: FolderData[];
    mtime: number;
}

export class Folder {
    folder: FolderData[] = [];
    folderCacheName: string = 'folders.json';
    folderCachePath: string = '';
    constructor() { }
    init() {
        console.time("--创建所有folder");
        let libraryMetaCachePath = appModules.library.libraryMetaCachePath;
        let libraryRootPath = appModules.library.library.rootPath;
        this.folderCachePath = path.join(libraryMetaCachePath, this.folderCacheName);
        const folders = fg.globSync("**", {
            ignore: [".pptbox/**"],
            cwd: libraryRootPath,
            dot: false,
            onlyDirectories: true,
            // stats: true // 多30ms
        });
        this.folder = this.buildFolderTree(folders);
        console.timeEnd("--创建所有folder");
    }
    buildFolderTree(paths: string[]): FolderData[] {
        const rootFolders: FolderData[] = [];
        const folderMap = new Map<string, FolderData>();

        for (const folderPath of paths) {
            const parts = folderPath.split('/');
            let currentLevel = rootFolders;

            for (let i = 0; i < parts.length; i++) {
                const name = parts[i];
                const key = currentLevel === rootFolders ? name : `${currentLevel[0]?.id}/${name}`;
                const folderStat = fs.statSync(path.join(appModules.library.library.rootPath, folderPath));
                let folder = folderMap.get(key);
                if (!folder) {
                    folder = {
                        id: HashUtil.fnv1a(folderStat.birthtimeMs),
                        name,
                        children: [],
                        mtime: Date.now(),
                    };
                    currentLevel.push(folder);
                    folderMap.set(key, folder);
                }

                currentLevel = folder.children;
            }
        }

        return rootFolders;
    }
}