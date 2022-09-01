'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert(
      "Venues", 
      [
        {
          groupId: 1,
          address: "6696 Farts Avenue",
          city: "omaha",
          state: "WI",
          lat: 42.4039403,
          lon: 33.3847628
        },
        {
          groupId: 2,
          address: "6696 blaaaa Avenue",
          city: "jonestown",
          state: "NE",
          lat: 44.4039403,
          lon: 13.3847628
        },
        {
          groupId: 3,
          address: "44444 fds Avenue",
          city: "SLC",
          state: "UT",
          lat: 40.4039403,
          lon: -22.3847628
        }
      ]
    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    )
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
