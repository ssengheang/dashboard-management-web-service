const { AppFunctionStatuses } = require("../../../sequelize/models");
const { ErrorResponse } = require("../../shared/error_response");
const { HttpStatus } = require("../../shared/http_status");

const index = async (req, res) => {
  const { offset, limit } = req.query;
  try {
    const app_function_statuses = await AppFunctionStatuses.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    return res.status(HttpStatus.Success).json(app_function_statuses);
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
    const app_function_status = await AppFunctionStatuses.findByPk(id);
    if (app_function_status == null) {
      return res
        .status(HttpStatus.NotFound)
        .json(ErrorResponse.APP_FUNCTION_STATUS.NotFound);
    }
    return res.status(HttpStatus.Success).json(app_function_status);
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatus.InternalError)
      .json(ErrorResponse.INTERNAL_ERROR);
  }
};

const create = async (req, res) => {
  const { note, status, status_code } = req.body;
  try {
    AppFunctionStatuses.create({
      note: note,
      status: status,
      status_code: status_code,
    })
      .then((app_function_status) => {
        return res.status(HttpStatus.Created).json(app_function_status);
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

const update = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const updateParams = req.body;
    try {
        const app_function_status = await AppFunctionStatuses.findByPk(id);
  
      if (app_function_status == null)
        return res.status(HttpStatus.NotFound).json(ErrorResponse.APP_FUNCTION_STATUS.NotFound);
  
      Object.keys(updateParams).forEach((key) => {
        app_function_status.set(key, updateParams[key]);
      });
  
      app_function_status
        .save()
        .then((app_function_status) => {
          res.status(HttpStatus.Success).json(app_function_status);
        })
        .catch((error) => {
          console.log(error);
          return res
            .status(HttpStatus.BadRequest)
            .json({ message: error.errors[0].message });
        });
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.InternalError)
        .json(ErrorResponse.INTERNAL_ERROR);
    }
  };

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
      const app_function_status = await AppFunctionStatuses.findByPk(id);
  
      if (app_function_status == null)
        return res.status(HttpStatus.NotFound).json(ErrorResponse.APP_FUNCTION_STATUS.NotFound);
  
      await app_function_status.destroy();
  
      return res.status(HttpStatus.Success).json({message: "success"});
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.InternalError)
        .json(ErrorResponse.INTERNAL_ERROR);
    }
  };

module.exports = {
  index,
  show,
  create,
  destroy,
  update
};
