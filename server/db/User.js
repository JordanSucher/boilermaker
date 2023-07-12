const { Sequelize, DataTypes } = require ('sequelize');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Counter = require('./Counter.js');

const User = db.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.beforeCreate((user, options) => {
    user.password = bcrypt.hashSync(user.password, 10);
})

User.afterCreate((user, options) => {
    Counter.create({
        userId: user.id
    })
})

User.authenticate = async (name, password) => {
    const user = await User.findOne({ where: { name: name } })
    if (bcrypt.compareSync(password, user.password)) {
        // return user['id'];
        let token = jwt.sign({ id: user.id }, process.env.SECRET);
        return token;
    } else {
        return null;
    }
}

User.byToken = (token) => {
    //decrypt the token
    const { id } = jwt.verify(token, process.env.SECRET);
    return User.findByPk(id);
}

module.exports = User