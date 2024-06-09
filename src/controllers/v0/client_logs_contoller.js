const { User, ClientLogs } = require("../../../sequelize/models");
const { ErrorResponse } = require("../../shared/error_response");
const { HttpStatus } = require("../../shared/http_status");

const index = async (req, res) => {
  const { offset, limit } = req.query;
  try {
    const client_logs = await ClientLogs.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    return res.status(HttpStatus.Success).json(client_logs);
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
    const client_log = await ClientLogs.findByPk(id);
    if (client_log == null) {
      return res.status(HttpStatus.NotFound).json(ErrorResponse.CLIENT_LOG.NotFound);
    }
    return res.status(HttpStatus.Success).json(client_log);
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatus.InternalError)
      .json(ErrorResponse.INTERNAL_ERROR);
  }
};

const create = async (req, res) => {
  const { appInfo, deviceInfo, note, param, userId } = req.body;
  try {
    const getUser = await User.findOne({ where: { id: userId } });
    if (getUser == null)
      return res
        .status(HttpStatus.NotFound)
        .json(ErrorResponse.CONSTRAIN_ERROR);

    ClientLogs.create({
      app_info: appInfo,
      device_info: deviceInfo,
      note: note,
      param: param,
      userId: getUser.id,
    })
      .then((client_log) => {
        return res.status(HttpStatus.Created).json(client_log);
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(HttpStatus.BadRequest)
          .json({ message: error.errors[0].message });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json(ErrorResponse.INTERNAL_ERROR);
  }
};


module.exports = {
  index,
  show,
  create
};
