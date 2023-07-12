const sequelize = require('sequelize');

const db = new sequelize(process.env.DATABASE_URL,{
    logging : false
})

module.exports = db