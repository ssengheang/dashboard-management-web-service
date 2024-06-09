'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppFunctionStatuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.AppFunctions, { foreignKey: 'status' });
    }
  }
  AppFunctionStatuses.init({
    note: DataTypes.STRING,
    status: DataTypes.STRING,
    status_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AppFunctionStatuses',
  });
  return AppFunctionStatuses;
};