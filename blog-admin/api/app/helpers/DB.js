// DB.js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:123@cluster0-jxecg.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => console.log('Database Connected '))
    .catch((err) =>  {
        console.log(err);
        process.exit(1);
    });