"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            "Groups",
            [
                {
                    name: "Guitar Hero Meetup",
                    organizerId: 3,
                    about: "Lets hang out and play guitar hero my guys! Awesome fun times or everyone and free soda",
                    type: "In person",
                    private: true,
                    city: "Salt Lake City",
                    state: "UT",
                    numMembers: 10,

                },
                {
                    name: "Soccer Meetup",
                    organizerId: 1,
                    about: "This is an awesome soccer meetup we meet on the field by the elementary school on Wednesdays",
                    type: "In person",
                    private: false,
                    city: "Cottonwood Heights",
                    state: "UT",
                    numMembers: 30,
                },
                {
                    name: "D and D Online Meetup Group ",
                    organizerId: 2,
                    about: "This is an online group that meets to play dungeons and dragons on zoom. its really fun come hang with us fellow nerds,",
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
