const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class user extends Model {}

user.init(
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

user.associate = (models) => {
  user.hasMany(models.post, {
    foreignKey: 'userId',
    as: 'post',
  });
  user.hasMany(models.comment, {
    foreignKey: 'userId',
    as: 'comment',
  });
};

module.exports = user;
