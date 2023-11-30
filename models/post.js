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

    post_id: {

      type: DataTypes.INTEGER,

      allowNull: false,

      primaryKey: true,

      autoIncrement: true,

    },
    
    user_id: {

      type: DataTypes.INTEGER,

      references: 
        {
          model: 'user',
          key: 'user_id',
        }

    },

    post_title: {

      type: DataTypes.STRING,

      allowNull: false,

    },

    post_content: {

      type: DataTypes.STRING,

      defaultValue: false,

      allowNull: false,

      validate: { len: [1] },

    }

  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }

);

module.exports = Post;