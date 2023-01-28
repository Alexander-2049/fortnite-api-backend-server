const augmentsApi = require("../../api/augments");

const augmentsRoute = async (req, res) => {
    const lang = req.query.lang || 'en';

    let data = await augmentsApi(lang)

    if(!data) {
        return res.status(500).json({error: true})
    }

    return res.json(data)
}

module.exports = augmentsRoute;