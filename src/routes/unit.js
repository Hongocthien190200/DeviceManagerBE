const router = require('express').Router();
const unitController = require('../controllers/unitController');
// const midleware = require('../midleware/midlewareController');

router.get("/unit",  unitController.show);
router.post("/unit", unitController.create);
router.patch("/unit/:id", unitController.update);


module.exports = router;