"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Memberships", [
            {
                userId: 1,
                groupId: 1,
                status: "member",
            },
            {
                userId: 2,
                groupId: 1,
                status: "member",
            },
            {
                userId: 3,
                groupId: 1,
                status: "pending",
            },
            {
                userId: 1,
                groupId: 2,
                status: "member",
            },
            {
                userId: 2,
                groupId: 2,
                status: "pending",
            },
            {
                userId: 3,
                groupId: 2,
                status: "co-host",
            },
            {
                userId: 3,
                groupId: 3,
                status: "member",
            },
            {
                userId: 3,
                groupId: 3,
                status: "member",
            },
        ]);
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
