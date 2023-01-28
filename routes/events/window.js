// /events/window?windowId
const eventWindowApi = require("../../api/eventWindow");

const eventWindow = async (req, res) => {
    const windowId = req.query.windowId || false;
    if(!windowId) return res.status(404).json({error: true});
    
    let data = await eventWindowApi(windowId)

    if(!data) {
        return res.status(500).json({error: true})
    }

    return res.json(data)
}

module.exports = eventWindow;