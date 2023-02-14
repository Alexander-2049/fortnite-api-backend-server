const eventsList = require("../../api/eventsList");

const listActive = async (req, res) => {
    const region = req.query.region || global.defaultRegion;
    const lang = req.query.lang || global.defaultLanguage;

    let data;
    
    try {
        data = await eventsList('active', {
            region,
            lang
        })   
    } catch (error) {
        return res.status(500).json({error: true, errorMessage: error.message})
    }

    return res.json(data)
}

module.exports = listActive;