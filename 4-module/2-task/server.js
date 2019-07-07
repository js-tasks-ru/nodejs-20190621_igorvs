const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');

const server = new http.Server();

server.on('request', async (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);


  switch (req.method) {
    case 'POST':
/*
      if (pathname.search('/') !== -1) {
         res.statusCode = 400;
         res.end("Error 400") 
         //return

      } else {
        const stream = fs.createWriteStream(filepath, {flags: 'wx'});
        const limitedStream = new LimitSizeStream({ limit: 1000000 });
        

        stream.on('error', err => {
          if (err.code === 'EEXIST') {
            res.statusCode = 409;
            res.end('file already exists');
          } else {
            res.statusCode = 500;
            res.end('error');

          }

        });


        limitedStream.on('error', () => {
          res.statusCode = 413;
          res.end('Not implemented');
          fs.unlink(filepath, () => {
            //res.statusCode = 500;
            //res.end('error');

          });
        });

        req.pipe(limitedStream).pipe(stream);


        stream.on('close', () => {
          res.statusCode = 201;
          res.end('ok')
        });     

      };  
*/
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
