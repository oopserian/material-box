import { contextBridge } from "electron";
import { libraryAPI } from "./modules/library";
import { settingAPI } from "./modules/setting";
import "./modules/thumb";

export const preloadModules = {
    library: libraryAPI,
    setting: settingAPI
}

Object.entries(preloadModules).forEach(([key, value]) => {
    contextBridge.exposeInMainWorld(key, value);
});