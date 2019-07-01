const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  //console.log(url.parse(req.url).pathname);
  //console.log(pathname);
  //console.log(pathname.search('/'));

  const filepath = path.join(__dirname, 'files', pathname);
  //console.log(filepath);

  switch (req.method) {
    case 'GET':

        if (pathname.search('/') !== -1) {
            res.statusCode = 400;
            res.end("Error 400") 

        };
        const rStream = fs.createReadStream(filepath);

        rStream.on("error", (err) => {
            res.statusCode = 404;
            res.end("Error 404"); 
        });

        rStream.pipe(res).on('error', () => {
            res.statusCode = 500;
            res.end("Error 500");
        });





      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }

 
});

module.exports = server;
