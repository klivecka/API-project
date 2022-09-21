'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "GroupImages",
      [
        {
          groupId: 1,
          url: "https://i.ibb.co/8zth2Mn/soccer.jpg",
          preview: true
        },
        {
          groupId: 2,
          url: "https://i.ibb.co/ZhnH8M2/guitarhero.png",
          preview: true
        },
        {
          groupId: 3,
          url: "https://i.ibb.co/gMw7KPY/dung.png",
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
