const Router = require("express").Router();
const {
  login,
  loginDashboard,
} = require("../../controllers/v0/authentication_controller");

module.exports = Router.post("/login", login).post(
  "/login-dashboard",
  loginDashboard
);
