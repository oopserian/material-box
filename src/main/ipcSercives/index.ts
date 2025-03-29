import { LibraryService } from "./library";
import { SettingService } from "./setting";
import { ItemService } from "./item";
import { FolderService } from "./folder";

export default () => {
    new LibraryService();
    new SettingService();
    new ItemService();
    new FolderService();
};