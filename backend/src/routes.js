const express = require('express');

const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const AccountController = require('./controllers/AccountController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/profile', ProfileController.index);

routes.get('/accounts', AccountController.index);
routes.post('/accounts', AccountController.create);
routes.delete('/accounts/:id', AccountController.delete);

module.exports = routes;
