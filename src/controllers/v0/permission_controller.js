var { Permission } = require("../../../sequelize/models");
const { ErrorResponse } = require("../../shared/error_response");
const { HttpStatus } = require("../../shared/http_status");

const index = async (req, res) => {
  const { offset, limit } = req.query;
  try {
    const permissions = await Permission.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    res.status(HttpStatus.Success).json(permissions);
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
    const permission = await Permission.findByPk(id);
    if (permission == null) {
      return res
        .status(HttpStatus.NotFound)
        .json(ErrorResponse.PERMISSION.NotFound);
    }
    return res.status(HttpStatus.Success).json(permission);
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatus.InternalError)
      .json(ErrorResponse.INTERNAL_ERROR);
  }
};

const getPermission = async (args) => {
  const { baseUrl, path, method } = args;
  try {
    const permission = await Permission.findOne({
      where: { baseUrl, path, method },
    });
    return Promise.resolve(permission);
  } catch (error) {
    return Promise.resolve(error);
  }
};

module.exports = { index, show, getPermission };
