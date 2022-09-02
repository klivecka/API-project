"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class EventImages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            EventImages.belongsTo(models.Event, {
                foreignKey: "eventId",
            });
        }
    }
    EventImages.init(
        {
            eventId: {
                type: DataTypes.INTEGER,
            },
            url: {
                type: DataTypes.STRING,
            },
            preview: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: "EventImages",
        }
    );
    return EventImages;
};
