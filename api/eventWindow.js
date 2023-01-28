const didTimePassed = require("../utils/didTimePassed");
const apiRequest = require("../utils/apiRequest");
const getAllWindowsFromEvents = require("../utils/getAllWindowsFromEvents");
const eventsList = require("./eventsList");

async function eventWindow(windowId) {
    const windowLimited = process.env['SESSION-DETAILS-LIMIT-ENABLED'] || true;

    let events;

    if(windowLimited) {
        events = await eventsList('active', {
            region: 'ALL'
        });
    } else {
        events = await eventsList('default', {
            region: 'ALL'
        });
    }
    const windows = getAllWindowsFromEvents(events)

    if(!windows.includes(windowId)) return false;

    let isGlobalEmpty = false;

    if(!global.tournamentSessionDetails?.[windowId]) {
                
        let obj = {};
        obj[windowId] = {
            lastUpdate: 0
        };
        global.tournamentSessionDetails = {...global.tournamentSessionDetails, ...obj};

        isGlobalEmpty = true;

    } else if(!didTimePassed(global.tournamentSessionDetails[windowId].lastUpdate)) {

        return global.tournamentSessionDetails[windowId];

    }

    // to prevent multiple updates while api request is happening
    // when multiple users make requests at the same time
    global.tournamentSessionDetails[windowId].lastUpdate = Date.now();


    let uri = `https://fortniteapi.io/v1/events/window?windowId=${windowId}`;

    let data = await apiRequest(uri);

    if(!data) {
        if(!isGlobalEmpty) return global.tournamentSessionDetails[windowId];
        
        global.tournamentSessionDetails[windowId] = false;
        return false;
    }
    
    let obj = {lastUpdate: Date.now(), ...data};
    global.tournamentSessionDetails[windowId] = obj;

    return obj;
}

module.exports = eventWindow;