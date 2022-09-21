'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "GroupImages",
      [
        {
          groupId: 1,
          url: "https://en.wikipedia.org/wiki/Association_football#/media/File:Football_in_Bloomington,_Indiana,_1996.jpg",
          preview: true
        },
        {
          groupId: 2,
          url: "../assets/Football.jpeg",
          preview: true
        },
        {
          groupId: 3,
          url: "../assets/dice.jpeg",
          preview: true
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
