function getRandomElements(array, amount = 3) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, amount);
    return selected;
}

module.exports = getRandomElements;