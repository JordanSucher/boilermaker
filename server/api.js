const express = require('express')
const { User } = require('./db')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.use('/users', require('./users'))

router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body
        await User.authenticate(name, password)
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err))
    }
    catch (err) {
        res.status(400).json(err)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { name, password } = req.body
        await User.create({ name, password })
        await User.authenticate(name, password)
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err))
    }
    catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router