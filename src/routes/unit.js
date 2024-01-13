const router = require('express').Router();
const unitController = require('../controllers/unitController');
const midleware = require('../midleware/midlewareController');

router.get("/unit",midleware.verifyToken,  unitController.show);
router.post("/unit",midleware.verifyToken, unitController.create);
router.patch("/unit/:id",midleware.verifyToken, unitController.update);


module.exports = router;