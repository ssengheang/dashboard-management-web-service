const express = require("express");
const Router = express.Router();
const {verifyTokens} = require('../../middlewares/token_verification');
const {
  index,
  show,
  create,
  update,
  destroy,
  updateStatus
} = require("../../controllers/v0/app_function_contoller");
const { authorized } = require("../../middlewares/authorization");

module.exports = 
    Router
    .post("/app-functions", create)
    .get("/app-functions", verifyTokens, authorized, index)
    .get("/app-functions/:id", verifyTokens, authorized, show)
    .put("/app-functions/:id", verifyTokens, authorized, update)
    .put("/app-functions/:id/status-update", verifyTokens, authorized, updateStatus)
    .delete("/app-functions/:id", verifyTokens, authorized, destroy);
