'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Permission.init({
    version: DataTypes.STRING,
    rule: DataTypes.STRING,
    method: DataTypes.STRING,
    baseUrl: DataTypes.STRING,
    path: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    updatedAt: false,
    modelName: 'Permission',
  });
  return Permission;
};