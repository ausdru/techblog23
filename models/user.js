const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [6] },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        try {
          newUserData.username =
            newUserData.username ||
            `user_${newUserData.id}`; // Generate a default username if not provided
          newUserData.username = newUserData.username.toLowerCase();
          newUserData.password = await bcrypt.hash(newUserData.password, 6);
          return newUserData;
        } catch (error) {
          throw new Error('Error hashing the password!');
        }
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
