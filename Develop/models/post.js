const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

sequelize.sync({ force: false })

    .then(() => {

      console.log('Database and tables successfully synchronized.');

    })

    .catch((error) => {

      console.error('Error synchronizing with database:', error);

    });

class Post extends Model {}

Post.init(

  {

    id: {

      type: DataTypes.INTEGER,

      allowNull: false,

      primaryKey: true,

      autoIncrement: true,

    },

    title: {

      type: DataTypes.STRING,

      allowNull: false,

    },

    content: {

      type: DataTypes.STRING,

      allowNull: false,

      validate: { len: [1] },

    },

    user_id: {

      type: DataTypes.INTEGER,

      references: 
        {
          model: 'user',
          key: 'id',
        }

    },

  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Post'
  }

);

module.exports = Post;
