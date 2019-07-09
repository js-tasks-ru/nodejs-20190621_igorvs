const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');

const receiveFile = require('./receiveFile');

const server = new http.Server();

server.on('request', async (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  if (pathname.includes('/') || pathname.includes('..')) {
    res.statusCode = 400;
    res.end('Nested paths are not allowed');
    return;
  }

  const filepath = path.join(__dirname, 'files', pathname);


  switch (req.method) {
    case 'POST':


      };  
*/
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
