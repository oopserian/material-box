import { Setting } from "./setting";
import { Library } from "./library";
import { Folder } from "./folder";
import { Item } from "./item";

const appModules = {
    setting: new Setting(),
    library: new Library(),
    folder: new Folder(),
    item: new Item(),
};

// appModules.setting.init();
// appModules.library.init();
// appModules.folder.init();
// appModules.item.init();

export default appModules;