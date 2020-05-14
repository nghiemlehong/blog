const {Post} = require('../models/post.model');
const {User} = require('../models/user.model');
const {Comment} = require('../models/comment.model');
const {checkObjectId} = require('../helpers/checkObjectId');
const {MyError} = require('../models/my-error.model');


class AdminService{
    static async logInAdmin(username, password)
    {
        if(username === "admin" && password ==="admin")
        {
            const admin ={name:"Lê Hồng Nghiệm", token : "adjfweiasd;fklajasdfa;ksldjfwifalksdfjas;dlf"}
            return admin;
        }
        throw new MyError("CAN_NOT_LOGIN_ADMIN",400);
    }
    static  getAllUsers(){
        return User.find({}).sort({ _id: -1 });
    }
}

module.exports= {AdminService};