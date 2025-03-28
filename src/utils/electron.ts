import { ipcMain, ipcRenderer } from "electron";

export function registerIPC<Key extends keyof EventPayloadMapping>(
    channel: Key,
    callback: (event: Electron.IpcMainInvokeEvent, ...args: EventPayloadMapping[Key]['params']) => void
) {
    ipcMain.handle(channel, callback);
}

export function renderInvoke<Key extends keyof EventPayloadMapping>(
    channel: Key,
    ...args: EventPayloadMapping[Key]['params']
): Promise<EventPayloadMapping[Key]['result']> {
    return ipcRenderer.invoke(channel, ...args);
}

export function renderOn<Key extends keyof EventPayloadMapping>(
    channel: Key,
    callback: (...args: EventPayloadMapping[Key]['params']) => void
) {
    const cb = (_: Electron.IpcRendererEvent, ...args: EventPayloadMapping[Key]['params']) => callback(...args);
    ipcRenderer.on(channel, cb);
    return () => ipcRenderer.off(channel, cb);
}