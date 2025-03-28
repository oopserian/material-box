import { renderInvoke } from "@utils/electron";

export const itemAPI = {
    getAll: () => renderInvoke("item:getAll"),
};