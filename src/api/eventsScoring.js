var fs = require('fs');
const apiRequest = require('../utils/apiRequest');
const eventWindow = require('./eventWindow');

/**
 * @description TODO
 */
async function eventsScoring(windowId) {
    // TODO
    if(!windowId) throw new Error(`windowId is required`);
    
    let apiData;

    try {
        apiData = await eventWindow(windowId);
    } catch (error) {
        throw new Error(`failed to get event details - ${error.message}`);
    }
    
    // apiData.session.rules.scoring
    
}

async function init() {
    await fs.promises.mkdir(`${global.appRoot}/data/scoringSuggestions`, { recursive: true }, (err) => {
        if (err) throw err;
    });
    // TODO
    if(global.lootListHistory.history.length !== 0) return false;

    if(!fs.existsSync(`${global.appRoot}/data/lootHistory/history.json`)
    || !fs.existsSync(`${global.appRoot}/data/lootHistory/previous.json`)) {
        await firstInit();
    }

    global.lootListHistory.history = JSON.parse(fs.readFileSync(`${global.appRoot}/data/lootHistory/history.json`, "utf8"));
    global.lootListHistory.previous = JSON.parse(fs.readFileSync(`${global.appRoot}/data/lootHistory/previous.json`, "utf8"));

    global.lootListHistory.loading = false;

    checkForUpdates();
    setInterval(checkForUpdates, 120 * 1000);
}

module.exports = {
    eventsScoring,
    init
};
