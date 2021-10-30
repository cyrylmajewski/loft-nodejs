const express = require('express');

const app = express();

const LIMIT = 10;
const DELAY = 1000;
const PORT = 3000;

let connections = [];
let tick = 0;

setTimeout(function run() {
  let now = new Date();
  console.log(`Current date: ${now}`);
  
  if(++tick > LIMIT) {
    connections.map(res => {
      res.write('END\n');
      res.end();
    });
    connections = [];
    tick = 0;
  }

  connections.map((res, i) => {
    res.write(`Hello ${i}! Tick: ${tick} Date: ${now}.\n`);
    console.log(now);
  });
  setTimeout(run, DELAY);
}, DELAY);

app.get('/date', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  connections.push(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
