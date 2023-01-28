var path = require('path');
global.appRoot = path.resolve(__dirname);

// Defining global values
// global.challanges = null;
// global.items = null;
// global.upcomingItems = null;
// global.itemDetails = null;
// global.listOfSets = null;
// global.dailyShop = null;
// global.rarities = null;
global.tournaments = {
    default: {},
    active: {},
    live: {}
};
global.tournamentSessionDetails = {};
// global.tournamentScores = null;
// global.currentMap = null;
// global.currentMapWithPOINames = null;
// global.previousMaps = null;
global.lootList = {
    default: {},
    enabled: {}
};
global.lootListHistory = {
    history: [],
    now: {},
    previous: {},
    loading: true
};
global.augments = {};