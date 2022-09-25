"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("EventImages", [
            {
                eventId: 1,
                url: "https://i.ibb.co/RTkwZrz/dragons.png",
                preview: true,
            },
            {
                eventId: 2,
                url: "https://i.ibb.co/gvg50YF/scocer2.png",
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
