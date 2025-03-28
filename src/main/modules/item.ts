import { appModules } from ".";
import path from "path";
import fs from "fs";
import HashUtil from "@utils/hash";
import { getFocusedWindow } from "@main/lib/window";
import { imageSizeFromFile } from 'image-size/fromFile'

export interface ItemData {
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
    items: { [key: string]: ItemData } = {};
    constructor() {}
    init() {
        this.itemsCachePath = path.join(appModules.library.libraryCachePath, "items");
        if (!fs.existsSync(this.itemsCachePath)) {
            fs.mkdirSync(this.itemsCachePath);
        };
    }
    async createItem(rawPath: string) {
        const { id, size, btime, mtime, ext, width, height } = await this.getItemBaseInfo(rawPath);
        const fileName = path.basename(rawPath, ext);
        const thumbName = fileName + ".thumb" + ext;
        const itemDirPath = path.join(this.itemsCachePath, id);
        const dest = path.join(itemDirPath, thumbName);
        if (!fs.existsSync(itemDirPath)) {
            fs.mkdirSync(itemDirPath);
        };
        this.createMetadata(id, {
            name: fileName,
            size,
            btime,
            mtime,
            ext: ext.slice(1),
            tags: [],
            folder: "",
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
        this.items[itemId] = metadata;
        const metadataPath = path.join(this.itemsCachePath, itemId, "metadata.json");
        fs.writeFileSync(metadataPath, JSON.stringify(metadata));
    }
    async getItemBaseInfo(rawPath: string) {
        const stat = fs.statSync(rawPath);
        const ext = path.extname(rawPath);
        const { width, height } = await imageSizeFromFile(rawPath);
        const baseInfo = {
            id: "",
            size: stat.size,
            btime: stat.birthtime,
            mtime: stat.mtime,
            ext,
            width,
            height
        }
        if (process.platform === 'win32') {
            // TODO：windows上使用fsutil获取文件id
            baseInfo.id = HashUtil.fnv1a(stat.birthtimeMs + ext).toString();
        } else {
            baseInfo.id = HashUtil.fnv1a(stat.birthtimeMs + stat.ino + ext).toString();
        }
        return baseInfo;
    }
}