const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const START_PORT = 8080;
let currentPort = START_PORT;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.txt': 'text/plain',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
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

// Port Auto-Recovery & Native Launch logic
function startServer(port) {
  server.listen(port);
}

server.on('listening', () => {
  const url = `http://localhost:${currentPort}/`;
  console.log(`\n======================================================================`);
  console.log(`⚖️  AI LEGAL RAG WEB APP IS RUNNING SUCCESSFULLY!`);
  console.log(`👉 Active Server URL: ${url}`);
  console.log(`======================================================================\n`);
  console.log(`Automatically launching your default web browser now...`);
  console.log(`Press Ctrl+C in this console window to stop the server.`);
  
  // Launch Windows default browser natively
  exec(`start ${url}`, (err) => {
    if (err) {
      console.log(`Note: Browser failed to auto-launch. Please manually open: ${url}`);
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${currentPort} is currently occupied. Retrying on port ${currentPort + 1}...`);
    currentPort++;
    startServer(currentPort);
  } else {
    console.error(`Server error occurred: ${err.message}`);
  }
});

// Start initialization
startServer(currentPort);
