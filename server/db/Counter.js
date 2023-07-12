const { Sequelize, DataTypes } = require ('sequelize');
const db = require('./db');

const Counter = db.define('counter', {
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = Counter