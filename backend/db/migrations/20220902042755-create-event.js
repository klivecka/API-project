"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Events", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            venueId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Venues",
                    key: "id",
                },
                onDelete: "cascade",
            },
            groupId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Groups",
                    key: "id",
                },
                onDelete: "cascade",
            },
            name: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
                validate: {
                    rightType(){
                        if (this.type !== "Online" && this.type !== "In person"){
                            throw new Error("Type must be Online or In person")
                        }
                    }
                }
            },
            capacity: {
                type: Sequelize.INTEGER,
            },
            price: {
                type: Sequelize.DECIMAL,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            startDate: {
                type: Sequelize.DATE,
            },
            endDate: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Events");
    },
};
