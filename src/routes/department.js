const router = require('express').Router();
const departmentController = require('../controllers/departmentController');
const midleware = require('../midleware/midlewareController');

router.get("/department",midleware.verifyToken,  departmentController.show);
router.post("/department",midleware.verifyToken,  departmentController.create);
router.patch("/department/:id",midleware.verifyToken, departmentController.update);


module.exports = router;