const router = require("express").Router();
const authController = require("../../modules/auth/auth.controller.js");

router.post("/login", authController.login);
router.post("/register", authController.registerAdmin);

module.exports = router;
