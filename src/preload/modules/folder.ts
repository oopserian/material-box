import { renderInvoke } from "@utils/electron";

export const folderAPI = {
    getAll: () => renderInvoke("folder:getAll"),
};