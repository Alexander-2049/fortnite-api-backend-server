function didTimePassed(time) {

    const SECONDS_BETWEEN_UPDATES = process.env['SECONDS-BETWEEN-UPDATES'] || 30;

    const CURRENT_TIME = Date.now();
    const LAST_UPDATE_TIME = time;
    const MILLISECONDS_BETWEEN_UPDATES = SECONDS_BETWEEN_UPDATES * 1000;
    
    const DIFFERENCE = CURRENT_TIME - LAST_UPDATE_TIME;

    if(DIFFERENCE > MILLISECONDS_BETWEEN_UPDATES) return true;

    return false;
}

module.exports = didTimePassed;