const Router = require('express').Router();
const UserModel = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

Router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    // Check if user already exists
    const userExist = await UserModel.findOne({ email: req.body.email }).select('_id');

    if (userExist) return res.status(400).json({ message: 'User already exists' });

    const savedUser = await user.save();

    res.json({ message: `Created user with id: ${savedUser._id}` });
})

Router.post('/login', async (req, res) => {
    // Check if user exists
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ message: 'Wrong Email or Password' });

    const passwordCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!passwordCorrect) return res.status(400).json({ message: 'Wrong Email or Password' });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1 day' });

    res.json({ message: 'Login Successful', token });
});

module.exports = Router;