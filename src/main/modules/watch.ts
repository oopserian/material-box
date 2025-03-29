import { watch } from "chokidar";
import { appModules } from "@main/modules";
import path from "path";


export class Watch {
    init() {
        const libraryRootPath = appModules.library.rootPath;
        watch('.', {
            cwd: libraryRootPath,
            ignored: [/.pptbox/, /.DS_Store/],
            ignoreInitial: true,
            alwaysStat: true
        }).on('all', (event, filePath) => {
            if (event == 'add') {
                this.watchAdd(filePath);
            } else if (event == 'unlinkDir') {
                // 改变文件夹
            } else if (event == 'addDir') {
                // 添加文件夹
            }
        });
    }
    private watchAdd(filePath: string) {
        const libraryRootPath = appModules.library.rootPath;
        let rawPath = path.join(libraryRootPath, filePath);
        appModules.item.createItem(rawPath);
    }
}
