import { ipcRenderer } from "electron";
import compress from "@utils/compress";

ipcRenderer.on('thumb.compress', (_, data) => {
    let { input, dest } = data;
    compress({
        input,
        dest,
    });
});