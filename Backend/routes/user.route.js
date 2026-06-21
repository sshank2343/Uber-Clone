const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register",[
    body("fullname.firstname").isLength({min: 3}).withMessage("Firstname should be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({min: 6}).withMessage("Password should be at least 6 characters long")
], userController.registerUserController);

router.post("/login",[
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({min: 6}).withMessage("Password should be at least 6 characters long")
], userController.loginUserController);

router.get("/profile", authMiddleware.authMiddleware, userController.getUserProfileController);

router.get("/logout",authMiddleware.authMiddleware, userController.logoutUserController);

module.exports = router;