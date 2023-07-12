const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()

//static
app.use(express.static('public'))

//logging
app.use(morgan('dev'))

//json parsing & url encoded
app.use (express.json())
app.use (express.urlencoded({ extended: true }))

//api
app.use('/api', require('./api.js'))

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

//error handling
app.use((error, req, res, next) => {
    console.log(error)
    res.status(404).send(error.message)
})

module.exports = app