const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({

    comment_id: 
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    comment_date:
    {
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    comment_text: 
    {
        type: DataTypes.TEXT,
        allowNull: false
    },

    user_id: 
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'user_id'
        }
    },

    post_id: 
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'post_id'
        }
    }}, 
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
)

module.exports = Comment;