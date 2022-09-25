"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            "Users",
            [
                {
                    firstName: "DemoUser",
                    lastName: "LastName",
                    username: "DemoUser",
                    email: "demo@user.io",
                    hashedPassword: bcrypt.hashSync("password"),
                },
                {
                    firstName: "test2",
                    lastName: "test2",
                    username: "username2",
                    email: "user1@user.io",
                    hashedPassword: bcrypt.hashSync("password2"),
                },
                {
                    firstName: "test3",
                    lastName: "test3",
                    username: "username3",
                    email: "user2@user.io",
                    hashedPassword: bcrypt.hashSync("password3"),
                },
            ],
            {}
        );
    },

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    async down(queryInterface, Sequelize) {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            "Users",
            {
                username: {
                    [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"],
                },
            },
            {}
        );
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
