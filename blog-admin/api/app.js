const express = require('express');
const bodyParcer = require('body-parser');
const morgan = require('morgan');

require('./DB')

const app = express();
app.use(bodyParcer.urlencoded({ extended: false }));
app.use(bodyParcer.json());
//setup morgan
app.use(morgan('dev'));
// require routes
const { routerUser } = require('./app/routers/User');
app.use('/user', routerUser);
//export
module.exports = app;