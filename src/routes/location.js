const router = require('express').Router();
const locationController = require('../controllers/locationController');
const midleware = require('../midleware/midlewareController');

router.get("/location", midleware.verifyToken, locationController.show);
router.post("/location", midleware.verifyTokenAndAdminAuth, locationController.create);
router.patch("/location/:id", midleware.verifyTokenAndAdminAuth, locationController.update);


module.exports = router;