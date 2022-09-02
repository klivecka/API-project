"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert([
            {
                eventId: 1,
                userId: 1,
                status: "member",
            },
            {
                eventId: 1,
                userId: 2,
                status: "member",
            },
            {
                eventId: 2,
                userId: 1,
                status: "member",
            },
            {
                eventId: 1,
                userId: 3,
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
