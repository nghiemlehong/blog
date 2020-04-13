const express = require('express');
const routerUser = express.Router();
const { User } = require('../models/User')
routerUser.post('/sigup', (req, res) => {
    const { email, pass, name } = req.body;
    const user = new User({ email, pass, name });
    user.save()
        .then(() => res.send({ success: true, user }))
        .catch((err) => {
            res.status(400).send({ success: false, error: err.message })
        })

})

module.exports = { routerUser };