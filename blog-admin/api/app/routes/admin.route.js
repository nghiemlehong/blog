const {Router} = require("express");
const {AdminService} = require("../services/admin.service")
const {mustBeAdmin} = require("../routes/mustBeAdmin.middleware")
const adminRouter = Router();

adminRouter.post('/login',(req,res)=>{
    const {username , password} = req.body;
    AdminService.logInAdmin(username, password)
    .then(admin =>res.send({success: true , admin}))
    .catch(res.onError)
})

adminRouter.get('/user/getAll',mustBeAdmin,(req,res)=>{
    AdminService.getAllUsers()
    .then(users => res.send({success : true , users}) )
})
module.exports = {adminRouter};