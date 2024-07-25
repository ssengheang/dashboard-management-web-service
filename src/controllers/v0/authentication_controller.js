const { User } = require("../../../sequelize/models");
const bcrypt = require("bcrypt");
const { ErrorResponse } = require("../../shared/error_response");
const { HttpStatus } = require("../../shared/http_status");
const {
  generateTokens,
} = require("../../jsonwebtoken/utils");

const verifyPassword = async (user, password) => {
  if (user != null) return await bcrypt.compare(password, user.password);
  return false;
};

const login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ where: { phone: phone } });
    const isMatched = await verifyPassword(user, password);
    if (!isMatched || !user.isActive)
      return res
        .status(HttpStatus.Unauthorization)
        .json(ErrorResponse.AUTHENTICATION.InvalidCredentail);

    const tokens = await generateTokens(user);

    // Assigning refresh token in http-only cookie
    res.cookie("refresh-token", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    return res
      .status(HttpStatus.Success)
      .json({ accessToken: tokens.accessToken, user });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.InternalError).json(ErrorResponse.INTERNAL_ERROR);
  }
};

// admin and operator only
const loginDashboard = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ where: { phone: phone } });
    const isMatched = await verifyPassword(user, password);
    if (!isMatched || !user.isActive)
      return res
        .status(HttpStatus.Unauthorization)
        .json(ErrorResponse.AUTHENTICATION.InvalidCredentail);

    const tokens = await generateTokens(user);

    // Assigning refresh token in http-only cookie
    res.cookie("refresh-token", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    return res
      .status(HttpStatus.Success)
      .json({ accessToken: tokens.accessToken, user });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.InternalError).json(ErrorResponse.INTERNAL_ERROR);
  }
};

module.exports = { login, loginDashboard };
