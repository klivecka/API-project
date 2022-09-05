"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Memberships", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
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
            status: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("Memberships");
    },
};
