const { hash, compare } = require('bcryptjs');
const { sign } = require('../helpers/jwt');
const { User } = require('../models/user.model');
const { MyError } = require('../models/my-error.model');
const { format } = require('util');
const {Storage} = require('@google-cloud/storage');

const storage = new Storage ({
    projectId: "blog-909d8",
    keyFilename: "app/blog-909d8-firebase-adminsdk-wnywl-1393f09c8c.json"
  });

const bucket = storage.bucket("blog-909d8.appspot.com");


class UserService {
    static async signUp(email, plainPassword, name,avatar) {
        if (!avatar) throw new MyError('CAN_NOT_FOUND', 400);
        if (!plainPassword) throw new MyError('INVALID_PASSWORD', 400);
          let newFileName = `avatar/${avatar.originalname}_${Date.now()}`;
          let fileUpload =  bucket.file(newFileName);
          const uuid = '123';
          const blobStream =  fileUpload.createWriteStream({
            metadata: {
                  contentType: avatar.mimetype,
                  metadata: {
                    firebaseStorageDownloadTokens: uuid
                  }
            }
          });
           blobStream.on('error', (error) => {
            throw new MyError('CAN_NOT_UPLOAD_AVATAR', 400);
          });
           blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
              const url = format("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(newFileName) + "?alt=media&token=" + uuid);
            
          });
        blobStream.end(avatar.buffer);
        const urlAvatar = format("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(newFileName) + "?alt=media&token=" + uuid);
        
        try {
            const password = await hash(plainPassword, 8);
            const user = new User({ email, pass:password , name, avatar : urlAvatar });
            await user.save();
            const userInfo = user.toObject();
            delete userInfo.pass; 
            return userInfo;
        } catch (error) {
            console.log(error)
            if (error.name === 'ValidationError') throw new MyError('INVALID_USER_INFO',400);
            throw new MyError('EMAIL_EXISTED',400);
        } 
    }

    static async signIn(email, plainPassword) {
        const user = await User.findOne({ email });
        if (!user) throw new MyError('INVALID_USER_INFO', 400);
        const same = await compare(plainPassword, user.pass);
        if (!same) throw new MyError('INVALID_USER_INFO', 400);
        const userInfo = user.toObject();
        delete userInfo.pass; 
        userInfo.token = await sign({ _id: user._id });
        return userInfo;
    }

    static async check(idUser) { 
        const user = await User.findById(idUser);
        if (!user) throw new MyError('CANNOT_FIND_USER', 404);
        const userInfo = user.toObject();
        delete userInfo.password;  
        userInfo.token = await sign({ _id: user._id }); 
        return userInfo;      
    }
}

module.exports = { UserService };

