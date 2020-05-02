const Router = require('express').Router();
const NoteModel = require('../../../models/Note.model');
const NoteValidator = require('../../../utils/noteValidator');

Router.post('/', async (req, res) => {

    // VALIDATE IF REQUEST BODY ADHERES TO JOI SCHEMA
    const { error } = NoteValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message }); 

    // CREATE MODEL
    const note = new NoteModel({
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        userId: req.body.userId
    });

    // SAVE MODEL
    return await note.save().then(doc => res.json({ message: `Note Created with id: ${doc._id}` }))
                            .catch(err => res.status(400).json({ message: err.message }));
});

module.exports = Router;