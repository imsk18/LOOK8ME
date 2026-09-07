const {Router} = require('express');
const router = Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware")

router.post('/register',authController.registerController);
router.post('/login',authController.loginController);
router.get('/get-me',authMiddleware,authController.getMeController);



module.exports = router;
