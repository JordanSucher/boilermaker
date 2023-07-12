const express = require('express')
const { User, Counter } = require('./db')
const jwt = require('jsonwebtoken')

const router = express.Router()

const checkToken = (req, res, next) => {
    const token = req.headers['authorization']

    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        req.user = user
        next()

    })
}

router.use (checkToken)

router.get('/currentcount', async (req, res) => {
    const token = req.headers['authorization']
    const user = await User.byToken(token)
    const counter = await Counter.findOne({ where: { userId: user.id } })
    res.json(counter)
})

//increment and decrement

router.post('/increment', async (req, res) => 
{
    const token = req.headers['authorization']
    const user = await User.byToken(token)
    const counter = await Counter.findOne({ where: { userId: user.id } })
    counter.value++;
    await counter.save()
    res.json(counter)
})

router.post('/decrement', async (req, res) => 
{
    const token = req.headers['authorization']
    const user = await User.byToken(token)
    const counter = await Counter.findOne({ where: { userId: user.id } })
    counter.value--;
    await counter.save()
    res.json(counter)
})


module.exports = router