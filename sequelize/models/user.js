"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, { foreignKey: "roleId" });
      this.hasMany(models.ClientLogs, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING, require: true, allowNull: false },
      phone: {
        type: DataTypes.STRING,
        validate: { len: [9, 13] },
        require: true,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        validate: { min: 8 },
        require: true,
        allowNull: false,
        // async set(value) {
        //   this.setDataValue(password, bcrypt
        //     .hash(value, 10))
        // }
      },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      profile: { type: DataTypes.STRING },
      roleId: {
        type: DataTypes.INTEGER,
        require: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
