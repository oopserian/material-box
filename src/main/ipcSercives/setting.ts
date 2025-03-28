import { appModules } from "@main/modules";
import { registerIPC } from "@utils/electron";

export class SettingService {
    constructor() {
        this.register();
    }
    register() {
        registerIPC("setting:getAll", () => appModules.setting.getAll);
    }
}
