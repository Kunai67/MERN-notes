const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const NoteSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
}, {
    timestamps: true
});

const NoteModel = new Model('Note', NoteSchema);

module.exports = NoteModel;