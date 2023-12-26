const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const midleware = require('../midleware/midlewareController');

router.get("/category", midleware.verifyToken, categoryController.show);
router.post("/category", midleware.verifyTokenAndAdminAuth, categoryController.create);
router.patch("/category/:id", midleware.verifyTokenAndAdminAuth, categoryController.update);


module.exports = router;