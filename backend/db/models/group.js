"use strict";
const { Model } = require("sequelize");
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
    Group.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: {
                    len: [0, 60],
                },
            },
            organizerId: {
                type: DataTypes.INTEGER,
            },
            about: {
                type: DataTypes.STRING,
                validate: {
                    len: [50, 5000],
                },
            },
            type: {
                type: DataTypes.STRING,
                validate: {
                    validType() {
                        if (
                            this.type !== "Online" ||
                            this.type !== "In person"
                        ) {
                            throw new Error(
                                "Type must be 'Online' or 'In person'"
                            );
                        }
                    },
                },
            },
            private: {
                type: DataTypes.BOOLEAN,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  len: [2, 2],
                }
            },
            numMembers: {
                type: DataTypes.INTEGER,
            },
            previewImage: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: "Group",
        }
    );
    return Group;
};
