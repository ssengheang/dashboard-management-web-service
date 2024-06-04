const express = require("express");
const Router = express.Router();
const {verifyTokens} = require('../../middlewares/token_verification');
const {
  index,
  show,
} = require("../../controllers/v0/permission_controller");
const { authorized } = require("../../middlewares/authorization");

module.exports = 
    Router
    .get("/permissions", verifyTokens, authorized, index)
    .get("/permissions/:id", verifyTokens, authorized, show);