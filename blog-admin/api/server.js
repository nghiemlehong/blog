const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 9999;
require('./app/helpers/DB');
const {userRouter} = require('./app/routes/user.route');
const {postRouter} = require('./app/routes/post.route');
const {commentRouter} = require('./app/routes/comment.route')
const {adminRouter} = require('./app/routes/admin.route')
const {tagRouter} = require('./app/routes/tag.route')
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.onError = function(error) {
        const body = { success: false, message: error.message };
        if (!error.statusCode) console.log(error);
        res.status(error.statusCode || 500).send(body);
    };
    next();
});
app.use('/user', userRouter);
app.use('/post',postRouter);
app.use('/comment',commentRouter);
app.use('/admin', adminRouter );
app.use('/tag',tagRouter);
app.get('/', (req,res)=>
{
    res.send("<h1>Lê Hồng Nghiệm</h1>")
})
app.listen(port, function() {
    console.log('Server is running on Port:', port);
});