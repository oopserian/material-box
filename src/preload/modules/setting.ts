import { renderInvoke } from "@utils/electron";

export const settingAPI = {
    getAll: () => renderInvoke("setting:getAll"),
};