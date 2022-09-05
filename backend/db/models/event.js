"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Event.belongsTo(models.Venue, {
                foreignKey: "venueId",
            });
            Event.belongsTo(models.Group, {
                foreignKey: "groupId",
            });
            Event.hasMany(models.EventImage, {
                foreignKey: "eventId",
            });
            Event.hasMany(models.Attendance, {
                foreignKey: "eventId",
            });
        }
    }
    Event.init(
        {
            venueId: {
                type: DataTypes.INTEGER,
            },
            groupId: {
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
            },
            capacity: {
                type: DataTypes.INTEGER,
            },
            price: {
                type: DataTypes.DECIMAL,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            startDate: {
                type: DataTypes.DATE,
                validate: {
                    futureDate() {
                        let date = new Date();
                        let startDateConvert = new Date(this.startDate);
                        if (startDateConvert < date) {
                            throw new Error("Date must be in the future");
                        }
                    },
                },
            },
            endDate: {
                type: DataTypes.DATE,
                validate: {
                    afterStart() {
                        if (this.endDate < this.startDate) {
                            throw new Error("End date is less than start date");
                        }
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Event",
            defaultScope: {
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "capacity",
                        "price",
                        "description",
                    ],
                },
            },
            scopes: {
                eventDetails: {
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            },
        }
    );
    return Event;
};
