'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.review.hasMany(models.comment)
    }
  };
  review.init({
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    rating: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};