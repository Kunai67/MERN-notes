const Router = require('express').Router();
const NoteModel = require('../../../models/Note.model');
const NoteValidator = require('../../../utils/noteValidator');

Router.post('/', (req, res) => {
    // Joi validation
    const { error } = NoteValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message }); 

    const note = new NoteModel({
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        userId: req.body.userId
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