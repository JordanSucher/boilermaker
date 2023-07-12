require('dotenv').config();
const { db, Counter } = require('./db');
const server = require('./index.js');

const port = process.env.PORT || 3000;



db.sync().then(() => {
    server.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})