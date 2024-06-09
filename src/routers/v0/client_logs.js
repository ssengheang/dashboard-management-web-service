const express = require("express");
const Router = express.Router();
const {verifyTokens} = require('../../middlewares/token_verification');
const {
  index,
  show,
  create
} = require("../../controllers/v0/client_logs_contoller");
const { authorized } = require("../../middlewares/authorization");

// module.exports = 
//     Router
//     .get("/client-logs", verifyTokens, authorized, index)
//     .get("/client-logs/:id", verifyTokens, authorized, show)
//     .post("/client-logs", verifyTokens, authorized, create);
module.exports = 
    Router
    .get("/client-logs", verifyTokens, index)
    .get("/client-logs/:id", verifyTokens, show)
    .post("/client-logs", verifyTokens, create);