const express = require('express');

const middleware = require('./middlewares/auth');

const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const AccountController = require('./controllers/AccountController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);
routes.use(middleware);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.post('/users/:id', UserController.update);

routes.get('/profile', ProfileController.index);

routes.get('/accounts', AccountController.index);
routes.post('/accounts', AccountController.create);
routes.delete('/accounts/:id', AccountController.delete);

module.exports = routes;
