const Router = require('express').Router();
const NoteModel = require('../../../models/Note.model');

Router.get('/', (req, res) => {
    NoteModel.find().then(docs => res.json(docs))
    .catch(err => res.status(400).json({ message: err.message }));
});

Router.get('/:id', (req, res) => {
    NoteModel.find({ userId: req.params.id }).then(docs => res.json(docs))
    .catch(err => res.status(400).json({ message: err.message }));
});

Router.get('/note/:id', (req, res) => {
    NoteModel.findOne({_id: req.params.id}).then(doc => res.json(doc))
    .catch(err => res.status(400).json({ message: err.message }));
});

module.exports = Router;