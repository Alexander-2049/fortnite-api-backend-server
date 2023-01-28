const eventsList = require("../../api/eventsList");

const listLive = async (req, res) => {
    const region = req.query.region || 'EU';
    const lang = req.query.lang || 'en';

    let data = await eventsList('live', {
        region,
        lang
    })

    if(!data) {
        return res.status(500).json({error: true})
    }

    return res.json(data)
}

module.exports = listLive;