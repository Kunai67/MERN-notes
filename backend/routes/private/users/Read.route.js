const Router = require('express').Router();
const UserModel = require('../../../models/User.model');

Router.get('/', (req, res) => {
    UserModel.find({}).exec((err, docs) => {
        if (err) {
            res.json({ message: err.message })
        } else {
            res.json(docs);
            res.status(200);
        }
    });
});

Router.get('/:id', (req, res) => {
    UserModel.findById(req.params.id).exec((err, docs) => {
        if (err) {
            res.json({ message: err.message })
        } else {
            res.json(docs);
            res.status(200);
        }
    });
});

module.exports = Router;