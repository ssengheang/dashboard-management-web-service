'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, { foreignKey: 'userId' });
    }
  }
  ClientLogs.init({
    app_info: DataTypes.JSON,
    device_info: DataTypes.JSON,
    note: DataTypes.STRING,
    param: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'ClientLogs',
  });
  return ClientLogs;
};