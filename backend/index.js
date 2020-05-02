// Configure environment variables
require('dotenv').config();

// Get port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to database
require('./utils/db');

// Require npm packages
const express = require('express');
const cors = require('cors');

// Require routes
const NotesRoutes = require('./routes/Notes.route');
const AuthRoutes = require('./routes/Auth.route');
const UsersRoutes = require('./routes/Users.route');

// Instantiate app
const app = express();

// Use middlewares
app.use(cors());
app.use(express.json());

// Use routes
app.use('/users', UsersRoutes);
app.use('/auth', AuthRoutes);
app.use('/', NotesRoutes);

// Listen to a certain port
app.listen(PORT, (err) => err ? console.error(err) : console.log(`Listening on port ${PORT}`));