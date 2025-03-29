interface LibraryEvents {
    "library:select": {
        params: [],
        result: void,
    },
    "library:update": {
        params: [any],
        result: void,
    }
}

interface SettingEvents {
    "setting:getAll": {
        params: [],
        result: import('@main/modules/setting').SettingParams,
    }
}

interface FolderEvents{
    "folder:getAll":{
        params: [],
        result: import('@main/modules/folder').FolderData[],
    }
}

interface ItemEvents{
    "item:getAll":{
        params: [],
        result: import('@main/modules/item').ItemData[],
    }
}

type EventPayloadMapping = LibraryEvents & SettingEvents & ItemEvents & FolderEvents
