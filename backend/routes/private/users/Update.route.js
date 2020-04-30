const Router = require('express').Router();
const UserModel = require('../../../models/User.model');
const UserValidator = require('../../../utils/userValidator');
const bcrypt = require('bcryptjs');

Router.put('/:id', async (req, res) => {
    // Check if user already exists
    const userExist = await UserModel.findById(req.params.id);
    if (!userExist) return res.status(400).json({ message: 'User does not exist' });

    const { error } = UserValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updateObj = {
        name: '',
        email: '',
        password: ''
    }

    for (const key of Object.keys(updateObj)) {
        if (req.body[key]) {
            updateObj[key] = req.body[key];
        } else {
            delete updateObj[key];
        }
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        updateObj.password = await bcrypt.hash(req.body.password, salt);
    }

    UserModel.findByIdAndUpdate(req.params.id, updateObj, { runValidators: true, useFindAndModify: false }, (err, doc) => {
        if (err) {
            res.json({ message: err });
            res.status(400);
        } else if (Object.keys(updateObj).length === 0) {
            res.json({ message: 'Please fill in necessary fields' });
            res.status(400);
        } else if (!doc) {
            res.json({ message: `Record with id: ${req.params.id} does not exist.` })
        } else {
            res.json({ message: 'Successfully Updated' });
            res.status(200);
        }
    });
});

module.exports = Router;