var { Role } = require("../../../sequelize/models");
const { ErrorResponse } = require("../../shared/error_response");
const { HttpStatus } = require("../../shared/http_status");

const index = async (req, res) => {
  const { offset, limit } = req.query;
  try {
    const roles = await Role.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    res.status(HttpStatus.Success).json(roles);
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatus.InternalError)
      .json(ErrorResponse.INTERNAL_ERROR);
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (role == null) {
      return res.status(HttpStatus.NotFound).json(ErrorResponse.ROLE.NotFound);
    }
    return res.status(HttpStatus.Success).json(role);
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatus.InternalError)
      .json(ErrorResponse.INTERNAL_ERROR);
  }
};

module.exports = { index, show };
