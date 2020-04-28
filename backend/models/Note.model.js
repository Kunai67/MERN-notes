const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const NoteSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{
        type: String,
        trim: true
    }],
}, {
    timestamps: true
});

const NoteModel = new Model('Note', NoteSchema);

module.exports = NoteModel;