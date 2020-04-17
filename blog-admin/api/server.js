const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 9999;
require('./app/helpers/DB');
const {routerUser} = require('./app/routes/user.router');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', routerUser);
app.get('/', (req,res)=>
{
    res.send("<h1>Lê Hồng Nghiệm</h1>")
})

app.listen(port, function() {
    console.log('Server is running on Port:', port);
});