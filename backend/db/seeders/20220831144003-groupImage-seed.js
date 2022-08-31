'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "GroupImages",
      [
        {
          groupId: 1,
          url: "../assets/Guitar-hero-iii-cover-image.jpeg",
          
        },
        {
          userId: 1,
          groupId: 2,
          status: "active"
        }
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
