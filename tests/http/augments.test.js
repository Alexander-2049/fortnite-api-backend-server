const fetchURL = require("../utils/fetchURL");
const getPossibleLanguages = require("../utils/getPossibleLanguages");
const getRandomElements = require("../utils/getRandomElements");

async function augmentsTest() {
    const t0 = performance.now();

    let languages = getRandomElements(getPossibleLanguages());

    for(let i = 0; i < languages.length; i++) {
        const lang = languages[i];

        const result = await fetchURL(`${global.localhost}/augments?lang=${lang}`);
        if(result.data === false) throw new Error(`${result.error.message}`);
        const res = result.data;

        if(res?.result !== true) throw new Error(`result = false (${lang})`);
        if(res?.lang.toLowerCase() !== lang.toLowerCase()) throw new Error(`returned wrong language | ${res?.lang.toLowerCase()} !== ${lang.toLowerCase()}`);
        if(!res?.augments) throw new Error('something wrong with augments array');
        if(res.augments.length === 0) throw new Error('augments list is empty');
    }

    let result;
    let res;

    result = await fetchURL(`${global.localhost}/augments`);
    if(result.data === false) throw new Error(`${result.error.message}`);
    res = result.data;

    if(res?.result !== true) throw new Error(`result = false (/augments)`);
    if(res?.lang.toLowerCase() !== global.defaultLanguage.toLowerCase()) throw new Error(`returned wrong language | ${res?.lang.toLowerCase()} !== ${global.defaultLanguage.toLowerCase()}`);
    if(!res?.augments) throw new Error('something wrong with augments array');
    if(res.augments.length === 0) throw new Error('augments list is empty');
    
    result = await fetchURL(`${global.localhost}/augments?lang=dQcDWPOWQV)4v@!v4DVSAxzvxczv`);
    if(result.data === false) throw new Error(`${result.error.message}`);
    res= result.data;

    if(res?.result === true) throw new Error(`accepted non-existent language`);

    const t1 = performance.now();
    return t1 - t0;
}

module.exports = augmentsTest;