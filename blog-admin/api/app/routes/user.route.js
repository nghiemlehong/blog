const express = require('express');
const {UserService} = require('../services/user.service');
const { mustBeUser } = require('./mustBeUser.middleware');
const { upload } = require('../helpers/uploadFile');
const fs = require('fs');
const { promisify } = require('util')

const Multer = require('multer');


const deleteFile = async (file) => {
    const unlink = promisify(fs.unlink);
    await unlink(file);
}

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

const userRouter = express.Router();

userRouter.post('/signup', multer.single('file'), (req, res) => {
    const { email, plainPassword, name } = req.body;
    UserService.signUp(email, plainPassword, name, req.file)
        .then(user => {
            res.send({ success: true, user })
        })
        .catch(
            error => {
                const body = { success: false, message: error.message };
                if (!error.statusCode) console.log(error);
                res.status(error.statusCode || 500).send(body);
            })
});
// userRouter.post('/upload',multer.single('file'), (req,res) => {
//     console.log('Upload Image');
//     let file = req.file;
//     if (file) {
//       uploadImageToStorage(file).then((success) => {
//         res.status(200).send({
//           status: 'success'
//         });
//       }).catch((error) => {
//         console.error(error);
//       });
//     }
//   });

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