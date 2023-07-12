const Counter = require('./Counter')
const User = require('./User')
const db = require ('./db')

Counter.belongsTo(User)
User.hasOne(Counter)

module.exports = {
    Counter,
    User,
    db
}