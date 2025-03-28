import { appModules } from "@main/modules";
import { registerIPC } from "@utils/electron";

export class ItemService {
    constructor() {
        this.register();
    }
    register() {
        registerIPC("item:getAll", () => appModules.item.items);
    }
}
