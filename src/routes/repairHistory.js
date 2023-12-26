const router = require('express').Router();
const repairHistoryController = require('../controllers/repairHistoryController');
const midleware = require('../midleware/midlewareController');

router.get("/repair-history", midleware.verifyToken, repairHistoryController.show);
router.get("/repair-history/:id", midleware.verifyToken, repairHistoryController.showById);
router.post("/repair-history/:id", midleware.verifyTokenAndAdminAuth, repairHistoryController.create);
router.patch("/repair-history/:id", midleware.verifyTokenAndAdminAuth, repairHistoryController.update);
router.get("/repair-history/devices/:id", midleware.verifyToken, repairHistoryController.showByIdDevice);
module.exports = router;
