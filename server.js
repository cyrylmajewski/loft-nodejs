const express = require('express');

const app = express();

const PORT = 3000;

const DELAY = +process.env.DELAY;
const TIMEOUT = +process.env.TIMEOUT;

app.get('/date', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  const interval = setInterval(() => {
    let now = new Date();
    console.log(`Current date: ${now}`);
  }, DELAY);

  setTimeout(() => {
    let now = new Date();
    clearInterval(interval);
    res.write(`Currrent date ${now}`);
    res.end();
  }, TIMEOUT);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
