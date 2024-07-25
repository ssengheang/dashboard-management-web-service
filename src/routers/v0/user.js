const express = require("express");
const Router = express.Router();
const {verifyTokens} = require('../../middlewares/token_verification');
const {
  index,
  show,
  register,
  create,
  update,
  deactivate,
  activate,
  destroy,
  me
} = require("../../controllers/v0/user_controller");
const { authorized } = require("../../middlewares/authorization");

module.exports = 
    Router
    .post("/users/register", register)
    .post("/users", verifyTokens, create)
    .put("/users", verifyTokens, authorized, update)
    .put("/users/:id/deactivate", verifyTokens, authorized, deactivate)
    .put("/users/:id/activate", verifyTokens, authorized, activate)
    .get("/users/me", verifyTokens, authorized, me)
    .get("/users", verifyTokens, authorized, index)
    .get("/users/:id", verifyTokens, authorized, show)
    .delete("/users/:id", verifyTokens, authorized, destroy);
