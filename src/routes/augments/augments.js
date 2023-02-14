const augmentsApi = require("../../api/augments");

const augmentsRoute = async (req, res) => {
    const lang = req.query.lang || global.defaultLanguage;

    try {
        data = await augmentsApi(lang)
    } catch (error) {
        return res.status(500).json({error: true, errorMessage: error.message})
    }

    return res.json(data)
}

module.exports = augmentsRoute;