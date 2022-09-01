"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Venues", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            groupId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Groups",
                    key: "id",
                },
            },
            address: {
                type: Sequelize.STRING,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lat: {
                type: Sequelize.DECIMAL,
            },
            lon: {
                type: Sequelize.DECIMAL,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Venues");
    },
};
