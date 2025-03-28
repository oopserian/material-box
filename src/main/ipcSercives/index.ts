import { LibraryService } from "./library";
import { SettingService } from "./setting";
import { ItemService } from "./item";

export default () => {
    new LibraryService();
    new SettingService();
    new ItemService();
};