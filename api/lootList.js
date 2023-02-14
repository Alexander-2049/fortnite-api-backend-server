const didTimePassed = require("../utils/didTimePassed");
const isLang = require("../utils/isLang");
const apiRequest = require("../utils/apiRequest");

/**
 * @param {string} type "default", "enabled"
 * @param {string} lang en, fr, ar, de, es, es-419, it, ja, ko, pl, pt-br, ru, tr
 */
async function lootList(type, lang) {
    let result = false;
    switch (type) {
        case 'default':
            result = await lootListDefault(lang);
            break;

        case 'enabled':
            result = await lootListEnabled(lang);
            break;
        
        default:
            break;
    }
    return result;
}

async function lootListDefault(lang) {
    lang = lang || 'en';
    if(!isLang(lang)) throw new Error(`"${lang}" language does not exist`);
    let isGlobalEmpty = false;

    if(!global.lootList.default?.[lang]) {
                
        let obj = {};
        obj[lang] = {
            lastUpdate: 0
        };
        global.lootList.default = {...global.lootList.default, ...obj};

        isGlobalEmpty = true;

    } else if(!didTimePassed(global.lootList.default[lang].lastUpdate)) {

        return global.lootList.default[lang];

    }

    // to prevent multiple updates while api request is happening
    // when multiple users make requests at the same time
    global.lootList.default[lang].lastUpdate = Date.now();
    
    let uri = `https://fortniteapi.io/v1/loot/list?lang=${lang}`;

    let data;
    try {
        data = await apiRequest(uri);
    } catch (error) {
        data = false;
    }

    if(!data) {
        if(!isGlobalEmpty) return global.lootList.default[lang];
        
        global.lootList.default[lang] = false;
        throw new Error("API server does not answer. Local storage is empty.");
    }
    
    let obj = {lastUpdate: Date.now(), ...data};
    global.lootList.default[lang] = obj;

    return global.lootList.default[lang];
}

async function lootListEnabled(lang) {
    lang = lang || 'en';
    if(!isLang(lang)) return false;
    let isGlobalEmpty = false;

    if(!global.lootList.enabled?.[lang]) {
                
        let obj = {};
        obj[lang] = {
            lastUpdate: 0
        };
        global.lootList.enabled = {...global.lootList.enabled, ...obj};

        isGlobalEmpty = true;

    } else if(!didTimePassed(global.lootList.enabled[lang].lastUpdate)) {

        return global.lootList.enabled[lang];

    }

    // to prevent multiple updates while api request is happening
    // when multiple users make requests at the same time
    global.lootList.enabled[lang].lastUpdate = Date.now();
    
    let uri = `https://fortniteapi.io/v1/loot/list?lang=${lang}&enabled=true`;

    let data;
    try {
        data = await apiRequest(uri);
    } catch (error) {
        data = false;
    }

    if(!data) {
        if(!isGlobalEmpty) return global.lootList.enabled[lang];
        
        global.lootList.enabled[lang] = false;
        throw new Error("API server does not answer. Local storage is empty.");
    }
    
    let obj = {lastUpdate: Date.now(), ...data};
    global.lootList.enabled[lang] = obj;

    return global.lootList.enabled[lang];
}

module.exports = lootList;