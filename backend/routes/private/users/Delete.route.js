const Router = require('express').Router();
const UserModel = require('../../../models/User.model');

Router.delete('/:id', (req, res) => {
    UserModel.findByIdAndDelete(req.params.id, { useFindAndModify: false }, (err, doc) => {
        if (err) {
            res.json({ message: err.message });
            res.status(400);
        } else if (!doc) {
            res.json({ message: `Record with id: ${req.params.id} does not exist.` })
        } else {
            res.json({ message: 'Successfully Deleted' });
            res.status(200);
        }
    });
});

module.exports = Router;