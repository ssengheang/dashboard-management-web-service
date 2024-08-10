const { Op } = require("sequelize");
const {
  AppFunctionStatuses,
  AppFunctions,
} = require("../../../sequelize/models");
const { ErrorResponse } = require("../../shared/error_response");
const { HttpStatus } = require("../../shared/http_status");

const index = async (req, res) => {
  const { offset = 0, limit = 10, ...searchParams } = req.query;

  // Convert pagination parameters to integers
  const offsetInt = parseInt(offset, 10);
  const limitInt = parseInt(limit, 10);

  // Initialize where clause
  const whereClause = {};

  // Build where clause dynamically based on searchParams
  for (const [key, value] of Object.entries(searchParams)) {
    if (value) {
      whereClause[key] = {
        [Op.iLike]: `%${value}%`,
      };
    }
  }

  try {
    const app_functions = await AppFunctions.findAndCountAll({
      where: whereClause,
      include: AppFunctionStatuses,
      offset: offsetInt,
      limit: limitInt,
    });
    return res.status(HttpStatus.Success).json(app_functions);
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
    const app_function = await AppFunctions.findByPk(id, {include: AppFunctionStatuses});
    if (app_function == null) {
      return res
        .status(HttpStatus.NotFound)
        .json(ErrorResponse.APP_FUNCTION.NotFound);
    }
    return res.status(HttpStatus.Success).json(app_function);
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatus.InternalError)
      .json(ErrorResponse.INTERNAL_ERROR);
  }
};

const create = async (req, res) => {
  const { remark, group, status_id } = req.body;
  try {
    const get_func_status = await AppFunctionStatuses.findByPk(status_id);
    if (get_func_status == null)
      return res
        .status(HttpStatus.NotFound)
        .json(ErrorResponse.CONSTRAIN_ERROR);

    AppFunctions.create({
      remark: remark,
      group: group,
      status: get_func_status.id,
    })
      .then((app_function) => {
        return res.status(HttpStatus.Created).json(app_function);
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

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const app_function = await AppFunctions.findByPk(id);

    if (app_function == null)
      return res
        .status(HttpStatus.NotFound)
        .json(ErrorResponse.APP_FUNCTION.NotFound);

    // Object.keys(updateParams).forEach((key) => {
    //   app_function.set(key, updateParams[key]);
    // });
    app_function.set("status", status);

    app_function
      .save()
      .then((app_function) => {
        res.status(HttpStatus.Success).json(app_function);
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

//admin only
const update = async (req, res) => {
  const { id } = req.params;
  const updateParams = req.body;
  try {
    const app_function = await AppFunctions.findByPk(id);

    if (app_function == null)
      return res
        .status(HttpStatus.NotFound)
        .json(ErrorResponse.APP_FUNCTION.NotFound);

    Object.keys(updateParams).forEach((key) => {
      app_function.set(key, updateParams[key]);
    });

    app_function
      .save()
      .then((app_function) => {
        res.status(HttpStatus.Success).json(app_function);
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
    const app_function = await AppFunctions.findByPk(id);

    if (app_function == null)
      return res
        .status(HttpStatus.NotFound)
        .json(ErrorResponse.APP_FUNCTION.NotFound);

    await app_function.destroy();

    return res.status(HttpStatus.Success).json({ message: "success" });
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
  update,
  updateStatus,
};
