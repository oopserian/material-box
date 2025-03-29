import { appModules } from ".";
import path from "path";
import fs from "fs";
import HashUtil from "@utils/hash";
import { getFocusedWindow } from "@main/lib/window";
import { imageSizeFromFile } from 'image-size/fromFile';
import lineByLine from "n-readlines";
import { app } from "electron";

export interface ItemData {
    id: string;
    name: string;
    size: number;
    btime: Date;
    mtime: Date;
    ext: string;
    tags: string[];
    folder: string;
    width: number;
    height: number;
}

export class Item {
    itemsCachePath: string = "";
    itemsMap: { [key: string]: ItemData } = {};
    items: ItemData[] = []
    init() {
        this.itemsCachePath = path.join(appModules.library.libraryMetaCachePath, "items");
        if (!fs.existsSync(this.itemsCachePath)) {
            fs.mkdirSync(this.itemsCachePath);
        };
        this.cacheToItems();
    }
    cacheToItems() {
        const userData = app.getPath('userData');
        const metaCacheName = HashUtil.fnv1a(appModules.setting.rootLibraryDir).toString() + '.txt';
        const metaCacheDirPath = path.join(userData, "library-caches");
        const metaCachePath = path.join(metaCacheDirPath, metaCacheName);
        if (!fs.existsSync(metaCachePath)) {
            // 暂无缓存文件
            return
        };
        console.time("「读取」items缓存");
        const liner = new lineByLine(metaCachePath, {
            readChunk: 2048
        });
        let line;
        let lines = [];
        while (line = liner.next()) {
            lines.push(line.toString());
        }
        lines.forEach((line) => {
            try {
                const item = JSON.parse(line) as ItemData;
                if (item) {
                    this.itemsMap[item.id] = item;
                    this.items.push(item);
                }
            }
            catch (err) { }
        });
        console.timeEnd("「读取」items缓存");
    }
    async createItem(rawPath: string) {
        const { id, size, btime, mtime, ext, folder } = await this.getItemBaseInfo(rawPath);
        const { width, height } = await this.getItemSize(rawPath);
        const fileName = path.basename(rawPath, ext);
        const thumbName = fileName + ".thumb.png";
        const itemDirPath = path.join(this.itemsCachePath, id);
        const dest = path.join(itemDirPath, thumbName);
        if (!fs.existsSync(itemDirPath)) {
            fs.mkdirSync(itemDirPath);
        };
        this.createMetadata(id, {
            id,
            name: fileName,
            size,
            btime,
            mtime,
            ext: ext.slice(1),
            tags: [],
            folder,
            width,
            height,
        });
        this.createThumbnail(rawPath, dest);
    }
    createThumbnail(rawPath: string, dest: string) {
        getFocusedWindow().webContents.send("thumb.compress", {
            input: rawPath,
            dest
        });
    }
    createMetadata(itemId: string, metadata: ItemData) {
        this.itemsMap[itemId] = metadata;
        const metadataPath = path.join(this.itemsCachePath, itemId, "metadata.json");
        fs.writeFileSync(metadataPath, JSON.stringify(metadata));
    }
    async getItemBaseInfo(rawPath: string) {
        const folderPath = path.dirname(rawPath);
        const folderStat = fs.statSync(folderPath);
        const stat = fs.statSync(rawPath);
        const ext = path.extname(rawPath);
        const baseInfo = {
            id: "",
            folder: appModules.folder.generateFolderId(folderStat.birthtimeMs),
            size: stat.size,
            btime: stat.birthtime,
            mtime: stat.mtime,
            ext
        }
        if (process.platform === 'win32') {
            // TODO：windows上使用fsutil获取文件id
            baseInfo.id = HashUtil.fnv1a(stat.birthtimeMs + ext).toString();
        } else {
            baseInfo.id = HashUtil.fnv1a(stat.birthtimeMs + stat.ino + ext).toString();
        }
        return baseInfo;
    }
    async getItemSize(rawPath: string) {
        const { width, height } = await imageSizeFromFile(rawPath);
        return { width, height };
    }
}