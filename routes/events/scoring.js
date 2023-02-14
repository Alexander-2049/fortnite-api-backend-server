// /events/scoring?windowId
const { eventsScoring } = require("../../api/eventsScoring");

const eventWindowScoring = async (req, res) => {
    const windowId = req.query.windowId || false;
    if(!windowId) return res.status(404).json({error: true});
    
    let data;
    
    try {
        data = await eventsScoring(windowId);
    } catch (error) {
        return res.status(500).json({error: true, errorMessage: error.message});
    }

    return res.json(data)
}

module.exports = eventWindowScoring;