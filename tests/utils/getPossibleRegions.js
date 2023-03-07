function getPossibleRegions() {
    let regions = JSON.parse(JSON.stringify(global.regions));
    for(let i = 0; i < global.regions.length; i++) {
        const lang = global.regions[i];
        regions.push(lang.toLowerCase());
    }

    return regions;
}

module.exports = getPossibleRegions;