"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          title: "su",
          createdAt: new Date()
        },
        {
          title: "admin",
          createdAt: new Date()
        },
        {
          title: "user",
          createdAt: new Date()
        },
      ],
      {ignoreDuplicates: true}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
