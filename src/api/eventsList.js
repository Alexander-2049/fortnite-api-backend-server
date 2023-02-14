const didTimePassed = require("../utils/didTimePassed");
const isRegion = require("../utils/isRegion");
const isLang = require("../utils/isLang");
const apiRequest = require("../utils/apiRequest");

/**
 * @param {string} type "default", "active", "live"
 * @param {Object} params default: "lang", "region"
 * @description lang: en, fr, ar, de, es, es-419, it, ja, ko, pl, pt-br, ru, tr
 * @description region: EU, NAE, NAW, ASIA, BR, ME, OCE, ALL
 */
async function eventsList(type, params) {
    let result = false;
    try {
        switch (type) {
            case 'default':
                result = await eventsListDefault(params);
                break;
    
            case 'active':
                result = await eventsListActive(params);
                break;
    
            case 'live':
                result = await eventsListLive(params);
                break;
            
            default:
                break;
        }
    } catch (error) {
        throw new Error(error.message);
    }
    return result;
}

async function eventsListDefault(params) {
    let lang = params.lang || global.defaultLanguage;
    let region = params.region || global.defaultRegion;

    if(!isLang(lang)) throw new Error(`"${lang}" language does not exist`);
    if(!isRegion(region)) throw new Error(`"${region}" region does not exist`);

    let isGlobalEmpty = false;

    if(!global.tournaments.default?.[lang]?.[region]) {
                
        let obj = {};
        obj[lang] = {};
        obj[lang][region] = {
            lastUpdate: 0
        };
        global.tournaments.default = {...global.tournaments.default, ...obj};

        isGlobalEmpty = true;

    } else if(!didTimePassed(global.tournaments.default[lang][region].lastUpdate)) {

        return global.tournaments.default[lang][region];

    }

    // to prevent multiple updates while api request is happening
    // when multiple users make requests at the same time
    global.tournaments.default[lang][region].lastUpdate = Date.now();
    
    let uri = `https://fortniteapi.io/v1/events/list?lang=${lang}&region=${region}`;

    let data;
    try {
        data = await apiRequest(uri);
    } catch (error) {
        data = false;
    }

    if(!data) {
        if(!isGlobalEmpty) return global.tournaments.default[lang][region];
        
        global.tournaments.default[lang][region] = false;
        throw new Error("API server does not answer. Local storage is empty.");
    }
    
    let obj = {lastUpdate: Date.now(), ...data};
    global.tournaments.default[lang][region] = obj;

    return global.tournaments.default[lang][region];
}

async function eventsListActive(params) {
    let lang = params.lang || global.defaultLanguage;
    let region = params.region || global.defaultRegion;

    if(!isLang(lang)) return false;
    if(!isRegion(region)) return false;

    let isGlobalEmpty = false;

    if(!global.tournaments.active?.[lang]?.[region]) {
                
        let obj = {};
        obj[lang] = {};
        obj[lang][region] = {
            lastUpdate: 0
        };
        global.tournaments.active = {...global.tournaments.active, ...obj};

        isGlobalEmpty = true;

    } else if(!didTimePassed(global.tournaments.active[lang][region].lastUpdate)) {

        return global.tournaments.active[lang][region];

    }

    // to prevent multiple updates while api request is happening
    // when multiple users make requests at the same time
    global.tournaments.active[lang][region].lastUpdate = Date.now();
    
    let uri = `https://fortniteapi.io/v1/events/list/active?lang=${lang}&region=${region}`;

    let data;
    try {
        data = await apiRequest(uri);
    } catch (error) {
        data = false;
    }

    if(!data) {
        if(!isGlobalEmpty) return global.tournaments.active[lang][region];
        
        global.tournaments.active[lang][region] = false;
        throw new Error("API server does not answer. Local storage is empty.");
    }
    
    let obj = {lastUpdate: Date.now(), ...data};
    global.tournaments.active[lang][region] = obj;

    return obj;
}

async function eventsListLive(params) {
    let lang = params.lang || global.defaultLanguage;
    let region = params.region || global.defaultRegion;

    if(!isLang(lang)) return false;
    if(!isRegion(region)) return false;

    let isGlobalEmpty = false;

    if(!global.tournaments.live?.[lang]?.[region]) {
                
        let obj = {};
        obj[lang] = {};
        obj[lang][region] = {
            lastUpdate: 0
        };
        global.tournaments.live = {...global.tournaments.live, ...obj};

        isGlobalEmpty = true;

    } else if(!didTimePassed(global.tournaments.live[lang][region].lastUpdate)) {

        return global.tournaments.live[lang][region];

    }

    // to prevent multiple updates while api request is happening
    // when multiple users make requests at the same time
    global.tournaments.live[lang][region].lastUpdate = Date.now();
    
    let uri = `https://fortniteapi.io/v1/events/list/live?lang=${lang}&region=${region}`;

    let data;
    try {
        data = await apiRequest(uri);
    } catch (error) {
        data = false;
    }

    if(!data) {
        if(!isGlobalEmpty) return global.tournaments.live[lang][region];
        
        global.tournaments.live[lang][region] = false;
        throw new Error("API server does not answer. Local storage is empty.");
    }
    
    let obj = {lastUpdate: Date.now(), ...data};
    global.tournaments.live[lang][region] = obj;

    return global.tournaments.live[lang][region];
}

module.exports = eventsList