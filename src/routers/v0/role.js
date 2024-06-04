const express = require("express");
const Router = express.Router();
const {authorized} = require('../../middlewares/authorization');
const {verifyTokens} = require('../../middlewares/token_verification');
const {
  index,
  show,
} = require("../../controllers/v0/role_controller");

module.exports = 
    Router
    .get("/roles", verifyTokens, authorized, index)
    .get("/roles/:id", verifyTokens, authorized, show);
