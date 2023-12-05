const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: 'defaultuser_1',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
  }
);

User.associate = (models) => {
  User.hasMany(models.Post, {
    foreignKey: 'userId',
    as: 'post',
  });
  User.hasMany(models.Comment, {
    foreignKey: 'userId',
    as: 'comment',
  });
};

module.exports = User;
