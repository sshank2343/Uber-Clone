const http = require('http');
const app = require('./app');


const server = http.createServer(app);


const Port = process.env.PORT || 4000;
server.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});