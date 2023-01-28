function isLang(lang) {
    return ['en', 'fr', 'ar', 'de', 'es', 'es-419', 'it', 'ja', 'ko', 'pl', 'pt-br', 'ru', 'tr'].includes(lang.toLowerCase())
}

module.exports = isLang