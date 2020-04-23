const express = require('express');
const {UserService} = require('../services/user.service');
const {mustBeUser} = require('./mustBeUser.middleware');

const userRouter = express.Router();

userRouter.post('/signup', (req, res) => {
    const { email, plainPassword, name } = req.body;
    UserService.signUp(email, plainPassword, name)
    .then(user => res.send({ success: true, user }))
    .catch(res.onError);
   
});

userRouter.post('/signin', async(req, res) => {
    const { email, plainPassword } = req.body;
    UserService.signIn(email, plainPassword)
    .then(user => res.send({ success: true, user }))
    .catch(res.onError);
});

userRouter.post('/check', mustBeUser, (req, res)=>{
   UserService.check(req.idUser)
   .then(user => res.send({success : true , user}))
   .catch(res.onError);
});

module.exports = { userRouter };