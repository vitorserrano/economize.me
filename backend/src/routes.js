const express = require('express');

const routes = express.Router();

routes.post('/users', (request, response) => {
  return response.json({
    name: 'economize.me',
    tchs: 'Node.js, ReactJS e React Native',
  });
});

module.exports = routes;
