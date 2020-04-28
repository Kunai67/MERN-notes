const Router = require('express').Router();
const NoteModel = require('../models/Note.model');

Router.post('/', (req, res) => {
    const json = req.body;

    const note = new NoteModel({
        title: json.title,
        body: json.body,
        tags: json.tags
    });

    note.save((err) => {
        if (err) {
            res.json({ message: err.message });
            res.status(400);
        } else {
            res.json({ message: 'Note Created' });
            res.status(200);
        }
    });
});

module.exports = Router;