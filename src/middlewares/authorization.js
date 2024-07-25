const { getPermission } = require("../controllers/v0/permission_controller");
const { User, Role } = require("../../sequelize/models");
const { HttpStatus } = require("../shared/http_status");
const { ErrorResponse } = require("../shared/error_response");

const authorized = async (req, res, next) => {
  const api_version = "v0";
  const admin_only = "admin_only"; // allowed [su, admin]
  const operator_only = "operator_only"; // allowed [su, admin]
  const user_only = "user_only"; // allowed [su, admin, user]
  const own_account = "own_account";

  // const {method, baseUrl, route: {path}} = req;
  try {
    // const {dataValues: {rule}} = await getPermission({baseUrl, path, method})
    const {
      dataValues: {
        Role: {
          dataValues: { title },
        },
      },
    } = await User.findByPk(req.userId, { include: Role });

    if (req.rule === own_account) return next();
    if (req.rule === admin_only && ["su", "admin"].includes(title))
      return next();
    if (req.rule === operator_only && ["su", "admin", "operator"].includes(title))
      return next();
    if (req.rule === user_only && ["su", "admin", "operator", "user"].includes(title))
      return next();

    return res
      .status(HttpStatus.Unauthorization)
      .json(ErrorResponse.AUTHENTICATION.Unauthorization);
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatus.InternalError)
      .json(ErrorResponse.INTERNAL_ERROR);
  }
};

module.exports = { authorized };
