const http = require('http');
var url = require('url');
var fs = require('fs');

const hostname = '10.0.0.220';
const port = 8080;

const server = http.createServer((req, res) => {

  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }  
    res.write(data);
    return res.end();
  });

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
