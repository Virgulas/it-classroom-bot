const { Sequelize, DataTypes, Model } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/users_data.sqlite'
});

class User extends Model {}

// Define the Sequelize model
User.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  gitAcc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gitVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  repoVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'User',
});

  module.exports = {
    User,
    sequelize
  }