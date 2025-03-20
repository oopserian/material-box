import { dialog } from "electron";
import { getFocusedWindow } from "@main/lib/window";
import fg from "fast-glob";
import { statSync } from "fs";
import { createHash } from "crypto";
import { Chokidar } from "@main/hooks/chokidar";


export const selectFolder = async () => {
    const result = await dialog.showOpenDialog(getFocusedWindow(), {
        properties: ['openDirectory']
    });
    if (!result.canceled) {
        return result.filePaths[0];
    };
    return null;
};

export const getFileList = async (path: string) => {
    const stream = await fg.globStream('**', {
        // onlyDirectories: true,
        onlyFiles: true,
        cwd: path,
    });
    // Chokidar.init(path);
    const result: any = {};
    console.time('get-file-list');
    for await (const entry of stream) {
        const hash = createHash('sha256').update(entry).digest('hex');
        result[hash.substring(0, 10)] = statSync(path + '/' + entry);
    };
    console.timeEnd('get-file-list');
    return result;
};