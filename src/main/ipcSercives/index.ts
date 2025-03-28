import { LibraryService } from "./library";
import { SettingService } from "./setting";

export default () => {
    new LibraryService();
    new SettingService();
};