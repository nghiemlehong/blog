const mongoose = require('mongoose');

const { Schema } = mongoose;
const postSchema = new Schema({
    title : {type: String, required:true, trim : true},
    content : {type : Array, required : true, trim : true},
    author :  {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    fans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    tag : {type: mongoose.Schema.Types.ObjectId, ref :'Tag', required: true}
});
const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
