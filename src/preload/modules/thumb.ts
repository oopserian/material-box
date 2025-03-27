import { ipcRenderer } from "electron";
import compress from "@preload/utils/compress";

ipcRenderer.on('thumb.compress', (_, data) => {
    let { input, dest } = data;
    compress({
        input,
        dest,
    });
});