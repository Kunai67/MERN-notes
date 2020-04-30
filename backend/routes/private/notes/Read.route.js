const Router = require('express').Router();
const NoteModel = require('../../../models/Note.model');

Router.get('/', (req, res) => {
    let queryObj = {};

    if (req.query.title) {
        queryObj.title = req.query.title;
    } else if (req.query.tag) {
        queryObj.tags = [req.query.tag];
    }

    NoteModel.find(queryObj).exec((err, docs) => {
        if (err) {
            res.json({ message: err.message })
        } else {
            res.json(docs);
            res.status(200);
        }
    });
});

Router.get('/:id', (req, res) => {
    NoteModel.find({ userId: req.params.id }).exec((err, docs) => {
        if (err) {
            res.json({ message: err.message })
        } else {
            res.json(docs);
            res.status(200);
        }
    });
});

// Router.get('/:id', (req, res) => {
//     NoteModel.findOne({_id: req.params.id}).exec((err, docs) => {
//         if (err) {
//             console.error(err);
//         } else if (!docs) {
//             res.json({ message: `Found nothing.` })
//         } else {
//             res.json(docs);
//             res.status(200);
//         }
//     });
// });

module.exports = Router;