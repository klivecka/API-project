"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("EventImages", [
            {
                eventId: 1,
                url: "https://i.ibb.co/259bqrK/Screen-Shot-2022-09-24-at-7-32-48-PM.png",
                preview: true,
            },
            {
                eventId: 2,
                url: "https://i.ibb.co/1R0c0fn/Screen-Shot-2022-09-24-at-7-35-29-PM.png",
                preview: true,
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
