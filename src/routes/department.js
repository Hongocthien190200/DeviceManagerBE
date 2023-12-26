const router = require('express').Router();
const departmentController = require('../controllers/departmentController');
const midleware = require('../midleware/midlewareController');

router.get("/department",  departmentController.show);
router.post("/department",  departmentController.create);
router.patch("/department/:id", departmentController.update);


module.exports = router;