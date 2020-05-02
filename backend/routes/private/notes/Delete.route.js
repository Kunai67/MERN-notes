const Router = require('express').Router();
const NoteModel = require('../../../models/Note.model');

// DELETE NOTE BY ID
Router.delete('/:id', (req, res) => {
    NoteModel.findByIdAndDelete(req.params.id, { useFindAndModify: false })
    .then(doc => {
        // CHECKS WHETHER THERE IS A DELETED DOCUMENT
        doc ? res.status(200).json({ message: `Deleted note with id: ${req.params.id}` }) 
            : res.status(400).json({ message: `Note with id: ${req.params.id} does not exist` }) 
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

module.exports = Router;