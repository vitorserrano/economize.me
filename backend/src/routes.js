const express = require('express');

const middleware = require('./middlewares/auth');

const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');

const ProfileController = require('./controllers/ProfileController');
const AccountController = require('./controllers/AccountController');
const CategoryController = require('./controllers/CategoryController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);
routes.post('/users', UserController.create);

routes.use(middleware);

routes.get('/users', UserController.index);
routes.post('/users/:id', UserController.update);

routes.get('/profile', ProfileController.index);

routes.get('/accounts', AccountController.index);
routes.post('/accounts', AccountController.create);
routes.post('/accounts/:id', AccountController.update);
routes.delete('/accounts/:id', AccountController.delete);

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.create);
routes.delete('/categories/:id', CategoryController.delete);

module.exports = routes;
