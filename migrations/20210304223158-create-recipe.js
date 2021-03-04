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
        type: Sequelize.STRING
      },
      uri: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      ingredientLines: {
        type: Sequelize.TEXT
      },
      cautions: {
        type: Sequelize.STRING
      },
      dietLabels: {
        type: Sequelize.STRING
      },
      healthLabels: {
        type: Sequelize.STRING
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