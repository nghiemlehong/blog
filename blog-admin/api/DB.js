// DB.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog')
    .then(() => console.log('Database Connected '))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })