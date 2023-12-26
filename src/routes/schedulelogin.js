const historylogin = require('../controllers/schedulelogin');
const midleware = require('../midleware/midlewareController');

const router = require('express').Router();

router.get("/schedulelogin", midleware.verifyTokenAndAdminAuth, historylogin.show);
module.exports = router;