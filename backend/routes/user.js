const express = require("express");
const { register, login, logout, loadUser } = require("../controller/user");
const { isAuthenticated } = require("../middlewares/isAuth");
const router = express.Router();
router.route("/register").post(register);
router.route("/").post(login);
router.route("/logout").get(isAuthenticated, logout);
router.route("/loadUser").get(isAuthenticated, loadUser);

module.exports = router;
