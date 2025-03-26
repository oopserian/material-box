import { app } from "electron";
import path from "path";
import fs from "fs";

export interface SettingParams {
    rootLibraryDir?: string;
    libraryDirs?: string[];
}

export class Setting {
    setting: SettingParams;
    userSettingName: 'Setting.json';
    userSettingPath: string;
    constructor() {
        const userData = app.getPath('userData');
        this.userSettingPath = path.normalize(userData + "/" + this.userSettingName);
        if (!fs.existsSync(this.userSettingPath)) {
            fs.writeFileSync(this.userSettingPath, JSON.stringify({}, null, 2));
        };
        const setting = JSON.parse(fs.readFileSync(this.userSettingPath, 'utf8'));
        this.setting = setting;
    }
    update(params: SettingParams) {
        this.setting = params;
        fs.writeFileSync(this.userSettingPath, JSON.stringify(this.setting, null, 2));
    }
    get() {
        return this.setting;
    }
}
