const router = require('express').Router();
const deviceController = require('../controllers/deviceController');
const midleware = require('../midleware/midlewareController');

router.get("/countAll",midleware.verifyToken,  deviceController.countAll);
router.get("/devices/:id",midleware.verifyToken, deviceController.showById);
router.patch("/devices/:id",midleware.verifyToken, deviceController.update);
router.get("/devices",midleware.verifyToken,  deviceController.show);
router.post("/devices",midleware.verifyToken, deviceController.create);

module.exports = router;
