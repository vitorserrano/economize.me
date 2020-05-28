const express = require('express');

const app = express();

app.get('/', (request, response) => {
  return response.json({
    name: 'economize.me',
    tchs: 'Node.js, ReactJS e React Native',
  });
});

app.listen(3333);
