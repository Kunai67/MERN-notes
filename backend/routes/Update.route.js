const Router = require('express').Router();
const NoteModel = require('../models/Note.model');

Router.put('/:id', (req, res) => {
    const updateObj = {
        title: '',
        body: '',
        tags: []
    }

    for (const key of Object.keys(updateObj)) {
        if (req.body[key]) {
            updateObj[key] = req.body[key];
        } else {
            delete updateObj[key];
        }
    }

    console.log(updateObj);

    NoteModel.findByIdAndUpdate(req.params.id, updateObj, { runValidators: true, useFindAndModify: false }, (err, doc) => {
        if (err) {
            res.json({ message: err });
            res.status(400);
        } else if (Object.keys(updateObj).length === 0) {
            res.json({ message: 'Please fill in necessary fields' });
            res.status(400);
        } else if (!doc) {
            res.json({ message: `Record with id: ${req.params.id} does not exist.` })
        } else {
            res.json({ message: 'Successfully Updated' });
            res.status(200);
        }
    });
});

module.exports = Router;