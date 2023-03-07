function getPossibleLanguages() {
    let languages = JSON.parse(JSON.stringify(global.languages));
    for(let i = 0; i < global.languages.length; i++) {
        const lang = global.languages[i];
        languages.push(lang.toUpperCase());
    }

    return languages;
}

module.exports = getPossibleLanguages;