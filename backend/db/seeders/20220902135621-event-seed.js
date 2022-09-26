'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Events",
      [
        {
          venueId: 1,
          groupId: 3,
          name: "D and D mondays",
          type: "Online",
          capacity: 100,
          price: 5.50,
          description: "Lets play D & D together I'll be an Orc this time and we can raid the castle",
          startDate: "2022-10-19 20:00:00",
          endDate:  "2022-10-19 23:00:00",
        },
        {
          venueId: 2,
          groupId: 2,
          name: "Soccer Tuesdays",
          type: "In person",
          capacity: 24,
          price: 10.00,
          description: "Pick up soccer at the park",
          startDate: "2022-09-19 10:00:00",
          endDate:  "2022-09-19 11:00:00",
        },
      ]
    )
   
   
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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
