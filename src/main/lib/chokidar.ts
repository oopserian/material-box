import { watch } from "chokidar";
import { appModules } from "@main/modules";
import path from "path";


export class Chokidar {
  constructor() { }
  async watch(dirPath: string) {
    watch('.', {
      cwd: dirPath,
      ignored: /.pptbox/,
      ignoreInitial: true
    }).on('all', (event, filePath) => {
      if (event == 'add') {
        let rawPath = path.join(dirPath, filePath);
        appModules.item.createItem(rawPath);
      }
    });
  }
}
