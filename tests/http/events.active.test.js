const fetchURL = require("../utils/fetchURL");
const getPossibleLanguages = require("../utils/getPossibleLanguages");
const getPossibleRegions = require("../utils/getPossibleRegions");
const getRandomElements = require("../utils/getRandomElements");

async function eventsActiveTest() {
    const t0 = performance.now();

    let languages = getRandomElements(getPossibleLanguages());
    let regions = getRandomElements(getPossibleRegions());

    for(let i = 0; i < languages.length; i++) {
        for(let y = 0; y < regions.length; y++) {
            const lang = languages[i];
            const region = regions[y];
    
            const result = await fetchURL(`${global.localhost}/events/list/active?lang=${lang}&region=${region}`);
            if(result.data === false) throw new Error(`${result.error.message}`);
            const res = result.data;
    
            if(res?.result !== true) throw new Error(`result = false (${lang})`);
            if(res?.lang.toLowerCase() !== lang.toLowerCase()) throw new Error(`returned wrong language | ${res?.lang.toLowerCase()} !== ${lang.toLowerCase()}`);
            if(!res?.events) throw new Error('something wrong with events array');
            if(res.events.length === 0) throw new Error('events list is empty');
        }
    }

    let result;
    let res;

    result = await fetchURL(`${global.localhost}/events/list/active`);
    if(result.data === false) throw new Error(`${result.error.message}`);
    res = result.data;

    if(res?.result !== true) throw new Error(`result = false (/events/list/active)`);
    if(res?.lang.toLowerCase() !== global.defaultLanguage.toLowerCase()) throw new Error(`returned wrong language | ${res?.lang.toLowerCase()} !== ${global.defaultLanguage.toLowerCase()}`);
    if(!res?.events) throw new Error('something wrong with augments array');
    if(res.events.length === 0) throw new Error('events list is empty');
    
    result = await fetchURL(`${global.localhost}/events/list/active?lang=dQcDWPOWQV)4v@!v4DVSAxzvxczv&region=LLL`);
    if(result.data === false) throw new Error(`${result.error.message}`);
    res= result.data;

    if(res?.result === true) throw new Error(`accepted non-existent language`);

    const t1 = performance.now();
    return t1 - t0;
}

module.exports = eventsActiveTest;