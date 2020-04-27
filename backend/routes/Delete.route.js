const Router = require('express').Router();
const NoteModel = require('../models/Note.model');

Router.delete('/:id', (req, res) => {
    NoteModel.deleteOne({id: req.param.id}, (err) => {
        if (err) {
            res.json({ message: err });
            res.status(400);
        } else {
            res.json({ message: 'Successfully Deleted' });
            res.status(200);
        }
    });
});

module.exports = Router;