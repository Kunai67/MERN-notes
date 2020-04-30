const Router = require('express').Router();
const AuthMiddleware = require('../utils/auth');
const CreateRoute = require('./private/notes/Create.route');
const ReadRoute = require('./private/notes/Read.route');
const UpdateRoute = require('./private/notes/Update.route');
const DeleteRoute = require('./private/notes/Delete.route');

Router.use(AuthMiddleware);
Router.use('/create', CreateRoute);
Router.use('/', ReadRoute);
Router.use('/update', UpdateRoute);
Router.use('/delete', DeleteRoute);

module.exports = Router;