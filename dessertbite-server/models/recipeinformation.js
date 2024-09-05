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
          msg: "Name is required"
        },
        notNull:{
          msg: "Name is required"
        }
      }
    },
    pricePerServing:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "Price is required"
        },
        notNull:{
          msg: "Price is required"
        }
      }
    },
    notes:DataTypes.STRING,
    healthScore:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "Notes is required"
        },
        notNull:{
          msg: "Notes is required"
        },
        max: 100
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