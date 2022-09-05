"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Attendance extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Attendance.belongsTo(models.Event, {
                foreignKey: "eventId",
            });
            Attendance.belongsTo(models.User, {
                foreignKey: "userId",
            });
        }
    }
    Attendance.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            eventId: {
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            status: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: "Attendance",
            defaultScope: {
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
        }
    );
    return Attendance;
};
