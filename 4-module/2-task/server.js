const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', async (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':

      if (pathname.search('/') !== -1) {
         res.statusCode = 400;
         res.end("Error 400") 

      } else {
         try {

           stats = fs.lstatSync(filepath);
           res.statusCode = 409;
           res.end("Error 409");
 
        } catch {
          
           let body = '';
 
           for await (let chunk of req) {
               body += chunk;
            }

           if (Buffer.byteLength(body) > 1000)   {
             res.statusCode = 413;
             res.end("Error 413");

           } else {
             const wStream = fs.createWriteStream(filepath);
 
             wStream.on('error', cleanup);  
             wStream.write(body);
             wStream.end(() => {res.end("All ok");});
           }
    
       }

      };  

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

function cleanup() {
  fs.unlink(wStream.path, (err) => {
    if (err && err.code == 'ENOENT') {

    } else if (err) {
      throw err;
    }
  });
  wStream.destroy();
}

module.exports = server;
