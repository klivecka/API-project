'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GroupImage.belongsTo(models.Group, {
        foreignKey: "groupId"
      })
    }
  }
  GroupImage.init({
    groupId: {
      type: DataTypes.INTEGER
    },
    url:{
      type: DataTypes.STRING,
    },
    preview: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'GroupImage',
  });
  return GroupImage;
};