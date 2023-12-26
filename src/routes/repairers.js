const router = require('express').Router();
const repairerController = require('../controllers/repairerController');
const midleware = require('../midleware/midlewareController');

router.get("/repairer", midleware.verifyToken, repairerController.show);
router.post("/repairer", midleware.verifyTokenAndAdminAuth, repairerController.create);
router.patch("/repairer/:id",midleware.verifyTokenAndAdminAuth, repairerController.update);


module.exports = router;
