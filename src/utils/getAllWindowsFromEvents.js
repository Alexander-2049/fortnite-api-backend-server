function getAllWindowsFromEvents(events) {
    let windows = [];
    for(let i = 0; i < events.events.length; i++) {
        for(let y = 0; y < events.events[i].windows.length; y++) {
            windows.push(events.events[i].windows[y].windowId)
        }
    }
    return windows;
}

module.exports = getAllWindowsFromEvents;