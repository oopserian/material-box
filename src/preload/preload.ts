import { contextBridge } from "electron";
import { libraryAPI } from "./modules/library";
import { settingAPI } from "./modules/setting";
import { itemAPI } from "./modules/item";
import { folderAPI } from "./modules/folder";
import "./modules/thumb";

export const preloadModules = {
    library: libraryAPI,
    setting: settingAPI,
    item: itemAPI,
    folder: folderAPI
}

Object.entries(preloadModules).forEach(([key, value]) => {
    contextBridge.exposeInMainWorld(key, value);
});