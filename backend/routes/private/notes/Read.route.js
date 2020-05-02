const Router = require('express').Router();
const NoteModel = require('../../../models/Note.model');

Router.get('/', (req, res) => {
    NoteModel.find().then(docs => res.json(docs))
    .catch(err => res.status(400).json({ message: err }));
});

Router.get('/:id', (req, res) => {
    NoteModel.find({ userId: req.params.id }).then(doc => res.json(doc))
    .catch(err => res.status(400).json({ message: err }));
});

Router.get('/note/:id', (req, res) => {
    NoteModel.findOne({_id: req.params.id}).then(doc => doc ? res.json(doc) : res.json({}))
    .catch(err => res.status(400).json({ message: err }));
});

module.exports = Router;