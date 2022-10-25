'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
      {
        timestamps: false,
      })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};