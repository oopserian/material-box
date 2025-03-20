import { BrowserWindow, ipcMain } from "electron";

export const getFocusedWindow = () => {
    return BrowserWindow.getFocusedWindow();
};