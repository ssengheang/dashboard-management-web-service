
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, { foreignKey: 'roleId' });
    }
  }
  Role.init({
    title: {
      type: DataTypes.STRING,
      unique: true}
  }, {
    sequelize,
    timestamps: true,
    updatedAt: false,
    modelName: 'Role',
  });
  return Role;
};