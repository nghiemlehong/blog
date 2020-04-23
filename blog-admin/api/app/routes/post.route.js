const {Router} = require('express');
const {PostService} =  require('../services/post.service');
const {mustBeUser} = require('../routes/mustBeUser.middleware');

const postRouter = Router();

postRouter.use(mustBeUser);

postRouter.get('/',(req,res)=>{
    PostService.getAll()
    .then(posts => res.send({success : true, posts}));
});

postRouter.post('/',(req,res)=>{
    const {title,content} = req.body;
    PostService.createPost(req.idUser,title,content)
    .then(postInfo => res.send({success : true, post : postInfo}))
    .catch(res.onError)
});

postRouter.put('/:_id',(req,res)=>{
    const {content} = req.body;
    PostService.updatePost(req.idUser,req.params._id,content)
    .then(post => res.send({success:true,post}))
    .catch(res.onError);
})

postRouter.delete('/:_id',(req,res)=>{
    PostService.deletePost(req.idUser,req.params._id)
    .then(post => res.send({success:true,post}))
    .catch(res.onError);

})

postRouter.post('/like/:_id',(req,res)=>{
    const {_id} = req.params;
    PostService.likePost(req.idUser,_id)
    .then(postInfo => res.send({success : true, post : postInfo }))
    .catch(res.onError);
})

postRouter.post('/dislike/:_id', (req, res) => {
    const { _id } = req.params;
    console.log(_id);
    PostService.dislikePost(req.idUser, _id)
    .then(postInfo => res.send({ success: true, story: postInfo }))
    .catch(res.onError);
});

module.exports = {postRouter};