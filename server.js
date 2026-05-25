const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.txt': 'text/plain',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  // Normalize request path
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, decodeURIComponent(filePath));

  // Verify file is within directory to prevent path traversal (Windows Case-Insensitive safe)
  const normFilePath = path.normalize(filePath).toLowerCase();
  const normDirName = path.normalize(__dirname).toLowerCase();
  if (!normFilePath.startsWith(normDirName)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access Denied');
    return;
  }

  // Read and serve file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Internal Server Error: ${err.code}`);
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================================`);
  console.log(`⚖️  AI LEGAL RAG WEB APP IS RUNNING SUCCESSFULLY!`);
  console.log(`👉 Open your browser and navigate to: http://localhost:${PORT}/`);
  console.log(`======================================================================\n`);
  console.log(`Press Ctrl+C in this console window to stop the server.`);
});
