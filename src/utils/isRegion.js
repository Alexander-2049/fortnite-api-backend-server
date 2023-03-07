function isRegion(region) {
    return global.regions.includes(region.toUpperCase())
}

module.exports = isRegion