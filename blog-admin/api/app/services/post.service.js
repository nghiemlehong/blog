const {Post} = require('../models/post.model');
const {User} = require('../models/user.model');
const {Comment} = require('../models/comment.model');
const {Tag} = require('../models/tag.model');
const {checkObjectId}  = require('../helpers/checkObjectId');
const {MyError} = require('../models/my-error.model');

class PostService{
    static getAll(){
        const populateObject = {
            path: 'comments',
            populate: { path: 'author', select: 'name' }
        };
       
        return Post.find({}).sort({ _id: -1 })
            .populate('author', 'name')
            .populate('tag', 'name')
            .populate(populateObject);
        
    }

    static async getOne(_id){
        try {
            const populateObject = {
                path: 'comments',
                populate: { path: 'author', select: 'name' }
            };
            const post =  await Post.findOne({_id})
                    .populate('author', 'name')
                    .populate('tag','name')
                    .populate(populateObject);
            if(!post) throw new MyError("CAN_NOT_FIND_POST",404)
            return post
        } catch (error) {
            throw new MyError('CAN_NOT_FIND_POST',404);
        }
   
    }

    static async pagination(limit, skip){
        const populateObject = {
            path: 'comments',
            populate: { path: 'author', select: 'name' }
        };
        return Post.find({}).limit(limit).skip(skip)
        .populate('author', 'name')
        .populate('tag', 'name')
        .populate(populateObject);
    }

    static async createPost(idUser, idTag, title,  content) {
        if (!title) throw new MyError('TITLE_MUST_BE_PROVIDED', 400);
        if (!content) throw new MyError('CONTENT_MUST_BE_PROVIDED', 400);
        const post = new Post({ content, author: idUser,title, tag : idTag });
        await User.findByIdAndUpdate(idUser, { $push: { posts: post._id } });
        const tag =  await Tag.findByIdAndUpdate(idTag,{$push : {posts : post._id}});
        if(!tag) throw new MyError('CANNOT_FIND_TAG', 404);
        return post.save();
    }

    static async updatePost(idUser,_id,content){
        checkObjectId(_id,idUser);
        const query = {_id,author :idUser};
        const post = await Post.findOneAndUpdate(query,{content},{new :true});
        if(!post) throw new MyError('CANNOT_FIND_POST', 404);
        return post;
    }

    static async deletePost(idUser, _id,){
        checkObjectId(_id,idUser);
        const query = {_id, author : idUser};
        const post = await Post.findOneAndDelete(query);
        if(!post) throw new MyError('CANNOT_FIND_POST',404);
        const postInfo = post.toObject();
        await Comment.remove({_id : {$in : post.comments}});
        await  User.findByIdAndUpdate(idUser,{$pull:{posts :_id}});
        await  Tag.findByIdAndUpdate(postInfo.tag,{$pull:{posts :_id}});
        return post;
    }
    static async likePost(idUser,_id){
        checkObjectId(idUser,_id);
        const queryObject = {_id,fans : {$ne :idUser}};
        const post = await Post.findOneAndUpdate(queryObject,{$addToSet:{fans:idUser}},{new:true});
        if(!post) throw new MyError('CAN_NOT_FIND_POST',404);
        return post;
    }
    static async dislikePost(idUser,_id){
        checkObjectId(idUser, _id);
        console.log('nghiem');
        const queryObject = { _id, fans: { $eq: idUser } };
        const post = await Post.findOneAndUpdate(queryObject, { $pull: { fans: idUser } }, { new: true });
        if (!post) throw new MyError('CANNOT_FIND_STORY', 404);
        return post;
    }

}
module.exports = {PostService};