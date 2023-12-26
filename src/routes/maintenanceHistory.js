const router = require('express').Router();
const maintenanceHistoryController = require('../controllers/maintenanceHistoryController');
const midleware = require('../midleware/midlewareController');

router.get("/maintenance-history", midleware.verifyToken, maintenanceHistoryController.show);
router.get("/maintenance-history/:id", midleware.verifyToken, maintenanceHistoryController.showById);
router.patch("/maintenance-history/:id", midleware.verifyTokenAndAdminAuth, maintenanceHistoryController.update);
router.get("/maintenance-history/devices/:id", midleware.verifyTokenAndAdminAuth, maintenanceHistoryController.showByIdDevice);
router.post("/maintenance-history/:id", midleware.verifyTokenAndAdminAuth, maintenanceHistoryController.create);

module.exports = router;
