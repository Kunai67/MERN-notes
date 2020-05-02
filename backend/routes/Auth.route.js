const Router = require('express').Router();
const UserModel = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserValidator = require('../utils/userValidator');

Router.post('/register', async (req, res) => {
    // Joi validation
    const { error } = UserValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Check if user already exists
    const userExist = await UserModel.findOne({ email: req.body.email }).select('_id');
    if (userExist) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    // Create the model
    const user = new UserModel(req.body);

    // Save user
    user.save().then(createdUser => res.json({ message: `Created user with id: ${createdUser._id}` }));
})

Router.post('/login', async (req, res) => {
    // Check if user exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Wrong Email or Password' });

    // Check if password is correct
    const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!passwordCorrect) return res.status(400).json({ message: 'Wrong Email or Password' });

    // Create JSON web token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1 day' });

    // Send JSON web token
    res.json({ message: 'Login Successful', token });
});

module.exports = Router;