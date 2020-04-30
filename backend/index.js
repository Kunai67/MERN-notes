require('dotenv').config();

const PrivateRoutes = require('./routes/Privates.route');
const UserRoutes = require('./routes/User.route');

const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/auth', UserRoutes);
app.use('/', PrivateRoutes);

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