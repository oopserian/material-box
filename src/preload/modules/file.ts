import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('fileAPI', {
    selectFolder: () => ipcRenderer.invoke('selectFolder'),
});