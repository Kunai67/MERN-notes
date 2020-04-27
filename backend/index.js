require('dotenv').config();

const createNoteRouter = require('./routes/Create.route');
const readNoteRouter = require('./routes/Read.route');
const deleteNoteRouter = require('./routes/Delete.route');
const updateNoteRouter = require('./routes/Update.route');

const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/create', createNoteRouter);
app.use('/delete', deleteNoteRouter);
app.use('/update', updateNoteRouter);
app.use('/', readNoteRouter);

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.on('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening on port ${PORT}`);
    }
});