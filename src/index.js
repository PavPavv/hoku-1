import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Error</title>
      <style>
        h1 {
          color: red;
        }
      </style>
    </head>
    <body>
      <h1>An error occurred :(</h1>
    </body>
  </html>
`;

const log = (req) => {
  const filePath = path.join(__dirname, './request-log.txt');
  let data = '';
  data += `${new Date()}`;

  for (const h in req.headers) {
    data += `${h}: ${req.headers[h]}\n`;
  }

  data += `${req.method}\n\n\n`;

  fs.writeFile(
    filePath,
    data,
    { flag: 'a+'},
    (err) => {
      if (err) {
        console.error(`Error while writing file: ${err}`);
      }
    });
};

const html = (response, template ='main') => {
  const filePath = path.join(__dirname, `./templates/${template}/index.html`);
  fs.readFile(
    filePath,
    { encoding: 'utf8' },
    (err, data) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end(defaultHtml);
      } else {
        response.writeHead(200, {
          'Content-Type': 'text/html',
          'x-custom-header': 'hello from Hoku-1',
        });
        response.end(data);
      }
    });
};

const hoku1 = http.createServer((req, res) => {
  log(req);

  if (req.url === '/') {
    html(res);
  } else {
    res.statusCode = 500;
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(defaultHtml);
  }
});

hoku1.on('error', (err) => {
  res.statusCode = 500;
  console.error('\x1b[31m', `Server error: ${err}`, '\x1b[0m');
});

hoku1.listen(4800, () => {
  console.log('\x1b[45m', '\x1b[33m', 'HOKU-1 welcomes you!', '\x1b[0m')
  console.log('\x1b[33m', `HOKU-1 server is running on a port: ${4800}`, '\x1b[0m');
});