require('dotenv').config();

const createNoteRouter = require('./routes/Create.route');

const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/create', createNoteRouter);

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.on('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening on port ${PORT}`);
    }
});