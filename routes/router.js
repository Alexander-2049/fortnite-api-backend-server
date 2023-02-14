const Router = require('express');
const router = new Router();

router.get('/loot/list', require('./loot/list'));
router.get('/loot/history', require('./loot/listHistory'));
router.get('/events/list', require('./events/list'));
router.get('/events/list/active', require('./events/listActive'));
router.get('/events/list/live', require('./events/listLive'));
router.get('/events/window', require('./events/window'));
router.get('/events/scoring', require('./events/scoring'));
router.get('/augments', require('./augments/augments'));

module.exports = router;