const jwt = require("jsonwebtoken");
const { User } = require("../../sequelize/models");
const {ErrorResponse} = require('../shared/error_response');

const generateTokens = async (user) => {
  try {
    const accessTokenPayload = {
      id: user.id,
      roles: user.roles,
      username: user.username,
      type: "access_token",
    };
    const refreshTokenPayload = { id: user.id, type: "refresh_token" };
    const accessToken = jwt.sign(
      accessTokenPayload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
    );
    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
    );

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

const verifyAccessToken = async (accessToken) => {
  return jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    async (err, decoded) => {
      if (err instanceof jwt.TokenExpiredError)
        return Promise.resolve({
          isTokenExpired: true,
          error: true,
          message: ErrorResponse.TOKEN.Expired,
        });

      if (
        err instanceof jwt.JsonWebTokenError ||
        decoded.type != "access_token"
      )
        return Promise.resolve({
          error: true,
          isTokenExpired: null,
          message: ErrorResponse.TOKEN.Invalid,
        });

      return Promise.resolve({
        isTokenExpired: false,
        error: false,
        message: null,
        payload: decoded,
      });
    }
  );
};

const regenerateAccessToken = async (req) => {
  if (req.cookies["refresh-token"]) {
    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies["refresh-token"];

    // Verifying refresh token
    return jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      async (err, decoded) => {
        if (err instanceof jwt.TokenExpiredError)
          return Promise.resolve({
            isTokenExpired: true,
            error: true,
            message: ErrorResponse.TOKEN.SessionExpired,
          });

        if (
          err instanceof jwt.JsonWebTokenError ||
          decoded.type != "refresh_token"
        )
          return Promise.resolve({
            isTokenExpired: null,
            error: true,
            message: ErrorResponse.TOKEN.Invalid,
          });

        // Correct token we send a new access token
        const user = await User.findByPk(decoded.id);
        const accessTokenPayload = {
          id: user.id,
          roles: user.roles,
          username: user.username,
          type: "access_token",
        };

        const accessToken = jwt.sign(
          accessTokenPayload,
          process.env.REFRESH_TOKEN_PRIVATE_KEY,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
          }
        );

        return Promise.resolve({ accessToken });
      }
    );
  } else {
    return Promise.resolve({
      isTokenExpired: null,
      error: true,
      message: ErrorResponse.TOKEN.SessionExpired,
    });
  }
};

module.exports = { generateTokens, regenerateAccessToken, verifyAccessToken };
