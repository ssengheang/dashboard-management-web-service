'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppFunctions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.AppFunctionStatuses, { foreignKey: "status" });
    }
  }
  AppFunctions.init({
    remark: DataTypes.STRING,
    group: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      require: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'AppFunctions',
  });
  return AppFunctions;
};