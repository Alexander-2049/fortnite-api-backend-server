function isRegion(region) {
    return ['EU', 'NAE', 'NAW', 'ASIA', 'BR', 'ME', 'OCE', 'ALL'].includes(region.toUpperCase())
}

module.exports = isRegion