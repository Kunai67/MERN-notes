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

    NoteModel.updateOne({id: req.param.id}, updateObj, (err) => {
        if (err) {
            res.json({ message: err });
            res.status(400);
        } else {
            res.json({ message: 'Successfully Updated' });
            res.status(200);
        }
    });
});

module.exports = Router;