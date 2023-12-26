const router = require('express').Router();
const deviceController = require('../controllers/deviceController');
const midleware = require('../midleware/midlewareController');

router.get("/countAll",  deviceController.countAll);
// midleware.verifyToken,
router.get("/devices/:id", deviceController.showById);
// midleware.verifyToken, 
router.patch("/devices/:id", deviceController.update);
// midleware.verifyTokenAndAdminAuth,
router.get("/devices",  deviceController.show);
// midleware.verifyToken,
// router.get("/devices-location", deviceController.showOflocation);
// midleware.verifyToken, 
// router.get("/devices-used",  deviceController.showOfuse);
// midleware.verifyToken,
router.post("/devices", deviceController.create);
// midleware.verifyTokenAndAdminAuth, 

module.exports = router;
