const Router = require('express').Router();
const UserModel = require('../../../models/User.model');

Router.delete('/:id', (req, res) => {
    UserModel.findByIdAndDelete(req.params.id, { useFindAndModify: false })
    .then(doc => doc ? res.json({ message: `User ${req.params.id} deactivated` }) : res.json({ message: `User id: ${req.params.id} does not exist.` }))
    .catch(err => res.status(400).json({ message: err.message }));
});

module.exports = Router;