// https://fortniteapi.io/v1/game/augments

const didTimePassed = require("../utils/didTimePassed");
const apiRequest = require("../utils/apiRequest");
const isLang = require("../utils/isLang");

async function augments(lang = 'en') {
    if(!isLang(lang)) return false;

    let isGlobalEmpty = false;

    if(!global.augments?.[lang]) {
                
        let obj = {};
        obj[lang] = {
            lastUpdate: 0
        };
        global.augments = {...global.augments, ...obj};

        isGlobalEmpty = true;

    } else if(!didTimePassed(global.augments[lang].lastUpdate)) {

        return global.augments[lang];

    }

    // to prevent multiple updates while api request is happening
    // when multiple users make requests at the same time
    global.augments[lang].lastUpdate = Date.now();
    
    let uri = `https://fortniteapi.io/v1/game/augments?lang=${lang}`;

    let data = await apiRequest(uri);

    if(!data) {
        if(!isGlobalEmpty) return global.augments[lang];
        
        global.augments[lang] = false;
        return false;
    }
    
    let obj = {lastUpdate: Date.now(), ...data};
    global.augments[lang] = obj;

    return global.augments[lang];
}

module.exports = augments;