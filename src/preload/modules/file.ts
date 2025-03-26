import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('libraryAPI', {
    selectLibrary: () => ipcRenderer.invoke('selectLibrary'),
});