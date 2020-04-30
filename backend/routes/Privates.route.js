const Router = require('express').Router();
const AuthMiddleware = require('../utils/auth');
const CreateRoute = require('./private/Create.route');
const ReadRoute = require('./private/Read.route');
const UpdateRoute = require('./private/Update.route');
const DeleteRoute = require('./private/Delete.route');

Router.use(AuthMiddleware);
Router.use('/create', CreateRoute);
Router.use('/', ReadRoute);
Router.use('/update', UpdateRoute);
Router.use('/delete', DeleteRoute);

module.exports = Router;