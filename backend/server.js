//Core modules
const http = require('http');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path'); //!
const EventEmitter = require('events');
const logEvents = require('./middleware/logEvents');

//https://nodejs.org/api/events.html#events_events
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

//Serve static files
const serveFile = async (filePath, contentType, res) => {
  try {
    const fileEncoding = contentType.includes('image') ? '' : 'utf8';
    const rawData = await fsPromises.readFile(filePath, fileEncoding);
    const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;

    res.writeHead(filePath.includes('404.html') ? 404 : 200, { 'Content-Type': contentType });
    res.end(contentType === 'application/json' ? JSON.stringify(data) : data);
  } catch (err) {
    //Log error
    myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
    res.statusCode = 500;
    res.end();
  }
};

//Create the server https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
const server = http.createServer((req, res) => {
  //Log request
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

  //Set file extension
  const extension = path.extname(req.url);

  //Set content type
  let contentType;
  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.ico':
      contentType = 'image/x-icon';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
    default:
      contentType = 'text/html';
  }

  //Filter out all queries
  const firstQueryStartIndex = req.url.indexOf('?');
  const anchorIndex = req.url.indexOf('#');
  let queryString = '';
  let filteredUrl = req.url;
  if (firstQueryStartIndex !== -1) {
    if (anchorIndex === -1 || (anchorIndex !== -1 && anchorIndex < firstQueryStartIndex)) {
      //no # or # before first ?
      queryString = req.url.split('?')[1];
    } else {
      //# after first ?
      queryString = req.url.split('#')[1].split('?')[1];
    }
  }
  //Comment next line out to remove query filter
  filteredUrl = req.url.replace(`?${queryString}`, '');

  //Set path
  let filePath =
    contentType === 'text/html' && filteredUrl === '/'
      ? path.join(__dirname, '..', 'frontend', 'views', 'index.html')
      : contentType === 'text/html' && filteredUrl.slice(-1) === '/'
      ? path.join(__dirname, '..', 'frontend', 'views', filteredUrl, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, '..', 'frontend', 'views', filteredUrl)
      : path.join(__dirname, '..', 'frontend', 'public', filteredUrl);
  if (!extension && filteredUrl.slice(-1) !== '/') filePath += '.html';

  //Serve if the file exists
  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    //Redirects: 301 (Moved Permanently), 404 (Not Found)
    switch (path.parse(filePath).base) {
      case 'oldpage.html':
        res.writeHead(301, { 'Location': '/index.html' });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, '..', 'frontend', 'views', '404.html'), 'text/html', res);
    }
  }
});

//Set the port
const PORT = 3000;
server.listen(PORT, () => console.log(`server running on port ${PORT}\nhttp://localhost:${PORT}`));
