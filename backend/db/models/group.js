'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group.init({
    name: {
      type: DataTypes.STRING,
    },
    organizerId: {
      type: DataTypes.INTEGER,
    },
    about: {
      type: DataTypes.STRING
    },
    groupType: {
      type: DataTypes.STRING
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    numMembers: {
      type: DataTypes.INTEGER,
    },
    previewImage: {
      type: DataTypes.STRING,
    }

  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};