'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      home_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team',
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team_goals',
      },
      away_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team',
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
      },
    },
      {
        timestamps: false,
      })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
  }
};