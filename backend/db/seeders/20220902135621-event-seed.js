'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Events",
      [
        {
          venueId: 1,
          groupId: 1,
          name: "D and D mondays",
          type: "Online",
          capacity: 100,
          price: 5.50,
          description: "lets play d and d at the arcade",
          startDate: "2022-10-19 20:00:00",
          endDate:  "2022-10-19 23:00:00",
        },
        {
          venueId: 2,
          groupId: 2,
          name: "Soccer dudes",
          type: "In person",
          capacity: 24,
          price: 10.00,
          description: "pick up soccer at the park",
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
