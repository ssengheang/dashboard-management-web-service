const { User, Role } = require("../../../sequelize/models");
const { Roles } = require("../../shared/constants");
const { ErrorResponse } = require("../../shared/error_response");
const { HttpStatus } = require("../../shared/http_status");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const index = async (req, res) => {
  const { offset, limit, search } = req.query;

  try {
    if (search == null) {
      const users = await User.findAndCountAll({
        include: Role,
        offset: offset,
        limit: limit,
      });
      return res.status(HttpStatus.Success).json(users);
    } else {
      [key, value] = search.split(",");
      const users = await User.findAndCountAll({
        where: { [key]: { [Op.iLike]: `%${value}%` } },
        include: Role,
        offset: offset,
        limit: limit,
      });
      return res.status(HttpStatus.Success).json(users);
    }
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
    const user = await User.findByPk(id, { include: Role });
    if (user == null) {
      return res.status(HttpStatus.NotFound).json(ErrorResponse.USER.NotFound);
    }
    return res.status(HttpStatus.Success).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatus.InternalError)
      .json(ErrorResponse.INTERNAL_ERROR);
  }
};

const hashPassword = async (plaintextPassword) => {
  return await bcrypt
    .hash(plaintextPassword, 10)
    .then((hashPassword) => {
      return hashPassword;
    })
    .catch((err) => {
      throw err.message;
    });
};

const register = async (req, res) => {
  const { username, password, phone } = req.body;
  try {
    const getRole = await Role.findOne({ where: { title: Roles.User } });
    if (getRole == null)
      return res
        .status(HttpStatus.NotFound)
        .json(ErrorResponse.CONSTRAIN_ERROR);

    // this may affect the performance (will fix later)
    const hashedPassword = await hashPassword(password);

    User.create({
      username: username,
      password: hashedPassword,
      phone: phone,
      roleId: getRole.id,
    })
      .then((user) => {
        return res.status(HttpStatus.Created).json(user);
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

//admin only
const create = async (req, res) => {
  const { username, password, phone, roleId } = req.body;
  try {
    const getRole = await Role.findByPk(roleId);
    if (getRole == null)
      return res
        .status(HttpStatus.NotFound)
        .json(ErrorResponse.CONSTRAIN_ERROR);

    // this may affect the performance (will fix later)
    const hashedPassword = await hashPassword(password);

    User.create({
      username: username,
      password: hashedPassword,
      phone: phone,
      roleId: getRole.id,
    })
      .then((user) => {
        return res.status(HttpStatus.Created).json(user);
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
  const id = req.userId;
  const updateParams = req.body;
  try {
    const user = await User.findByPk(id);

    if (user == null)
      return res.status(HttpStatus.NotFound).json(ErrorResponse.USER.NotFound);

    Object.keys(updateParams).forEach((key) => {
      user.set(key, updateParams[key]);
    });

    user
      .save()
      .then((user) => {
        res.status(HttpStatus.Success).json(user);
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

// admin only
const deactivate = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (user == null)
      return res.status(HttpStatus.NotFound).json(ErrorResponse.USER.NotFound);

    if (user.isActive === false)
      return res.status(HttpStatus.Success).json(user);

    user.set("isActive", false);

    user
      .save()
      .then((user) => {
        res.status(HttpStatus.Success).json(user);
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

// admin only
const activate = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (user == null)
      return res.status(HttpStatus.NotFound).json(ErrorResponse.USER.NotFound);

    if (user.isActive === true)
      return res.status(HttpStatus.Success).json(user);

    user.set("isActive", true);

    user
      .save()
      .then((user) => {
        res.status(HttpStatus.Success).json(user);
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

// admin only
const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (user == null)
      return res.status(HttpStatus.NotFound).json(ErrorResponse.USER.NotFound);

    await user.destroy();

    return res.status(HttpStatus.Success);
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatus.InternalError)
      .json(ErrorResponse.INTERNAL_ERROR);
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, { include: Role });
    return res.status(HttpStatus.Success).json(user);
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
  register,
  create,
  update,
  deactivate,
  activate,
  destroy,
  me,
};
