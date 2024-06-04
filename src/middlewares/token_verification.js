const {
    verifyAccessToken,
    regenerateAccessToken,
  } = require("../jsonwebtoken/utils");
  const { getPermission } = require("../controllers/v0/permission_controller");
  const { HttpStatus } = require("../shared/http_status");
  const { ErrorResponse } = require("../shared/error_response");
  
  const verifyTokens = async (req, res, next) => {
    const public = "public";
    const {
      method,
      baseUrl,
      route: { path },
    } = req;
    const authHeader = req.headers.authorization;
    try {
      const {
        dataValues: { rule },
      } = await getPermission({ baseUrl, path, method });
  
      if (rule === public) return next();
  
      req.rule = rule;
  
      if (authHeader == null || !authHeader.startsWith("Bearer"))
        return res
          .status(HttpStatus.Unauthorization)
          .json(ErrorResponse.AUTHENTICATION.Unauthorization);
  
      const accessToken = authHeader.split(" ")[1];
  
      const payloads = await verifyAccessToken(accessToken);
      console.log("===== Access Token =====");
      console.log(payloads);
      console.log("===== Access Token =====");
  
      if (payloads.error) {
        if (payloads.isTokenExpired) {
          const payloads = await regenerateAccessToken(req);
          console.log("===== Refresh Token =====");
          console.log(payloads);
          console.log("===== Refresh Token =====");
          if (payloads.isTokenExpired || payloads.error) {
            // return session expired (refresh token expired)
            return res
              .status(HttpStatus.Unauthorization)
              .json(payloads.message);
          } else {
            // set new access token to header 
            res.setHeader("Content-Type", "application/json");
            res.setHeader("x-refresh-token", payloads.accessToken);
          }
        }
        // return token expired (access token expired)
        return res
          .status(HttpStatus.Unauthorization)
          .json(payloads.message);
      }
  
      req.userId = payloads.payload.id;
      return next();
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.InternalError)
        .json(ErrorResponse.INTERNAL_ERROR);
    }
  };
  
  module.exports = { verifyTokens };
  