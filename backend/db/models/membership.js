"use strict";
const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Membership extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Membership.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            groupId: {
                type: DataTypes.INTEGER,
            },
            status: {
                type: STRING,
            },
        },
        {
            sequelize,
            modelName: "Membership",
            defaultScope: {
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            scopes: {
                all: {
                    attributes: ["id", "userId", "groupId", "status"],
                },
            },
        }
    );
    return Membership;
};
