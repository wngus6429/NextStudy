const http = require('http');
http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.end('hello world');
});
http.listen(3065, () => {
  console.log('listening on');
});
