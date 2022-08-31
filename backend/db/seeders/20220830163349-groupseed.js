"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            "Groups",
            [
                {
                    name: "Guitar Hero Meetup",
                    organizerId: 3,
                    about: "lets hang out and play guitar hero my guys! awesome fun times or everyone and free soda",
                    type: "In person",
                    private: true,
                    city: "Salt Lake City",
                    state: "UT",
                    numMembers: 10,

                },
                {
                    name: "Lets play some soccer",
                    organizerId: 1,
                    about: "this is an awesome soccer meetup we meet on the field by the elementary school on wednesdays",
                    type: "In person",
                    private: false,
                    city: "Cottonwood Heights",
                    state: "UT",
                    numMembers: 30,
                },
                {
                    name: "d and d meetup",
                    organizerId: 2,
                    about: "this is an online group that meets to play dungeions and dragons on zoom. its really fun come hang with us fellow nerds,",
                    type: "Online",
                    private: true,
                    city: "Any City",
                    state: "US",
                    numMembers: 100,
                },
            ],
            {}
        );

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
      await queryInterface.bulkDelete('Groups', null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
