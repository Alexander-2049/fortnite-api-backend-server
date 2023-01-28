const lootListApi = require("../../api/lootList");

const lootList = async (req, res) => {
    const lang = req.query.lang || 'en';
    const type = req.query.enabled ? 'enabled' : 'default';

    let data = await lootListApi(type, lang)

    if(!data) {
        return res.status(500).json({error: true})
    }

    return res.json(data)
}

module.exports = lootList;