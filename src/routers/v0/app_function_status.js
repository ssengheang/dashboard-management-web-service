const express = require("express");
const Router = express.Router();
const {verifyTokens} = require('../../middlewares/token_verification');
const {
  index,
  show,
  create,
  update,
  destroy,
} = require("../../controllers/v0/app_function_status_controller");
const { authorized } = require("../../middlewares/authorization");

module.exports = 
    Router
    .post("/app-function-statuses", verifyTokens, authorized, create)
    .get("/app-function-statuses", verifyTokens, authorized, index)
    .get("/app-function-statuses/:id", verifyTokens, authorized, show)
    .put("/app-function-statuses/:id", verifyTokens, authorized, update)
    .delete("/app-function-statuses/:id", verifyTokens, authorized, destroy);
