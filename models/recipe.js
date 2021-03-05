'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      models.recipe.belongsToMany(models.user, {through:"users_recipes"})
      models.recipe.hasMany(models.review)
    }
  };
  recipe.init({
    label: DataTypes.TEXT,
    uri: DataTypes.TEXT,
    image: DataTypes.TEXT,
    source: DataTypes.TEXT,
    url: DataTypes.TEXT,
    ingredientLines: DataTypes.TEXT,
    cautions: DataTypes.TEXT,
    dietLabels: DataTypes.TEXT,
    healthLabels: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};