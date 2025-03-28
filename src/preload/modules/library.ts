import { renderInvoke } from "@utils/electron";

export const libraryAPI = {
    select: () => renderInvoke('library:select'),
    update: (params: any) => renderInvoke('library:update', params),
};