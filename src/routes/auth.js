const authController = require('../controllers/authController');
const midleware = require('../midleware/midlewareController');

const router = require('express').Router();

router.get("/alluser", midleware.verifyTokenAndAdminAuth, authController.show);
router.post("/register", midleware.verifyTokenAndAdminAuth, authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", midleware.verifyToken, authController.logoutUser);
router.post("/refresh", authController.requestRefreshToken);
module.exports = router;