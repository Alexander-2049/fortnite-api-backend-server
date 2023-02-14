const eventsList = require("../../api/eventsList");

const listLive = async (req, res) => {
    const region = req.query.region || 'EU';
    const lang = req.query.lang || 'en';

    let data;

    try {
        data = await eventsList('live', {
            region,
            lang
        });
    } catch (error) {
        return res.status(500).json({error: true, errorMessage: error.message});
    }

    return res.json(data)
}

module.exports = listLive;