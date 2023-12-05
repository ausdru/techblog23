const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class comment extends Model {}

comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'Default Comment Text' 
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id'  
        }
    }
}, 
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});

module.exports = comment;

