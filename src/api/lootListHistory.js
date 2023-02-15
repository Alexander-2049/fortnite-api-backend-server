var fs = require('fs');
const apiRequest = require('../utils/apiRequest');

/**
 * @description returns an Array with all changes that have been saved
 */
async function lootListHistory() {
    if(global.lootListHistory.loading) throw new Error("Loot list history is loading at this moment. Try again later.");
    return global.lootListHistory.history;
}

async function init() {
    await fs.promises.mkdir(`${global.appRoot}/data/lootHistory`, { recursive: true }, (err) => {
        if (err) throw err;
    });

    if(global.lootListHistory.history.length !== 0) return false;

    if(!fs.existsSync(`${global.appRoot}/data/lootHistory/history.json`)
    || !fs.existsSync(`${global.appRoot}/data/lootHistory/previous.json`)) {
        await firstInit();
    }

    global.lootListHistory.history = JSON.parse(fs.readFileSync(`${global.appRoot}/data/lootHistory/history.json`, "utf8"));
    global.lootListHistory.previous = JSON.parse(fs.readFileSync(`${global.appRoot}/data/lootHistory/previous.json`, "utf8"));

    global.lootListHistory.loading = false;

    checkForUpdates();
    const SECONDS = 120;
    setInterval(checkForUpdates, SECONDS * 1000);
}

async function checkForUpdates() {

    let uri = `https://fortniteapi.io/v1/loot/list?lang=${global.defaultLanguage}`;

    let apiData;
    try {
        apiData = await apiRequest(uri);
    } catch (error) {
        console.error(error);
    }
    
    if(!apiData) return console.warn('Request to fortniteapi.io has failed. Check API-KEY in .env file.');

    global.lootListHistory.now = apiData;

    let difference = getDifference(global.lootListHistory.now, global.lootListHistory.previous);
    if(difference) {
        global.lootListHistory.history.push({date: Date.now(), ...difference})

        await saveHistory(global.lootListHistory.history);
        await savePrevious(apiData);
        global.lootListHistory.previous = apiData;

    }

}

function getDifference(a, b) {
    let added = [];
    let removed = [];
    let changed = [];

    for(let i = 0; i < a.weapons.length; i++) {
        let itemA = a.weapons[i];
        let itemB = b.weapons.filter(e => e.id === itemA.id);
            itemB = itemB.length === 1 ? itemB[0] : false;
        
        if(!itemB) {
            added.push(itemA);
        } else if(JSON.stringify(itemA) !== JSON.stringify(itemB)) {
            changed.push({before: itemB, after: itemA})
        }
    }

    for(let i = 0; i < b.weapons.length; i++) {
        let itemB = b.weapons[i];
        let itemA = a.weapons.filter(e => e.id === itemB.id);
            itemA = itemA.length === 1 ? itemA[0] : false;
        
        if(!itemA) {
            removed.push(itemB);
        }
    }

    if(added.length === 0 && removed.length === 0 && changed.length === 0) {
        return false;
    }

    return {
        added,
        removed,
        changed
    }
}

async function firstInit() {
    let historyData = []

    await fs.promises.writeFile(`${global.appRoot}/data/lootHistory/history.json`, JSON.stringify(historyData));

    let uri = `https://fortniteapi.io/v1/loot/list?lang=en`;

    let apiData;
    try {
        apiData = await apiRequest(uri);
    } catch (error) {
        console.error(error);
    }

    if(!apiData) return console.warn('Request to fortniteapi.io has failed. Check API-KEY in .env file.');

    await savePrevious(apiData);
    global.lootListHistory.now = apiData;
    global.lootListHistory.previous = apiData;
}

/**
 * @param {string} data type: Object
 * @description data will be converted by JSON.stringify and saved to /data/lootHistory/previous.json
 */
async function savePrevious(data) {
    data = JSON.stringify(data)

    await fs.promises.writeFile(`${global.appRoot}/data/lootHistory/previous.json`, data, 'utf8');
}

/**
 * @param {Object} data type: Object
 * @description data will be converted by JSON.stringify and saved to /data/lootHistory/previous.json
 */
async function saveHistory(data) {
    data = JSON.stringify(data)

    await fs.promises.writeFile(`${global.appRoot}/data/lootHistory/history.json`, data, 'utf8');
}

module.exports = {
    lootListHistory,
    init
};
