const Router = require('express').Router();
const NoteModel = require('../models/Note.model');

Router.get('/', (req, res) => {
    let queryObj = {};

    if (req.query.title) {
        queryObj.title = req.query.title;
    } else if (req.query.tag) {
        queryObj.tags = [req.query.tag];
    }

    NoteModel.find(queryObj).exec((err, docs) => {
        if (err) {
            console.error(err);
        } else {
            res.json(docs);
            res.status(200);
        }
    });
});

Router.get('/:id', (req, res) => {
    NoteModel.find({id: req.param.id}).exec((err, docs) => {
        if (err) {
            console.error(err);
        } else {
            res.json(docs);
            res.status(200);
        }
    });
});

module.exports = Router;