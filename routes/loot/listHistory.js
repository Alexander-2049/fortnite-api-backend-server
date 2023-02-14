const { lootListHistory } = require("../../api/lootListHistory");

const lootListHistoryRoute = async (req, res) => {
    let data;
    
    try {
        data = await lootListHistory();
    } catch (error) {
        return res.status(500).json({error: true, errorMessage: error.message});
    }

    return res.json(data)
}

module.exports = lootListHistoryRoute;