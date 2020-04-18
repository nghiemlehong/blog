const express = require('express');
const routerUser = express.Router();
const { hash, compare } = require('bcryptjs')
const { User } = require('../models/user.model');
const {sign} = require('../helpers/jwt')

routerUser.post('/signin-admin', (req,res)=>{
    const{username, password} = req.body;
    if(username === 'admin' && password=== 'admin')
    {
        res.send({
            success :true
        })
    }
    else{
        res.status(400).send({success:false})
    }
})
routerUser.post('/signup', async(req, res) => {
    try {
        const { email, pass, name } = req.body;
        const encryptedPassword = await hash(pass, 8);
        const user = new User({ email, pass: encryptedPassword, name });
        await user.save();
        const userInfo = user.toObject();
        delete userInfo.pass;
        res.send({ success: true, user: userInfo });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }

});

routerUser.post('/signin', async(req, res) => {
    try {
        const { email, pass } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error("Can't not find user");
        const same = await compare(pass, user.pass);
        if (!same) throw new Error("Can't not find user");
        const userInfo = user.toObject();
        delete userInfo.pass;
        userInfo.token = await sign({_id: user._id});
        res.send({ success: true, user: userInfo });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }

});

routerUser.post('/check', async (req, res)=>{
    try {
        
    } catch (error) {
        
    }
});

module.exports = { routerUser };