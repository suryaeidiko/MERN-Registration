const express = require("express");
const authControlers = require("../controllers/auth-controller");

const router = express.Router();

router.route("/").get(authControlers.home)

router.route("/registration").post(authControlers.registration)

router.route("/login").post(authControlers.login)

module.exports = router;