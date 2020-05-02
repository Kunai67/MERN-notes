const Router = require('express').Router();
const UserModel = require('../../../models/User.model');
const UserValidator = require('../../../utils/userValidator');
const bcrypt = require('bcryptjs');

Router.put('/:id', async (req, res) => {
    // Joi validation
    const { error } = UserValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message }); 

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    UserModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(doc => doc ? res.json({ message: 'User details successfully updated' }) : res.json({ message: `User with id: ${req.params.id} does not exist.` }))
    .catch(err => res.json({ message: err.message }));
});

module.exports = Router;