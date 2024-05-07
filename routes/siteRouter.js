const express = require("express");
const passport = require("passport");

const router = express.Router();

const { register, login, logout } = require("../controllers/siteController");

//router.get("/register", register); //for testing purposes
router.post("/register", register);

//router.get("/login", login); //for testing purposes

//Refactored login post route
router.post("/login",
    passport.authenticate("local", {
        failureRedirect: "/login/error",
        failureMessage: true,
    }),
login);

router.get("/login/error", (request, response, next) => {
    response.json("Login error");
});

router.get("/logout", logout);

module.exports = router;