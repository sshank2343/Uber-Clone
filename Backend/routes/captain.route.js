const express = require("express");
const router = express.Router();
const {body} = require("express-validator")
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/register',[
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('fullname.firstname').trim().isLength({min: 1}).withMessage('First name is required'),
    body('fullname.lastname').trim().isLength({min: 1}).withMessage('Last name is required'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Vehicle capacity must be a positive integer'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be either car, bike, or auto'),
],
captainController.registerCaptainController
)




router.post('/login',[
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],
captainController.loginCaptainController
)



router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)


router.post('/logout',authMiddleware.authCaptain,captainController.logoutCaptainController)
module.exports = router;