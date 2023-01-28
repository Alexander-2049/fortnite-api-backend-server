const { lootListHistory } = require("../../api/lootListHistory");

const lootListHistoryRoute = async (req, res) => {
    let data = await lootListHistory();

    if(!data) {
        return res.status(500).json({error: true})
    }

    return res.json(data)
}

module.exports = lootListHistoryRoute;