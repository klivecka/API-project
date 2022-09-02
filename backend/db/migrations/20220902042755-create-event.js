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
            },
            groupId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Groups",
                    key: "id",
                },
            },
            name: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            capacity: {
                type: Sequelize.INTEGER,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            startDate: {
                type: Sequelize.DATE,
            },
            endDate: {
                type: DataTypes.DATE,
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
