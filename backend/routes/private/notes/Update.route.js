const Router = require('express').Router();
const NoteModel = require('../../../models/Note.model');
const NoteValidator = require('../../../utils/noteValidator');

Router.put('/:id', (req, res) => {
    // Joi validation
    const { error } = NoteValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message }); 

    NoteModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(doc => doc ? res.json({ message: 'Successfully Updated' }) : res.json({ message: `Record with id: ${req.params.id} does not exist.` }))
    .catch(err => res.json({ message: err }));
});

module.exports = Router;