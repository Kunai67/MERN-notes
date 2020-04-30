const Router = require('express').Router();
const NoteModel = require('../../models/Note.model');
const NoteValidator = require('../../utils/noteValidator');

Router.post('/', (req, res) => {
    const json = req.body;

    // Joi validation
    const { error } = NoteValidator.validate(json);
    if (error) return res.status(400).json({ message: error.details[0].message }); 

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