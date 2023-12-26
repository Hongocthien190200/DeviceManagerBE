const router = require('express').Router();
const statusController = require('../controllers/statusController');
const midleware = require('../midleware/midlewareController');

router.get("/status", midleware.verifyToken, statusController.show);
router.post("/status", midleware.verifyTokenAndAdminAuth, statusController.create);
router.patch("/status/:id", midleware.verifyTokenAndAdminAuth, statusController.update);


module.exports = router;