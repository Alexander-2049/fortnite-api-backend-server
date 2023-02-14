const didTimePassed = require("../utils/didTimePassed");
const apiRequest = require("../utils/apiRequest");
const getAllWindowsFromEvents = require("../utils/getAllWindowsFromEvents");
const eventsList = require("./eventsList");

async function eventWindow(windowId) {
    const windowLimited = process.env['SESSION-DETAILS-LIMIT-ENABLED'] || true;

    let events;

    if(windowLimited) {
        try {
            events = await eventsList('active', {
                region: 'ALL'
            });
        } catch (error) {
            throw new Error(`Cannot get events list - ${error.message}`)
        }
    } else {
        try {
            events = await eventsList('default', {
                region: 'ALL'
            });
        } catch (error) {
            throw new Error(`Cannot get events list - ${error.message}`)
        }
    }
    const windows = getAllWindowsFromEvents(events)

    if(!windows.includes(windowId)) {
        if(windowLimited) throw new Error(`${windowId} session does not exist or is not active.`);
        if(!windowLimited) throw new Error(`${windowId} session does not exist.`);
    }

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

    let data;

    try {
        data = await apiRequest(uri);
    } catch (error) {
        data = false;
    }

    if(!data) {
        if(!isGlobalEmpty) return global.tournamentSessionDetails[windowId];
        
        global.tournamentSessionDetails[windowId] = false;
        throw new Error("API server does not answer. Local storage is empty.");
    }
    
    let obj = {lastUpdate: Date.now(), ...data};
    global.tournamentSessionDetails[windowId] = obj;

    return obj;
}

module.exports = eventWindow;