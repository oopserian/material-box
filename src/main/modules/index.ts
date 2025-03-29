import { Setting } from "./setting";
import { Library } from "./library";
import { Folder } from "./folder";
import { Item } from "./item";
import { Watch } from "./watch";

export const appModules = {
    watch: new Watch(),
    setting: new Setting(),
    library: new Library(),
    folder: new Folder(),
    item: new Item(),
};

export const initModules = () => {
    appModules.setting.init();
    if (!appModules.setting.rootLibraryDir) {
        console.log("请先选择一个库");
        return;
    };
    appModules.library.init();
    appModules.folder.init();
    appModules.item.init();
    appModules.watch.init();
}