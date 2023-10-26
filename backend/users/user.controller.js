const { 
    User
} = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: async (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        if (!req.body.login) {
            res.status(400).send({
                message: "Login can not be empty!"
            });
        }

        const post = await User.create({
            login: req.body.login,
            email: req.body.email,
            password: req.body.password,
        });
        res.json(post);
    },
    loginController: async (req, res) => {
        console.log(req.body);
    },
};