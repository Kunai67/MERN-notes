const Router = require('express').Router();
const ReadRoute = require('./private/users/Read.route');
const DeleteRoute = require('./private/users/Delete.route');
const UpdateRoute = require('./private/users/Update.route');

Router.use('/', ReadRoute);
Router.use('/delete', DeleteRoute);
Router.use('/update', UpdateRoute);

module.exports = Router;