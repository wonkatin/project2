'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.TEXT
      },
      uri: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.TEXT
      },
      source: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      ingredientLines: {
        type: Sequelize.TEXT
      },
      cautions: {
        type: Sequelize.TEXT
      },
      dietLabels: {
        type: Sequelize.TEXT
      },
      healthLabels: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recipes');
  }
};