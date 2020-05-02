const Router = require('express').Router();
const UserModel = require('../../../models/User.model');

Router.get('/', (req, res) => {
    UserModel.find().select({ password: 0 })
    .then(docs => res.json(docs))
    .catch(err => res.status(400).json({ message: err.message }));
});

Router.get('/:id', (req, res) => {
    UserModel.findById(req.params.id).select({ password: 0 })
    .then(doc => res.json(doc))
    .catch(err => res.status(400).json({ message: err.message }));
});

module.exports = Router;