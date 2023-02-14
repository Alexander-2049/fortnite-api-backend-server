const lootListApi = require("../../api/lootList");

const lootList = async (req, res) => {
    const lang = req.query.lang || 'en';
    const type = req.query.enabled ? 'enabled' : 'default';

    let data;

    try {
        data = await lootListApi(type, lang);
    } catch (error) {
        return res.status(500).json({error: true, errorMessage: error.message});
    }

    return res.json(data)
}

module.exports = lootList;