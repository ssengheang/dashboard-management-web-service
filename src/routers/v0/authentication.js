const Router = require("express").Router();
const { login } = require("../../controllers/v0/authentication_controller");

module.exports = Router.post("/login", login);
