const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Actor = sequelize.define('actor', {
    firstName: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

module.exports = Actor;