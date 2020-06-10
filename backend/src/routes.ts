import express from 'express';

const routes = express.Router();

routes.get('/', (resquest, response) => {
  return response.send('Hello World');
});

export default routes;
