const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 9999;

const server = http.createServer(app);

server.listen(PORT, () => {
    return console.log('Server started');
})