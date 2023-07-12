const sequelize = require('sequelize');

// const db = new sequelize(process.env.DATABASE_URL || 'postgres://admin:rvpe7BYW3y6sIORWdm6Q2ihoRfyWFhGE@dpg-cini8n5ph6ei90est0og-a.ohio-postgres.render.com/boilerplate_chkm?ssl=true',{
//     logging : false
// })

const db = new sequelize(process.env.DATABASE_URL,{
    logging : false
})

module.exports = db