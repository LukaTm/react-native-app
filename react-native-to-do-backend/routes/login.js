const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const router = express.Router();

router.post(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email address."),
        body(
            "password",
            "Please enter a password with at least 8 characters that contains at least one uppercase letter, one lowercase letter, one number, and one special character."
        )
            .isLength({ min: 8 })
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
            .trim(),
    ],
    authController.postSignup
);

router.post("/login", authController.postLogin);

module.exports = router;
