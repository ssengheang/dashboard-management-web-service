"use strict";

/** @type {import('sequelize-cli').Migration} */
require("dotenv").config();
const { Role } = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    const getRole = await Role.findOne({ where: { title: "su" } });
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: process.env.SU_NAME,
          password: Buffer.from(process.env.SU_PASSWORD, 'base64').toString(),
          phone: process.env.SU_PHONE,
          roleId: getRole.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
    await queryInterface.bulkDelete("Users", null, {});
  },
};
