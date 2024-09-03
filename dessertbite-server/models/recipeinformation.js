'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey:"userId"})
    }
  }
  RecipeInformation.init({
    sourceName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "image is required"
        },
        notNull:{
          msg: "image is required"
        }
      }
    },
    pricePerServing:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "pricePerServing is required"
        },
        notNull:{
          msg: "pricePerServing is required"
        }
      }
    },
    notes:DataTypes.STRING,
    healthScore:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "rate is required"
        },
        notNull:{
          msg: "rate is required"
        },
        len: 100
      }
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "userId is required"
        },
        notNull:{
          msg: "userId is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'RecipeInformation',
  });
  return RecipeInformation;
};