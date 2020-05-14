const mongoose = require('mongoose');
const {Schema} = mongoose;

const tagSchema = new Schema({
    name : {type: String, required: true,unique : true, trim:true},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = {Tag};