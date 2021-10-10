const express = require('express');

const app = express();

const LIMIT = 10;
const DELAY = 1000;
const PORT = 3000;

let connections = [];

let timer = function(req, res, next) {
  let tick = 0;

  setTimeout(function run() {
    let now = new Date();
    if(++tick > LIMIT) {
      res.write(`Your current date: ${now}`);
      res.end();
      tick = 0;
      return;
    }

    res.write(`Date: ${now}.\n`);
    setTimeout(run, DELAY);
  }, DELAY);

  next();
};

app.use(timer);

app.get('/date', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  connections.push(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});