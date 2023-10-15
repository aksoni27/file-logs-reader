const http = require('http');
const url = require('url');
const { handleLogsRequest } = require('./logHandler');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  try {
    if (parsedUrl.pathname === '/logs' && query.start && query.end) {
      handleLogsRequest(res, query.start, query.end);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
