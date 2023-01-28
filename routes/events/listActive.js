const eventsList = require("../../api/eventsList");

const listActive = async (req, res) => {
    const region = req.query.region || 'EU';
    const lang = req.query.lang || 'en';

    let data = await eventsList('active', {
        region,
        lang
    })

    if(!data) {
        return res.status(500).json({error: true})
    }

    return res.json(data)
}

module.exports = listActive;