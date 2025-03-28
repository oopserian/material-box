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

type EventPayloadMapping = LibraryEvents & SettingEvents
